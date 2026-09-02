import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`site-header${compact ? " site-header-compact" : ""}`}>
      <Link className="brand-link" href="/" aria-label="Bekker’s Catering home">
        <Image
          className="brand-logo"
          src="https://www.bekkerscatering.com/templates/rt_kraken/custom/images/logo/bekkersLogo-sq-onWhtTable.jpg"
          alt="Bekker’s Catering"
          width={152}
          height={140}
          priority
        />
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/to-go?orderType=Delivery">Delivery</Link>
        <Link href="/to-go?orderType=Pickup">Pickup</Link>
        <Link href="/full-service">Full Service</Link>
      </nav>
      <a className="header-phone" href="tel:16192879027">
        <span>Call Bekker’s</span>
        619-287-9027
      </a>
    </header>
  );
}
