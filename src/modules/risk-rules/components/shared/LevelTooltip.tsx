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
  /** Quando true, a tooltip é renderizada em portal com z-index alto (camada superior) para ficar sempre visível */
  topLayer?: boolean;
  /** Ref do elemento âncora (ex.: checkbox). Quando topLayer e anchorRef, a tooltip é centralizada em cima deste elemento, como em Pontos. */
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export const LevelTooltip: React.FC<LevelTooltipProps> = ({
  text,
  children,
  className = '',
  positionAboveColumn,
  topLayer = false,
  anchorRef,
}) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const mouseXRef = useRef<number>(0);

  const updatePositionRef = useRef<() => void>(() => {});
  updatePositionRef.current = () => {
    if (!tooltipRef.current) return;
    const tooltipEl = tooltipRef.current;
    const style = tooltipEl.style;
    if (positionAboveColumn && wrapRef.current) {
      const rect = wrapRef.current.getBoundingClientRect();
      style.left = `${mouseXRef.current}px`;
      style.top = `${rect.top}px`;
      style.transform = 'translate(-50%, -100%) translateY(-6px)';
    } else if (topLayer) {
      /* Mesma forma que a tooltip de Pontos: acima do elemento, centralizada, portal + z-index 99999 */
      const anchor = anchorRef?.current ?? wrapRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      style.left = `${centerX}px`;
      style.top = `${rect.top}px`;
      style.transform = 'translate(-50%, -100%) translateY(-6px)';
    }
  };

  useLayoutEffect(() => {
    if (!visible || (!positionAboveColumn && !topLayer)) return;
    const apply = () => {
      if (tooltipRef.current && (wrapRef.current || anchorRef?.current)) updatePositionRef.current();
    };
    apply();
    if (topLayer) {
      const rafId = requestAnimationFrame(apply);
      return () => cancelAnimationFrame(rafId);
    }
  }, [visible, positionAboveColumn, topLayer, anchorRef]);

  useLayoutEffect(() => {
    if (!visible || !topLayer) return;
    const onUpdate = () => updatePositionRef.current();
    window.addEventListener('scroll', onUpdate, true);
    window.addEventListener('resize', onUpdate);
    return () => {
      window.removeEventListener('scroll', onUpdate, true);
      window.removeEventListener('resize', onUpdate);
    };
  }, [visible, topLayer]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    mouseXRef.current = e.clientX;
    setVisible(true);
  };

  const renderTooltip = () => {
    if (!visible) return null;
    if (positionAboveColumn) {
      return createPortal(
        <span
          ref={tooltipRef}
          className="level-tooltip level-tooltip--above-header"
          role="tooltip"
          style={{ position: 'fixed', left: 0, top: 0 }}
        >
          {text}
        </span>,
        document.body
      );
    }
    if (topLayer) {
      /* Mesma classe e estilo da tooltip de Pontos (policy-form-header-info-tooltip) */
      return createPortal(
        <span
          ref={tooltipRef}
          className="policy-form-header-info-tooltip"
          role="tooltip"
          style={{ position: 'fixed', left: 0, top: 0, zIndex: 99999 }}
        >
          {text}
        </span>,
        document.body
      );
    }
    return (
      <span className="level-tooltip" role="tooltip">
        {text}
      </span>
    );
  };

  return (
    <span
      ref={wrapRef}
      className={`level-tooltip-wrap ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {renderTooltip()}
    </span>
  );
};

export default LevelTooltip;
