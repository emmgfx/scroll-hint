import { CodeBlock } from "./components/CodeBlock";
import { BothDemo, CustomDemo, HorizontalDemo, LineDemo, LineShadowDemo, VerticalDemo } from "./components/Demos";
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
        <CodeBlock>{`<ScrollHint style={{ height: 200 }}>
  {/* list items */}
</ScrollHint>`}</CodeBlock>
      ),
      demo: <VerticalDemo />,
    },
    {
      id: "horizontal",
      label: "Horizontal",
      prop: `direction="horizontal"`,
      description: "Shadows appear on left and right edges as you scroll horizontally.",
      code: (
        <CodeBlock>{`<ScrollHint direction="horizontal">
  <div style={{ display: "flex" }}>{/* columns */}</div>
</ScrollHint>`}</CodeBlock>
      ),
      demo: <HorizontalDemo />,
    },
    {
      id: "both",
      label: "Both directions",
      prop: `direction="both"`,
      description: "All four edges show shadows independently based on scroll position.",
      code: (
        <CodeBlock>{`<ScrollHint direction="both" style={{ height: 200 }}>
  {/* grid content */}
</ScrollHint>`}</CodeBlock>
      ),
      demo: <BothDemo />,
    },
    {
      id: "custom",
      label: "Custom shadow",
      prop: "shadowColor + shadowSize",
      description: "Customize the shadow color and size to match your design.",
      code: (
        <CodeBlock>{`<ScrollHint shadowColor="rgba(170, 59, 255, 0.3)" shadowSize={48}>
  {/* content */}
</ScrollHint>`}</CodeBlock>
      ),
      demo: <CustomDemo />,
    },
    {
      id: "line",
      label: "Solid line",
      prop: "lineColor",
      description: "Show a solid line at the edge instead of a gradient shadow.",
      code: (
        <CodeBlock>{`<ScrollHint shadowColor="" lineColor="oklch(0.6 0.2 270)">
  {/* content */}
</ScrollHint>`}</CodeBlock>
      ),
      demo: <LineDemo />,
    },
    {
      id: "line-shadow",
      label: "Line + shadow",
      prop: "lineColor + shadowColor",
      description: "Combine a solid line with a gradient shadow for a stronger indicator.",
      code: (
        <CodeBlock>{`<ScrollHint lineColor="rgba(0,0,0,0.1)">
  {/* content */}
</ScrollHint>`}</CodeBlock>
      ),
      demo: <LineShadowDemo />,
    },
  ];

  return (
    <div className="w-full max-w-281.5 mx-auto min-[1126px]:border-x min-[1126px]:border-(--color-border) min-h-screen flex flex-col text-center">

      {/* Hero */}
      <header className="flex flex-col items-center px-10 pt-20 pb-18 gap-5 max-sm:px-6 max-sm:pt-12 max-sm:pb-12">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface)">
          <code className="text-[13px] font-mono text-(--color-accent)">npm install @emmgfx/scroll-hint</code>
        </div>
        <h1 className="text-7xl font-medium tracking-[-2px] text-(--color-heading) mt-2 max-sm:text-5xl">
          scroll-<span className="text-(--color-accent)">hint</span>
        </h1>
        <p className="text-lg text-(--color-body) max-w-md text-center leading-relaxed">
          Scroll edge indicators for React — no listeners, no scroll events,
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
            href="https://github.com/emmgfx/scroll-hint"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-(--color-border) text-(--color-heading) text-sm font-medium hover:bg-(--color-surface) transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@emmgfx/scroll-hint"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-(--color-border) text-(--color-heading) text-sm font-medium hover:bg-(--color-surface) transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
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
        <CodeBlock>{`import { ScrollHint } from "@emmgfx/scroll-hint";

<ScrollHint style={{ height: 300 }}>
  {/* your content */}
</ScrollHint>`}</CodeBlock>
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
                { name: "shadowColor", type: "string", def: '"rgba(0,0,0,0.15)"', desc: 'CSS color for the gradient shadow. Set to "" to disable.' },
                { name: "shadowSize", type: "number", def: "20", desc: "Height/width of the shadow overlays in pixels." },
                { name: "lineColor", type: "string", def: "undefined", desc: "CSS color for a solid line at the edge. Omit to disable." },
                { name: "lineSize", type: "number", def: "1", desc: "Thickness of the solid line in pixels." },
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
