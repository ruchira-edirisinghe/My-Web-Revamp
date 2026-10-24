/**
 * The brand mark filling with cosmic energy as the site loads: the real logo
 * SVG (public/Images/longlogo.svg, or the RE monogram) used as a mask, so the
 * geometry and type are exactly the brand's. A dim copy sits underneath, the
 * energy rises inside the letters from the bottom with a glowing, rippling
 * surface (its level is --p on an ancestor, the real progress), impacts and
 * milestones flash it (.lf-flash), and when the load completes the true
 * colours glow in (.is-complete on an ancestor). Styles: styles/cosmic.css.
 */
export default function LogoFillAnimation({ mark = 'logotype', className }: { mark?: 'logotype' | 'monogram'; className?: string }) {
  const src = mark === 'logotype' ? '/Images/longlogo.svg' : '/Images/shortlogo.svg';
  return (
    <div className={`lf is-${mark} ${className ?? ''}`} aria-hidden="true">
      <img className="lf-dim" src={src} alt="" draggable={false} data-loader-ignore />
      <span className="lf-energy"><i className="lf-surface" /></span>
      <span className="lf-flash" />
      <img className="lf-true" src={src} alt="" draggable={false} data-loader-ignore />
    </div>
  );
}
