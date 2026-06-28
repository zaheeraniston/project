import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Container className="text-center">
        <h1 className="font-heading text-gradient-gold text-8xl font-extrabold">
          404
        </h1>
        <p className="text-muted mt-4 text-xl">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="bg-gradient-gold glow-gold mt-8 inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-black transition-all hover:opacity-90"
        >
          Go Home
        </Link>
      </Container>
    </div>
  );
}
