import connectDB from "@/lib/mongo";
import Users from "@/models/userCollection";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest, { params }:{ params: { id: string }}){
    try {
        // console.log(params?.id)
        const user = await Users.findById(params?.id, { Password: 0 });
        return Response.json(user);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
