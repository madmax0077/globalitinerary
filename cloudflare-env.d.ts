interface CloudflareEnv {
  ASSETS: Fetcher;
  WORKER_SELF_REFERENCE: Fetcher;
  NEXT_INC_CACHE_R2_BUCKET: R2Bucket;
  NEXT_CACHE_DO_QUEUE: DurableObjectNamespace;
  NEXT_PUBLIC_SITE_URL?: string;
  CRON_SECRET?: string;
  INDEXNOW_TOKEN?: string;
  BING_WEBMASTER_API_KEY?: string;
  BAIDU_PUSH_TOKEN?: string;
  AUTH_SECRET?: string;
  AUTH_GITHUB_ID?: string;
  AUTH_GITHUB_SECRET?: string;
  DATABASE_URL?: string;
}
