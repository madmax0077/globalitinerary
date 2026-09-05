/**
 * Vercel Hobby caps ISR writes at 200k / month. Guide HTML is generated from
 * repo data (not a live CMS), so daily regeneration only burns quota.
 *
 * ~4,200 city pages × daily revalidate ≈ 126k writes before countries, sitemaps,
 * and fetch cache. Weekly ISR keeps crawlers happy and stays under the cap.
 */
export const REVALIDATE_GUIDE_SECONDS = 60 * 60 * 24 * 7;
export const REVALIDATE_FEED_SECONDS = 60 * 60 * 24;
export const REVALIDATE_HOME_SECONDS = 60 * 60 * 24;
