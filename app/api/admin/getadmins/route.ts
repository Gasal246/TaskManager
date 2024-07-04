import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Superadmin from "@/models/superAdminCollection";
import Admindatas from "@/models/adminDataCollection";

connectDB();

export async function GET(req: NextRequest){
    try {
        const session: any = await getServerSession(authOptions)
        const superadmin = await Superadmin.findById(session?.user?.id);
        if(!superadmin){
            return new NextResponse("Authorization Error: Not A Super Admin", { status: 500 });
        }
        const admins = await Admindatas.find({}).populate({
            path: "AdminId",
            select: { Name: 1, Email: 1, createdAt: 1, updatedAt: 1 }
        })
        return Response.json(admins)
    } catch (error) {
        console.log(error)
        return new NextResponse(`Internal Server Error: ${error}`, { status: 500 });
    }
}

export const dynamic = "force-dynamic";

