import { z } from "zod";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "@/components/card";
import DataTable, { ActionProps, HeaderProps } from "@/components/datatable";
import { ModalProps } from "@/components/datatable/Modal";
import { Form } from "@/components/forms";
import { withLayout } from "@/components/layout/withLayout";
import { useService } from "@/hooks/useService";
import { columns, MODEL, REQUEST, services } from "@/services/tournamed";

function Home() {
  const [tournamed, dispatch] = useService<MODEL, REQUEST>(services);

  const [show, setShow] = useState<boolean>(false);

  const createSchema = z.object({
    name: z.string().nonempty(),
    desc: z.string().min(3, "You must be at least 3 characters"),
  });

  const content = () => (
    <>
      <Form.Input name="name" placeholder="Name" />{" "}
      <Form.Textarea name="desc" placeholder="Desc" />
    </>
  );

  const handleSubmit = (data: REQUEST) => {
    console.log("data: ", data);
  };

  const modal: ModalProps<REQUEST> = {
    title: "Create Tournamed",
    show,
    setShow,
    content: content(),
    defaultValues: {
      name: "",
      desc: "",
    },
    schema: createSchema,
    handleSubmit,
  };

  const navigate = useNavigate();

  const header: HeaderProps = {
    newAction: () => {
      setShow(true);
    },
    searchAction: () => "search",
  };

  const action: ActionProps<MODEL> = {
    key: "action",
    actions: [
      {
        action: (v) => navigate(`play/gruops/key?${v.key}`),
        icon: (
          <IoEyeSharp className="hover:text-[#000]" color="#1e293b" size={18} />
        ),
      },
    ],
  };

  return (
    <Card>
      <Card.Item className="w-full">
        <DataTable<MODEL, REQUEST>
          header={header}
          columns={columns}
          data={tournamed}
          action={action}
          dispatch={dispatch}
          modal={modal}
        />
      </Card.Item>
    </Card>
  );
}

export default withLayout(Home);
