export function Placeholder({ label, ratio = '3/4', className = '', style = {} }) {
  return (
    <div className={`ph ${className}`} style={{ aspectRatio: ratio, ...style }}>
      <span className="ph-label">{label}</span>
    </div>
  )
}
