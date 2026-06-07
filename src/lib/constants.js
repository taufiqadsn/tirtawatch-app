export const REPORT_CATEGORIES = [
  { value: "pipa_bocor", label: "Pipa Bocor", color: "#EF4444" },
  { value: "saluran_mampet", label: "Saluran Mampet", color: "#F59E0B" },
  { value: "air_berwarna", label: "Air Berwarna / Bau", color: "#3B82F6" },
  { value: "limbah_ilegal", label: "Limbah Ilegal", color: "#10B981" },
];

export const categories = REPORT_CATEGORIES.map((item) => item.label);

export const CATEGORIES = {
  pipa_bocor: {
    label: "Pipa Bocor",
    color: "#EF4444",
    markerColor: "red",
  },
  saluran_mampet: {
    label: "Saluran Mampet",
    color: "#F59E0B",
    markerColor: "orange",
  },
  air_berwarna: {
    label: "Air Berwarna / Bau",
    color: "#3B82F6",
    markerColor: "blue",
  },
  limbah_ilegal: {
    label: "Limbah Ilegal",
    color: "#10B981",
    markerColor: "green",
  },
};

export const statusMeta = {
  baru: {
    label: "Menunggu Konfirmasi",
    badge: "danger",
    dot: "#EF4444",
  },
  proses: {
    label: "Sedang Ditangani",
    badge: "sky",
    dot: "#F59E0B",
  },
  selesai: {
    label: "Selesai",
    badge: "ok",
    dot: "#22C55E",
  },
};

export function getCategoryLabel(value) {
  return CATEGORIES[value]?.label || value;
}

export function formatDateId(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getTimeLabel(date) {
  const dateObj = date instanceof Date ? date : new Date(date);
  const diff = Date.now() - dateObj.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  return `${days} hari lalu`;
}

export function getResolveDuration(created, resolved) {
  if (!created || !resolved) return null;

  const createdDate = created instanceof Date ? created : new Date(created);
  const resolvedDate = resolved instanceof Date ? resolved : new Date(resolved);

  const diff = resolvedDate.getTime() - createdDate.getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  if (hours === 0) return `${minutes} Menit`;
  return `${hours} Jam ${minutes} Menit`;
}