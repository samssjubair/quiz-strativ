"use client"
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";

const Navbar: React.FC = () => {
    const { data: session } = useSession();
    console.log(session);
  return (
    <nav className="bg-quaternary px-8 p-4 flex items-center justify-between fixed w-full z-50">
      <Link className="text-white    flex hover:text-tertiary" href="/">
        <h2 className="text-xl font-bold uppercase">☑️ Quiz App</h2>
      </Link>

      <div className="flex items-center space-x-4">
        {session ? (
          <Link href="/api/auth/signout">
            <button className="login-btn">
              <IoIosLogOut className="icon" />
              Logout
            </button>
          </Link>
        ) : (
          <button className="logout-btn" onClick={() => signIn()}>
            <IoIosLogIn className="icon" />
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
