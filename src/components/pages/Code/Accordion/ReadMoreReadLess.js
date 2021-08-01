import React from "react";

export default function ReadMoreReadLess({ expanded }) {
  return <span>{expanded ? "read less" : "read more"}</span>;
}
