const messages = [
  "DROP 04 — CRIMSON SAMURAI — LIVE NOW",
  "FREE AU SHIPPING OVER A$150",
  "LIMITED RUNS. NO RESTOCKS.",
  "MEMBERS GET EARLY ACCESS 24H BEFORE EVERY DROP",
];

export default function AnnouncementBar() {
  const track = [...messages, ...messages];

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-crimson text-white">
      <div className="flex w-max animate-marquee will-change-transform">
        {track.map((message, index) => (
          <span
            key={`${message}-${index}`}
            className="flex items-center gap-6 px-6 py-2 text-[10px] font-medium uppercase tracking-[0.32em] sm:text-[11px]"
          >
            {message}
            <span aria-hidden="true" className="text-white/50">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
