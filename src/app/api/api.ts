import { env } from "@/env";

// * Função utilitária centralizada para fazer requisições HTTP para a API
export function api(path: string, init?: RequestInit) {
  const baseUrl = env?.NEXT_PUBLIC_API_BASE_URL;

  // * Define o prefixo base para todas as rotas da API
  const apiPrefix = "/api";

  // * Concatena o prefixo da API com o path específico passado na chamada (exemplo: "/users", "/sessions")
  // * E constrói a URL final usando o construtor URL (que cuida de barras duplicadas, etc)
  const url = new URL(apiPrefix.concat(path), baseUrl);

  // * Faz a requisição HTTP usando o fetch, passando a URL montada e as configurações opcionais (método, headers, body, etc)
  return fetch(url, init);
}

// ? Faz a requisição usando o fetch nativo do Next.js (server-side)
// * ✅ Vantagens de usar o fetch do Next.js:
// * Suporte nativo a cache de resposta (ISR, SSR e SSG)
// * Possibilidade de usar tags de cache (ex: next: { tags: ["collection"] }) para invalidação controlada
// * Melhor performance no Edge Runtime
// * Suporte a revalidação programada (ex: next: { revalidate: 60 })
// * Evita necessidade de bibliotecas extras como Axios no server
