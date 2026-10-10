import { ReactNode, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom";
}

export function Tooltip({ text, children, position = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: position === "top" ? rect.top - 8 : rect.bottom + 8,
      left: rect.left + rect.width / 2,
    });
    setVisible(true);
  };

  const hide = () => setVisible(false);

  return (
    <>
      <div ref={triggerRef} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform:
                position === "top"
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0)",
              zIndex: 9999,
              pointerEvents: "none",
            }}
            className="px-2 py-1 rounded bg-ink text-white text-xs font-medium whitespace-nowrap"
          >
            {text}
            <span
              className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
                position === "top"
                  ? "top-full border-t-zinc-950"
                  : "bottom-full border-b-zinc-950"
              }`}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
