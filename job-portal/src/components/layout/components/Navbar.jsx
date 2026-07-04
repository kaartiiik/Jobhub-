"use client";

import Link from "next/link";

import useNavbar from "../hooks/useNavbar";
import { NAV_LINKS } from "../constants/navLinks";

export default function Navbar() {
  const {
    user,
    isCandidate,
    isRecruiter,
    handleLogout,
  } = useNavbar();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex-wrap">
        <Link
          href={NAV_LINKS.HOME}
          className="text-xl font-bold"
        >
          JobHub
        </Link>

        <div className="flex gap-6 items-center">
          {user ? (
            isCandidate ? (
              <>
                <Link href={NAV_LINKS.JOBS}>
                  Jobs
                </Link>

                <Link href={NAV_LINKS.DASHBOARD}>
                  Dashboard
                </Link>

                <Link href={NAV_LINKS.SAVED_JOBS}>
                  Saved Jobs
                </Link>

                <Link href={NAV_LINKS.APPLICATIONS}>
                  My Applications
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded text-black"
                >
                  Logout
                </button>
              </>
            ) : isRecruiter ? (
              <>
                <Link href={NAV_LINKS.RECRUITER}>
                  Recruiter Dashboard
                </Link>

                <Link href={NAV_LINKS.APPLICANTS}>
                  View Applicants
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded text-black"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href={NAV_LINKS.JOBS}>
                  Jobs
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded text-black"
                >
                  Logout
                </button>
              </>
            )
          ) : (
            <>
              <Link href={NAV_LINKS.JOBS}>
                Jobs
              </Link>

              <Link href={NAV_LINKS.LOGIN}>
                Login
              </Link>

              <Link href={NAV_LINKS.SIGNUP}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
