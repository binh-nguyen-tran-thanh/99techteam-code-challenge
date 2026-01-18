export default function TokenOptionItem({
  option
}: {
  option: { label: string; value: string; iconUrl?: string };
}) {
  return (
    <div className="flex items-center space-x-2">
      {option.iconUrl && (
        <img
          src={option.iconUrl}
          alt={option.label}
          className="w-5 h-5 rounded-full"
        />
      )}
      <span>{option.label}</span>
    </div>
  );
}
