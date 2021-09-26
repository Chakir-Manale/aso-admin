import React from "react";
import { ProgressBar } from "react-bootstrap";

export function ModalProgressBar({variant = "primary", loading}) {
  if (! loading) return null;

  return (
    <ProgressBar
      variant={variant}
      animated
      now={100}
      className="h-5px w-100"
      // style={{  width: "100%" }}
    />
  );
}
