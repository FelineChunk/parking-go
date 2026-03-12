// ─── Design tokens ────────────────────────────────────────────────────────────
export const T = {
  bg:      "#F7F7F5",
  surface: "#FFFFFF",
  border:  "#E8E8E4",
  ink1:    "#1A1A18",
  ink2:    "#6B6B63",
  ink3:    "#ABABA3",
};

// ─── Status config ────────────────────────────────────────────────────────────
export const STATUS_MAP: Record<string, { label: string; bg: string; color: string; border: string }> = {
  IN:   { label: "Parkir",  bg: "#F0F0EE", color: "#3A3A34", border: "#DDDDD6" },
  OUT:  { label: "Keluar",  bg: "#F5F3EE", color: "#5C4C30", border: "#E5DDD0" },
  DONE: { label: "Selesai", bg: "#EEF0EE", color: "#2E402E", border: "#D0DDD0" },
};

// ─── Status allowed transitions ───────────────────────────────────────────────
export const ALLOWED_NEXT: Record<string, string[]> = {
  IN:   ["OUT"],
  OUT:  ["DONE"],
  DONE: [],
};

export const ALL_STATUSES = ["IN", "OUT", "DONE"] as const;