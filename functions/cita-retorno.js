// Flow vuelve a esta URL con un POST (no un simple redirect), y Cloudflare Pages
// no acepta POST directo a la página estática (index.html) -> 405.
// Esta función recibe ese POST/GET y redirige (303) al sitio con ?cita_folio=...
// para que el navegador quede con un GET normal, que ahí sí puede servir index.html.
function destino(request) {
  const url = new URL(request.url);
  const folio = url.searchParams.get('cita_folio') || '';
  const dest = new URL('/', url.origin);
  if (folio) dest.searchParams.set('cita_folio', folio);
  return dest.toString();
}

export async function onRequestPost({ request }) {
  return Response.redirect(destino(request), 303);
}

export async function onRequestGet({ request }) {
  return Response.redirect(destino(request), 303);
}
