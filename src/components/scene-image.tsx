/* eslint-disable @next/next/no-img-element -- Pre-sized local variants keep responsive images compatible with GitHub Pages. */
export const sceneImageWidths = [384, 768, 1152, 1536];
export const sceneImageSizes = "(max-width: 760px) 100vw, (max-width: 1544px) 68vw, 1044px";

export function sceneImageSource(src: string, width: number) {
  return width === 1536 ? src : src.replace(".webp", `-${width}.webp`);
}

export function SceneImage() {
  const src = "/images/mairie-collectif.webp";
  return (
    <img
      src={src}
      srcSet={sceneImageWidths.map(width => `${sceneImageSource(src, width)} ${width}w`).join(", ")}
      sizes={sceneImageSizes}
      width={1536}
      height={1024}
      alt="Des personnes échangent sur le parvis. Des visiteurs entrent dans la mairie tandis qu’une autre personne en sort et descend les marches."
      fetchPriority="high"
      loading="eager"
      decoding="async"
    />
  );
}
