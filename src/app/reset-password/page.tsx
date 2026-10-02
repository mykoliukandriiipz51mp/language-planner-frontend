"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/ui/FormikInput";
import { Button } from "@/components/ui/Button";
import { RegisterLayout } from "@/components/layouts/RegisterLayout";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів")
    .required("Новий пароль є обов’язковим"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Паролі не збігаються")
    .required("Підтвердіть новий пароль"),
});

// Функція розрахунку міцності пароля (0-4)
const calculatePasswordStrength = (pwd: string): number => {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
  return score;
};

export default function ResetPasswordPage() {
  const [strength, setStrength] = useState(0);

  return (
    <RegisterLayout>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2 font-['Encode_Sans_Expanded',_sans-serif]">
        Встановити новий пароль
      </h1>

      <p className="text-xs text-slate-400 mb-6 px-2 font-medium leading-relaxed">
        Будь ласка, введіть новий пароль нижче. Переконайтеся, що він містить
        щонайменше 8 символів.
      </p>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Password successfully reset:", values.password);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => {
          // Динамічний перерахунок міцності при вводі
          const currentStrength = calculatePasswordStrength(values.password);

          return (
            <Form className="w-full flex flex-col gap-4">
              <FormikInput
                name="password"
                type="password"
                label="Новий пароль"
                placeholder="Enter new password"
                onChange={(e) => {
                  handleChange(e);
                  setStrength(calculatePasswordStrength(e.target.value));
                }}
                onBlur={handleBlur}
              />

              <FormikInput
                name="confirmPassword"
                type="password"
                label="Підтвердьте новий пароль"
                placeholder="Re-enter new password"
              />

              {/* 4-сегментний індикатор міцності пароля */}
              <div className="w-full flex flex-col gap-1.5 mt-1">
                <div className="grid grid-cols-4 gap-2 w-full">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentStrength >= step
                          ? "bg-emerald-500"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                {currentStrength > 0 && (
                  <p className="text-[11px] font-bold text-emerald-600 text-left">
                    Надійність паролю:{" "}
                    {currentStrength >= 3
                      ? "Сильний"
                      : currentStrength === 2
                        ? "Середній"
                        : "Слабкий"}
                  </p>
                )}
              </div>

              <Button
                variant="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                className="mt-3 bg-[#5046E5] hover:bg-[#4338CA] py-3.5"
              >
                Оновити пароль
              </Button>
            </Form>
          );
        }}
      </Formik>
    </RegisterLayout>
  );
}
