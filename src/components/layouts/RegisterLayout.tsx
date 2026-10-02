import React from "react";
import { BackBtn } from "@/components/ui/BackBtn";

export interface RegisterLayoutProps {
  backBtnLink?: string;
  backBtnText?: string;
  children?: React.ReactNode;
}

export const RegisterLayout: React.FC<RegisterLayoutProps> = ({
  backBtnLink = "/",
  backBtnText = "Назад",
  children,
}) => {
  return (
    <div className="min-h-screen w-full bg-[#E8ECEF] flex flex-col justify-between p-6 md:p-10 relative">
      <BackBtn link={backBtnLink} text={backBtnText} />

      <div className="flex-1 flex items-center justify-center py-6">
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10 w-full max-w-[620px] flex flex-col items-center text-center">
          {children}
        </div>
      </div>
    </div>
  );
};
