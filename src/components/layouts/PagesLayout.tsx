import React from "react";
import Header from "../Header";

export interface PagesLayoutProps {
  children?: React.ReactNode;
}

export const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#E8ECEF] grid">
      <Header />
      <main className="bg-white rounded-xl max-w-7xl w-full mx-auto p-6 md:p-10  flex flex-col gap-6 justify-between">
        {children}
      </main>
    </div>
  );
};
