"use client";

import { useFormState } from "react-dom";
import { updateReportStatus } from "@/app/actions/laporanActions";
import { IconChevron } from "@/components/Icons";

const initialState = {
  success: false,
  message: "",
};

export default function AdminStatusForm({ report }) {
  const [state, formAction] = useFormState(updateReportStatus, initialState);

  return (
    <form action={formAction} className="mt-6 rounded-4xl bg-white border border-line shadow-card p-6">
      <input type="hidden" name="ticket_code" value={report.id} />

      <h2 className="text-lg font-extrabold text-navy">
        Ubah Status Penanganan
      </h2>

      <div className="mt-5 grid md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="text-[13px] font-bold text-navy">
            Status Baru
          </label>

          <div className="mt-1.5 relative">
            <select
              name="status"
              defaultValue={report.status}
              className="w-full appearance-none rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="baru">Menunggu Konfirmasi</option>
              <option value="proses">Sedang Ditangani</option>
              <option value="selesai">Selesai</option>
            </select>

            <IconChevron className="w-[18px] h-[18px] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-mute" />
          </div>
        </div>

        <div>
          <label className="text-[13px] font-bold text-navy">
            Nama Teknisi
          </label>

          <input
            name="technician_name"
            defaultValue={report.technicianName === "-" ? "" : report.technicianName}
            placeholder="Contoh: Surpiadi"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label className="text-[13px] font-bold text-navy">
            Estimasi Selesai
          </label>

          <input
            name="estimated_finish"
            defaultValue={report.estimatedFinish === "-" ? "" : report.estimatedFinish}
            placeholder="Contoh: 1-2 hari kerja"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-[13px] font-bold text-navy">
          Catatan Internal
        </label>

        <textarea
          name="internal_note"
          rows={2}
          defaultValue={report.internalNote}
          placeholder="Catatan untuk tim, tidak terlihat warga…"
          className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-400 resize-none"
        />
      </div>

      {state.message && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            state.success
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        className="mt-5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 shadow-glow transition"
      >
        Simpan Perubahan
      </button>
    </form>
  );
}