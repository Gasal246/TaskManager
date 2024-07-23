import connectDB from "@/lib/mongo";
import Users from "@/models/userCollection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import fs from 'fs';
import path from 'path';

connectDB();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return new NextResponse("Unauthorised Access to req", { status: 401 });
        }
        const { staffid, docid } = await req.json();
        const user = await Users.findById(staffid);
        const document = user.Documents.id(docid);
        if (!document) {
            return new NextResponse("Document not found", { status: 404 });
        }
        const docUrl = document.DocUrl;
        const updatedUser = await Users.findByIdAndUpdate(
            { _id: staffid },
            { $pull: { Documents: { _id: docid } } }
        );
        if (docUrl) {
            const filePath = path.join(process.cwd(), 'public', docUrl);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Failed to delete file:", err);
                }
            });
        }
        console.log(updatedUser)
        return Response.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
