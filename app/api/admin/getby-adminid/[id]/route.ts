import connectDB from "@/lib/mongo"
import Admindatas from "@/models/adminDataCollection";
import Departments from "@/models/departmentsCollection";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest, { params }:{ params: { id: string }}){
    try {
        const departmentsSchemaRefresh = await Departments.find().limit(1);
        const adminData = await Admindatas.findById(params?.id)
            .populate({
                path: "AdminId",
                select: { Password: 0, Skills: 0, Documents: 0 }
            })
            .populate({
                path: "Departments",
                populate: {
                    path: "DepartmentHead",
                    select: { Name: 1, Email: 1, AvatarUrl: 1 }
                }
            });
        return Response.json(adminData)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error.", { status: 500 });
    }
}

export const dynamic = "force-dynamic"
