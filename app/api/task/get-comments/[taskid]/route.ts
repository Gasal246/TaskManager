import connectDB from "@/lib/mongo";
import Tasks from "@/models/taskCollection";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest, { params }: { params: { taskid: string } }) {
    try {
        const tasks = await Tasks.findById(params.taskid, { Comments: 1 })
            .populate({
                path: "Comments.Creator",
                select: { Name: 1, Email: 1, AvatarUrl: 1, Role: 1 }
            })
        return Response.json(tasks);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 401 });
    }
}

export const dynamic = "force-dynamic";
