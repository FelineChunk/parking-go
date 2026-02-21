import { useEffect, useState } from "react";
import { getParkings } from "../../service/api";
import { supabase } from "../../lib/supabase";

interface Transaksi {
  id_transaksi: number;
  waktu_masuk: string;
  waktu_keluar: string | null;
  fee: number | null;
  card_id: number | null;
  duration: number | null;
  status: string;
}

function ParkingPage() {


  const [data, setData] = useState<Transaksi[]>([]);
  const [setSession] = useState<any>(null);



  const fetchData = async () => {
    try {
      const res = await getParkings();
      console.log("DATA API:", res.data);
      setData(res.data);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

useEffect(() => {
  // Auth listener
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      console.log("AUTH EVENT:", event);
      console.log("SESSION:", session);
      setSession(session);
    }
  );

  // Ambil data pertama kali
  fetchData();

  // Interval refresh data
  const interval = setInterval(() => {
    fetchData();
  }, 5000);

  // Cleanup
  return () => {
    authListener.subscription.unsubscribe();
    clearInterval(interval); 
  };
}, []);


  const dataIn = data.filter((item) => item.status === "IN");
  const dataOut = data.filter((item) => item.status === "OUT");
  const dataDone = data.filter((item) => item.status === "DONE");

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };


  const renderTable = (title: string, items: Transaksi[]) => (
    <div className="bg-white shadow-md rounded-xl p-5 mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">ID</th>
              <th className="p-3">Card ID</th>
              <th className="p-3">Waktu Masuk</th>
              <th className="p-3">Waktu Keluar</th>
              <th className="p-3">Durasi</th>
              <th className="p-3">Fee</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-5 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id_transaksi}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{item.id_transaksi}</td>
                  <td className="p-3">{item.card_id ?? "-"}</td>
                  <td className="p-3">{formatDate(item.waktu_masuk)}</td>
                  <td className="p-3">{formatDate(item.waktu_keluar)}</td>
                  <td className="p-3">{item.duration ?? "-"}</td>
                  <td className="p-3">
                    {item.fee ? `Rp ${item.fee.toLocaleString()}` : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Petugas</h1>

      {/* 🔥 Statistik Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg">Sedang Parkir</h3>
          <p className="text-2xl font-bold">{dataIn.length}</p>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg">Siap Keluar</h3>
          <p className="text-2xl font-bold">{dataOut.length}</p>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg">Selesai</h3>
          <p className="text-2xl font-bold">{dataDone.length}</p>
        </div>
      </div>

      {/* 🔥 Tables */}
      {renderTable("Status IN", dataIn)}
      {renderTable("Status OUT", dataOut)}
      {renderTable("Status DONE", dataDone)}
    </div>
  );
}

export default ParkingPage;
