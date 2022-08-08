import CardUpdate from "components/card/CardUpdate";
import LayoutDashboard from "components/layout/LayoutDashboard";
import { useRouter } from "next/router";
import React from "react";

const UpdateCardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LayoutDashboard heading="Update card">
      <CardUpdate id={id}></CardUpdate>
    </LayoutDashboard>
  );
};

export default UpdateCardPage;
