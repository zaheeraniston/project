export const PAYMENT_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY ?? "",
  SECRET_KEY: process.env.PAYMENT_SECRET_KEY ?? "",
  PAYMENT_URL:
    process.env.NEXT_PUBLIC_PAYMENT_URL ?? "https://payment.liveblog365.com",
  SUCCESS_URL: process.env.NEXT_PUBLIC_SUCCESS_URL ?? "",
  TELEGRAM_LINK:
    process.env.NEXT_PUBLIC_TELEGRAM_LINK ?? "https://t.me/hI6dkSYWPldiMjI1",
};
