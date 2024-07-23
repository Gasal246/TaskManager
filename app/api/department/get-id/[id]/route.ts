import connectDB from "@/lib/mongo"
import Departments from "@/models/departmentsCollection";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest, { params }:{ params: { id: string }}) {
    try {
        const department = await Departments.findById(params?.id)
            .populate({
                path: "DepartmentHead",
                select: { Name: 1, Email: 1, AvatarUrl: 1 }
            })
            .populate({
                path: "Regions.RegionId",
                select: { RegionName: 1 }
            })
        // console.log(department)
        return Response.json(department);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic"
