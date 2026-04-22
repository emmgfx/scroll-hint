"use client";

import { Tabs, TabsList, TabsTab, TabsPanels, TabsPanel } from "@emmgfx/activity-tabs";
import { ScrollShadow } from "@emmgfx/scroll-shadow";
import { ReactNode } from "react";

export interface DemoTab {
  id: string;
  label: string;
  prop: string;
  badge?: string;
  description: string;
  code: ReactNode;
  demo: ReactNode;
}

export function DemoTabs({ tabs }: { tabs: DemoTab[] }) {
  return (
    <Tabs initialActiveTab={tabs[0].id} className="border-t border-(--color-border)">

      {/* Tab list */}
      <TabsList className="border-b border-(--color-border)">
        <ScrollShadow direction="horizontal" shadowSize={32}>
          <div className="flex">
            {tabs.map((tab) => (
              <TabsTab
                key={tab.id}
                tabId={tab.id}
                className="px-6 py-4 text-sm font-medium text-(--color-body) border-b-2 border-transparent whitespace-nowrap hover:text-(--color-heading) transition-colors"
                activeClassName="px-6 py-4 text-sm font-medium text-(--color-accent) border-b-2 border-(--color-accent) whitespace-nowrap"
              >
                {tab.label}
              </TabsTab>
            ))}
          </div>
        </ScrollShadow>
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
