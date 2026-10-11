# ARARITECH — Página de links da bio

Página única, rápida e responsiva para o link da bio do Instagram da **ARARITECH**, com dois caminhos:

1. **Assistência técnica** → abre o WhatsApp com a mensagem inicial já escrita.
2. **E-book “Antes de Formatar Seu PC, Descubra Estas 7 Coisas”** → leva à página de vendas da Cakto.

Tecnologias: React + TypeScript + Vite + Tailwind CSS + Lucide Icons. Não usa backend, banco de dados nem serviços pagos.

---

## ✅ O que ainda precisa ser configurado

Tudo é feito em **um único arquivo: `src/config/site.ts`**.

| Pendência | Onde | O que acontece enquanto estiver vazio |
|---|---|---|
| **Link da Cakto** | `CAKTO_CHECKOUT_URL` | O botão “Quero acessar o e-book” mostra “O acesso ao e-book estará disponível em breve.” e não leva a lugar nenhum. |
| **Instagram da ARARITECH** | `INSTAGRAM_URL` (link completo ou `@usuario`) | O link do Instagram não aparece no rodapé. |
| **Capa final do e-book** | Substituir `public/images/ebook-capa.png` (proporção 3:4, ex.: 900 × 1200 px) | Usa uma capa provisória criada com a identidade da ARARITECH. |
| **Foto de perfil** (opcional) | Substituir `public/images/perfil.png` (quadrada, ex.: 512 × 512 px) | Usa o símbolo “at” da ARARITECH. |
| **Google Analytics 4** (opcional) | `analytics.ga4MeasurementId` (formato `G-XXXXXXXXXX`) | Nenhum rastreamento é enviado; a página funciona normalmente. |
| **Endereço do site** (opcional) | Variável `VITE_SITE_URL` na Vercel, se for usar domínio próprio | Na Vercel, o domínio do projeto é usado automaticamente nas metatags de compartilhamento. |

> Não há preços, depoimentos, garantias, CNPJ ou endereço na página — nada foi inventado. Se quiser incluir algum, edite `site.ts` (textos) ou peça o ajuste.

---

## 🖥️ Rodar no seu computador

Requisito: [Node.js](https://nodejs.org) versão 20.19 ou superior.

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre em http://localhost:5173 com atualização automática
npm run build      # confere os tipos e gera a versão final na pasta dist/
npm run preview    # abre a versão final em http://localhost:4173
npm test           # roda os testes automáticos
```

Durante `npm run dev`, o console do navegador lista o que ainda está pendente no `site.ts`.

---

## 🔗 Como alterar links, textos e cores (sem mexer nos componentes)

Abra `src/config/site.ts`. Cada item tem um comentário explicando o que faz:

- **WhatsApp:** `whatsapp.phone` aceita o número como preferir (`+55 87 99167-1058`); o link internacional (`https://wa.me/5587991671058`) é montado sozinho, sem espaços, parênteses ou traços. A mensagem inicial é `whatsapp.message`.
- **Cakto:** cole o link em `CAKTO_CHECKOUT_URL`, entre aspas. Só links `https://` válidos são aceitos.
- **Instagram:** cole o link ou o `@usuario` em `INSTAGRAM_URL`.
- **E-book:** título, descrição, benefícios, texto do botão e caminho da capa ficam em `ebook`.
- **Cores:** bloco `theme` (turquesa oficial `#009088`, ciano de destaque `#2bd9cb`, grafite e branco).

Depois de editar, rode `npm run build` para conferir ou envie a alteração para a Vercel (ela compila sozinha).

---

## 📊 Rastreamento de cliques

Os dois botões principais disparam eventos pela função `trackEvent` (`src/lib/analytics.ts`):

| Evento | Quando |
|---|---|
| `whatsapp_click` | Clique no botão principal (`link_location: principal`) ou no WhatsApp do rodapé (`rodape`). |
| `ebook_click` | Clique no botão do e-book (`link_status: ativo` quando há link da Cakto; `em_breve` quando não há). |

Nenhum dado pessoal é enviado. Para ativar o **GA4**: crie uma propriedade em [analytics.google.com](https://analytics.google.com), copie o ID “G-…” e cole em `analytics.ga4MeasurementId`. Sem ID, nada é carregado.

---

## 🚀 Publicar na Vercel

### Opção A — pelo GitHub (recomendada: cada alteração publica sozinha)

1. Crie uma conta gratuita em [vercel.com](https://vercel.com) e outra em [github.com](https://github.com) (se ainda não tiver).
2. Crie um repositório novo no GitHub (ex.: `araritech-links`) e envie o projeto:
   ```bash
   git init
   git add .
   git commit -m "Página de links da ARARITECH"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/araritech-links.git
   git push -u origin main
   ```
3. Na Vercel, clique em **Add New → Project**, escolha o repositório e clique em **Import**.
4. A Vercel reconhece o Vite sozinha (Build Command `npm run build`, Output Directory `dist`). Clique em **Deploy**.
5. Em cerca de 1 minuto o site estará no ar em um endereço `https://….vercel.app`.

### Opção B — direto pelo terminal

```bash
npm install -g vercel
vercel login
vercel          # publicação de teste
vercel --prod   # publicação definitiva
```

### Depois de publicar

1. **Instagram:** Editar perfil → **Links** → Adicionar link externo → cole o endereço do site.
2. **Domínio próprio** (opcional): na Vercel, **Settings → Domains**. Se usar um domínio, crie a variável `VITE_SITE_URL` (ex.: `https://links.seudominio.com.br`) em **Settings → Environment Variables** e publique de novo, para que a imagem de compartilhamento use o endereço certo.
3. **Atualizar links no futuro:** edite `src/config/site.ts`, envie ao GitHub (`git add . && git commit -m "Atualiza links" && git push`) e a Vercel republica automaticamente.
4. Faça o teste final no celular: toque no botão do WhatsApp, toque no botão do e-book e confira o rodapé.

---

## 🗂️ Estrutura

```
src/
  config/site.ts        ← TUDO que você edita: links, textos, imagens, cores
  components/           ← Header, WhatsAppButton, EbookCard, BookMockup, Footer, Icons
  lib/                  ← links (WhatsApp/URLs), analytics (GA4), theme (cores), configCheck
  index.css             ← estilos e tokens de design (Tailwind)
public/
  images/               ← logotipos, foto de perfil, capa do e-book
  favicon*, apple-touch-icon.png, icon-*.png, og-image.png, robots.txt
design-source/          ← arquivos originais do logotipo
tools/                  ← scripts que geram logos, ícones, capa e og-image (opcional)
vercel.json             ← configuração de publicação e cache
```

## 🎨 Identidade visual

Turquesa oficial `#009088` e ciano de destaque `#2bd9cb` sobre grafite, com branco para leitura. Tipografia **Oxanium** (títulos, geométrica e tecnológica, em sintonia com o logotipo) e **Figtree** (textos), hospedadas junto do site — sem depender de serviços externos. Todos os textos têm contraste superior a 7:1 (nível AAA), botões com no mínimo 56 px de altura, foco de teclado visível e animações desativadas para quem usa “reduzir movimento”.

## 🧪 Verificações automáticas (`npm test`)

Link do WhatsApp (número e mensagem), botão da Cakto vazio/preenchido/inválido, rodapé (ano automático, Instagram oculto sem link), rastreamento sem ferramenta configurada e **grafia ARARITECH em todos os arquivos do projeto**.

## 🔄 Regenerar imagens (opcional)

`tools/process_logos.py` recria logos, foto de perfil padrão e ícones a partir de `design-source/`. `tools/render_assets.py` recria a capa provisória do e-book e a `og-image.png` (requer Python com Pillow e Playwright).
