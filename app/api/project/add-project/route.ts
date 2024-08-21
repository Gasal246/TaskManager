import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import ProjectFlows from "@/models/projectFlowsCollection";
import { Description } from "@radix-ui/react-dialog";
import Projects from "@/models/projectCollection";
import { sendNotification } from "../../helpers/notification-helper";
import Users from "@/models/userCollection";
import Department from "@/app/(admin)/admin/departments/[department]/page";

connectDB();

interface Body {
    title: string;
    description: string;
    deadline: string;
    priority: string;
    depId: string;
    [key: string]: any;
}

export async function POST(req: NextRequest){
    try {
        const session:any = await getServerSession(authOptions);
        if(!session) return new NextResponse("Un Authorized Access", { status: 401 });

        const formData = await req.formData();
        const body = Object.fromEntries(formData) as Body;
        const user = await Users.findById(session?.user?.id, { Email: 1, AvatarUrl: 1, Role: 1, Department: 1 })
            .populate({
                path: "Department",
                select: { DepartmentName: 1 }
            });

        const newFlow = new ProjectFlows({
            Title: "Project Proposed",
            Description: "Initiated New Project Proposal, waiting for approval..",
            Status: 'complete',
            Creator: session?.user?.id
        })
        const initialFlow = await newFlow.save();

        const newProject = new Projects({
            Title: body?.title,
            Description: body?.description,
            Deadline: body?.deadline || null,
            Priority: body?.priority,
            WorkingDepartment: body?.depId,
            Flows: [initialFlow?._id],
            IsApproved: user?.Role == 'admin'
        })
        const savedProject = await newProject.save();
        await sendNotification("New Project Arrived", `A new Project from ${user?.Email}, ${user?.Role} of ${user?.Deparmtent?.DepartmentName} department. Waiting for your approval.`, user?._id, user?.Addedby,  'project-queued', savedProject?._id);
        return Response.json(savedProject);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error.", { status: 500 });
    }
}

const dynamic = "force-dynamic";