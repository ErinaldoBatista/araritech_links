/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DA ARARITECH
 * ============================================================
 *  Este é o ÚNICO arquivo que você precisa editar para trocar
 *  links, textos, imagens e cores. Nenhum componente guarda
 *  URLs ou números "soltos".
 *
 *  Depois de editar:  npm run build  (ou apenas envie para a
 *  Vercel, que compila automaticamente).
 * ============================================================
 */

/**
 * Link da página de vendas / checkout do e-book na Cakto.
 * Cole aqui o link definitivo, entre aspas. Exemplo de formato:
 *   "https://pay.cakto.com.br/xxxxxxx"
 * Enquanto estiver vazio (""), o botão do e-book mostra a
 * mensagem "estará disponível em breve" e NÃO leva a nenhuma página.
 */
export const CAKTO_CHECKOUT_URL: string = "https://go.pepperpay.com.br/jkmg5";

/**
 * Instagram da ARARITECH. Aceita o link completo
 * ("https://www.instagram.com/seu_usuario") ou só o @ ("@seu_usuario").
 * Enquanto estiver vazio (""), o link do Instagram não aparece no rodapé.
 */
export const INSTAGRAM_URL: string = "https://www.instagram.com/araritech_/";

export const siteConfig = {
  /** Identidade da marca. Grafia oficial: ARARITECH. */
  brand: {
    name: "ARARITECH",
    description: "Tecnologia, manutenção e soluções para o seu computador.",
    footerTagline: "Tecnologia para facilitar o seu dia a dia.",
    /** Foto de perfil. Para trocar: substitua o arquivo public/images/perfil.png ou mude o caminho aqui. */
    profileImage: "/images/perfil.png",
    /** Logotipo para fundo escuro (versão com "tech" em branco). */
    logo: { src: "/images/logo-araritech-claro.png", width: 725, height: 134 },
  },

  /** Botão principal: atendimento pelo WhatsApp. */
  whatsapp: {
    /** Pode escrever com espaços, +, parênteses e traços: o link internacional é montado sozinho. */
    phone: "+55 87 99167-1058",
    /** Mensagem que já aparece escrita na conversa do WhatsApp. */
    message: "Olá! Vim pelo Instagram da ARARITECH e gostaria de informações sobre assistência técnica.",
    title: "Preciso de assistência técnica",
    subtitle: "Fale comigo e solicite seu orçamento.",
    /** Nome curto usado no rodapé. */
    footerLabel: "WhatsApp",
  },

  /** Rodapé: Instagram. */
  instagram: {
    url: INSTAGRAM_URL,
    footerLabel: "Instagram",
  },

  /** Produto digital. */
  ebook: {
    badge: "E-book",
    title: "Antes de Formatar Seu PC, Descubra Estas 7 Coisas",
    description:
      "Vai formatar seu computador? Antes de começar, conheça 7 pontos importantes para se preparar, proteger seus arquivos e evitar erros durante o processo.",
    /** Capa do e-book. Ideal: proporção 3:4 (ex.: 900 x 1200 px). Substitua public/images/ebook-capa.png pela capa final. */
    coverImage: "/images/ebook-capa.png",
    benefits: [
      "7 pontos importantes para conhecer antes de formatar",
      "Orientação para se preparar para o processo",
      "Atenção à proteção dos seus arquivos",
      "Ajuda a evitar erros durante a formatação",
    ],
    ctaLabel: "Quero acessar o e-book",
    comingSoonMessage: "O acesso ao e-book estará disponível em breve.",
    checkoutUrl: CAKTO_CHECKOUT_URL,
  },

  /** Cores (qualquer valor CSS: #hex, rgb(), etc.). */
  theme: {
    background: "#151719", // fundo da página (grafite escuro)
    surface: "#1e2225", // cartões
    line: "#31373b", // bordas discretas
    brand: "#009088", // turquesa oficial da logo
    accent: "#2bd9cb", // ciano de destaque (botões, foco)
    foreground: "#f4f8f8", // texto principal (branco)
    muted: "#a8b4b7", // texto secundário
  },

  /** Rastreamento (opcional). */
  analytics: {
    /** ID do Google Analytics 4, no formato "G-XXXXXXXXXX". Deixe "" para não usar nenhuma ferramenta. */
    ga4MeasurementId: "",
  },
};

export type SiteConfig = typeof siteConfig;
