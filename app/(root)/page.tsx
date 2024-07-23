"use client"
import { ThemeChanger } from "@/components/theme/ThemeChanger";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session }: any = useSession();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Maintanance in progress.. please visit later. -Gasal | TaskManager
    </main>
  );
}
