import React from "react";

const MdBlock: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  return (
    <div data-block-id={id} className={"my-1"}>
      {children}
    </div>
  );
};

export default MdBlock;
