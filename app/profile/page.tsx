"use client";

import Navbar from "@/components/Navbar/Navbar";
import Achievements from "@/components/Profile/Achievements";
import Statistics from "@/components/Profile/Statistics";
import Tips from "@/components/Profile/Tips";
import User from "@/components/Profile/User";

export default function page() {
  const userId = "cm243ii8a00005qs6zrsvmiig";

  document.title = "Hidrate-se | Profile";

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 space-y-6 flex justify-center">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <User />

          <div className="max-md:flex max-md:flex-col max-md:gap-4 md:grid md:gap-4 md:grid-cols-2">
            <Statistics userId={userId} />

            <Achievements userId={userId} />

            <Tips />
          </div>
        </div>
      </div>
    </>
  );
}
