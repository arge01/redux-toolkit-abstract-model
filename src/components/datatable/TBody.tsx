type Props = {
  children: React.ReactNode;
};

function TBody({ children }: Props) {
  return (
    <td className="p-0 py-5 whitespace-nowrap text-[10pt] font-medium text-gray-800">
      {children}
    </td>
  );
}

export default TBody;
