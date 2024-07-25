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
        const { depid, staffid, areaid }: { depid: string, staffid: string, areaid?: string } = await req.json();
        const department = await Departments?.findById(depid);
        if(department?.MaximumStaffs == department?.Staffs?.length){
            return Response.json({ overflow: true });
        }
        const existing = await Departments.findOne({ _id: depid, "Staffs.StaffId": staffid });
        if (existing) {
            return Response.json({ existing: true })
        }
        const user = await Users.findById(staffid, { Area: 1, Region: 1 });
        let staffarea = '';
        if (!areaid) { staffarea = user?.Area; }
        const newStaff = { StaffId: staffid, AreaId: areaid || staffarea, RegionId: user?.Region }
        const updatedDepartment = await Departments.findByIdAndUpdate(depid, { $push: { Staffs: newStaff } }, { new: true });
        return Response.json(updatedDepartment);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
