import connectDB from "@/lib/mongo";
import Tasks from "@/models/taskCollection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

connectDB();

interface Body {
    taskid: string;
    comment: string;
    [key: string]: any; // For dynamic document properties
}

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized Request Error.", { status: 401 });
        }
        const formData = await req.formData();
        const body = Object.fromEntries(formData) as Body;
        const updatedTask = await Tasks.findByIdAndUpdate(body?.taskid, {
            $push:{ Comments: {
                Comment: body?.comment,
                Creator: session?.user?.id,
                createdAt: Date.now()
            }}
        }, { new: true });
        return Response.json(updatedTask);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 401 });
    }
}

export const dynamic = "force-dynamic";
