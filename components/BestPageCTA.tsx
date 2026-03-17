import Link from "next/link";

type BestPageCTAProps = {
  href: string;
  label: string;
};

export default function BestPageCTA({ href, label }: BestPageCTAProps) {
  return (
    <div className="border border-foreground/10 rounded p-4 text-center my-6">
      <Link
        href={href}
        className="inline-block bg-foreground text-background px-6 py-2 rounded hover:opacity-80"
      >
        {label}
      </Link>
    </div>
  );
}
