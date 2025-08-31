import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isSSOcallback = createRouteMatcher(['/sign-in/sso-callback']);

export default clerkMiddleware((auth, req) => {
  // Permitir siempre acceder al callback sin autenticación
  if (isSSOcallback(req)) {
    return;
  }
  // Aquí puedes añadir más lógica si deseas proteger rutas específicas
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
