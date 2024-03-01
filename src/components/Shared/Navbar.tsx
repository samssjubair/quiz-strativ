"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import Button from "../Ui/Button";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-primary px-8 p-4 flex items-center justify-between fixed w-full z-50">
      <Link className="text-white    flex hover:text-gray-300" href="/">
        <h1 className="text-xl md:text-2xl font-bold uppercase">☑️ Quiz App</h1>
      </Link>

      <div className="flex items-center space-x-4">
        {session ? (
          <Button
            label="Logout"
            href="/api/auth/signout"
            className="logout-btn"
            icon={<IoIosLogOut className="icon" />}
            type="primary"
          />
        ) : (
          <Button
            label="Login"
            className="login-btn"
            icon={<IoIosLogIn className="icon" />}
            onClick={() => signIn()}
            type="primary"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
