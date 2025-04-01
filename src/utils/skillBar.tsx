type Item = {
  name: string;
  value: number;
};

export function SkillBar({ name, value }: Item) {
  // Tam maviden kırmızıya geçiş hesaplama
  const calculateColor = (percent: number) => {
    const red = Math.floor(59 + (239 - 59) * (percent / 100));
    const green = Math.floor(130 + (68 - 130) * (percent / 100));
    const blue = Math.floor(246 + (68 - 246) * (percent / 100));
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const barColor = calculateColor(value);

  return (
    <li className="w-full mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-gray-700 capitalize">{name}</span>
        <span className="text-[1.1rem] font-bold text-gray-500">{value}%</span>
      </div>
      <div className="flex w-full bg-[#f5f5f5] border border-1 border-[#eeeeee] rounded-full h-[15px] p-[5px] items-center">
        <div
          className="h-[7.5px] rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: barColor,
          }}
        ></div>
      </div>
    </li>
  );
}
