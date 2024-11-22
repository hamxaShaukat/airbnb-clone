import HostNavbar from "@/components/Navbar/HostNavbar";
import React from "react";

const HostLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>
    <div>
        <HostNavbar/>
    </div>
    {children}</div>;
};

export default HostLayout;
