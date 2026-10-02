"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { RegisterLayout } from "@/components/layouts/RegisterLayout";
import SuccessIco from "@/assets/icons/success-ico.svg";

export default function PasswordResetSuccessPage() {
  return (
    <RegisterLayout>
      {/* Контейнер для іконки успіху */}
      <div className="w-14 h-14 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
        <Image
          src={SuccessIco}
          alt="Успішне відновлення"
          width={28}
          height={28}
          className="w-7 h-7"
        />
      </div>

      {/* Заголовок сторінки */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Пароль оновлено!
      </h1>

      {/* Описовий текст */}
      <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed px-2">
        Ваш пароль успішно скинуто. Тепер ви можете увійти в систему,
        використовуючи нові облікові дані.
      </p>

      {/* Перехід на сторінку входу */}
      <Link href="/login" className="w-full">
        <Button
          variant="primary"
          fullWidth
          className="bg-[#5046E5] hover:bg-[#4338CA] py-3.5"
        >
          Повернутися до входу
        </Button>
      </Link>
    </RegisterLayout>
  );
}
