import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-4 pt-32 pb-24 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={14} /> Volver al inicio
        </Link>
        <article className="prose prose-invert max-w-none">{children}</article>
      </main>
      <Footer />
    </>
  );
}
