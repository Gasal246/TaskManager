import connectDB from "@/lib/mongo";
import Users from "@/models/userCollection";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Departments from "@/models/departmentsCollection";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorised Access to req", { status: 401 });
        }
        const { depid, staffid } = await req.json();
        const updatedDepartment = await Departments.findByIdAndUpdate(depid, { $pull: { Staffs: { StaffId: staffid } } });
        return Response.json(updatedDepartment);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
