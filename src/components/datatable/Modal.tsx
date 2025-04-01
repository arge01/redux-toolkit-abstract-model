/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import Button from "@/components/forms/Buttons";
import FormProvider from "@/components/forms/Provider";
import M from "@/components/modal/Modal";
import { Model } from "@/services";
import { Form } from "../forms";

export type ModalProps<T> = {
  title: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
  defaultValues: T;
  schema: z.ZodObject<any>;
  handleSubmit: any;
};

type Props<T, R> = {
  children: React.ReactNode;
  data: Model<T>;
  modal: ModalProps<R>;
};

function Modal<T, R>({ data, children, modal }: Props<T, R>) {
  const { handleSubmit, schema, defaultValues, title, setShow } = modal;

  type FormType = z.infer<typeof schema>;
  return (
    <M title={title} setShow={setShow}>
      <FormProvider<FormType>
        onSubmit={handleSubmit}
        validationSchema={schema}
        defaultValues={defaultValues || ({} as any)}
      >
        <Form>
          {children}
          <div className="flex w-full flex-wrap justify-between">
            <Form.Button loading={data.loading} type="submit">
              Submit
            </Form.Button>
            <Button variant="danger" onClick={() => setShow(false)}>
              Close
            </Button>
          </div>
        </Form>
      </FormProvider>
    </M>
  );
}

export default Modal;
