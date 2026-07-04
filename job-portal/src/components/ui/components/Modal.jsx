"use client";

export default function Modal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white py-4 p-6 rounded-lg w-full max-w-lg">
        <button
          onClick={onClose}
          className="float-right py-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}