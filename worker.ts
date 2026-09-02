// @ts-expect-error `.open-next/worker.js` is generated at build time
import { default as handler } from "./.open-next/worker.js";

export default {
  fetch: handler.fetch,

  async scheduled(_controller, env, ctx) {
    const secret = env.CRON_SECRET;
    if (!secret) {
      console.error("IndexNow cron skipped: CRON_SECRET is not set");
      return;
    }

    const origin = env.NEXT_PUBLIC_SITE_URL ?? "https://globalitinerary.in";
    const request = new Request(`${origin}/api/indexnow`, {
      method: "GET",
      headers: { Authorization: `Bearer ${secret}` },
    });

    ctx.waitUntil(
      Promise.resolve(handler.fetch(request, env, ctx))
        .then(async (res) => {
          const body = await res.text();
          console.log(`IndexNow cron ${res.status}: ${body.slice(0, 400)}`);
        })
        .catch((err: unknown) => {
          console.error("IndexNow cron failed", err);
        }),
    );
  },
} satisfies ExportedHandler<CloudflareEnv>;

// Required for the Durable Object ISR queue in wrangler.jsonc
// @ts-expect-error `.open-next/worker.js` is generated at build time
export { DOQueueHandler } from "./.open-next/worker.js";
