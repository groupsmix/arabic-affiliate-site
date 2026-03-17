"use client";

import { trackAffiliateClick } from "@/lib/analytics";

interface AffiliateLinkProps {
  href: string;
  productName: string;
  contentSlug?: string;
  className?: string;
  children: React.ReactNode;
}

export default function AffiliateLink({
  href,
  productName,
  contentSlug,
  className,
  children,
}: AffiliateLinkProps) {
  function handleClick() {
    trackAffiliateClick(productName, href, contentSlug);
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener sponsored"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
