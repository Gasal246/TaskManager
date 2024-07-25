import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import path from "path";
import { promises as fs } from 'fs';
import Users from "@/models/userCollection";

connectDB();

interface Body {
    userid: string;
    [key: string]: any;
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Not Authorised Request", { status: 401 })
        }
        const formData = await req.formData();
        const body = Object.fromEntries(formData) as Body;
        const user = await Users.findById(body?.userid, { Email: 1, AvatarUrl: 1 });
        if (user?.AvatarUrl) {
            const filePath = path.join(process.cwd(), 'public', user?.AvatarUrl);
            fs.unlink(filePath);
        }

        const baseUploadDir = path.join(process.cwd(), 'public', 'uploads', 'user-profiles');
        const userUploadDir = path.join(baseUploadDir, user?.Email);
        await fs.mkdir(userUploadDir, { recursive: true });

        const file = formData.get('file') as File | null;
        let docurl;
        if (file) {
            const extension = path.extname(file.name);
            const uniqueFileName = `${Date.now()}_${'pic'}${extension}`;
            const relativeFilePath = path.join('uploads', 'user-profiles', user?.Email, uniqueFileName);
            const newFilePath = path.join(baseUploadDir, user?.Email, uniqueFileName);

            // Cast Buffer to Uint8Array
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(newFilePath, new Uint8Array(buffer));
            docurl = `/${relativeFilePath.replace(/\\/g, '/')}`
        }

        const updatedUser = await Users.findByIdAndUpdate(body?.userid, { AvatarUrl: docurl });
        return Response.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error.", { status: 500 });
    }
}

export const dynamic = "force-dynamic";