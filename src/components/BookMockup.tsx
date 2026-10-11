/** Mockup 3D da capa do e-book (apenas CSS: a imagem vem de site.ts). */
export function BookMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="book-stage">
      <div className="book">
        <img src={src} alt={alt} width={900} height={1200} loading="lazy" decoding="async" className="book-cover" />
        <span className="book-spine" aria-hidden="true" />
      </div>
      <span className="book-floor" aria-hidden="true" />
    </div>
  );
}
