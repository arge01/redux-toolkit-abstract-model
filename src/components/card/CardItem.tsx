import { type CSSProperties } from "react";

export type CardItemProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function CardItem(props: CardItemProps) {
  return (
    <section
      style={props.style}
      className={`p-7 shadow-sm rounded-md bg-white ${props.className}`}
    >
      {props.children}
    </section>
  );
}

export default CardItem;
