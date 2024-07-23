import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Departments from "@/models/departmentsCollection";
import { ObjectId } from "mongodb";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Not Authorised Request", { status: 400 })
        }
        const { depid, regionid } = await req.json();
        const newRegion = { RegionId: new ObjectId(`${regionid}`), Areas: [] }
        const updatedDep = await Departments.findByIdAndUpdate(depid, { $push: { Regions: newRegion } }, { new: true });
        return Response.json(updatedDep);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error.", { status: 500 });
    }
}

export const dynamic = "force-dynamic";