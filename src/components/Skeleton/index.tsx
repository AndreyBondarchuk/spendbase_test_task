import React from "react";
import { Skeleton } from "@mui/material";

const CustomSkeleton = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton variant="rounded" width={410} height={60} />
      <Skeleton variant="rounded" width={410} height={60} />
      <Skeleton variant="rounded" width={410} height={60} />
    </div>
  );
};

export default CustomSkeleton;
