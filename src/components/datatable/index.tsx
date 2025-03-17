/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiRefreshLine } from "react-icons/ri";
import TBody from "./TBody";
import Column from "./THead";

export type ActionProps = {
  key: string;
  actionName?: string;
  actions: {
    title?: string;
    icon?: React.ReactNode;
    action: (v: any) => any;
  }[];
};

export type ColumnProps = {
  key: string;
  title: string;
};

export type HeaderProps = {
  newAction: () => any;
  searchAction: () => any;
};

export type DataTableProps<T> = {
  columns: ColumnProps[];
  action: ActionProps;
  data: T[];
  header?: HeaderProps;
  pagination?: boolean;
};

function DataTable<T = unknown>({
  action,
  columns,
  data,
  header = undefined,
  pagination = false,
}: DataTableProps<T>) {
  return (
    <div
      className="w-full flex flex-col"
      data-hs-datatable='{
      "pageLength": 10,
      "pagingOptions": {
        "pageBtnClassNamees": "min-w-10 flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
      }
    }'
    >
      <div className="min-h-130 overflow-x-auto">
        {header && (
          <section className="flex w-full items-center justify-between gap-5 pb-5">
            <div className="w-1/2 max-w-sm min-w-[200px]">
              <div className="flex items-center relative">
                <div className="absolute top-1 left-1 flex items-center">
                  <button
                    id="dropdownButton"
                    className="h-[32.5px] rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600"
                  >
                    <span
                      id="dropdownSpan"
                      className="text-ellipsis overflow-hidden text-[#bdbdbd] text-[9pt]"
                    >
                      Date
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="text-[#bdbdbd] h-4 w-4 ml-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <div className="h-6 border-l border-slate-200 ml-1"></div>
                  <div
                    id="dropdownMenu"
                    className="min-w-[150px] overflow-hidden absolute left-0 w-full mt-10 hidden w-full bg-white border border-slate-200 rounded-md shadow-sm z-10"
                  >
                    <ul id="dropdownOptions">
                      <li
                        className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
                        data-value="Europe"
                      >
                        Europe
                      </li>
                      <li
                        className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
                        data-value="Australia"
                      >
                        Australia
                      </li>
                      <li
                        className="px-4 py-2 text-slate-600 hover:bg-slate-5- text-sm cursor-pointer"
                        data-value="Africa"
                      >
                        Africa
                      </li>
                    </ul>
                  </div>
                </div>
                <input
                  type="text"
                  className="h-[40px] w-full bg-[#fcfcfc] placeholder:text-slate-400 text-slate-700 text-sm border border-[#f6f6f6] rounded-md pr-12 pl-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                  placeholder="Search..."
                />

                <button
                  onClick={header.searchAction}
                  className="h-[30px] absolute right-1 rounded p-1.5 border border-transparent text-center text-sm text-white transition-all hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="color-[#bdbdbd] w-4 h-4"
                  >
                    <path
                      style={{ fill: "#bdbdbd" }}
                      fill-rule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-end items-center w-1/2 gap-5">
              <button
                onClick={header.newAction}
                className="h-[35px] mt-4 md:mt-0 rounded-full bg-[#000] py-1 px-7 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700"
                type="button"
              >
                New
              </button>
              <button className="">
                <RiRefreshLine size={20} />
              </button>
            </div>
          </section>
        )}

        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <Column title="#" />

                  {columns.map((v, k) => (
                    <Column key={k} title={v.title} />
                  ))}

                  <th
                    scope="col"
                    className="py-2 px-0 text-end font-normal text-[10pt] font-[600] text-gray-500 --exclude-from-ordering"
                  >
                    {action?.actionName || "Action"}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data.map((v: any, k) => (
                  <tr key={k}>
                    <td>{++k}</td>

                    {columns.map((c, ck) => (
                      <TBody key={ck * k} children={v[c.key]} />
                    ))}

                    <td className="p-0 whitespace-nowrap text-end text-sm font-medium">
                      {action.actions.map((actions, key) => (
                        <button
                          key={key}
                          onClick={() => actions.action(v)}
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {actions.title || actions.icon || "Actions"}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {pagination && (
        <div
          className="flex items-center justify-end space-x-1 mt-4"
          data-hs-datatable-paging=""
        >
          <div className="mt-[3px] flex py-1">
            Showing 1 to 10 of 21 entries
          </div>
          <button
            type="button"
            className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-datatable-paging-prev=""
          >
            <span className="text-[2.1rem] text-gray-500" aria-hidden="true">
              «
            </span>
            <span className="sr-only">Previous</span>
          </button>
          <div
            className="flex items-center space-x-1 [&>.active]:bg-gray-100"
            data-hs-datatable-paging-pages=""
          ></div>
          <button
            type="button"
            className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-datatable-paging-next=""
          >
            <span className="sr-only">Next</span>
            <span className="text-[2.1rem] text-gray-500" aria-hidden="true">
              »
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
