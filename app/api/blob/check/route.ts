export const dynamic = "force-dynamic";

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
    ...init,
  });
}

export async function GET() {
  const isProd = !!process.env.VERCEL;
  const hasToken = Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_RW_TOKEN
  );

  return json(
    {
      ok: true,
      isProd,
      blob: {
        hasToken,
        mode: hasToken ? "token" : "integration-or-missing",
        hint:
          hasToken
            ? "Token detected. Uploads should work."
            : "Either install the Vercel Blob integration for this project or set BLOB_READ_WRITE_TOKEN in your environment.",
      },
    },
    { status: 200 }
  );
}
