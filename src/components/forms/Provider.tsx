import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import {
  FormContextType,
  FormContextTypeT,
  FormProviderProps,
  HandleSubmitType,
} from "./types";

export const FormContext =
  createContext<FormContextType<FormContextTypeT> | null>(null);

export const useFormContext = <T extends FieldValues>() => {
  const context = useContext(
    FormContext as unknown as React.Context<FormContextType<T>>
  );
  if (!context) {
    throw new Error("'useFormContext' must be used within a FormProvider");
  }
  return context;
};

function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  validationSchema,
  defaultValues,
}: FormProviderProps<T>) {
  const methods = useForm<T>({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: HandleSubmitType = methods.handleSubmit(onSubmit);

  return (
    <FormContext.Provider value={{ ...methods, handleSubmit }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormProvider = () => useContext(FormContext);

export default FormProvider;
