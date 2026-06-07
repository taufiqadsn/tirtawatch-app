// COMPONENT: StatusBadge — pil status warna-warni.
// Pakai key status ("baru" | "proses" | "selesai") dari lib/data.js.
import { statusMeta } from "@/lib/data";

const styles = {
  danger: "bg-danger-bg text-danger-text",
  sky: "bg-sky-100 text-sky-700",
  ok: "bg-ok-bg text-ok-text",
  warn: "bg-warn-bg text-warn-text",
};

export default function StatusBadge({ status, size = "sm" }) {
  const meta = statusMeta[status] || statusMeta.baru;
  const pad = size === "lg" ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full font-semibold ${pad} ${styles[meta.badge]}`}>
      <span className="w-2 h-2 rounded-full" style={{ background: meta.dot }} />
      {meta.label}
    </span>
  );
}
