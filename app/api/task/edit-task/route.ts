import connectDB from "@/lib/mongo";
import Tasks from "@/models/taskCollection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Users from "@/models/userCollection";

connectDB();

interface Body {
    taskId: string;
    taskName: string;
    description: string;
    projectid?: string;
    priority: 'high' | 'average' | 'low';
    selectedUsers: string[];
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
        const updatedTask = await Tasks.findByIdAndUpdate(body?.taskId, {
            TaskName: body?.taskName,
            Description: body?.description,
            ForwardList: body?.selectedUsers,
            ProjectId: body?.projectid || null,
            Priority: body?.priority
        })
        return Response.json(updatedTask);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 401 });
    }
}

export const dynamic = "force-dynamic";
