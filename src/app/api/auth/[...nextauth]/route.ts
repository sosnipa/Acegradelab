import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Make sure this file exists

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
