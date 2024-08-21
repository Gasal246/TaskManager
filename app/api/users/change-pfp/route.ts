import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Users from "@/models/userCollection";
import uploadBlobToFtp from "@/lib/uploadFtp"; // Assuming you placed the FTP upload function here
import path from 'path'
import deleteFTPfile from "@/lib/deleteFtp";

connectDB();

interface Body {
    userid: string;
    [key: string]: any;
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Not Authorized Request", { status: 401 });
        }

        const formData = await req.formData();
        const body = Object.fromEntries(formData) as Body;
        const user = await Users.findById(body?.userid, { Email: 1, AvatarUrl: 1 });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (user?.AvatarUrl) {
            const deleteExisting = await deleteFTPfile(user?.AvatarUrl);
        }

        const file = formData.get('file') as File | null;
        let docUrl: string | null = null;

        if (file) {
            const extension = path.extname(file.name);
            const uniqueFileName = `${Date.now()}_pic${extension}`;

            // Convert file to buffer
            const buffer = Buffer.from(await file.arrayBuffer());

            // Upload to FTP
            docUrl = await uploadBlobToFtp(buffer, {
                userId: user._id.toString(),
                fileType: "user-profiles",
                fileName: uniqueFileName,
            });

            if (!docUrl) {
                return new NextResponse("Failed to upload file to FTP.", { status: 500 });
            }
        }

        const updatedUser = await Users.findByIdAndUpdate(
            body?.userid,
            { AvatarUrl: docUrl },
            { new: true }
        );

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error.", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
