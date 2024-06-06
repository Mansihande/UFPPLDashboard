import React from "react";
import * as Icons from "react-icons/fa";

const DynamicFaIcon = ({ name }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    return <Icons.FaQuestion />;
  }
  return <IconComponent />;
};

export default DynamicFaIcon;
