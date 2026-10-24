"use client";

import { Tabs, TabsList, TabsTab, TabsPanels, TabsPanel } from "@emmgfx/activity-tabs";
import { ScrollHint } from "@emmgfx/scroll-hint";
import { ReactNode, useEffect, useRef, useSyncExternalStore } from "react";

export interface DemoTab {
  id: string;
  label: string;
  prop: string;
  badge?: string;
  description: string;
  code: ReactNode;
  demo: ReactNode;
}

// Every demo has its own link (/#horizontal, /#line-shadow...): the URL hash
// is the source of truth for the active tab
const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

export function DemoTabs({ tabs }: { tabs: DemoTab[] }) {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const hashIsTab = tabs.some((tab) => tab.id === hash);
  const activeTab = hashIsTab ? hash : tabs[0].id;
  const rootRef = useRef<HTMLDivElement>(null);
  const changedByClick = useRef(false);

  // Hash from a link (on load, or a link on the page): tab ids are prefixed,
  // so the browser doesn't jump. Bring the tab into view inside the tab list
  // (it scrolls sideways on small screens), then the demos to the top
  useEffect(() => {
    if (changedByClick.current) {
      changedByClick.current = false;
      return;
    }
    if (!hashIsTab) return;
    document.getElementById(`tab-${hash}`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
    rootRef.current?.scrollIntoView({ block: "start" });
  }, [hash, hashIsTab]);

  // Tab → hash. location.replace fires hashchange without adding history
  const changeTab = (id: string | number | undefined) => {
    changedByClick.current = true;
    window.location.replace(`#${id}`);
  };

  return (
    <Tabs ref={rootRef} activeTab={activeTab} onActiveTabChange={changeTab} className="border-t border-(--color-border)">

      {/* Tab list */}
      <TabsList className="border-b border-(--color-border)">
        <ScrollHint direction="horizontal" shadowSize={32}>
          <div className="flex">
            {tabs.map((tab) => (
              <TabsTab
                key={tab.id}
                id={`tab-${tab.id}`}
                tabId={tab.id}
                className="px-6 py-4 text-sm font-medium text-(--color-body) border-b-2 border-transparent whitespace-nowrap hover:text-(--color-heading) transition-colors"
                activeClassName="px-6 py-4 text-sm font-medium text-(--color-accent) border-b-2 border-(--color-accent) whitespace-nowrap"
              >
                {tab.label}
              </TabsTab>
            ))}
          </div>
        </ScrollHint>
      </TabsList>

      {/* Panels */}
      <TabsPanels>
        {tabs.map((tab) => (
          <TabsPanel key={tab.id} tabId={tab.id}>
            {/* Header */}
            <div className="px-10 py-8 border-b border-(--color-border) text-left max-sm:px-6 max-sm:py-6">
              <div className="flex items-center gap-2 mb-2">
                <code className="text-[13px] font-mono px-1.5 py-0.5 rounded bg-(--color-surface) text-(--color-heading)">{tab.prop}</code>
                {tab.badge && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border text-(--color-accent) bg-(--color-accent-muted) border-(--color-accent-border)">
                    {tab.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-(--color-body)">{tab.description}</p>
            </div>

            {/* Demo + Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[240px]">
              <div className="order-1 border-b border-(--color-border) overflow-visible md:border-b-0 md:border-r md:overflow-auto md:h-60" style={{ background: "#292d3e" }}>
                {tab.code}
              </div>
              <div className="order-2 bg-white dark:bg-[#16171d] h-55 md:h-auto">
                {tab.demo}
              </div>
            </div>
          </TabsPanel>
        ))}
      </TabsPanels>

    </Tabs>
  );
}
