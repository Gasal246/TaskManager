import connectDB from "@/lib/mongo";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import Regions from "@/models/regionCollection";

connectDB();

export async function POST(req: NextRequest){
    try {
        const session: any = await getServerSession(authOptions);
        if(!session){
            return new NextResponse("Unauthorised Error.", { status: 401 });
        }
        const { regionid, staffid } = await req.json();
        const existing = await Regions.findOne({ _id: regionid, RegionHead: staffid });
        if(existing){
            return Response.json({ existing: true });
        }
        const updatedRegion = await Regions.findByIdAndUpdate(regionid, { RegionHead: staffid });
        return Response.json(updatedRegion);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error.", { status: 500 });
    }
}

export const dynamic = "force-dynamic";