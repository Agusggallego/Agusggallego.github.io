# Portfolio de Ciberseguridad | Agustina Gallego

Sitio personal estático publicado en https://agusggallego.github.io con experiencia, formación, writeups de CTF y blog de ciberseguridad.

## Características

- HTML, CSS y JavaScript sin frameworks, sin build y sin dependencias de runtime.
- Navegación por secciones (About, Resume, Portfolio, Blog) y filtro de writeups por dificultad.
- Writeups de CTF en PDF dentro de [assets/cfts/](./assets/cfts).
- Accesible: enlace para saltar al contenido, atributos ARIA, foco visible y `prefers-reduced-motion`.

## Seguridad

- Content Security Policy restrictiva por `<meta>`: `default-src 'none'`, sin scripts ni estilos inline, Trusted Types y `upgrade-insecure-requests`.
- Sin recursos de terceros al cargar: fuentes Poppins (OFL) en [assets/fonts/](./assets/fonts) e iconos Ionicons (MIT) como sprite en [assets/icons/](./assets/icons).
- Enlaces externos con `rel="noopener noreferrer"` y `referrer` en `no-referrer`.
- Protección anti-framing por JavaScript en [assets/js/frame-guard.js](./assets/js/frame-guard.js).
- [security.txt](./.well-known/security.txt) conforme a RFC 9116 y política en [SECURITY.md](./SECURITY.md).
- Resultado de la última revisión en [SECURITY-REVIEW.md](./SECURITY-REVIEW.md).

GitHub Pages no permite cabeceras HTTP propias, por lo que `frame-ancestors`, `X-Content-Type-Options` y `Permissions-Policy` no pueden definirse desde el repositorio.

## Estructura

```
.
├── index.html              Página principal
├── 404.html                Página de error
├── assets/
│   ├── css/style.css
│   ├── js/script.js        Navegación, filtros y menú
│   ├── js/frame-guard.js   Protección anti-framing
│   ├── fonts/              Poppins (woff2)
│   ├── icons/sprite.svg    Iconos Ionicons
│   ├── images/
│   └── cfts/               Writeups en PDF
├── scripts/check-site.mjs  Comprobaciones de seguridad del HTML
├── .well-known/security.txt
├── .github/                Workflows (CodeQL, checks) y Dependabot
├── robots.txt
└── sitemap.xml
```

## Desarrollo local

Requiere cualquier servidor estático. Por ejemplo:

```
python -m http.server 8000
```

Luego abrí http://127.0.0.1:8000. Con la extensión Live Server de VS Code también funciona (puerto 5501 configurado en `.vscode/settings.json`).

## Comprobaciones

```
node scripts/check-site.mjs
npx html-validate index.html 404.html
```

`check-site.mjs` verifica la CSP, que no haya código ni estilos inline, recursos externos o `target="_blank"` sin `noopener`, y que existan los archivos referenciados. Las mismas comprobaciones corren en GitHub Actions ([checks.yml](./.github/workflows/checks.yml)) junto con CodeQL ([codeql.yml](./.github/workflows/codeql.yml)).

## Despliegue

Se publica con GitHub Pages desde la rama `main`. El archivo `.nojekyll` evita el procesamiento con Jekyll para que `/.well-known/` se sirva correctamente. Activá **Enforce HTTPS** en Settings → Pages.

## Contacto

- Email: Gallegoagustina5@gmail.com
- LinkedIn: https://www.linkedin.com/in/agustinagallego/
- Blog: https://agusggallego.gitbook.io/agusggallego

## Licencias

Plantilla de diseño original © 2022 @codewithsadee. Poppins se distribuye bajo SIL OFL 1.1 y Ionicons bajo MIT; las licencias están en [assets/fonts/](./assets/fonts) y [assets/icons/](./assets/icons). Los writeups y el contenido personal son propiedad de la autora.
