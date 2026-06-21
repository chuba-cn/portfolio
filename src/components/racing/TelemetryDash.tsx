"use client";

import HudCounter from "./HudCounter";

/**
 * An F1 steering-wheel / pit-wall telemetry dash for the hero. Real engineering
 * impact metrics, presented as race telemetry: a sequential rev / shift-light
 * strip, then one "channel" per metric with a mono readout that counts up and a
 * segmented bar gauge. CSS/SVG only.
 */
const SHIFT_LEDS = [
  "#3BD16F", "#3BD16F", "#3BD16F", "#3BD16F", "#3BD16F",
  "#E10600", "#E10600", "#E10600", "#E10600", "#E10600",
  "#AC6AFF", "#AC6AFF", "#AC6AFF", "#AC6AFF", "#AC6AFF",
];

const CHANNELS = [
  { target: 62, decimals: 0, prefix: "−", suffix: "%", label: "Manual calls", fill: 0.62, color: "#AC6AFF" },
  { target: 1.2, decimals: 1, prefix: "", suffix: "M+", label: "Revenue unlocked", fill: 0.85, color: "#3BD16F" },
  { target: 200, decimals: 0, prefix: "<", suffix: "ms", label: "Delivery", fill: 0.8, color: "#AC6AFF" },
  { target: 99.9, decimals: 1, prefix: "", suffix: "%", label: "Uptime", fill: 1, color: "#3BD16F" },
];

const SEGMENTS = 6;

const BarGauge = ({ fill, color }: { fill: number; color: string }) => {
  const lit = Math.round(fill * SEGMENTS);
  return (
    <div className="mt-2 flex gap-1">
      {Array.from({ length: SEGMENTS }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 flex-1 rounded-[1px]"
          style={{
            background: i < lit ? color : "rgb(var(--stroke))",
            boxShadow: i < lit ? `0 0 6px ${color}99` : "none",
          }}
        />
      ))}
    </div>
  );
};

const TelemetryDash = () => {
  return (
    <div className="max-w-3xl rounded-2xl border border-stroke bg-bg/30 p-4 backdrop-blur-md md:p-5">
      {/* Header: live tag + shift lights */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-code text-[0.6rem] uppercase tracking-[0.3em] text-text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-color-4 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-color-4" />
          </span>
          Live telemetry
        </div>
        <div className="flex items-center gap-[3px]">
          {SHIFT_LEDS.map((c, i) => (
            <span
              key={i}
              className="shift-led h-2.5 w-1.5 rounded-[1px]"
              style={{
                background: c,
                animation: `shift-rev 1.6s ${(i * 0.05).toFixed(2)}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Channels */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {CHANNELS.map((m, i) => (
          <div key={m.label}>
            <dd className="font-code text-2xl font-bold text-text md:text-[1.6rem]">
              <HudCounter
                target={m.target}
                decimals={m.decimals}
                prefix={m.prefix}
                suffix={m.suffix}
                delay={0.5 + i * 0.12}
              />
            </dd>
            <BarGauge fill={m.fill} color={m.color} />
            <dt className="mt-2 font-code text-[0.55rem] uppercase tracking-[0.2em] text-text-muted">
              {m.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default TelemetryDash;
