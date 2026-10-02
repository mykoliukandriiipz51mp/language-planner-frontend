"use client";

import React from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/ui/FormikInput";
import { Button } from "@/components/ui/Button";
import { BackBtn } from "@/components/ui/BackBtn";

// 1. Схема валідації для форми авторизації
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Введіть коректну email-адресу")
    .required("Email є обов’язковим"),
  password: Yup.string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .required("Пароль є обов’язковим"),
});

// 2. SVG Іконка Google для OAuth кнопки
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    // Логіка для входу через Google OAuth
    console.log("Google Sign In clicked");
  };

  return (
    <div className="min-h-screen w-full bg-[#E8ECEF] flex flex-col justify-between p-6 md:p-10 relative">
      {/* Кнопка "Back" у лівому верхньому кутку */}
      <BackBtn link="/" />

      {/* Центральна біла картка авторизації */}
      <div className="flex-1 flex items-center justify-center py-6">
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10 w-full max-w-[620px] flex flex-col items-center text-center">
          {/* Заголовок Login */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 font-['Encode_Sans_Expanded',_sans-serif]">
            Увійти
          </h1>

          {/* Форма з використанням Formik */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Login submitted:", values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-4">
                {/* Email Input */}
                <FormikInput
                  name="email"
                  type="email"
                  label="Емейл"
                  placeholder="your.email@mail.com"
                />

                {/* Password Input */}
                <div>
                  <FormikInput
                    name="password"
                    type="password"
                    label="Пароль"
                    placeholder="Password"
                  />
                  {/* Посилання Forgot password? */}
                  <div className="text-right mt-1.5">
                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
                    >
                      Забув пароль?
                    </Link>
                  </div>
                </div>

                {/* Кнопка Sign In */}
                <Button
                  variant="primary"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  className="mt-2 bg-[#5046E5] hover:bg-[#4338CA] py-3.5"
                >
                  Увійти
                </Button>

                {/* Розділювач "or" */}
                <div className="my-1 text-xs text-slate-400 font-medium">
                  або
                </div>

                {/* Кнопка Sign In with Google */}
                <Button
                  variant="outline"
                  type="button"
                  fullWidth
                  icon={<GoogleIcon />}
                  iconPosition="right"
                  onClick={handleGoogleSignIn}
                  className="py-3.5 border-slate-300 font-bold text-slate-800"
                >
                  Увійти за допомогою Google
                </Button>

                {/* Футер-посилання для реєстрації */}
                <p className="text-xs text-slate-600 font-medium mt-4">
                  Ще не маєш профілю?{" "}
                  <Link
                    href="/register"
                    className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
                  >
                    Зареєструватись
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Порожній блок для збереження висоти та вирівнювання за допомогою flex */}
      <div className="h-6"></div>
    </div>
  );
}
