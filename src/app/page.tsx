import { Button } from "@/components/ui/Button";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/google.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>UI / Buttons</h1>
        <Button variant="primary" fullWidth={true}>
          Primary
        </Button>

        <Button variant="secondary" fullWidth>
          Secondary
        </Button>

        <Button
          variant="outline"
          fullWidth
          icon={<Image src={GoogleIcon} alt="" className="w-[24px]" />}
          iconPosition="right"
          className="justify-between"
        >
          Sign In with Google
        </Button>

        <Button variant="ghost" fullWidth>
          Outline
        </Button>
        <Link
          href="/login"
          className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
        >
          login
        </Link>
      </main>
    </div>
  );
}
