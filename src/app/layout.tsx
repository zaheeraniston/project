import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PaymentProvider } from "@/components/PaymentProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viral Video Bundle — 50,000+ Hindi Videos",
  description:
    "Get lifetime access to 50,000+ viral Hindi videos. One-time payment. Lifetime enjoyment.",
  openGraph: {
    title: "Viral Video Bundle — 50,000+ Hindi Videos",
    description:
      "Get lifetime access to 50,000+ viral Hindi videos. One-time payment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('dark');
              document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
              document.addEventListener('keydown', function(e) {
                if (
                  e.key === 'F12' ||
                  (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                  (e.ctrlKey && (e.key === 'U' || e.key === 'S')) ||
                  e.key === 'PrintScreen'
                ) {
                  e.preventDefault();
                }
              });
              document.addEventListener('copy', function(e) { e.preventDefault(); });
              document.addEventListener('cut', function(e) { e.preventDefault(); });
            `,
          }}
        />
      </head>
      <body className="bg-bg text-foreground antialiased select-none">
        <PaymentProvider>{children}</PaymentProvider>
      </body>
    </html>
  );
}

