import Image from 'next/image'
import { urlForImage } from '../lib/sanity/image'

export function SanityImage(props: { image: any; alt: string; width?: number; height?: number; className?: string; sizes?: string }) {
  const { image, alt, width = 1200, height = 800, className, sizes } = props
  if (!image) return null
  const src = urlForImage(image).width(width).height(height).fit('max').auto('format').url()
  return <Image src={src} alt={alt} width={width} height={height} className={className} sizes={sizes ?? '(max-width: 768px) 100vw, 1200px'} />
}
