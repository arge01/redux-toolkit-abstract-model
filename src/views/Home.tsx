import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "@/components/card";
import DataTable, {
  ActionProps,
  ColumnProps,
  HeaderProps,
} from "@/components/datatable";
import { withLayout } from "@/components/layout/withLayout";
import { Model } from "@/services";

type Data = { date: string; key: string };

function Home() {
  const navigate = useNavigate();

  const columns: ColumnProps[] = [
    {
      key: "date",
      title: "Date",
    },
    {
      key: "key",
      title: "Key",
    },
  ];

  const data: Data[] = [
    {
      date: new Date().toDateString(),
      key: "$2y$10$NxUjmQJKy0Iw66Y4.FoJKe4SHk2/xL4v06b9lTLXxvL5KiBz16iyC",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$9wqMnVG6wNR0DkrnhKbbL.f/bChsvz1rSwJ84Y7JcaoaNLgnfb4z2",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$NxUjmQJKy0Iw66Y4.FoJKe4SHk2/xL4v06b9lTLXxvL5KiBz16iyC",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$9wqMnVG6wNR0DkrnhKbbL.f/bChsvz1rSwJ84Y7JcaoaNLgnfb4z2",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$NxUjmQJKy0Iw66Y4.FoJKe4SHk2/xL4v06b9lTLXxvL5KiBz16iyC",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$9wqMnVG6wNR0DkrnhKbbL.f/bChsvz1rSwJ84Y7JcaoaNLgnfb4z2",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$NxUjmQJKy0Iw66Y4.FoJKe4SHk2/xL4v06b9lTLXxvL5KiBz16iyC",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$9wqMnVG6wNR0DkrnhKbbL.f/bChsvz1rSwJ84Y7JcaoaNLgnfb4z2",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$NxUjmQJKy0Iw66Y4.FoJKe4SHk2/xL4v06b9lTLXxvL5KiBz16iyC",
    },
    {
      date: new Date().toDateString(),
      key: "$2y$10$NxUjmQJKy0Iw66Y4.FoJKe4SHk2/xL4v06b9lTLXxvL5KiBz16iyC",
    },
  ];

  const header: HeaderProps = {
    newAction: () => navigate("play/gruops/key?new-key"),
    searchAction: () => "search",
  };

  const action: ActionProps<{ date: string; key: string }> = {
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

  const rows: Model<Data> = {
    loading: false,
    success: true,
    entities: data,
  };
  return (
    <Card>
      <Card.Item className="w-full">
        <DataTable<Data>
          header={header}
          columns={columns}
          data={rows}
          action={action}
        />
      </Card.Item>
    </Card>
  );
}

export default withLayout(Home);
