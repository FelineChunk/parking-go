import UserDropdown from "./UserDropdown";
import { T } from "../constant/constants";
import { useNavigate } from "react-router";

interface Props {
  lastUpdate: Date;
  onRefresh: () => void;
}

export default function HeaderPetugas({ lastUpdate, onRefresh }: Props) {
  const navigate = useNavigate()
  return (
    <div style={{
      position: "relative",
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      padding: "16px 22px",
      marginBottom: 16,
      display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      animation: "up 0.35s ease both",
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{
        width: 34, height: 34, borderRadius: 8, flexShrink: 0,
        background: T.ink1,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
      }}>P</div>

      {/* Title + last updated */}
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

      <div style={{ width: 1, height: 24, background: T.border, flexShrink: 0 }} />

      {/* Refresh button */}
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
      <button
       onClick={() => navigate("/petugas/history")}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 14px", borderRadius: 8,
          background: T.surface, color: T.ink2,
          border: `1px solid ${T.border}`, cursor: "pointer",
          fontWeight: 600, fontSize: 12, fontFamily: "inherit",
          whiteSpace: "nowrap", flexShrink: 0,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        History
      </button>

      <div><UserDropdown /></div>
    </div>
  );
}