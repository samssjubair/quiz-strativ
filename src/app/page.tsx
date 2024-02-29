"use client"
import React, { useState } from "react";
import { Button } from "@/components/Ui/MovingBorder";
import CredentialsModal from "@/components/Home/CredentialsModal";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Spinner from "@/components/Ui/Spinner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const route= useRouter();

  if (status === "loading") {
    return <div className="container-center">
      <Spinner/>
    </div>;
  }

  return (
    <main className="container-center">
      {status === "unauthenticated" ? (
        <Button
          borderRadius="1.75rem"
          className="bg-white font-bold dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={() => setModalOpen(true)}
        >
          See Credentials
        </Button>
      ) : session?.user.role == "admin" ? (
        <Button
          borderRadius="1.75rem"
          className="bg-white font-bold dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={() => route.push("/admin-panel")}
        >
          Admin Panel
        </Button>
      ) : (
        <Button
          borderRadius="1.75rem"
          className="bg-white font-bold dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={() => route.push("/user-panel")}
        >
          User Panel
        </Button>
      )}
      <CredentialsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
