import { Button } from "@/components/ui/Button";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/google.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-[56px]">Table of contents</h1>
        <h2 className="text-[40px]">UI / Components ready for use:</h2>
        <ul className="list-disc">
          <li>Buttons (src/components/ui/Button.tsx)</li>
          <li>Inputs (src/components/ui/FormikInput.tsx)</li>
          <li>BackBtn ((src/components/ui/BackBtn.tsx))</li>
        </ul>
        <h2 className="text-[40px]">Pages ready:</h2>
        <ul className="list-disc">
          <li>
            <Link
              href="/login"
              className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
            >
              login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
            >
              register
            </Link>
          </li>
          <li>
            <Link
              href="/forgot-password"
              className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
            >
              forgot password
            </Link>
          </li>
          <li>
            <Link
              href="/reset-password"
              className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
            >
              reset password
            </Link>
          </li>
          <li>
            <Link
              href="/reset-password/success"
              className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
            >
              reset password/success
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
