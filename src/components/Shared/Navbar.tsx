"use client"
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Navbar = () => {
    return (
        <div>
            <h1>logo</h1>
            <button onClick={()=>signIn()}>login</button>
            <Link href="/api/auth/signout">Logout</Link>
        </div>
    );
};

export default Navbar;