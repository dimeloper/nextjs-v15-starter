import Image from 'next/image';

interface FooterLinkProps {
  href: string;
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
}

export function FooterLink({ href, iconSrc, iconAlt, children }: FooterLinkProps) {
  return (
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image aria-hidden src={iconSrc} alt={iconAlt} width={16} height={16} />
      {children}
    </a>
  );
}
