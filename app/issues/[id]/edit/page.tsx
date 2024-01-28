import React from "react";

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log({ id });
  return <div>{id}</div>;
};

export default page;
