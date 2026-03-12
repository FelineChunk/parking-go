import { useEffect, useMemo, useState } from "react";
import { getTransactions } from "../../service/TransactionsApi";
import { Transactions } from "../../types/Types";
import useGoBack from "../../hooks/useGoBack";

function HistoryPage() {
  const [data, setData] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState(false);
  const goBack = useGoBack();

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
    if (!date) return "—";
    return new Date(date).toLocaleString("id-ID");
  };

  const formatRupiah = (amount: number | null) => {
    if (!amount) return "—";
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hp-root {
          min-height: 100vh;
          background: #F7F5F2;
          font-family: 'DM Sans', sans-serif;
          color: #1A1A1A;
        }

        /* Thin top bar */
        .hp-topbar {
          border-bottom: 1px solid #E2DDD8;
          padding: 0 56px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F7F5F2;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .hp-back-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #999;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }
        .hp-back-btn:hover { color: #1A1A1A; }
        .hp-back-arrow {
          display: inline-block;
          transition: transform 0.2s;
          font-size: 15px;
        }
        .hp-back-btn:hover .hp-back-arrow { transform: translateX(-3px); }

        .hp-topbar-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #BBB;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Main content */
        .hp-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 64px 56px 80px;
        }

        /* Title section */
        .hp-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 52px;
        }

        .hp-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #AAA;
          margin-bottom: 10px;
        }

        .hp-title {
          font-family: 'DM Serif Display', serif;
          font-size: 42px;
          line-height: 1.05;
          color: #1A1A1A;
          font-weight: 400;
        }
        .hp-title em {
          font-style: italic;
          color: #6B5F4E;
        }

        .hp-reload-btn {
          background: #1A1A1A;
          color: #F7F5F2;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .hp-reload-btn:hover:not(:disabled) {
          background: #333;
          transform: translateY(-1px);
        }
        .hp-reload-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .hp-spin {
          width: 12px; height: 12px;
          border: 1.5px solid #F7F5F2;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Stats strip */
        .hp-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #E2DDD8;
          border: 1px solid #E2DDD8;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 48px;
        }

        .hp-stat {
          background: #F7F5F2;
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hp-stat:first-child { border-radius: 11px 0 0 11px; }
        .hp-stat:last-child {
          background: #1A1A1A;
          border-radius: 0 11px 11px 0;
        }

        .hp-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #AAA;
        }
        .hp-stat:last-child .hp-stat-label { color: #555; }

        .hp-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 38px;
          line-height: 1;
          color: #1A1A1A;
          font-weight: 400;
        }
        .hp-stat:last-child .hp-stat-value { color: #F7F5F2; }

        .hp-stat-sub {
          font-size: 12px;
          color: #CCC;
          font-weight: 300;
        }
        .hp-stat:last-child .hp-stat-sub { color: #555; }

        /* Table */
        .hp-table-wrap {
          background: #FFFFFF;
          border: 1px solid #E2DDD8;
          border-radius: 12px;
          overflow: hidden;
        }

        .hp-table-header {
          padding: 18px 28px;
          border-bottom: 1px solid #F0EDE9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hp-table-header-label {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #BBB;
        }
        .hp-table-count {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          color: #CCC;
        }

        .hp-scroll { overflow-x: auto; }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        thead tr {
          border-bottom: 1px solid #F0EDE9;
        }
        th {
          padding: 12px 28px;
          text-align: left;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C5C0BB;
          white-space: nowrap;
        }

        tbody tr {
          border-bottom: 1px solid #F7F5F2;
          transition: background 0.15s;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #FAFAF8; }

        td {
          padding: 16px 28px;
          color: #444;
          vertical-align: middle;
        }

        .td-id {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #C5C0BB;
        }

        .td-card {
          font-weight: 500;
          color: #1A1A1A;
          font-size: 13px;
        }

        .td-date {
          font-size: 12.5px;
          color: #888;
          white-space: nowrap;
        }

        .td-duration {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          color: #777;
          white-space: nowrap;
        }

        .td-fee {
          font-family: 'DM Serif Display', serif;
          font-size: 15px;
          color: #1A1A1A;
          font-weight: 400;
        }

        /* Empty state */
        .hp-empty {
          padding: 72px 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .hp-empty-icon {
          width: 44px;
          height: 44px;
          border: 1.5px solid #DDD;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .hp-empty-icon svg {
          width: 18px; height: 18px;
          stroke: #CCC;
        }
        .hp-empty-text {
          font-size: 13px;
          color: #C5C0BB;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        /* Animate rows in */
        tbody tr {
          animation: rowIn 0.3s ease both;
        }
        tbody tr:nth-child(1)  { animation-delay: 0.05s; }
        tbody tr:nth-child(2)  { animation-delay: 0.08s; }
        tbody tr:nth-child(3)  { animation-delay: 0.11s; }
        tbody tr:nth-child(4)  { animation-delay: 0.14s; }
        tbody tr:nth-child(5)  { animation-delay: 0.17s; }
        tbody tr:nth-child(6)  { animation-delay: 0.20s; }
        tbody tr:nth-child(n+7){ animation-delay: 0.22s; }

        @keyframes rowIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="hp-root">
        {/* Top bar */}
        <div className="hp-topbar">
          <button className="hp-back-btn" onClick={goBack}>
            <span className="hp-back-arrow">←</span>
            Kembali
          </button>
          <span className="hp-topbar-label">Sistem Parkir</span>
        </div>

        {/* Body */}
        <div className="hp-body">
          {/* Title row */}
          <div className="hp-title-row">
            <div>
              <p className="hp-eyebrow">Laporan Keuangan</p>
              <h1 className="hp-title">
                Riwayat <em>Transaksi</em>
              </h1>
            </div>
            <button
              className="hp-reload-btn"
              onClick={fetchData}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="hp-spin" />
                  Memuat…
                </>
              ) : (
                <>↻ Perbarui</>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="hp-stats">
            <div className="hp-stat">
              <span className="hp-stat-label">Total Transaksi</span>
              <span className="hp-stat-value">{dataDone.length}</span>
              <span className="hp-stat-sub">transaksi selesai</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-label">Total Pendapatan</span>
              <span className="hp-stat-value">{formatRupiah(totalRevenue)}</span>
              <span className="hp-stat-sub">dari semua status DONE</span>
            </div>
          </div>

          {/* Table */}
          <div className="hp-table-wrap">
            <div className="hp-table-header">
              <span className="hp-table-header-label">Detail Transaksi</span>
              <span className="hp-table-count">{dataDone.length} entri</span>
            </div>

            <div className="hp-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Card ID</th>
                    <th>Waktu Masuk</th>
                    <th>Waktu Keluar</th>
                    <th>Durasi</th>
                    <th>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDone.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <div className="hp-empty">
                          <div className="hp-empty-icon">
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                            </svg>
                          </div>
                          <span className="hp-empty-text">Belum ada transaksi selesai</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    dataDone.map((item) => (
                      <tr key={item.id_transaction}>
                        <td>
                          <span className="td-id">#{item.id_transaction}</span>
                        </td>
                        <td>
                          <span className="td-card">{item.card_id ?? "—"}</span>
                        </td>
                        <td>
                          <span className="td-date">{formatDate(item.time_in)}</span>
                        </td>
                        <td>
                          <span className="td-date">{formatDate(item.time_out)}</span>
                        </td>
                        <td>
                          {item.duration != null ? (
                            <span className="td-duration">{item.duration} mnt</span>
                          ) : (
                            <span style={{ color: "#CCC" }}>—</span>
                          )}
                        </td>
                        <td>
                          <span className="td-fee">{formatRupiah(item.fee)}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;