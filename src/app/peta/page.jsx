import PetaClient from "@/components/PetaClient";
import { getReports, getReportStats } from "@/lib/reports";

export const metadata = {
  title: "Peta Laporan — TirtaWatch",
};

export default async function PetaPage() {
  const reports = await getReports();
  const stats = await getReportStats();

  return <PetaClient reports={reports} stats={stats} />;
}