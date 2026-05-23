"use client";

import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center justify-center text-center bg-white rounded-sm shadow-xl w-[300px] aspect-square p-5 mx-4">
        {children}
      </div>
    </div>
  );
}
