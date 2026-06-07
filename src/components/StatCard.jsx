// COMPONENT: StatCard — kartu statistik di dashboard admin.
export default function StatCard({ value, label, icon, tone = "sky" }) {
  const tones = {
    sky: "bg-sky-100 text-sky-700",
    warn: "bg-warn-bg text-warn-text",
    ok: "bg-ok-bg text-ok-text",
  };
  return (
    <div className="rounded-3xl bg-white border border-line shadow-card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl grid place-items-center ${tones[tone]}`}>{icon}</div>
      <div>
        <div className="text-3xl font-extrabold text-navy">{value}</div>
        <div className="text-xs font-semibold text-ink-mute">{label}</div>
      </div>
    </div>
  );
}
