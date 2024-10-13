"use client";

import { useSession } from "next-auth/react";
import TodaysIntake from "@/components/Dashboard/TodaysIntake";
import WeeklyOverview from "@/components/Dashboard/WeeklyOverview";
import Navbar from "@/components/Navbar/Navbar";
import LoadingPage from "./components/auth/LoadingPage";
import AccessDenied from "./components/auth/AccessDenied";

export default function Dashboard() {
  const { status } = useSession();

  if (status === "loading") return <LoadingPage />;
  if (status === "unauthenticated") return <AccessDenied />;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col items-center ">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <TodaysIntake />

          <WeeklyOverview />
        </div>
      </div>
    </>
  );
}
