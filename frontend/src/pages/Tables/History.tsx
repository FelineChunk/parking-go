import { useEffect, useMemo, useState } from "react";
import { getTransactions } from "../../service/api";

interface Transaksi {
  id_transaksi: number;
  waktu_masuk: string;
  waktu_keluar: string | null;
  fee: number | null;
  card_id: number | null;
  duration: number | null;
  status: string;
}

function HistoryPage() {
  const [data, setData] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTransactions();
      setData(res.data);
    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataDone = data.filter((item) => item.status === "DONE");

  const totalRevenue = useMemo(() => {
    return dataDone.reduce((acc, item) => acc + (item.fee || 0), 0);
  }, [dataDone]);

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("id-ID");
  };

  const formatRupiah = (amount: number | null) => {
    if (!amount) return "-";
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Riwayat Transaksi
          </h1>
          <p className="text-gray-500 text-sm">
            Data kendaraan dengan status selesai (DONE)
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-80 transition"
        >
          {loading ? "Loading..." : "Reload"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Transaksi</p>
          <h2 className="text-2xl font-bold mt-1">
            {dataDone.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Pendapatan</p>
          <h2 className="text-2xl font-bold mt-1">
            {formatRupiah(totalRevenue)}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Card ID</th>
              <th className="p-4 text-left">Waktu Masuk</th>
              <th className="p-4 text-left">Waktu Keluar</th>
              <th className="p-4 text-left">Durasi (menit)</th>
              <th className="p-4 text-left">Fee</th>
            </tr>
          </thead>

          <tbody>
            {dataDone.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400"
                >
                  Belum ada transaksi selesai
                </td>
              </tr>
            ) : (
              dataDone.map((item) => (
                <tr
                  key={item.id_transaksi}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    #{item.id_transaksi}
                  </td>
                  <td className="p-4">
                    {item.card_id ?? "-"}
                  </td>
                  <td className="p-4">
                    {formatDate(item.waktu_masuk)}
                  </td>
                  <td className="p-4">
                    {formatDate(item.waktu_keluar)}
                  </td>
                  <td className="p-4">
                    {item.duration ?? "-"}
                  </td>
                  <td className="p-4 font-semibold">
                    {formatRupiah(item.fee)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;