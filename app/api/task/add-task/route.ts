import connectDB from "@/lib/mongo";
import Tasks from "@/models/taskCollection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Users from "@/models/userCollection";

connectDB();

interface Body {
    taskName: string;
    description: string;
    projectid?: string;
    priority: 'high' | 'average' | 'low';
    selectedUsers: string;
    deadline?: string;
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
        const user = await Users.findById(session?.user?.id, { Addedby: 1 });
        const newTask = new Tasks({
            TaskName: body?.taskName,
            Creator: user?._id,
            Description: body?.description,
            ProjectId: body?.projectid || null,
            Priority: body?.priority,
            Status: 'pending',
            AdminId: user?.Addedby,
            ForwardList: body?.selectedUsers.split(','),
            Deadline: body?.deadline || null
        })
        const savedTask = await newTask.save();
        return Response.json(savedTask);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 401 });
    }
}

export const dynamic = "force-dynamic";
