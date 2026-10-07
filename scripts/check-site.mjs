import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = ["index.html", "404.html"];
const required = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "require-trusted-types-for 'script'",
  "upgrade-insecure-requests",
];
const errors = [];

for (const page of pages) {
  const html = readFileSync(join(root, page), "utf8");
  const csp = html.match(/http-equiv="Content-Security-Policy"\s+content="([^"]*)"/)?.[1];
  if (!csp) {
    errors.push(`${page}: falta la Content-Security-Policy`);
  } else {
    for (const directive of required) {
      if (!csp.includes(directive)) errors.push(`${page}: la CSP no incluye ${directive}`);
    }
    if (/unsafe-inline|unsafe-eval/.test(csp)) errors.push(`${page}: la CSP permite unsafe-*`);
  }
  if (/<script(?![^>]*\ssrc=)[^>]*>/i.test(html)) errors.push(`${page}: script inline`);
  if (/\sstyle\s*=/i.test(html)) errors.push(`${page}: atributo style inline`);
  if (/\son[a-z]+\s*=/i.test(html)) errors.push(`${page}: manejador de evento inline`);
  if (/<(iframe|object|embed|form)\b/i.test(html)) errors.push(`${page}: elemento no permitido`);
  if (/(?:src|href)="http:\/\//i.test(html)) errors.push(`${page}: recurso sin HTTPS`);

  for (const [, tag] of html.matchAll(/<a\b([^>]*)>/gi)) {
    if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener[^"]*"/.test(tag)) {
      errors.push(`${page}: enlace target=_blank sin rel=noopener`);
    }
  }

  for (const [, tag, url] of html.replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, "").matchAll(/<(script|link|img)\b[^>]*?(?:src|href)="([^"]+)"/gi)) {
    if (/^https?:\/\//.test(url)) {
      errors.push(`${page}: recurso externo cargado (${tag} ${url})`);
      continue;
    }
    const file = decodeURIComponent(url.split("#")[0]).replace(/^\//, "");
    if (file && !existsSync(join(root, file))) errors.push(`${page}: no existe ${url}`);
  }
  for (const [, url] of html.matchAll(/<use\b[^>]*href="([^"#]+)#/gi)) {
    if (!existsSync(join(root, url))) errors.push(`${page}: no existe ${url}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Comprobaciones superadas");
