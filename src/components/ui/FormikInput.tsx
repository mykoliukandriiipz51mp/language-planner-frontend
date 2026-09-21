import React, { useState } from "react";
import { useField } from "formik";

export interface FormikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string; // Обов'язкове поле для зв'язку з Formik
  label?: string; // Налаштовуваний тайтл (опціональний)
  helperText?: string;
}

export const FormikInput: React.FC<FormikInputProps> = ({
  label,
  helperText,
  type = "text",
  placeholder,
  className = "",
  id,
  ...props
}) => {
  // Хук useField зв'язує інпут з Formik за ім'ям (name)
  const [field, meta] = useField(props.name);

  // Стан для приховування/показу пароля
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  // Визначення наявності помилки (поле торкнуте і є текст помилки)
  const hasError = Boolean(meta.touched && meta.error);
  const inputId = id || props.name;

  return (
    <div className="w-full text-left">
      {/* 1. Налаштовуваний заголовок (Label) */}
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1.5 text-sm font-bold text-slate-800 tracking-wide font-['Encode_Sans_Expanded',_sans-serif]"
        >
          {label}
        </label>
      )}

      {/* 2. Поле вводу з можливістю показати іконку-око */}
      <div className="relative flex items-center">
        <input
          {...field}
          {...props}
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full px-5 py-3 text-sm rounded-full outline-none transition-all duration-200
            placeholder:text-slate-400 text-slate-700 bg-white border
            ${
              hasError
                ? "border-orange-500 bg-orange-50/20 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
                : "border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            }
            ${isPasswordType ? "pr-12" : ""}
            ${className}
          `}
        />

        {/* 3. Іконка "ока" для полів типу password */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 text-slate-500 hover:text-slate-700 focus:outline-none transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Перекреслене око (пароль видно)
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a17.91 17.91 0 012.875-4.2M9.88 9.88a3 3 0 104.24 4.24M10.73 5.08A10.43 10.43 0 0112 5c7 0 10 7 10 7a18.16 18.16 0 01-3.21 4.18M3 3l18 18"
                />
              </svg>
            ) : (
              // Відкрите око (пароль приховано)
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* 4. Повідомлення про помилку */}
      {hasError && (
        <p className="mt-1.5 text-xs font-bold text-orange-600 pl-3">
          {meta.error}
        </p>
      )}

      {/* Опціональний допоміжний текст (якщо немає помилки) */}
      {!hasError && helperText && (
        <p className="mt-1.5 text-xs text-slate-500 pl-3">{helperText}</p>
      )}
    </div>
  );
};
