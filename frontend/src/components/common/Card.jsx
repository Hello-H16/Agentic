import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white dark:bg-gray-800 shadow-md ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
