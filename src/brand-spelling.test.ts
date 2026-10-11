import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Garante a grafia oficial da marca em TODO o projeto:
 * - Em textos visíveis: ARARITECH (maiúsculas).
 * - Em nomes de arquivo, caminhos e domínios é aceito "araritech" em minúsculas.
 * - Variações como as montadas abaixo são proibidas.
 */
const ROOT = process.cwd();
const IGNORED_DIRS = new Set(["node_modules", "dist", ".git", ".vercel", "design-source"]);
const TEXT_EXT = /\.(ts|tsx|css|html|md|json|txt|py)$/;
const SELF = join("src", "brand-spelling.test.ts");

const wrongSpellings = [
  new RegExp(["arar", "[\\s_-]*", "tech"].join(""), "i"), // "Arar Tech", "Arar-Tech", "ararTech"
  new RegExp(["arari", "[\\s_-]+", "tech"].join(""), "i"), // "Arari Tech", "Arari-Tech"
];

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!IGNORED_DIRS.has(name)) walk(full, files);
    } else if (TEXT_EXT.test(name) && name !== "package-lock.json") {
      files.push(full);
    }
  }
  return files;
}

describe("grafia da marca", () => {
  const files = walk(ROOT).filter((f) => relative(ROOT, f) !== SELF);

  it("encontra os arquivos do projeto", () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it("nunca usa variações incorretas do nome", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const pattern of wrongSpellings) {
        const match = text.match(pattern);
        if (match) offenders.push(`${relative(ROOT, file)}: "${match[0]}"`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("usa ARARITECH (maiúsculas) ou araritech (minúsculas em arquivos/domínios), nunca misturado", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const match of text.matchAll(/araritech/gi)) {
        if (match[0] !== "ARARITECH" && match[0] !== "araritech") {
          offenders.push(`${relative(ROOT, file)}: "${match[0]}"`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
