"use client";

import { useFormStatus } from "react-dom";

export default function SubmitReportButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold shadow-glow transition ml-auto"
    >
      {pending ? "Mengirim..." : "Kirim Laporan"}
    </button>
  );
}