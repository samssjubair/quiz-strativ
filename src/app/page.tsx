"use client"
import React, { useState } from "react";
import { Button } from "@/components/Ui/MovingBorder";
import CredentialsModal from "@/components/Home/CredentialsModal";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Spinner from "@/components/Ui/Spinner";
import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "@/components/Ui/TypeWriterAnimationEffect";
import { heroText } from "@/static/HeroText";

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
      <TypewriterEffectSmooth words={heroText} />
      {status === "unauthenticated" ? (
        <Button
          borderRadius="1.75rem"
          className="animated-btn"
          onClick={() => setModalOpen(true)}
        >
          See Credentials
        </Button>
      ) : session?.user.role == "admin" ? (
        <Button
          borderRadius="1.75rem"
          className="animated-btn"
          onClick={() => route.push("/admin-panel")}
        >
          Admin Panel
        </Button>
      ) : (
        <Button
          borderRadius="1.75rem"
          className="animated-btn"
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
