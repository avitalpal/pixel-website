"use client";

import { useEffect, useMemo, useState } from "react";
import React from "react";

export default function Modal({
    title,
    children,
    onClose,
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    const pages = useMemo(() => React.Children.toArray(children), [children]);
    const isPaged = pages.length > 1;
    const [page, setPage] = useState(0);

    // ESC and arrow keys
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (isPaged && (e.key === "ArrowRight" || e.key === "d")) setPage((p) => Math.min(p + 1, pages.length - 1));
            if (isPaged && (e.key === "ArrowLeft" || e.key === "a")) setPage((p) => Math.max(p - 1, 0));
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, isPaged, pages.length]);

    useEffect(() => {
        // When modal mounts
        window.dispatchEvent(new Event("modal-open"));

        // Cleanup: when modal unmounts
        return () => {
            window.dispatchEvent(new Event("modal-close"));
        };
    }, []);


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="border-2 border-blue-200 rounded-lg shadow-md bg-gray-100 p-6 max-w-md w-full pixel-font relative overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-3xl text-blue-500">{title}</h2>
                    <button
                        onClick={onClose}
                        className="font-bold hover:cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Pages */}
                <div className="relative min-h-72 max-h-125 overflow-y-auto overflow-x-clip">
                    {pages.map((content, i) => (
                        <div
                            key={i}
                            className={`
                absolute inset-0 transition-all duration-300 ease-in-out
                ${i === page ? "opacity-100 translate-x-0" : ""}
                ${i < page ? "opacity-0 -translate-x-8 pointer-events-none" : ""}
                ${i > page ? "opacity-0 translate-x-8 pointer-events-none" : ""}
              `}
                        >
                            <div className="text-stone-700 text-lg space-y-3">{content}</div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {isPaged && (
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 0}
                            className={`px-3 py-1 border-1 border-blue-200 text-blue-500 rounded-lg shadow-sm bg-gray-100 text-xl transition
                ${page === 0 ? "opacity-0 pointer-events-none" : "hover:bg-stone-200 hover:cursor-pointer"}
              `}
                        >
                            &larr;
                        </button>

                        <span className="text-xs text-stone-500">
                            {page + 1} / {pages.length}
                        </span>

                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === pages.length - 1}
                            className={`px-3 py-1 border-1 border-blue-200 text-blue-500 rounded-lg shadow-sm bg-gray-100 text-xl transition
                ${page === pages.length - 1 ? "opacity-0 pointer-events-none" : "hover:bg-stone-200 hover:cursor-pointer"}
              `}
                        >
                            &rarr;
                        </button>
                    </div>
                )}

                <p className="text-xs text-stone-500 mt-4">
                    <em>Press “Esc” to close.</em>
                </p>
            </div>
        </div>
    );
}
