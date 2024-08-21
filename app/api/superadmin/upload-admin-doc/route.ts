import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Admindatas from "@/models/adminDataCollection";
import Users from "@/models/userCollection";
import mongoose from "mongoose"; // Make sure to adjust the path to your utils file
import uploadBlobToFtp from "@/lib/uploadFtp";
import path from 'path'

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
        
        const adminId = new mongoose.Types.ObjectId(body?.adminId);
        const admin = await Users.findOne({ _id: adminId, Role: 'admin' }, { Email: 1 });
        if (!admin) {
            return new NextResponse("Invalid AdminId", { status: 305 });
        }

        const file = formdata.get('file') as File | null;
        let documentUrl;

        if (file) {
            const uniqueFilename = `${Date.now()}_${body.docname}${path.extname(file.name)}`;
            // Convert the file into a buffer
            const buffer = Buffer.from(await file.arrayBuffer());
            
            documentUrl = await uploadBlobToFtp(buffer, {
                userId: adminId.toString(),
                fileType: 'admin-docs',
                fileName: uniqueFilename
            });
            if (!documentUrl) {
                return new NextResponse("Failed to upload file to FTP", { status: 500 });
            }
        }

        console.log(documentUrl)

        const updateAdminData = await Admindatas.findOneAndUpdate(
            { AdminId: body?.adminId },
            {
                $push: {
                    Documents: {
                        DocName: body?.docname,
                        ExpireAt: body?.expire,
                        RemindAt: body?.remind,
                        DocUrl: documentUrl
                    }
                }
            },
            { new: true }
        );

        return NextResponse.json({ adminData: updateAdminData, uploadedUrl: documentUrl });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
