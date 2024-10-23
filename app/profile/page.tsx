"use client";

import Navbar from "@/components/Navbar/Navbar";
import Achievements from "@/components/Profile/Achievements";
import Statistics from "@/components/Profile/Statistics";
import Tips from "@/components/Profile/Tips";
import User from "@/components/Profile/User";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();

  const userId = session?.user.id;

  useEffect(() => {
    const userName = session?.user.name;

    document.title = `Hidrate-se | ${userName}`;
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 space-y-6 flex justify-center">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <User />

          <div className="max-md:flex max-md:flex-col max-md:gap-4 md:grid md:gap-4 md:grid-cols-2">
            {userId && (
              <>
                <Statistics userId={userId} />
                <Achievements userId={userId} />
              </>
            )}

            <Tips />
          </div>
        </div>
      </div>
    </>
  );
}
