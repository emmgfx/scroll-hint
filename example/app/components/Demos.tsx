"use client";

import { ScrollHint } from "@emmgfx/scroll-hint";

const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);
const cols = Array.from({ length: 20 }, (_, i) => `Col ${i + 1}`);

function ListItem({ children }: { children: string }) {
  return (
    <div className="px-5 py-2 border-b border-(--color-border) last:border-0 text-sm text-(--color-body)">
      {children}
    </div>
  );
}

export function VerticalDemo() {
  return (
    <ScrollHint style={{ width: "100%", height: "100%" }}>
      {items.map((item) => <ListItem key={item}>{item}</ListItem>)}
    </ScrollHint>
  );
}

export function HorizontalDemo() {
  return (
    <ScrollHint direction="horizontal" style={{ width: "100%", height: "100%" }}>
      <div className="flex gap-4 p-4 h-55 md:h-60">
        {cols.map((_, i) => (
          <div key={i} className="flex-none flex flex-col overflow-hidden rounded-lg" style={{ width: 140 }}>
            <div
              className="flex-1"
              style={{
                background: `oklch(from var(--color-accent) calc(l + ${(i % 5) * 0.03}) calc(c * 0.9) calc(h + ${i * 22}))`,
                opacity: 0.7,
              }}
            />
            <div className="p-3 flex flex-col gap-1.5" style={{ background: `oklch(from var(--color-accent) calc(l - 0.22 + ${(i % 5) * 0.03}) calc(c * 0.5) calc(h + ${i * 22}))` }}>
              <div className="h-2.5 rounded" style={{ width: "80%", background: `oklch(from var(--color-accent) calc(l + ${(i % 5) * 0.03}) calc(c * 0.9) calc(h + ${i * 22}))` }} />
              <div className="h-2 rounded" style={{ width: "55%", background: `oklch(from var(--color-accent) calc(l + ${(i % 5) * 0.03}) calc(c * 0.9) calc(h + ${i * 22}))` }} />
            </div>
          </div>
        ))}
      </div>
    </ScrollHint>
  );
}

export function BothDemo() {
  return (
    <ScrollHint direction="both" style={{ width: "100%", height: "100%" }}>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols.length}, 90px)` }}
      >
        {items.flatMap((item) =>
          cols.map((col) => (
            <div
              key={`${item}-${col}`}
              className="px-2.5 py-1.5 border-r border-b border-(--color-border) whitespace-nowrap text-xs text-(--color-body)"
            >
              {item}/{col}
            </div>
          ))
        )}
      </div>
    </ScrollHint>
  );
}

export function CustomDemo() {
  return (
    <ScrollHint shadowColor="rgba(170, 59, 255, 0.3)" shadowSize={48} style={{ width: "100%", height: "100%" }}>
      {items.map((item) => <ListItem key={item}>{item}</ListItem>)}
    </ScrollHint>
  );
}

const paragraphs = [
  "By using this service, you agree to the following terms and conditions. Please read them carefully before proceeding.",
  "We collect certain information automatically when you use the service, including your IP address, browser type, and pages visited.",
  "You may not use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.",
  "We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.",
  "All content provided through the service is for informational purposes only and does not constitute professional advice.",
  "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
];

function ModalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-(--color-border) bg-white dark:bg-(--color-surface) shadow-lg flex flex-col overflow-hidden" style={{ height: 200 }}>
        <div className="px-5 py-4 flex items-center justify-between shrink-0">
          <span className="text-sm font-semibold text-(--color-heading)">Terms & Conditions</span>
          <span className="text-(--color-body) text-lg leading-none">×</span>
        </div>
        {children}
        <div className="px-5 py-3 flex justify-end gap-2 shrink-0">
          <button className="px-3 py-1.5 text-xs rounded-lg border border-(--color-border) text-(--color-body)">Cancel</button>
          <button className="px-3 py-1.5 text-xs rounded-lg bg-(--color-accent) text-white">Accept</button>
        </div>
      </div>
    </div>
  );
}

export function LineDemo() {
  return (
    <ModalShell>
      <ScrollHint shadowColor="" lineColor="var(--color-border)" style={{ flex: 1, minHeight: 0 }}>
        <div className="px-5 py-3 flex flex-col gap-3 text-left">
          {paragraphs.map((p, i) => <p key={i} className="text-xs text-(--color-body) leading-relaxed">{p}</p>)}
        </div>
      </ScrollHint>
    </ModalShell>
  );
}

export function LineShadowDemo() {
  return (
    <ModalShell>
      <ScrollHint lineColor="var(--color-border)" style={{ flex: 1, minHeight: 0 }}>
        <div className="px-5 py-3 flex flex-col gap-3 text-left">
          {paragraphs.map((p, i) => <p key={i} className="text-xs text-(--color-body) leading-relaxed">{p}</p>)}
        </div>
      </ScrollHint>
    </ModalShell>
  );
}
