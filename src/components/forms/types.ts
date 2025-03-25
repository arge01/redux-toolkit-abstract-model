/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodTypeAny } from "zod";
import { ReactNode } from "react";
import {
  UseFormReturn,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";

export type FormContextType<T extends FieldValues = FieldValues> =
  UseFormReturn<T> & {
    handleSubmit: (onSubmit: SubmitHandler<T>) => (e: React.FormEvent) => void;
  };

export type FormProviderProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  validationSchema?: ZodTypeAny;
  defaultValues?: DefaultValues<T>;
};

export type FormContextTypeT = any;

export type HandleSubmitType = any;
