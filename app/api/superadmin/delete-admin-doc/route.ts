import connectDB from "@/lib/mongo"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { promises as fs } from 'fs';
import path from "path";
import Admindatas from "@/models/adminDataCollection";
import Users from "@/models/userCollection";
import deleteFTPfile from "@/lib/deleteFtp";

connectDB();

interface Body {
    adminId: string;
    docId: string;
    docUrl: string;
    [key: string]: any; // For dynamic document properties
}

export async function POST(req: NextRequest) {
    try {
        const session: any = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse("Unauthorized Request Error.", { status: 401 });
        }

        const formdata = await req.formData();
        const body = Object.fromEntries(formdata) as Body;

        // Delete the document reference from the database
        const updateAdminData = await Admindatas.findByIdAndUpdate(
            body?.adminId,
            { $pull: { Documents: { _id: body?.docId } } },
            { new: true }
        );

        // Attempt to delete the file from the FTP server
        const deletionSuccess = await deleteFTPfile('http://theprivateapp.com/gazal/admin-docs/66966d5d9fb039774a868e0d/1724257311414_nana.pdf');
        if (!deletionSuccess) {
            console.log("File deletion from FTP failed.");
        }

        return new NextResponse(JSON.stringify(updateAdminData), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic"