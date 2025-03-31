/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { TbDatabaseOff } from "react-icons/tb";
import { Dispatch } from "@/hooks/useService";
import { Model, Pagination } from "@/services";
import Modal, { ModalProps } from "./Modal";
import TBody from "./TBody";
import Column from "./THead";

export type ActionProps<T> = {
  key: string;
  actionName?: string;
  actions: {
    title?: string;
    icon?: React.ReactNode;
    action: (v: T) => void;
  }[];
};

export type ColumnProps = {
  key: string;
  title: string;
};

export type HeaderProps = {
  newAction: () => void;
  searchAction: () => void;
};

export type DataTableProps<T, R> = {
  columns: ColumnProps[];
  action?: ActionProps<T>;
  data: Model<T>;
  dispatch?: Dispatch<T, R>;
  header?: HeaderProps;
  pagination?: Pagination;
  modal?: ModalProps<R>;
};

function DataTable<T, R>({
  action,
  columns,
  data,
  header = undefined,
  pagination = undefined,
  dispatch = undefined,
  modal = undefined,
}: DataTableProps<T, R>) {
  useEffect(() => {
    if (dispatch) {
      dispatch.all();
    }
  }, []);

  const [filterShow, setFilterShow] = useState<boolean>(false);

  const [activeFilterColumn, setActiveFilterColumn] = useState<ColumnProps>(
    columns[0]
  );
  return (
    <div
      className="w-full flex flex-col data-table"
      data-hs-datatable='{
      "pageLength": 10,
      "pagingOptions": {
        "pageBtnClassNamees": "min-w-10 flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none"
      }
    }'
    >
      {modal?.show && (
        <section className="modal fixed top-0 left-0">
          <Modal<T, R> data={data} modal={modal}>
            {modal.content}
          </Modal>
        </section>
      )}
      <div className="min-h-130 overflow-x-auto">
        {header && (
          <section className="flex w-full items-center justify-between gap-5 pb-5">
            <div className="w-1/2 max-w-sm min-w-[200px]">
              <div className="flex items-center relative">
                <div className="absolute top-1 left-1 flex items-center">
                  <button
                    onClick={() => setFilterShow(!filterShow)}
                    disabled={data.loading}
                    className="h-[32.5px] rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600"
                  >
                    <span
                      id="dropdownSpan"
                      className="text-ellipsis overflow-hidden text-[#bdbdbd] text-[9pt]"
                    >
                      {activeFilterColumn.title}
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
                  {filterShow && (
                    <div className="min-w-[287px] flex flex-wrap overflow-hidden absolute left-[-3px] top-[7px] w-full mt-10 w-full bg-white border border-slate-200 rounded-md shadow-sm z-10 p-[7px]">
                      <ul
                        className="flex flex-wrap w-full"
                        id="dropdownOptions"
                      >
                        {columns
                          .filter((f) => activeFilterColumn.key !== f.key)
                          .map((v, k) => (
                            <li
                              key={k}
                              onClick={() => {
                                setActiveFilterColumn(v);
                                setFilterShow(false);
                              }}
                              className="w-full px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
                              data-value="Europe"
                            >
                              {v.title}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  className="h-[40px] w-full bg-[#fcfcfc] placeholder:text-slate-400 text-slate-700 text-sm border border-[#f6f6f6] rounded-md pr-12 pl-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                  placeholder="Search..."
                />

                <button
                  onClick={header.searchAction}
                  disabled={data.loading}
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
                disabled={data.loading}
              >
                New
              </button>
              <button
                disabled={data.loading}
                onClick={dispatch?.all}
                className={`${data.loading ? "loading" : ""}`}
              >
                <RiRefreshLine size={20} />
              </button>
            </div>
          </section>
        )}

        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="table min-w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <Column title="#" />

                  {columns.map((v, k) => (
                    <Column key={k} title={v.title} />
                  ))}

                  {action && (
                    <th
                      scope="col"
                      className="py-2 px-0 text-end font-normal text-[10pt] font-[600] text-gray-500 --exclude-from-ordering"
                    >
                      {action?.actionName || "Action"}
                    </th>
                  )}
                </tr>
              </thead>

              {!data.loading ? (
                <>
                  {data.error && (
                    <tbody>
                      <tr>
                        <td colSpan={columns.length + 2}>
                          <div className="flex flex-wrap w-full items-center justify-center">
                            <TbDatabaseOff color="#ddd" size={50} />
                            <span className="flex text-[#8a8a8a] font-bold p-3 itesm-center justify-center w-full text-[1.2rem]">
                              No data available
                            </span>
                            {typeof data.error === "object" &&
                              data.error !== null && (
                                <span className="flex text-[#8a8a8a] font-bold p-1 itesm-center justify-center w-full text-[9pt]">
                                  {data.error.message}
                                </span>
                              )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                  {!data.error && data.success && (
                    <tbody className="divide-y divide-gray-200">
                      {(data?.entities || []).map((v, k) => (
                        <tr key={k}>
                          <td>{++k}</td>

                          {columns.map((c, ck) => (
                            <TBody
                              key={ck * k}
                              children={(v as Record<string, string>)[c.key]}
                            />
                          ))}

                          <td className="p-0 whitespace-nowrap text-end text-sm font-medium">
                            {action?.actions.map((actions, key) => (
                              <button
                                key={key}
                                disabled={data.loading}
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
                  )}
                </>
              ) : (
                <>
                  {data.loading && (
                    <tbody>
                      <tr>
                        <td colSpan={columns.length + 2}>
                          <div className="flex flex-wrap w-full items-center justify-center">
                            <div className="text-center">
                              <div role="status">
                                <svg
                                  aria-hidden="true"
                                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                    style={{ fill: "#fbfbfb" }}
                                  />
                                </svg>
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                            <span className="flex text-[#8a8a8a] font-bold p-3 itesm-center justify-center w-full text-[1.2rem]">
                              Loading
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </>
              )}
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
            Showing {pagination.showing * pagination.page} to{" "}
            {pagination.showing} of {pagination.size} entries
          </div>
          <button
            type="button"
            disabled={data.loading}
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
            disabled={data.loading}
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
