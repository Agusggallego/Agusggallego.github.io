# Política de seguridad

## Alcance

Este repositorio es un sitio estático (HTML, CSS y JavaScript sin dependencias de terceros) publicado en https://agusggallego.github.io.

## Reportar una vulnerabilidad

No abras un issue público. Usá el reporte privado de vulnerabilidades de GitHub (pestaña **Security** > **Report a vulnerability**) o escribí a Gallegoagustina5@gmail.com con una descripción, pasos de reproducción e impacto estimado.

Se responde dentro de 7 días corridos.

## Medidas implementadas

- Content Security Policy restrictiva (`default-src 'none'`), sin scripts ni estilos inline, con Trusted Types para sinks de DOM.
- Sin recursos de terceros en tiempo de carga: fuentes (Poppins, OFL) e iconos (Ionicons, MIT) se sirven localmente.
- `referrer` en `no-referrer`, enlaces externos con `rel="noopener noreferrer"` y `upgrade-insecure-requests`.
- Protección anti-framing por JavaScript (`assets/js/frame-guard.js`).
- `/.well-known/security.txt` conforme a RFC 9116.
- Análisis estático con CodeQL, validación de HTML y comprobaciones de CSP en GitHub Actions con acciones fijadas por SHA.
- Dependabot para mantener actualizadas las acciones.

## Limitaciones

GitHub Pages no permite configurar cabeceras HTTP propias. Por eso `frame-ancestors`, `X-Content-Type-Options`, `Permissions-Policy` y HSTS no pueden definirse desde el repositorio; GitHub Pages aplica HTTPS y HSTS a nivel de plataforma. Activá **Enforce HTTPS** en Settings > Pages.
