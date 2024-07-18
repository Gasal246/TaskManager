import connectDB from "@/lib/mongo"
import Departments from "@/models/departmentsCollection";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest, { params }:{ params: { id: string }}) {
    try {
        const department = await Departments.findById(params?.id);
        return Response.json(department);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic"
