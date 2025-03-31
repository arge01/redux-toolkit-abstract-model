/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import Button from "@/components/forms/Buttons";
import FormProvider from "@/components/forms/Provider";
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
    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="w-full p-4 md:p-5 flex gap-5 flex-wrap">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
