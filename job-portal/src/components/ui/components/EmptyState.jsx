export default function EmptyState({
  message,
}) {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold">
        {message}
      </h2>
    </div>
  );
}