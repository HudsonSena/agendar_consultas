export function EventDay({ date }: { date: Date }) {
  return (
    <div className="w-full flex flex-row gap-2 font-semibold">
      <span>{date.getDate().toString().padStart(2, "0")}</span>
      <span>de</span>
      <span>{date.toLocaleString("default", { month: "long" })}</span>
    </div>
  );
}
