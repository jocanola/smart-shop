import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Product from "../Product";

export default function SkeletonComp() {
  return (
    // <Stack spacing={3}>
    //   <Skeleton variant="text" />
    //   <Skeleton variant="text" />

    //   <Skeleton variant="rectangular" width={150} height={200} />
    //   <Skeleton variant="text" />
    // </Stack>
    <div className="product">
      <div className="product_info">
        <p>
          <Skeleton variant="text" />
        </p>
        <p>
          <Skeleton variant="text" />
        </p>
        <div className="product_star">
          <Skeleton variant="text" />
        </div>
      </div>
      <Skeleton variant="rectangular" width={150} height={200} />
      {/* <button onClick={addToBasket}>Add to Cart</button> */}
    </div>
  );
}
