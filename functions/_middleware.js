export async function onRequest({ request, env, next }) {
  const auth = request.headers.get("Authorization");
  const expected = "Basic " + btoa(":" + env.DASHBOARD_PASSWORD);

  if (auth === expected) {
    return next();
  }

  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Dashboard"' },
  });
}
