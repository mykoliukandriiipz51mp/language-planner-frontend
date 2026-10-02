"use client";

import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/ui/FormikInput";
import { Button } from "@/components/ui/Button";
import { RegisterLayout } from "@/components/layouts/RegisterLayout";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/google.svg";

// 1. Схема валідації для форми авторизації
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Введіть коректну email-адресу")
    .required("Email є обов’язковим"),
  password: Yup.string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .required("Пароль є обов’язковим"),
});

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    // Логіка для входу через Google OAuth
    console.log("Google Sign In clicked");
  };

  return (
    <RegisterLayout>
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
            <div className="my-1 text-xs text-slate-400 font-medium">або</div>

            {/* Кнопка Sign In with Google */}
            <Button
              variant="outline"
              type="button"
              fullWidth
              icon={
                <Image
                  src={GoogleIcon}
                  alt="Успішне відновлення"
                  width={24}
                  height={24}
                />
              }
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
    </RegisterLayout>
  );
}
