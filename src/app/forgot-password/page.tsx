"use client";

import React from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/ui/FormikInput";
import { Button } from "@/components/ui/Button";
import { BackBtn } from "@/components/ui/BackBtn";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Введіть коректну email-адресу")
    .required("Email є обов’язковим"),
});

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-[#E8ECEF] flex flex-col justify-between p-6 md:p-10 relative">
      <BackBtn link="/" />

      {/* Центральна біла картка */}
      <div className="flex-1 flex items-center justify-center py-6">
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-10 w-full max-w-[620px] flex flex-col items-center text-center">
          {/* Заголовок */}
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
            Забув пароль?
          </h1>

          {/* Підзаголовок / Інструкція */}
          <p className="text-xs text-slate-400 mb-6 px-4 font-medium leading-relaxed">
            Введіть зареєстровану адресу електронної пошти, і ми надішлемо вам
            посилання для відновлення доступу та скидання пароля.
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={forgotPasswordSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Reset link requested for:", values.email);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-4">
                <FormikInput
                  name="email"
                  type="email"
                  label="Емейл"
                  placeholder="your.email@mail.com"
                />

                <Button
                  variant="primary"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  className="mt-2 bg-[#5046E5] hover:bg-[#4338CA] py-3.5"
                >
                  Надіслати посилання для відновлення
                </Button>

                <p className="text-xs text-slate-500 font-medium mt-3">
                  Згадали пароль?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline transition-colors"
                  >
                    Повернутися до входу
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="h-6"></div>
    </div>
  );
}
