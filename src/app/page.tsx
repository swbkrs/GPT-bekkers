import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const serviceDoors = [
  {
    number: "01",
    title: "Catering delivery",
    copy: "Hot, generous menus delivered across San Diego. Delivery starts at $125.",
    href: "/to-go?orderType=Delivery",
    action: "Build a delivery estimate",
    tone: "sage",
  },
  {
    number: "02",
    title: "Pickup / To Go",
    copy: "Choose a complete menu, customize the sides, then pick up on Mission Gorge Road.",
    href: "/to-go?orderType=Pickup",
    action: "Build a pickup estimate",
    tone: "paper",
  },
  {
    number: "03",
    title: "Full Service",
    copy: "Food, equipment and a professional service team for events of 40 guests or more.",
    href: "/full-service",
    action: "Plan a hosted event",
    tone: "wine",
  },
] as const;

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">San Diego catering · established 1958</p>
          <h1 id="home-title">
            Good food. Calm hosts. A gathering people remember.
          </h1>
          <p className="hero-lede">
            Bekker’s is an award-winning, full-service catering house for San
            Diego events, delivery and pickup—featuring awesome food, expert
            planning and excellent service.
          </p>
          <a className="hero-phone" href="tel:16192879027">
            <span>Talk with our catering team</span>
            <strong>619-287-9027</strong>
          </a>
        </div>

        <div className="hero-photography" aria-label="Bekker’s food and events">
          <div className="hero-photo hero-photo-main">
            <Image
              src="https://www.bekkerscatering.com/images/WEDD-01-A-Day-to-Remember.jpg"
              alt="Bekker’s full-service wedding buffet"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
          <div className="hero-photo hero-photo-small hero-photo-bbq">
            <Image
              src="https://www.bekkerscatering.com/images/BBQ07-Smoked-BBQ-Meats.jpg"
              alt="Bekker’s pit-smoked barbecue meats"
              fill
              priority
              sizes="(max-width: 900px) 45vw, 18vw"
            />
          </div>
          <div className="hero-photo hero-photo-small hero-photo-delivery">
            <Image
              src="https://www.bekkerscatering.com/images/FP-grid-03-Delivery-and-Pick-Up.jpg"
              alt="Bekker’s delivery and pickup catering"
              fill
              sizes="(max-width: 900px) 45vw, 18vw"
            />
          </div>
          <p className="photo-note">Made in San Diego. Served generously.</p>
        </div>
      </section>

      <section className="service-doors" aria-labelledby="service-title">
        <div className="section-heading-line">
          <p className="eyebrow">Choose how we help</p>
          <h2 id="service-title">Three honest paths to a better event.</h2>
        </div>
        <div className="service-door-grid">
          {serviceDoors.map((door) => (
            <Link
              className={`service-door service-door-${door.tone}`}
              href={door.href}
              key={door.number}
            >
              <span className="service-door-number">{door.number}</span>
              <h3>{door.title}</h3>
              <p>{door.copy}</p>
              <span className="service-door-action">{door.action} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-proof" aria-label="Why clients choose Bekker’s">
        <div>
          <p className="eyebrow">A San Diego original</p>
          <h2>Family-run hospitality, built for real gatherings.</h2>
        </div>
        <blockquote>
          “The setup was elegant, the food was delicious and the crew was
          fantastic and nice to work with.”
          <cite>— Leah, Cubic Corporation</cite>
        </blockquote>
        <a href="https://www.instagram.com/bekkerscatering/">
          Follow @bekkerscatering →
        </a>
      </section>

      <footer className="site-footer">
        <p>Bekker’s Catering · San Diego · Since 1958</p>
        <a href="tel:16192879027">619-287-9027</a>
      </footer>
    </main>
  );
}
