import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md p-4 bg-white dark:bg-gray-800 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
