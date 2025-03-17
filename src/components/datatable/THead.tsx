type Props = {
  title: string;
};

function Column({ title }: Props) {
  return (
    <th
      scope="col"
      className="py-1 group text-start font-normal focus:outline-hidden"
    >
      <div className="ml-[-10px] py-1 px-2.5 inline-flex items-center border border-transparent text-[10pt] font-[600] text-gray-500 rounded-md hover:border-gray-200">
        {title}
        <svg
          className="size-3.5 ms-1 -me-0.5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            className="hs-datatable-ordering-desc:text-blue-600"
            d="m7 15 5 5 5-5"
          ></path>
          <path
            className="hs-datatable-ordering-asc:text-blue-600"
            d="m7 9 5-5 5 5"
          ></path>
        </svg>
      </div>
    </th>
  );
}

export default Column;
