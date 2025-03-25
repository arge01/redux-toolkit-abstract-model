/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode } from "react";
import Button from "./Buttons";
import { useFormContext } from "./Provider";

type FormProps = {
  children: ReactNode;
};

export const Form = ({ children }: FormProps) => {
  const { handleSubmit } = useFormContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(
      (data) => data,
      (errors) => errors
    )();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-100">
      {children}
    </form>
  );
};

type FormInputProps = {
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

Form.Input = ({ name, ...props }: FormInputProps) => {
  const { register } = useFormContext();

  return (
    <input
      {...register(name)}
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

type FormDateProps = {
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

Form.Date = ({ name, ...props }: FormDateProps) => {
  const { register } = useFormContext();

  return (
    <input
      type="date"
      {...register(name)}
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

type FormCheckboxProps = {
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

Form.Checkbox = ({ name, ...props }: FormCheckboxProps) => {
  const { register } = useFormContext();

  return (
    <input
      type="checkbox"
      {...register(name)}
      {...props}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
  );
};

Form.Button = Button;
