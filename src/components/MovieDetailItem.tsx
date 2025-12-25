interface MovieDetailItemProps {
  label: string;
  value?: string;
}

export default function MovieDetailItem(props: MovieDetailItemProps) {
  const { label, value } = props;
  if (!value || value === "N/A") return null;

  return (
    <div className="w-full flex border-t border-gray-200 py-4">
      <p className="text-sm">
        <span className="font-semibold mr-2">{label}</span> {value}
      </p>
    </div>
  );
}
