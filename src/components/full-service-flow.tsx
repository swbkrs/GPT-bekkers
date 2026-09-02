"use client";

import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import fullServiceMenuSource from "@/data/full-service-menus.json";
import { fullServiceExtras } from "@/data/extras";
import { calculateFullService, formatCurrency } from "@/lib/pricing";

type Step = 1 | 2 | 3 | 4;
type FullServiceMenu = {
  category: string;
  name: string;
  price: number;
  min40: number;
  summary: string;
};

const menus = fullServiceMenuSource as FullServiceMenu[];
const categories = Array.from(new Set(menus.map((menu) => menu.category)));
const steps = ["Event", "Menu", "Service", "Review"];

function FullServiceEstimate({
  menu,
  pricing,
  step,
  onContinue,
}: {
  menu?: FullServiceMenu;
  pricing: ReturnType<typeof calculateFullService>;
  step: Step;
  onContinue: () => void;
}) {
  return (
    <aside className="estimate-card fs-estimate" aria-label="Live Full Service estimate">
      <header>
        <p className="eyebrow">Required service stack included</p>
        <h2>Live estimate</h2>
      </header>
      {menu ? (
        <>
          <div className="estimate-menu">
            <span>{menu.category}</span>
            <strong>{menu.name}</strong>
            <small>{pricing.billedGuests} billed guests</small>
          </div>
          <dl>
            <div><dt>Food subtotal</dt><dd>{formatCurrency(pricing.food)}</dd></div>
            <div><dt>Equipment &amp; labor · 25%</dt><dd>{formatCurrency(pricing.labor)}</dd></div>
            <div><dt>Required gratuity · 15%</dt><dd>{formatCurrency(pricing.gratuity)}</dd></div>
            <div><dt>Tax · 7.75%</dt><dd>{formatCurrency(pricing.tax)}</dd></div>
          </dl>
          <div className="estimate-total"><span>Total</span><strong>{formatCurrency(pricing.total)}</strong></div>
          <p className="estimate-note">Tax includes the required gratuity. No card fee is added.</p>
          {step === 2 || step === 3 ? (
            <button className="estimate-continue" onClick={onContinue} type="button">
              {step === 2 ? "Plan service" : "Review proposal"} →
            </button>
          ) : null}
        </>
      ) : (
        <p className="estimate-empty">Choose a published menu to see the full service stack.</p>
      )}
    </aside>
  );
}

export function FullServiceFlow() {
  const [step, setStep] = useState<Step>(1);
  const [guests, setGuests] = useState(100);
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [category, setCategory] = useState("Barbecue");
  const [query, setQuery] = useState("");
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const menu = menuIndex === null ? undefined : menus[menuIndex];
  const selectedExtras = fullServiceExtras.filter((extra) => extraIds.includes(extra.id));
  const pricing = calculateFullService({
    actualGuests: guests,
    menuPrice: menu?.price ?? 0,
    minimum40: menu?.min40 ?? 0,
    extras: selectedExtras,
  });

  const visibleMenus = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return menus
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        const inCategory = normalized ? true : item.category === category;
        const matches = !normalized || `${item.name} ${item.summary} ${item.category}`.toLowerCase().includes(normalized);
        return inCategory && matches;
      });
  }, [category, query]);

  function goTo(next: Step) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleExtra(id: string) {
    setExtraIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  const eventComplete = Boolean(eventDate && guests > 0 && venue.trim().length > 1);

  return (
    <main className="flow-page full-service-page">
      <SiteHeader compact />
      <div className="flow-progress-shell fs-progress">
        <div className="flow-kicker">Full Service · San Diego</div>
        <ol className="flow-progress" aria-label="Estimate progress">
          {steps.map((label, index) => (
            <li className={step === index + 1 ? "active" : step > index + 1 ? "complete" : ""} key={label}>
              <button disabled={index + 1 > step} onClick={() => goTo((index + 1) as Step)} type="button">
                <span>{step > index + 1 ? "✓" : index + 1}</span>{label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="flow-layout">
        <section className="flow-main" id="full-service-builder">
          {step === 1 ? (
            <>
              <div className="flow-title">
                <p className="eyebrow">Step 1 of 4</p>
                <h1>Tell us what you’re gathering for.</h1>
                <p>A thoughtful first estimate starts with the room, the date and the number of people around the table.</p>
              </div>
              <div className="form-card fs-intro-card">
                <div className="field-grid">
                  <label><span>Event type</span><select onChange={(event) => setEventType(event.target.value)} value={eventType}><option>Wedding</option><option>Corporate event</option><option>Celebration</option><option>Fundraiser</option><option>Picnic</option><option>Other gathering</option></select></label>
                  <label><span>Guest count</span><input inputMode="numeric" min="1" onChange={(event) => setGuests(Number(event.target.value))} type="number" value={guests} /><small>{pricing.billedGuests} billed · 40-guest minimum</small></label>
                  <label><span>Event date</span><input onChange={(event) => setEventDate(event.target.value)} type="date" value={eventDate} /></label>
                  <label><span>Meal or event start <em>Optional</em></span><input onChange={(event) => setStartTime(event.target.value)} type="time" value={startTime} /></label>
                  <label><span>Venue name</span><input autoComplete="organization" onChange={(event) => setVenue(event.target.value)} placeholder="Venue or private residence" value={venue} /></label>
                  <label><span>Venue address <em>Optional</em></span><input autoComplete="street-address" onChange={(event) => setAddress(event.target.value)} placeholder="San Diego area" value={address} /></label>
                </div>
                <div className="service-promise">
                  <span>Every estimate includes</span>
                  <strong>Food + 25% equipment &amp; labor + required gratuity + tax</strong>
                  <small>The complete stack is itemized from the beginning.</small>
                </div>
              </div>
              <div className="flow-actions"><span>This is an estimate, not a booking or card charge.</span><button className="button button-primary" disabled={!eventComplete} onClick={() => goTo(2)} type="button">Explore menus →</button></div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="flow-title">
                <p className="eyebrow">Step 2 of 4 · {menus.length} published packages</p>
                <h1>Find the menu that feels like you.</h1>
                <p>From relaxed barbecue to plated dinners, package names and pricing reflect Bekker’s published catalog.</p>
              </div>
              <div className="menu-tools fs-menu-tools">
                <label className="search-field"><span>Search all packages</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Try Cowboy, Italian or vegan" type="search" value={query} /></label>
                <div className="category-tabs" role="tablist" aria-label="Full Service menu categories">
                  {categories.map((item) => <button aria-selected={category === item} key={item} onClick={() => { setCategory(item); setQuery(""); }} role="tab" type="button">{item}</button>)}
                </div>
              </div>
              <div className="menu-grid fs-menu-grid">
                {visibleMenus.map(({ item, index }) => (
                  <article className={menuIndex === index ? "menu-card selected" : "menu-card"} key={`${item.category}-${item.name}`}>
                    <div className="menu-card-top"><span>{item.category}</span><strong>{formatCurrency(item.price)} <small>/ person · 100+</small></strong></div>
                    <h2>{item.name}</h2>
                    <p>{item.summary}</p>
                    <div className="minimum-line"><span>40-guest minimum food</span><strong>{formatCurrency(item.min40)}</strong></div>
                    <button aria-pressed={menuIndex === index} onClick={() => setMenuIndex(index)} type="button">{menuIndex === index ? "Selected" : "Choose this menu"}</button>
                  </article>
                ))}
              </div>
              {!visibleMenus.length ? <div className="empty-search"><strong>No package matched here.</strong><span>Try another category or call 619-287-9027.</span></div> : null}
              <div className="flow-actions"><button className="button button-quiet" onClick={() => goTo(1)} type="button">← Back</button><button className="button button-primary" disabled={!menu} onClick={() => goTo(3)} type="button">Plan service →</button></div>
            </>
          ) : null}

          {step === 3 && menu ? (
            <>
              <div className="flow-title">
                <p className="eyebrow">Step 3 of 4</p>
                <h1>Round out the table.</h1>
                <p>Add only published extras. Rentals, timing and special requests stay as notes until the office confirms them.</p>
              </div>
              <article className="selected-menu-strip"><span>{menu.category}</span><div><h2>{menu.name}</h2><p>{formatCurrency(menu.price)} per guest · {formatCurrency(menu.min40)} food minimum</p></div><button onClick={() => goTo(2)} type="button">Change menu</button></article>
              <section className="option-card extras-card">
                <div className="option-heading"><div><p className="eyebrow">Published dessert additions</p><h2>A sweet finish, if you want one.</h2></div><span>Included in food subtotal</span></div>
                <div className="extras-grid always-open">
                  {fullServiceExtras.map((extra) => <label key={extra.id}><input checked={extraIds.includes(extra.id)} onChange={() => toggleExtra(extra.id)} type="checkbox" /><span><strong>{extra.name}</strong><small>{extra.description}</small><em>{extra.tags?.join(" · ")}</em></span><b>{formatCurrency(extra.price)} / person</b></label>)}
                </div>
              </section>
              <section className="option-card notes-card">
                <div className="option-heading"><div><p className="eyebrow">For the catering team</p><h2>Venue, service or dietary notes</h2></div></div>
                <label htmlFor="event-notes">Notes <span>Optional</span></label>
                <textarea id="event-notes" onChange={(event) => setNotes(event.target.value)} placeholder="Tell us about access, service style, dietary questions or the feeling you want for the event." rows={5} value={notes} />
                <p>Unknown pricing stays out of the estimate. Bekker’s will confirm rentals, service timing and special requests at <a href="tel:16192879027">619-287-9027</a>.</p>
              </section>
              <div className="locked-stack">
                <span>Locked Full Service math</span>
                <div><strong>25%</strong><small>equipment &amp; labor<br />of food</small></div>
                <div><strong>15%</strong><small>required gratuity<br />of food + labor</small></div>
                <div><strong>7.75%</strong><small>tax<br />including gratuity</small></div>
              </div>
              <div className="flow-actions"><button className="button button-quiet" onClick={() => goTo(2)} type="button">← Back</button><button className="button button-primary" onClick={() => goTo(4)} type="button">Review proposal →</button></div>
            </>
          ) : null}

          {step === 4 && menu ? (
            <>
              <div className="flow-title"><p className="eyebrow">Step 4 of 4</p><h1>A clear first proposal.</h1><p>Print it, talk it through and let Bekker’s turn the estimate into a detailed event plan.</p></div>
              <section className="proposal-card fs-proposal">
                <header><div><p className="eyebrow">Bekker’s Catering · Full Service</p><h2>{eventType} estimate</h2></div><div><span>{eventDate || "Date pending"}</span><strong>{guests} actual · {pricing.billedGuests} billed</strong></div></header>
                <div className="proposal-summary"><div><span>Selected menu</span><strong>{menu.name}</strong><small>{menu.summary}</small></div><div><span>Venue</span><strong>{venue}</strong><small>{address || "Address pending"}{startTime ? ` · ${startTime}` : ""}</small></div></div>
                <div className="proposal-lines">
                  <div><span>Menu food</span><small>{pricing.menuFood === menu.min40 ? "40-guest minimum" : `${pricing.billedGuests} × ${formatCurrency(menu.price)}`}</small><strong>{formatCurrency(pricing.menuFood)}</strong></div>
                  {selectedExtras.map((extra) => <div key={extra.id}><span>{extra.name}</span><small>{pricing.billedGuests} × {formatCurrency(extra.price)}</small><strong>{formatCurrency(extra.price * pricing.billedGuests)}</strong></div>)}
                  <div className="proposal-subtotal"><span>Food subtotal</span><small></small><strong>{formatCurrency(pricing.food)}</strong></div>
                  <div><span>Equipment &amp; labor · 25% of food</span><small>Required</small><strong>{formatCurrency(pricing.labor)}</strong></div>
                  <div><span>Gratuity · 15% of food + labor</span><small>Required</small><strong>{formatCurrency(pricing.gratuity)}</strong></div>
                  <div><span>Tax · 7.75% of food + labor + gratuity</span><small>Includes gratuity</small><strong>{formatCurrency(pricing.tax)}</strong></div>
                </div>
                <footer><span>Total</span><strong>{formatCurrency(pricing.total)}</strong></footer>
                <p className="proposal-disclaimer">Estimate only. Availability, staffing, venue access and final service details are confirmed by Bekker’s Catering. No card has been charged.</p>
              </section>
              {notes ? <section className="print-notes"><span>Event notes</span><p>{notes}</p></section> : null}
              <section className="contact-card"><div><p className="eyebrow">Contact for this proposal</p><h2>Who is planning the gathering?</h2><p>These details print with the proposal. Call when you are ready to review the event with the catering team.</p></div><div className="contact-fields"><label><span>Name</span><input autoComplete="name" onChange={(event) => setContact({ ...contact, name: event.target.value })} value={contact.name} /></label><label><span>Email</span><input autoComplete="email" onChange={(event) => setContact({ ...contact, email: event.target.value })} type="email" value={contact.email} /></label><label><span>Phone</span><input autoComplete="tel" onChange={(event) => setContact({ ...contact, phone: event.target.value })} type="tel" value={contact.phone} /></label></div></section>
              <div className="review-actions"><button className="button button-quiet" onClick={() => goTo(3)} type="button">← Edit proposal</button><button className="button button-secondary" onClick={() => window.print()} type="button">Print proposal</button><a className="button button-primary" href="tel:16192879027">Call 619-287-9027</a></div>
            </>
          ) : null}
        </section>
        <FullServiceEstimate
          menu={menu}
          onContinue={() => goTo(step === 2 ? 3 : 4)}
          pricing={pricing}
          step={step}
        />
      </div>

      {menu ? <div className="sticky-total"><div><span>Total</span><strong>{formatCurrency(pricing.total)}</strong><small>Full service · required gratuity included</small></div><button onClick={() => step < 4 ? goTo((step + 1) as Step) : window.print()} type="button">{step < 4 ? "Continue" : "Print"} →</button></div> : null}
    </main>
  );
}
