"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-black px-8 p-4 flex items-center justify-between fixed w-full z-50">
      <Link className="text-white    flex hover:text-gray-300" href="/">
        <h1 className="text-2xl font-bold uppercase">☑️ Quiz App</h1>
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
