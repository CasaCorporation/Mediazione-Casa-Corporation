"use client";
import React, { forwardRef } from "react";
import Link from "next/link";

/**
 * Buttons v10 — Ultra Premium Minimal
 * - Gold (primary): var(--gold) pieno, micro overlay scuro per profondità, glow ambient su hover/focus.
 * - Ghost (secondary): trasparente su dark, solo opacità e bordo; glow gold solo a focus.
 * - Animazioni micro, rispettano prefers-reduced-motion.
 * - Unico stylesheet (styled-jsx) nello scope reale → niente problemi con <Link>.
 */

const sizeMap = {
  sm: "h-9 px-3 text-[12.5px]",
  md: "h-10 px-4 text-[13.5px]",
  lg: "h-11 px-5 text-[14px]",
};

function BaseButton(
  {
    as,
    href,
    size = "md",
    fullWidth = false,
    withArrow = true,
    className = "",
    disabled = false,
    children,
    style,
    variant = "gold", // "gold" | "ghost"
    onClick,
    ...rest
  },
  ref
) {
  const Comp = href ? Link : as || "button";
  const widthCls = fullWidth ? "w-full justify-center" : "";

  const handleClick = (e) => {
    if (disabled) { e.preventDefault(); return; }
    onClick?.(e);
  };

  return (
    <Comp
      ref={ref}
      href={href}
      {...(!href && { type: "button", disabled })}
      aria-disabled={disabled ? "true" : undefined}
      onClick={href ? handleClick : onClick}
      data-variant={variant}
      className={`cc-btn relative inline-flex items-center gap-2 rounded-xl font-semibold select-none outline-none
                  transition-[transform,box-shadow,background,border-color,opacity] duration-180 ease-out will-change-transform
                  disabled:opacity-60 ${disabled ? "pointer-events-none" : ""}
                  ${sizeMap[size]} ${widthCls} ${className}`}
      style={style}
      {...rest}
    >
      <span className="truncate">{children}</span>
      {withArrow && (
        <svg className="cc-ico" width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {/* Ambient glow (gestito per-variant via CSS) */}
      <span className="ambient" aria-hidden />

      <style jsx>{`
        .cc-btn { transform: translateZ(0); }
        .cc-btn:hover { transform: translateY(-1px); }
        .cc-btn:active { transform: translateY(0) scale(0.995); }
        .cc-ico { transition: transform 160ms ease; }
        .cc-btn:hover .cc-ico { transform: translateX(2px); }

        .ambient {
          position: absolute; inset: -4px; border-radius: 14px;
          pointer-events: none; opacity: 0; filter: blur(18px);
          transition: opacity 180ms ease;
        }
        .cc-btn:focus-visible .ambient,
        .cc-btn:hover .ambient { opacity: var(--_ambient-o, .0); }

        /* =================== Variants =================== */
        /* GOLD (primary) */
        .cc-btn[data-variant="gold"]{
          --_gold: var(--gold, #C9A86E);
          --_gold-rgb: var(--gold-rgb, 201,168,110);
          --_ambient-o: .32;

          color: var(--brand-dark, #0B0E14);
          background:
            linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.16)),
            var(--_gold);
          background-blend-mode: overlay, normal;

          border: 1px solid rgba(var(--_gold-rgb), 0.46);
          box-shadow: 0 10px 22px rgba(var(--_gold-rgb), 0.18);
        }
        .cc-btn[data-variant="gold"] .ambient{
          background: radial-gradient(60% 60% at 50% 50%, rgba(var(--_gold-rgb), .35), transparent 65%);
        }
        .cc-btn[data-variant="gold"]:hover{
          background:
            linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.14)),
            var(--_gold);
          box-shadow: 0 12px 26px rgba(var(--_gold-rgb), 0.22);
        }
        .cc-btn[data-variant="gold"]:active{
          background:
            linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.22)),
            var(--_gold);
          box-shadow: 0 8px 18px rgba(var(--_gold-rgb), 0.18);
        }
        .cc-btn[data-variant="gold"]:focus-visible{
          box-shadow:
            0 0 0 2px rgba(var(--_gold-rgb), 0.36),
            0 10px 22px rgba(var(--_gold-rgb), 0.18);
        }

        /* GHOST (secondary) */
        .cc-btn[data-variant="ghost"]{
          --_gold-rgb: var(--gold-rgb, 201,168,110);
          --_ambient-o: 0; /* glow solo a focus */

          color: rgba(255,255,255,0.92);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: none;
        }
        .cc-btn[data-variant="ghost"]:hover{
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
        }
        .cc-btn[data-variant="ghost"]:active{
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.16);
        }
        .cc-btn[data-variant="ghost"]:focus-visible{
          box-shadow: 0 0 0 2px rgba(var(--_gold-rgb), 0.35);
        }
        .cc-btn[data-variant="ghost"] .cc-ico{ color: currentColor; }

        /* Motion respect */
        @media (prefers-reduced-motion: reduce){
          .cc-btn { transition-duration: 1ms !important; }
          .cc-btn:hover, .cc-btn:active { transform: none !important; }
          .cc-ico { transition: none !important; }
        }
      `}</style>
    </Comp>
  );
}
const RawButton = forwardRef(BaseButton);

/* Public variants */
export const ButtonGold  = forwardRef((props, ref) => <RawButton ref={ref} variant="gold"  {...props} />);
export const ButtonGhost = forwardRef((props, ref) => <RawButton ref={ref} variant="ghost" {...props} />);
