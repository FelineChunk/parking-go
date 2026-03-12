import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getTransactions } from "../../service/TransactionsApi";
import { updateTransaction } from "../../service/TransactionsApi";
import { Transactions } from "../../types/Types";
import { T } from "../../components/constant/constants";

import StatCard from "../../components/ui/card/StatCard";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/ui/modal/ModalTransaction";

// ─── Types ────────────────────────────────────────────────────────────────────
type TabKey = "all" | "IN" | "OUT" | "DONE";

interface Tab {
  key: TabKey;
  label: string;
  items: Transactions[];
}

interface OutletCtx {
  lastUpdate: Date;
  onRefresh: () => void;
}

// ─── Global styles ────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
  @keyframes up     { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97) } to { opacity:1; transform:none } }
  @keyframes spin    { to { transform: rotate(360deg) } }
  * { box-sizing: border-box; }
`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ParkingPage() {
  const { onRefresh } = useOutletContext<OutletCtx>();

  const [data,      setData]      = useState<Transactions[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [modalItem, setModalItem] = useState<Transactions | null>(null);
  const [search,    setSearch]    = useState("");

  // ── Data fetching ────────────────────────────────────────────────────────────
  const fetchData = () => {
    getTransactions().then(res => {
      setData(res.data);
      onRefresh(); // update lastUpdate di header via layout
    });
  };

  useEffect(() => {
    fetchData();
    const iv = setInterval(fetchData, 5000);
    return () => clearInterval(iv);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleSave = async (updated: Transactions) => {
    await updateTransaction(updated);
    setData(prev =>
      prev.map(d => d.id_transaction === updated.id_transaction ? updated : d)
    );
  };

  // ── Derived data ─────────────────────────────────────────────────────────────
  const dataIn   = data.filter(d => d.status === "IN");
  const dataOut  = data.filter(d => d.status === "OUT");
  const dataDone = data.filter(d => d.status === "DONE");
  const totalRev = dataDone.reduce((s, d) => s + (d.fee ?? 0), 0);

  const tabs: Tab[] = [
    { key: "all",  label: "Semua",       items: data     },
    { key: "IN",   label: "Parkir",      items: dataIn   },
    { key: "OUT",  label: "Siap Keluar", items: dataOut  },
    { key: "DONE", label: "Selesai",     items: dataDone },
  ];
  const currentTab = tabs.find(t => t.key === activeTab)!;

  const filteredItems = search.trim()
    ? currentTab.items.filter(d =>
        String(d.id_transaction).includes(search.trim())
      )
    : currentTab.items;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <div style={{ fontFamily: "'Geist','DM Sans',sans-serif", color: T.ink1 }}>

        {/* Stat cards */}
        <div style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))",
          gap: 10, marginBottom: 16, zIndex: 1,
        }}>
          <StatCard label="Sedang Parkir"   value={dataIn.length}   sub="kendaraan aktif"      delay="0.05s" />
          <StatCard label="Siap Keluar"     value={dataOut.length}  sub="menunggu pembayaran"  delay="0.10s" />
          <StatCard label="Selesai"         value={dataDone.length} sub="transaksi hari ini"   delay="0.15s" />
          <StatCard
            label="Total Pendapatan"
            value={`Rp ${totalRev.toLocaleString("id-ID")}`}
            sub="dari transaksi lunas"
            delay="0.20s"
            inverted
          />
        </div>

        {/* Tabs + Search */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          borderBottom: `1px solid ${T.border}`,
          marginBottom: 12, gap: 12, flexWrap: "wrap",
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(tab => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "8px 14px", border: "none", background: "none",
                    cursor: "pointer", fontFamily: "inherit",
                    fontSize: 13, fontWeight: active ? 600 : 500,
                    color: active ? T.ink1 : T.ink3,
                    borderBottom: `2px solid ${active ? T.ink1 : "transparent"}`,
                    marginBottom: -1, transition: "all 0.15s",
                    display: "flex", alignItems: "center", gap: 6,
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = T.ink2; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.ink3; }}
                >
                  {tab.label}
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                    background: active ? T.ink1 : T.bg,
                    color: active ? "#fff" : T.ink3,
                    border: `1px solid ${active ? "transparent" : T.border}`,
                    padding: "1px 6px", borderRadius: 99, transition: "all 0.15s",
                  }}>
                    {tab.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 8 }}>
            <div style={{ position: "relative" }}>
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke={T.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Cari ID Transaksi…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft: 30, paddingRight: search ? 30 : 12,
                  paddingTop: 7, paddingBottom: 7,
                  border: `1px solid ${T.border}`, borderRadius: 8,
                  fontSize: 12, fontFamily: "inherit",
                  color: T.ink1, background: T.surface,
                  outline: "none", width: 200,
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.currentTarget.style.borderColor = T.ink3}
                onBlur={e  => e.currentTarget.style.borderColor = T.border}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: T.ink3, fontSize: 14, lineHeight: 1, padding: 0,
                  }}
                >×</button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <DataTable
          title={currentTab.label}
          items={filteredItems}
          onStatusClick={setModalItem}
        />

        {/* Modal */}
        {modalItem && (
          <Modal
            item={modalItem}
            onClose={() => setModalItem(null)}
            onSave={handleSave}
          />
        )}

      </div>
    </>
  );
}