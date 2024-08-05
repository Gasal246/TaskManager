import connectDB from "@/lib/mongo"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { promises as fs } from 'fs';
import path from "path";
import Admindatas from "@/models/adminDataCollection";
import Users from "@/models/userCollection";
import mongoose from "mongoose";

connectDB();

interface Body {
    docname: string;
    adminId: string;
    expire: Date | string;
    remind: Date | string;
    file: File | null;
    [key: string]: any; // For dynamic document properties
}

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized Request Error.", { status: 401 });
        }
        const formdata = await req.formData();
        const body = Object.fromEntries(formdata) as Body;
        console.log("ADMIN IDS");
        console.log("ADMIN IDS", body?.adminId);
        const adminId = new mongoose.Types.ObjectId(body?.adminId);
        const admin = await Users.findOne({ _id: adminId, Role: 'admin' }, { Email: 1 });
        if (!admin) {
            return new NextResponse("Invalid AdminId", { status: 305 });
        }
        const baseUploadDir = path.join(process.cwd(), 'public', 'uploads', 'admin-docs');
        const adminUploadDir = path.join(baseUploadDir, admin?.Email)
        await fs.mkdir(adminUploadDir, { recursive: true });
        const file = formdata.get('file') as File | null;
        let documentUrl = '';
        if (file) {
            const extension = path.extname(file.name);
            const uniqueFilename = `${Date.now()}_${body.docname}${extension}`;
            const relativeFilePath = path.join('uploads', 'admin-docs', admin?.Email, uniqueFilename);
            const newFilePath = path.join(baseUploadDir, admin?.Email, uniqueFilename);
            // Cast Buffer to Uint8Array
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(newFilePath, new Uint8Array(buffer));
            documentUrl = `/${relativeFilePath.replace(/\\/g, '/')}`
        }
        const updateAdminData = await Admindatas.findOneAndUpdate({ AdminId: body?.adminId }, {
            $push: {
                Documents: {
                    DocName: body?.docname,
                    ExpireAt: body?.expire,
                    RemindAt: body?.remind,
                    DocUrl: documentUrl
                }
            }
        }, { new: true });
        return Response.json({ adminData: updateAdminData, uploadedUrl: documentUrl });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic"