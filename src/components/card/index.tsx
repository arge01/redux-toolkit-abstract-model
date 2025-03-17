import CardItem from "./CardItem";

export type CardProps = {
  className?: string;
  children: React.ReactNode;
};

function index(props: CardProps) {
  return (
    <section className="w-full flex flex-wrap gap-1 py-[15px]">
      {props.children}
    </section>
  );
}

export const Card = Object.assign(index, {
  Item: CardItem,
});

export default Card;
