import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Superadmin from "@/models/superAdminCollection";
import Admindatas from "@/models/adminDataCollection";
import Users from "@/models/userCollection";
import Departments from "@/models/departmentsCollection";

connectDB();

export async function POST(req: NextRequest){
    try {
        const session: any = await getServerSession(authOptions)
        const data: NewAdminType = await req.json();
        const superadmin = await Superadmin.findById(session?.user?.id);
        if(!superadmin){
            return new NextResponse("Authorization Error: Not A Super Admin", { status: 500 });
        }
        const newAdminUser = new Users({
            Email: data?.email,
            Name: data?.name,
            IsAdmin: true,
            Addedby: session?.user?.id
        })
        const adminUser = await newAdminUser.save();
        const newDepartments = data?.departments?.map((dep: NewDepartment) => {
            return new Departments({
                AdminId: adminUser?._id,
                DepartmentName: dep?.DepartmentName,
                AllowProjects: dep?.Allow_project,
                AllowTasks: dep?.Allow_tasks,
                MaximumStaffs: dep?.Max_staff_count
            })
        })
        const departmentsToSave = newDepartments?.map((dep: any) => dep.save());
        const savedDepartments = await Promise.all(departmentsToSave)
        const departmentIds = savedDepartments.map(dep => dep._id);
        const newAdminData = new Admindatas({
            AdminId: adminUser?._id,
            Departments: departmentIds
        })
        const savedAdminData = await newAdminData.save();
        return Response.json(savedAdminData)
    } catch (error) {
        console.log(error)
    }
}

export const dynamic = "force-dynamic";
