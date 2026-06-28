import { Mail } from "lucide-react";

const links = [
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="mt-4 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted hover:text-foreground text-xs transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-white/5 pt-4">
          <div className="text-muted flex items-center gap-2 text-xs">
            <Mail className="h-3.5 w-3.5" />
            <a
              href="mailto:support@viralbundle.in"
              className="hover:text-foreground transition-colors"
            >
              support@viralbundle.in
            </a>
          </div>
          <p className="text-muted text-[10px]">
            &copy; {new Date().getFullYear()} Viral Bundle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
