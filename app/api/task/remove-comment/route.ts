import connectDB from "@/lib/mongo";
import Tasks from "@/models/taskCollection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized Request Error.", { status: 401 });
        }
        const { taskid, commentid } = await req.json();
        const updatedTask = await Tasks.findByIdAndUpdate(taskid, { $pull: { Comments: { _id: commentid } } }, { new: true });
        return Response.json(updatedTask);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 401 });
    }
}

export const dynamic = "force-dynamic";
