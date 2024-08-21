import connectDB from "@/lib/mongo";
import Users from "@/models/userCollection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from 'formidable';
import { authOptions } from "../../auth/[...nextauth]/route";
import { promises as fs } from 'fs';
import path from "path";
import { NextApiRequest } from "next";
import uploadBlobToFtp from "@/lib/uploadFtp";

connectDB();

interface Body {
    staffid: string;
    DocName: string;
    ExpireAt: string;
    RemindAt: string;
    Document: File;
    [key: string]: any; // For dynamic document properties
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorised Access to req", { status: 401 });
        }
        const formData = await req.formData();
        const body = Object.fromEntries(formData) as Body;
        const staff = await Users.findById(body?.staffid, { Documents: 1, Email: 1 });
        console.log(body)
        if(staff?.Documents?.some((doc: any) => doc?.DocName === body?.DocName )){
            return Response.json({ existing: true });
        }
        // console.log(body)
        // const baseUploadDir = path.join(process.cwd(), 'public', 'uploads', 'user-docs');
        // const userUploadDir = path.join(baseUploadDir, staff?.Email);
        // await fs.mkdir(userUploadDir, { recursive: true });
        let uploadedDoc;
        if (body?.Document) {
            const file = body?.Document;
            // const extension = path.extname(file.name);
            const uniqueFileName = `${Date.now()}_${body?.DocName}${path.extname(file.name)}`;
            // const relativeFilePath = path.join('uploads', 'user-docs', staff?.Email, uniqueFileName);
            // const newFilePath = path.join(baseUploadDir, staff?.Email, uniqueFileName);

            // Cast Buffer to Uint8Array
            const buffer = Buffer.from(await file.arrayBuffer());
            // await fs.writeFile(newFilePath, new Uint8Array(buffer));

            const docurl = await uploadBlobToFtp(buffer, {
                userId: staff?.Email,
                fileType: 'user-docs',
                fileName: uniqueFileName
            })
            uploadedDoc = {
                DocName: body?.DocName,
                ExpireAt: body?.ExpireAt,
                RemindAt: body?.RemindAt,
                // DocUrl: `/${relativeFilePath.replace(/\\/g, '/')}`, // Ensure correct path format
                DocUrl: docurl,
            }
        }
        const updatedStaff = await Users.findByIdAndUpdate(body?.staffid, { $push: { Documents: uploadedDoc }}, { new: true });
        return Response.json(updatedStaff);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
