"use client";
import { GoPlusCircle } from "react-icons/go";

import { Button } from "@/components/ui/button";
import { CiFileOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const HeaderActions = () => {
  return (
    <div className="flex justify-end mb-2 space-x-3">
      <Button variant="outline" size={"sm"}>
        <CiFileOn className="w-4 h-4 md:mr-2" />
        <span className="hidden md:block">Export</span>
      </Button>
      <Link to={"/dashboard/products/add"}>
        <Button variant={"default"} size={"sm"}>
          <GoPlusCircle className="w-4 h-4 md:mr-2" />
          <p className="hidden md:block">Add Product</p>
        </Button>
      </Link>
    </div>
  );
};

export default HeaderActions;
