import AdminShell from "@/components/AdminShell";
import AdminReportsTable from "@/components/AdminReportsTable";
import { getReports } from "@/lib/reports";

export const metadata = {
  title: "Daftar Laporan — TirtaWatch Admin",
};

export default async function AdminLaporanPage() {
  const reports = await getReports();

  return (
    <AdminShell
      title="Daftar Laporan"
      subtitle="Kelola semua laporan masuk, ubah status, dan filter berdasarkan kebutuhan."
      search={false}
    >
      <AdminReportsTable reports={reports} />
    </AdminShell>
  );
}