import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UploadPanel from "@/components/UploadPanel";

export default async function AdminUploadPage() {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600">
        <p>Unable to verify session. Please try again later.</p>
      </main>
    );
  }

  if (!session) {
    redirect("/admin/signin");
  }

  if (!session.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    console.warn("Unauthorized access attempt by:", session?.user?.email);
    redirect("/");
  }

  return (
    <main className="min-h-screen p-10 bg-white text-[#0E0E10]">
      <h1 className="text-2xl font-bold mb-6">Admin Upload Panel</h1>
      <UploadPanel />
    </main>
  );
}
