import React from "react";

interface Props {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<Props> = ({ children }) => {
  return (
    <div className="text-center my-4 bg-red-100 text-red-600 font-bold p-3 uppercase text-sm">
      {children}
    </div>
  );
};
