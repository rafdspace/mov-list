export function formatRuntime(runtime?: string) {
  if (!runtime || runtime === "N/A") return "N/A";

  const minutes = parseInt(runtime.replace(" min", ""), 10);
  if (isNaN(minutes)) return runtime;

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;

  return `${h}h ${m}m`;
}