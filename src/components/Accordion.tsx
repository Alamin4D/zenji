"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = 0,
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>([defaultOpen]);
  const baseId = useId();

  const toggle = (index: number) => {
    setOpen((current) => {
      if (current.includes(index)) {
        return current.filter((item) => item !== index);
      }
      return allowMultiple ? [...current, index] : [index];
    });
  };

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.title}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-crimson-soft"
              >
                <span className="font-display text-lg uppercase tracking-wide sm:text-xl">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 shrink-0 place-items-center border border-white/20 transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-crimson text-crimson" : ""
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-10 text-sm leading-relaxed text-mist">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
