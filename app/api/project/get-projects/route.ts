import connectDB from "@/lib/mongo";
import Projects from "@/models/projectCollection";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userid = searchParams.get('userid');
        const filter = searchParams.get('filter') as ProjectGetFilters;

        if (!userid || !filter) {
            return new NextResponse("Bad Request", { status: 400 });
        }

        let query = {};

        switch (filter) {
            case 'all':
                query = { AccessTo: userid }; break;
            case 'new':
                query = { AccessTo: userid, OpenedBy: { $ne: userid } }; break;
            case 'ongoing':
                query = { AccessTo: userid, OpenedBy: userid }; break;
            case 'owned':
                query = { Creator: userid }; break;
            case 'ended':
                query = { AccessTo: userid, IsCompleted: true }; break;
            case 'deleted':
                query = { AccessTo: userid, IsDeleted: true }; break;
            default:
                return new NextResponse("Invalid filter", { status: 400 });
        }

        const projects = await Projects.find(query).exec();
        return Response.json(projects)
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";