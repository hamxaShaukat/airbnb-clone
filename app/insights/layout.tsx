import InsightNavbar from "@/components/Navbar/InsightNavbar";
import LoginNavbar from "@/components/Navbar/LoginNavbar";
import React from "react";

const InsightLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>
    <div>
        <InsightNavbar/>
    </div>
    {children}</div>;
};

export default InsightLayout;
