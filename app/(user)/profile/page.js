"use client"

import React from "react";
import useAuthRedirect from "../../../hooks/use-auth";

const page = () => {
  const user = useAuthRedirect();

  return (
    <div>
      <h1>profile page</h1>
    </div>
  );
};

export default page;
