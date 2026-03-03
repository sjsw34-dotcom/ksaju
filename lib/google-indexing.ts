/**
 * Google Indexing API utility.
 *
 * Setup (do this once when you have a custom domain):
 *  1. Google Cloud Console → enable "Web Search Indexing API"
 *  2. Create a Service Account → download JSON key
 *  3. Google Search Console → Settings → Users → add service account email as Owner
 *  4. Set GOOGLE_SERVICE_ACCOUNT_JSON env var to the full JSON key content
 *
 * Until then, this function logs a warning and returns silently — blog
 * generation is NOT affected.
 */

import { google } from "googleapis";

export async function notifyGoogleIndexing(pageUrl: string): Promise<void> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    console.warn("[google-indexing] GOOGLE_SERVICE_ACCOUNT_JSON not set — skipping indexing request");
    return;
  }

  try {
    const credentials = JSON.parse(raw) as Record<string, unknown>;

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const indexing = google.indexing({ version: "v3", auth: auth as any });

    await indexing.urlNotifications.publish({
      requestBody: { url: pageUrl, type: "URL_UPDATED" },
    });

    console.log("[google-indexing] Submitted:", pageUrl);
  } catch (err) {
    // Never block blog generation — indexing failure is non-critical
    console.error("[google-indexing] Failed to notify Google:", err);
  }
}
