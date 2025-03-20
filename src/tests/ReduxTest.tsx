import Button from "@/components/forms/Buttons";
import { useService } from "@/hooks/useService";
import { type MODEL, REQUEST, services } from "@/services/test";

function Test() {
  const [test, dispatch] = useService<MODEL, REQUEST>(services);

  const get = () => dispatch.get();
  const all = () => dispatch.all();
  const post = () => dispatch.post({ title: "New title", desc: "New desc" });
  const put = () =>
    dispatch.put({ id: 1, title: "Update title", desc: "Update desc" });
  const patch = () => dispatch.patch({ title: "Update title" });
  const del = () => dispatch.delete(Number(test.entity?.id));

  return (
    <div className="flex flex-wrap w-full p-10">
      <div className="w-full flex flex-wrap py-5">
        <h1 className="w-full text-[1.3rem] font-bold">All Data</h1>
        <p className="w-full py-3">
          <pre>{JSON.stringify(test.entities, null, 2)}</pre>
        </p>
      </div>

      <div className="w-full flex flex-wrap py-5">
        <h1 className="w-full text-[1.3rem] font-bold">
          {test.entity?.title || "Data"}
        </h1>
        <p className="w-full py-3">{test.entity?.desc}</p>
      </div>

      <div className="w-full flex flex-wrap py-5">
        <h1 className="w-full text-[1.3rem] font-bold">Delete</h1>
        <p className="w-full py-3">
          {test.success ? test.deleted : "No action"}
        </p>
      </div>

      <div className="w-full flex flex-wrap py-5">
        <h1 className="w-full text-[1.3rem] font-bold">Error</h1>
        <p className="w-full py-3">
          <pre>
            {typeof test.error === "string" ? test.error : test.error?.message}
          </pre>
        </p>
      </div>

      <div className="w-full flex gap-1 flex-wrap">
        <Button loading={test.loading} variant="secondary" onClick={all}>
          ALL
        </Button>
        <Button loading={test.loading} variant="primary" onClick={get}>
          GET
        </Button>
        <Button loading={test.loading} variant="success" onClick={post}>
          POST
        </Button>
        <Button loading={test.loading} variant="info" onClick={put}>
          PUT
        </Button>
        <Button loading={test.loading} variant="warning" onClick={patch}>
          PATCH
        </Button>
        <Button loading={test.loading} variant="danger" onClick={del}>
          DELETE
        </Button>
      </div>
    </div>
  );
}

export default Test;
