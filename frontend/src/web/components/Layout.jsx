import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SideRight from "../SideRight/SideRight";
import SideLeft from "../SideLeft/SideLeft";

export default function Layout() {
  return (
    <>
      <Header />
      <main className=" grid grid-cols-1 md:grid-cols-8  container mx-auto gap-3">
        <aside className="hidden sm:hidden md:block lg:block  sticky top-0  h-screen bg-white md:col-span-2 rounded shadow-sm">
          <SideRight />
        </aside>

        <div className="p-4 md:col-span-4 sm:p-4">
          <Outlet />
        </div>

        <aside className="hidden sm:hidden md:block lg:block sticky top-0  h-screen bg-white p-4 md:col-span-2 rounded shadow-sm">
          <SideLeft />
        </aside>
      </main>
      {/* <Footer /> */}
    </>
  );
}
