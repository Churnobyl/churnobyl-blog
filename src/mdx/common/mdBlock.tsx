import React from "react";

const MdBlock: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  return <div data-block-id={id}>{children}</div>;
};

export default MdBlock;
