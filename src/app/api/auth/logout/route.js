export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax` },
  });
}