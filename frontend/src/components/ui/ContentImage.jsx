import { Placeholder } from './Placeholder'

/** Renders a real uploaded image when one exists, falling back to the
 * existing decorative Placeholder box (same label/ratio) when it doesn't —
 * so sections nobody has uploaded an image for yet look exactly as before. */
export function ContentImage({ src, alt, label, ratio = '3/4', className = '', style = {} }) {
  if (!src) return <Placeholder label={label} ratio={ratio} className={className} style={style} />
  return (
    <img
      src={src}
      alt={alt || label || ''}
      className={className}
      style={{ aspectRatio: ratio, objectFit: 'cover', width: '100%', display: 'block', ...style }}
    />
  )
}
