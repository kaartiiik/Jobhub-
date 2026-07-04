export default function ErrorState({
  message,
}) {
  return (
    <div className="text-red-500 text-center py-10">
      {message}
    </div>
  );
}