import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiStepReportForm from "@/components/MultiStepReportForm";

export const metadata = {
  title: "Buat Laporan — TirtaWatch",
  description: "Form pelaporan masalah air bersih untuk warga.",
};

export default function LaporPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-sky-50/60 px-5 py-10 lg:py-14">
        <div className="mx-auto max-w-3xl rounded-4xl border border-line bg-white p-7 shadow-card">
          <MultiStepReportForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
