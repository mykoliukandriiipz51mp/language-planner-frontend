"use client";

import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/ui/FormikInput";
import { Button } from "@/components/ui/Button";
import { RegisterLayout } from "@/components/layouts/RegisterLayout";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/google.svg";

// 1. Схема валідації реєстрації через Yup (із перевіркою збігу паролів)
const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Повне ім'я є обов'язковим"),
  email: Yup.string()
    .email("Введіть коректну email-адресу")
    .required("Email є обов’язковим"),
  password: Yup.string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .required("Пароль є обов’язковим"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password doesn't Match")
    .required("Підтвердження пароля є обов’язковим"),
  termsAccepted: Yup.boolean().oneOf([true], "Ви повинні погодитися з умовами"),
});

export default function RegisterPage() {
  const handleGoogleSignUp = () => {
    console.log("Google Sign Up clicked");
  };

  return (
    <RegisterLayout>
      {/* Заголовок Create Account */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 font-['Encode_Sans_Expanded',_sans-serif]">
        Створити акаунт
      </h1>

      {/* Форма Formik */}
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        }}
        validationSchema={registerSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Register submitted:", values);
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="w-full flex flex-col gap-3.5">
            {/* Full Name */}
            <FormikInput
              name="fullName"
              type="text"
              label="Повне ім'я"
              placeholder="John Do"
            />

            {/* Email */}
            <FormikInput
              name="email"
              type="email"
              label="Емейл"
              placeholder="your.email@mail.com"
            />

            {/* Password */}
            <FormikInput
              name="password"
              type="password"
              label="Пароль"
              placeholder="Password"
            />

            {/* Confirm Password */}
            <FormikInput
              name="confirmPassword"
              type="password"
              label="Підтвердити пароль"
              placeholder="Confirm Password"
            />

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center gap-2 text-left mt-1">
              <Field
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor="termsAccepted"
                className="text-xs text-slate-600 font-medium cursor-pointer"
              >
                Я погоджуюсь з{" "}
                <Link
                  href="/terms"
                  className="text-indigo-500 hover:underline font-semibold"
                >
                  Правилами та Вимогами
                </Link>
              </label>
            </div>

            {/* Кнопка Sign Up */}
            <Button
              variant="primary"
              type="submit"
              fullWidth
              disabled={!values.termsAccepted || isSubmitting}
              className={`mt-2 py-3.5 ${
                values.termsAccepted
                  ? "bg-[#5046E5] hover:bg-[#4338CA] text-white"
                  : "bg-slate-300 text-slate-700 cursor-not-allowed hover:bg-slate-300"
              }`}
            >
              Зареєструватись
            </Button>

            {/* Розділювач "or" */}
            <div className="my-0.5 text-xs text-slate-400 font-medium">або</div>

            {/* Кнопка Sign Up with Google */}
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
              onClick={handleGoogleSignUp}
              className="py-3.5 border-slate-300 font-bold text-slate-800"
            >
              Зареєструватись з допомогою Google
            </Button>

            {/* Перехід на сторінку Sign In */}
            <p className="text-xs text-slate-600 font-medium mt-3">
              Вже маєш акаунт? &nbsp;
              <Link
                href="/login"
                className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
              >
                Увійти
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </RegisterLayout>
  );
}
