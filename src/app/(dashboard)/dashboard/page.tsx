
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardRouterPage() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  if (!role || !["admin", "therapist", "parent"].includes(role)) {
    redirect("/unauthorized");
  }

  redirect(`/${role}`);
}
