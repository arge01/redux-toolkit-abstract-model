export type Router = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};

export const routers: Router[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "How Two Play",
    url: "/about",
  },
];
