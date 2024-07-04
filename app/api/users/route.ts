import connectDB from "@/lib/mongo";
import Users from "@/models/userCollection";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest){
    try {
        const { searchParams } = new URL(req.url);
        const userid = searchParams.get('id');
        const user = await Users.findById(userid);
        if(!user){
            throw new Error(`User not found for id: ${userid}`); 
        }
        const roles: userTypes[] = [];
        if (user.IsAdmin) roles.push('admin');
        if (user.IsRegionalHead) roles.push('regional_head');
        if (user.IsAreaHead) roles.push('area_head');
        if (roles.length === 0) roles.push('staff');
        return Response.json(roles);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error: "+ error, { status: 500 });
    }
}

export const dynamic = "force-dynamic"