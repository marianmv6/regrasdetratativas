import React, { useState, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface LevelTooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
  /** Quando definido, a tooltip é renderizada em portal (não corta no drawer) e posicionada acima do texto/célula em que o usuário passou o mouse */
  positionAboveColumn?: {
    tableRef: React.RefObject<HTMLTableElement | null>;
    columnIndex: number;
  };
}

export const LevelTooltip: React.FC<LevelTooltipProps> = ({
  text,
  children,
  className = '',
  positionAboveColumn,
}) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const mouseXRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (!visible || !positionAboveColumn || !tooltipRef.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const tooltipEl = tooltipRef.current;
    const style = tooltipEl.style;
    style.left = `${mouseXRef.current}px`;
    style.top = `${rect.top}px`;
    style.transform = 'translate(-50%, -100%) translateY(-6px)';
  }, [visible, positionAboveColumn]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    mouseXRef.current = e.clientX;
    setVisible(true);
  };

  return (
    <span
      ref={wrapRef}
      className={`level-tooltip-wrap ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible &&
        (positionAboveColumn ? (
          createPortal(
            <span
              ref={tooltipRef}
              className="level-tooltip level-tooltip--above-header"
              role="tooltip"
              style={{ position: 'fixed', left: 0, top: 0 }}
            >
              {text}
            </span>,
            document.body
          )
        ) : (
          <span className="level-tooltip" role="tooltip">
            {text}
          </span>
        ))}
    </span>
  );
};

export default LevelTooltip;
