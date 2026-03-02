import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconInfo } from './Icons';

interface InfoTooltipProps {
  text: string;
  /** Classe no wrapper (ex.: para alinhar com cabeçalho da tabela) */
  className?: string;
}

/** Ícone de informação (teal) + tooltip no padrão existente; tooltip em portal com z-index alto para ficar acima de tudo. */
export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const coordsRef = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!visible || !tooltipRef.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const tip = tooltipRef.current;
    tip.style.left = `${coordsRef.current.x}px`;
    tip.style.top = `${rect.top}px`;
    tip.style.transform = 'translate(-50%, -100%) translateY(-6px)';
  }, [visible]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    coordsRef.current = { x: e.clientX, y: e.clientY };
    setVisible(true);
  };

  return (
    <>
      <span
        ref={wrapRef}
        className={`policy-form-header-info-wrap ${className}`.trim()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setVisible(false)}
        role="img"
        aria-label="Informação"
      >
        <IconInfo />
      </span>
      {visible &&
        createPortal(
          <span
            ref={tooltipRef}
            className="policy-form-header-info-tooltip"
            role="tooltip"
            style={{ position: 'fixed', left: 0, top: 0, zIndex: 99999 }}
          >
            {text}
          </span>,
          document.body
        )}
    </>
  );
};

export default InfoTooltip;
