import LoginNavbar from "@/components/Navbar/LoginNavbar";
import React from "react";

const FavLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>
    <div>
        <LoginNavbar/>
    </div>
    {children}</div>;
};

export default FavLayout;
