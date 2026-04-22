import { CodeBlock } from "./components/CodeBlock";
import { BothDemo, CustomDemo, HorizontalDemo, VerticalDemo } from "./components/Demos";
import { DemoTabs } from "./components/DemoTabs";

const divider = <div className="w-full h-px bg-(--color-border)" />;

export default function Page() {
  const tabs = [
    {
      id: "vertical",
      label: "Vertical",
      prop: `direction="vertical"`,
      badge: "default",
      description: "Shadows appear on top and bottom edges as you scroll vertically.",
      code: (
        <CodeBlock>{`<ScrollShadow style={{ height: 200 }}>
  {/* list items */}
</ScrollShadow>`}</CodeBlock>
      ),
      demo: <VerticalDemo />,
    },
    {
      id: "horizontal",
      label: "Horizontal",
      prop: `direction="horizontal"`,
      description: "Shadows appear on left and right edges as you scroll horizontally.",
      code: (
        <CodeBlock>{`<ScrollShadow direction="horizontal">
  <div style={{ display: "flex" }}>{/* columns */}</div>
</ScrollShadow>`}</CodeBlock>
      ),
      demo: <HorizontalDemo />,
    },
    {
      id: "both",
      label: "Both directions",
      prop: `direction="both"`,
      description: "All four edges show shadows independently based on scroll position.",
      code: (
        <CodeBlock>{`<ScrollShadow direction="both" style={{ height: 200 }}>
  {/* grid content */}
</ScrollShadow>`}</CodeBlock>
      ),
      demo: <BothDemo />,
    },
    {
      id: "custom",
      label: "Custom shadow",
      prop: "shadowColor + shadowSize",
      description: "Customize the shadow color and size to match your design.",
      code: (
        <CodeBlock>{`<ScrollShadow shadowColor="rgba(170, 59, 255, 0.3)" shadowSize={48}>
  {/* content */}
</ScrollShadow>`}</CodeBlock>
      ),
      demo: <CustomDemo />,
    },
  ];

  return (
    <div className="w-full max-w-[1126px] mx-auto min-[1126px]:border-x min-[1126px]:border-(--color-border) min-h-screen flex flex-col text-center">

      {/* Hero */}
      <header className="flex flex-col items-center px-10 pt-20 pb-18 gap-5 max-sm:px-6 max-sm:pt-12 max-sm:pb-12">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface)">
          <code className="text-[13px] font-mono text-(--color-accent)">npm install @emmgfx/scroll-shadow</code>
        </div>
        <h1 className="text-7xl font-medium tracking-[-2px] text-(--color-heading) mt-2 max-sm:text-5xl">
          scroll-<span className="text-(--color-accent)">shadow</span>
        </h1>
        <p className="text-lg text-(--color-body) max-w-md text-center leading-relaxed">
          Scroll shadow indicators for React — no listeners, no scroll events,
          just{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-accent) border-b border-(--color-accent-border) hover:border-(--color-accent)"
          >
            IntersectionObserver
          </a>
          .
        </p>
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          <a
            href="https://github.com/emmgfx/scroll-shadow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-(--color-border) text-(--color-heading) text-sm font-medium hover:bg-(--color-surface) transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@emmgfx/scroll-shadow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-(--color-border) text-(--color-heading) text-sm font-medium hover:bg-(--color-surface) transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path d="M0 0v24h24V0H0Zm19.2 19.2H4.8V4.8h14.4v14.4Zm-2.4-2.4H12v-9.6H7.2v9.6H4.8V7.2h14.4v9.6h-2.4Z" />
            </svg>
            npm
          </a>
        </div>
      </header>

      {divider}

      {/* Features */}
      <div className="grid grid-cols-3 max-sm:grid-cols-1">
        {[
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-(--color-accent)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            ),
            title: "Zero scroll events",
            description: "Uses IntersectionObserver on sentinel elements. No listeners, no polling, no jank.",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-(--color-accent)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            ),
            title: "All directions",
            description: "Vertical, horizontal, or both — one prop controls all four shadow edges.",
          },
          {
            icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-(--color-accent)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
              </svg>
            ),
            title: "Fully customizable",
            description: "Control shadow color and size. Accepts all standard div props.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="text-left px-8 py-7 border-r border-(--color-border) last:border-r-0 max-sm:border-r-0 max-sm:border-b max-sm:last:border-b-0 max-sm:px-6"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-base font-semibold text-(--color-heading) mb-2">{f.title}</h3>
            <p className="text-sm text-(--color-body) leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>

      {divider}

      {/* Usage */}
      <section className="text-left">
        <div className="px-10 py-8 border-b border-(--color-border) max-sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-(--color-heading)">Usage</h2>
        </div>
        <CodeBlock>{`import { ScrollShadow } from "@emmgfx/scroll-shadow";

<ScrollShadow style={{ height: 300 }}>
  {/* your content */}
</ScrollShadow>`}</CodeBlock>
      </section>

      {divider}

      {/* Demos */}
      <section>
        <div className="px-10 py-8 border-b border-(--color-border) text-left max-sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-(--color-heading) mb-1">Live demos</h2>
          <p className="text-sm text-(--color-body)">Scroll inside each container to see the shadows appear and disappear.</p>
        </div>

        <DemoTabs tabs={tabs} />
      </section>

      {divider}

      {/* Props */}
      <section className="text-left pb-12 max-sm:pb-8">
        <div className="px-10 py-8 border-b border-(--color-border) max-sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-(--color-heading) mb-1">Props</h2>
          <p className="text-sm text-(--color-body)">
            All standard <code className="text-[13px] font-mono px-1.5 py-0.5 rounded bg-(--color-surface)">div</code> props are forwarded to the outer wrapper.
          </p>
        </div>
        <div className="overflow-x-auto px-10 max-sm:px-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-(--color-border)">
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider text-(--color-body) py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "direction", type: '"vertical" | "horizontal" | "both"', def: '"vertical"', desc: "Which axes to observe and show shadows on." },
                { name: "shadowColor", type: "string", def: '"rgba(0,0,0,0.15)"', desc: "CSS color value used for the gradient shadows." },
                { name: "shadowSize", type: "number", def: "20", desc: "Height/width of the shadow overlays in pixels." },
              ].map((row) => (
                <tr key={row.name} className="border-b border-(--color-border) last:border-0">
                  <td className="py-3.5 px-4"><code className="text-[13px] font-mono text-(--color-heading)">{row.name}</code></td>
                  <td className="py-3.5 px-4"><code className="text-[13px] font-mono text-sky-500">{row.type}</code></td>
                  <td className="py-3.5 px-4"><code className="text-[13px] font-mono text-emerald-500">{row.def}</code></td>
                  <td className="py-3.5 px-4 text-(--color-body)">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {divider}

      {/* Footer */}
      <footer className="py-8 text-sm text-(--color-body) text-center">
        MIT License &mdash;{" "}
        <a
          href="https://www.viciana.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--color-accent) hover:underline"
        >
          Josep Viciana
        </a>
      </footer>

    </div>
  );
}
