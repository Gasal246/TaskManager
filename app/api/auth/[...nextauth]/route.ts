import connectDB from "@/lib/mongo";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt-ts'
import Users from "@/models/userCollection";
import Superadmin from "@/models/superAdminCollection";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                isSuper: { label: 'IsSuper', type:'text'}
            },
            authorize: async function (credentials: any) {
                await connectDB()
                try {
                    if(credentials?.isSuper === 'false'){
                        const user = await Users.findOne({ Email: credentials?.email });
                        if(!user) throw new Error("No Such User Found.");
                        if(user?.IsBlocked) throw new Error("User Is Blocked By Admin.");
                        const passwordMatch = await compare(credentials?.password, user?.Password);
                        if(!passwordMatch) throw new Error("Invalid Credentials.");
                        return user;
                    }else if(credentials?.isSuper == 'true'){
                        const admin = await Superadmin.findOne({ Email: credentials?.email })
                        if(!admin) throw new Error("No Such admin Found.");
                        const passwordMatch = await compare(credentials?.password, admin?.Password);
                        if(!passwordMatch) throw new Error("Invalid Credentials.");
                        return admin;
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                const userdata = {
                    userid: user._id,
                    email: user.Email
                }
                token.user = userdata;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.user.userid;
            session.user.email = token.user.email;
            return session;
        }
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export const dynamic = "force-dynamic";
