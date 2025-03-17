/* eslint-disable no-console */
import { useEffect } from "react";
import { useService } from "@/hooks/useService";
import { type IModel, services } from "@/services/test";

function Test() {
  const [test, trigger] = useService<IModel[]>(services);

  useEffect(() => {
    trigger(true);
  }, [trigger]);

  useEffect(() => {
    console.log("test status: ", test.status);
  }, [test.status]);

  return (
    <div className="flex items-center justify-center w-full p-10">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(
          test.data.find((f) => f.id === 15),
          undefined,
          2
        )}
      </pre>
    </div>
  );
}

export default Test;
