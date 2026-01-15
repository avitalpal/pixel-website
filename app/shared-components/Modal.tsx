"use client";

export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-stone-100 border-2 border-stone-800 p-6 max-w-md w-full pixel-font">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="font-bold">
            ✕
          </button>
        </div>

        <div className="text-sm text-stone-700">
          {children}
        </div>
      </div>
    </div>
  );
}
