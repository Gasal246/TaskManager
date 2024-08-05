import connectDB from "@/lib/mongo"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { promises as fs } from 'fs';
import path from "path";
import Admindatas from "@/models/adminDataCollection";
import Users from "@/models/userCollection";

connectDB();

interface Body {
    adminId: string;
    docId: string;
    docUrl: string;
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
        const updateAdminData = await Admindatas.findByIdAndUpdate(body?.adminId, { $pull: { Documents: { _id: body?.docId } } }, { new: true });
        const filePath = path.join(process.cwd(), 'public', body?.docUrl);
        await fs.unlink(filePath).catch((err) => {
            console.log(err)
        });
        return Response.json(updateAdminData)
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic"