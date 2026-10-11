import { siteConfig, type SiteConfig } from "../config/site";

export function Header({ brand = siteConfig.brand }: { brand?: SiteConfig["brand"] }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* Moldura em "quadrado arredondado", ecoando as letras do logotipo */}
      <div className="rounded-[1.9rem] border-2 border-brand p-1">
        <img
          src={brand.profileImage}
          alt={`Foto de perfil da ${brand.name}`}
          width={88}
          height={88}
          fetchPriority="high"
          className="size-22 rounded-[1.5rem] bg-white object-cover"
        />
      </div>

      <h1 className="mt-5">
        <img
          src={brand.logo.src}
          alt={brand.name}
          width={brand.logo.width}
          height={brand.logo.height}
          className="h-auto w-[13.5rem]"
        />
      </h1>

      <p className="mt-3 max-w-[20rem] text-[0.95rem] leading-relaxed text-muted">{brand.description}</p>
    </header>
  );
}
