import connectDB from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { promises as fs } from 'fs';
import path from "path";
import Users from "@/models/userCollection";

connectDB();

interface Document {
    DocName: string;
    ExpireAt: string;
    RemindAt: string;
    DocUrl: string;
}

interface Body {
    Name: string;
    Email: string;
    Region: string;
    Area: string;
    Skills: string;
    [key: string]: any; // For dynamic document properties
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized Request Error.", { status: 401 });
        }
        const formData = await req.formData();
        const body = Object.fromEntries(formData) as Body;
        // console.log(body);
        const existing = await Users.findOne({ Email: body?.Email, Addedby: session?.user?.id, IsDeleted: false });
        if(existing){
            return Response.json({ existing: true });
        }

        const baseUploadDir = path.join(process.cwd(), 'public', 'uploads', 'user-docs');
        const userUploadDir = path.join(baseUploadDir, body.Email);
        await fs.mkdir(userUploadDir, { recursive: true });

        const documents: Document[] = [];
        for (let i = 0; ; i++) {
            const name = body[`documents[${i}][name]`];
            if (!name) break;

            const expireAt = body[`documents[${i}][expireAt]`];
            const remindMe = body[`documents[${i}][remindMe]`];
            const file = formData.get(`documents[${i}][file]`) as File | null;

            if (file) {
                const extension = path.extname(file.name);
                const uniqueFileName = `${Date.now()}_${name}${extension}`;
                const relativeFilePath = path.join('uploads', 'user-docs', body.Email, uniqueFileName);
                const newFilePath = path.join(baseUploadDir, body.Email, uniqueFileName);

                // Cast Buffer to Uint8Array
                const buffer = Buffer.from(await file.arrayBuffer());
                await fs.writeFile(newFilePath, new Uint8Array(buffer));

                documents.push({
                    DocName: name,
                    ExpireAt: expireAt,
                    RemindAt: remindMe,
                    DocUrl: `/${relativeFilePath.replace(/\\/g, '/')}`, // Ensure correct path format
                });
            }
        }

        const newUser = new Users({
            Email: body?.Email,
            Name: body?.Name,
            Skills: body?.Skills?.split(','),
            Region: body?.Region,
            Area: body?.Area,
            Status: 'unverified',
            InitialEntry: true,
            Addedby: session?.user?.id,
            Documents: documents
        });
        const savedUser = await newUser.save();
        return Response.json(savedUser);
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error.", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
