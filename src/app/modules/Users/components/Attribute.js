import React from "react";

export const ATTRIBUTES = {
  FIX: {
    key: 'FIX'
  }
}

export const getAttributeKeys = () => Object.values(ATTRIBUTES).map(att=>att.key)