import { useEffect, useState } from "react";
import UserDropdown from "../../components/header/UserDropdown";
import { createPortal } from "react-dom";
// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaksi {
  id_transaksi: number;
  waktu_masuk: string;
  waktu_keluar: string | null;
  fee: number | null;
  card_id: number | null;
  duration: number | null;
  status: string;
}

// ─── Mock — ganti dengan import getTransactions ───────────────────────────────


const mockData: Transaksi[] = [
  { id_transaksi: 1, waktu_masuk: "2025-02-24T08:00:00", waktu_keluar: null,                  fee: null,  card_id: 101, duration: null, status: "IN"   },
  { id_transaksi: 2, waktu_masuk: "2025-02-24T07:30:00", waktu_keluar: null,                  fee: null,  card_id: 102, duration: null, status: "IN"   },
  { id_transaksi: 3, waktu_masuk: "2025-02-24T06:45:00", waktu_keluar: "2025-02-24T09:00:00", fee: 5000,  card_id: 103, duration: 135,  status: "OUT"  },
  { id_transaksi: 4, waktu_masuk: "2025-02-24T05:00:00", waktu_keluar: "2025-02-24T08:30:00", fee: 10000, card_id: 104, duration: 210,  status: "DONE" },
  { id_transaksi: 5, waktu_masuk: "2025-02-24T09:10:00", waktu_keluar: null,                  fee: null,  card_id: 105, duration: null, status: "IN"   },
];

// ─── Design tokens — monochrome, warm neutral ─────────────────────────────────
const T = {
  bg:       "#F7F7F5",
  surface:  "#FFFFFF",
  border:   "#E8E8E4",
  ink1:     "#1A1A18",
  ink2:     "#6B6B63",
  ink3:     "#ABABA3",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (d: string | null) => {
  if (!d) return "—";
  return new Date(d).toLocaleString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const fmtDur = (m: number | null) => {
  if (!m) return "—";
  const h = Math.floor(m / 60), min = m % 60;
  return h > 0 ? `${h}j ${min}m` : `${min}m`;
};

// ─── StatusBadge ──────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; bg: string; color: string; border: string }> = {
    IN:   { label: "Parkir",  bg: "#F0F0EE", color: "#3A3A34", border: "#DDDDD6" },
    OUT:  { label: "Keluar",  bg: "#F5F3EE", color: "#5C4C30", border: "#E5DDD0" },
    DONE: { label: "Selesai", bg: "#EEF0EE", color: "#2E402E", border: "#D0DDD0" },
  };
  const s = map[status] ?? { label: status, bg: T.bg, color: T.ink2, border: T.border };
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      padding: "3px 10px", borderRadius: 6,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
    }}>{s.label}</span>
  );
};

// ─── StatCard ─────────────────────────────────────────────────────────────────

const StatCard = ({
  label, value, sub, delay, inverted,
}: {
  label: string; value: string | number; sub?: string; delay: string; inverted?: boolean;
}) => (
  <div style={{
    background: inverted ? T.ink1 : T.surface,
    border: `1px solid ${inverted ? "transparent" : T.border}`,
    borderRadius: 12, padding: "22px 22px 18px",
    display: "flex", flexDirection: "column", gap: 18,
    animationDelay: delay, animation: "up 0.5s ease both",
  }}>
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      color: inverted ? "rgba(255,255,255,0.35)" : T.ink3,
    }}>{label}</div>
    <div>
      <div style={{
        fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em",
        color: inverted ? "#fff" : T.ink1,
      }}>{value}</div>
      {sub && (
        <div style={{
          fontSize: 12, marginTop: 5,
          color: inverted ? "rgba(255,255,255,0.3)" : T.ink3,
        }}>{sub}</div>
      )}
    </div>
  </div>
);

// ─── DashboardHeader ──────────────────────────────────────────────────────────

const DashboardHeader = ({
  lastUpdate, onRefresh,
}: {
  lastUpdate: Date; onRefresh: () => void;
}) => (
  <div style={{
    position: "relative",
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    padding: "16px 22px",
    marginBottom: 16,
    display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
    animation: "up 0.35s ease both",
    zIndex: 50
  }}>
    {/* Monogram */}
    <div style={{
      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
      background: T.ink1,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
    }}>P</div>

    {/* Title + live */}
    <div style={{ flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.ink1, letterSpacing: "-0.01em" }}>
        Dashboard Petugas
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: T.ink3, flexShrink: 0,
          animation: "pulse 2.5s ease infinite",
        }} />
        <span style={{ fontSize: 11, color: T.ink3 }}>
          Diperbarui pukul {lastUpdate.toLocaleTimeString("id-ID")}
        </span>
      </div>
    </div>

    {/* Date */}
    <div style={{ fontSize: 12, color: T.ink3, flexShrink: 0 }}>
      {new Date().toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })}
    </div>

    {/* Divider */}
    <div style={{ width: 1, height: 24, background: T.border, flexShrink: 0 }} />

    {/* Refresh */}
    <button
      onClick={onRefresh}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "7px 14px", borderRadius: 8,
        background: T.ink1, color: "#fff",
        border: "none", cursor: "pointer",
        fontWeight: 600, fontSize: 12, fontFamily: "inherit",
        whiteSpace: "nowrap", flexShrink: 0,
        transition: "opacity 0.15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
      Refresh
    </button>

    <div>
      <UserDropdown/>
    </div>
  </div>
);

// ─── DataTable ────────────────────────────────────────────────────────────────

const DataTable = ({ title, items }: { title: string; items: Transaksi[] }) => (
  <div style={{
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: 12
  }}>
    {/* Table head */}
    <div style={{
      padding: "14px 22px", borderBottom: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontWeight: 600, fontSize: 13, color: T.ink1 }}>{title}</span>
      <span style={{
        fontSize: 11, fontWeight: 600, color: T.ink3,
        background: T.bg, border: `1px solid ${T.border}`,
        padding: "2px 9px", borderRadius: 6, letterSpacing: "0.04em",
      }}>{items.length} data</span>
    </div>

    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {["ID", "Card ID", "Waktu Masuk", "Waktu Keluar", "Durasi", "Fee", "Status"].map(h => (
              <th key={h} style={{
                padding: "10px 20px", textAlign: "left",
                fontWeight: 600, color: T.ink3, fontSize: 10,
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: T.bg, borderBottom: `1px solid ${T.border}`,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={7} style={{
                textAlign: "center", padding: "56px 20px",
                color: T.ink3, fontSize: 13,
              }}>— Tidak ada data —</td>
            </tr>
          ) : items.map((item) => (
            <tr
              key={item.id_transaksi}
              style={{ borderBottom: `1px solid ${T.border}`, transition: "background 0.1s" }}
              onMouseEnter={e => (e.currentTarget.style.background = T.bg)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "12px 20px", fontWeight: 600, color: T.ink1 }}>
                {item.id_transaksi}
              </td>
              <td style={{ padding: "12px 20px", color: T.ink2, fontFamily: "monospace", fontSize: 12 }}>
                {item.card_id ?? "—"}
              </td>
              <td style={{ padding: "12px 20px", color: T.ink2 }}>{fmt(item.waktu_masuk)}</td>
              <td style={{ padding: "12px 20px", color: T.ink2 }}>{fmt(item.waktu_keluar)}</td>
              <td style={{ padding: "12px 20px", color: T.ink2 }}>{fmtDur(item.duration)}</td>
              <td style={{ padding: "12px 20px", fontWeight: 600, color: T.ink1 }}>
                {item.fee ? `Rp ${item.fee.toLocaleString("id-ID")}` : "—"}
              </td>
              <td style={{ padding: "12px 20px" }}>
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

function ParkingPage() {
  const [data,       setData]       = useState<Transaksi[]>([]);
  const [activeTab,  setActiveTab]  = useState<"all" | "IN" | "OUT" | "DONE">("all");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = () => {
    // getTransactions().then(res => { setData(res.data); setLastUpdate(new Date()); });
    setData(mockData);
    setLastUpdate(new Date());
  };

  useEffect(() => {
    fetchData();
    const iv = setInterval(fetchData, 5000);
    return () => clearInterval(iv);
  }, []);

  const dataIn   = data.filter(d => d.status === "IN");
  const dataOut  = data.filter(d => d.status === "OUT");
  const dataDone = data.filter(d => d.status === "DONE");
  const totalRev = dataDone.reduce((s, d) => s + (d.fee ?? 0), 0);

  const tabs = [
    { key: "all"  as const, label: "Semua",       items: data     },
    { key: "IN"   as const, label: "Parkir",       items: dataIn   },
    { key: "OUT"  as const, label: "Siap Keluar",  items: dataOut  },
    { key: "DONE" as const, label: "Selesai",      items: dataDone },
  ];
  const current = tabs.find(t => t.key === activeTab)!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');
        @keyframes up    { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ fontFamily: "'Geist','DM Sans',sans-serif", color: T.ink1 }}>

        {/* Header */}
        <DashboardHeader lastUpdate={lastUpdate} onRefresh={fetchData} />

        {/* Stat Cards */}
        <div style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))",
          gap: 10, marginBottom: 16,
          zIndex: 1,
        }}>
          <StatCard label="Sedang Parkir"    value={dataIn.length}   sub="kendaraan aktif"      delay="0.05s" />
          <StatCard label="Siap Keluar"      value={dataOut.length}  sub="menunggu pembayaran"  delay="0.10s" />
          <StatCard label="Selesai"          value={dataDone.length} sub="transaksi hari ini"   delay="0.15s" />
          <StatCard
            label="Total Pendapatan"
            value={`Rp ${totalRev.toLocaleString("id-ID")}`}
            sub="dari transaksi lunas"
            delay="0.20s"
            inverted
          />
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 0, marginBottom: 12,
          borderBottom: `1px solid ${T.border}`,
        }}>
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
                }}>{tab.items.length}</span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <DataTable title={current.label} items={current.items} />

      </div>
    </>
  );
}

export default ParkingPage;