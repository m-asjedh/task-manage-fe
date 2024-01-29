"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  let content = (
    <div className="flex gap-x-4 items-center">
      <Link href="/login">Sign in</Link>
      <Link href="/register">Sign up</Link>
      <Link href="/admin-login" className="border p-4 bg-sky-300">
        Admin login
      </Link>
    </div>
  );

  if (pathname === "/dashboard" || pathname === "/admin-dashboard") {
    content = (
      <div className="flex gap-x-4">
        <Link
          href="/login"
          onClick={() => {
            window.localStorage.removeItem("userId");
          }}
        >
          Logout
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center pt-3 pb-6">
      <div className="">
        <h1 className="font-semibold text-3xl">Todoist</h1>
      </div>
      {content}
    </div>
  );
}
