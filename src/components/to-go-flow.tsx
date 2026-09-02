"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { featuredToGoIds, toGoCategories, toGoMenus } from "@/data/to-go-menus";
import type { ToGoMenu } from "@/data/to-go-menus";
import { toGoExtras } from "@/data/extras";
import sideOptionsSource from "@/data/side-options.json";
import { calculateToGo, formatCurrency } from "@/lib/pricing";

type Step = 1 | 2 | 3 | 4;
type OrderType = "Delivery" | "Pickup";
type SideChoice = { name: string; delta: number; tags: string[] };

type SideOption = {
  id: string;
  name: string;
  tier: string;
  tags: string[];
  delta: number;
};

const sideOptions: SideOption[] = [
  {
    id: "bbq-baked-beans",
    name: "Famous BBQ Baked Beans",
    tier: "Deluxe",
    tags: ["GF"],
    delta: 0.25,
  },
  ...(sideOptionsSource as SideOption[]),
];

const breadOptions: SideOption[] = [
  { id: "rolls", name: "Rolls and Butter", tier: "Included", tags: ["Veg"], delta: 0 },
  { id: "artisan-rolls", name: "Artisan Rolls and Butter", tier: "Bread", tags: ["V"], delta: 0.25 },
  { id: "focaccia", name: "Herb Focaccia and Butter", tier: "Bread", tags: ["V"], delta: 0.25 },
  { id: "garlic-bread", name: "Garlic Bread", tier: "Bread", tags: ["Veg"], delta: 0.25 },
  { id: "cornbread", name: "Cornbread with Butter and Honey", tier: "Bread", tags: ["Veg"], delta: 0.75 },
];

const steps = ["Details", "Menu", "Customize", "Review"];

function isBread(name: string) {
  return /roll|focaccia|garlic bread|cornbread/i.test(name);
}

function initialSides(menu: ToGoMenu): SideChoice[] {
  return (menu.includedSides ?? []).map((name) => ({ name, delta: 0, tags: [] }));
}

function AddressAutocomplete({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (value.trim().length < 4 || !active) {
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const endpoint = new URL("https://photon.komoot.io/api/");
        endpoint.searchParams.set("q", `${value}, San Diego, CA`);
        endpoint.searchParams.set("lat", "32.7157");
        endpoint.searchParams.set("lon", "-117.1611");
        endpoint.searchParams.set("limit", "5");
        const response = await fetch(endpoint, { signal: controller.signal });
        if (!response.ok) return;
        const data = (await response.json()) as {
          features?: Array<{ properties?: Record<string, string> }>;
        };
        const found = (data.features ?? []).map(({ properties = {} }) => {
          const street = [properties.housenumber, properties.street || properties.name]
            .filter(Boolean)
            .join(" ");
          const city = properties.city || properties.locality || properties.county;
          return [street, city, properties.state, properties.postcode]
            .filter(Boolean)
            .join(", ");
        });
        setSuggestions(Array.from(new Set(found.filter(Boolean))));
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setSuggestions([]);
        }
      }
    }, 280);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [active, value]);

  const visibleSuggestions = active && value.trim().length >= 4 ? suggestions : [];

  return (
    <div className="address-field">
      <label htmlFor="delivery-address">Delivery address</label>
      <input
        autoComplete="street-address"
        id="delivery-address"
        onBlur={() => window.setTimeout(() => setActive(false), 150)}
        onChange={(event) => {
          setSuggestions([]);
          onChange(event.target.value);
        }}
        onFocus={() => setActive(true)}
        placeholder="Start typing a San Diego address"
        type="text"
        value={value}
      />
      {visibleSuggestions.length > 0 ? (
        <div className="address-suggestions" role="listbox" aria-label="Address suggestions">
          {visibleSuggestions.map((suggestion) => (
            <button
              aria-selected="false"
              key={suggestion}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(suggestion);
                setSuggestions([]);
                setActive(false);
              }}
              role="option"
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}
      <small>Choose a suggestion or enter the address manually.</small>
    </div>
  );
}

function SideSwapDialog({
  current,
  onClose,
  onConfirm,
}: {
  current: SideChoice;
  onClose: () => void;
  onConfirm: (choice: SideChoice) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SideOption | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const options = isBread(current.name) ? breadOptions : sideOptions;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    searchRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), [href], textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const filtered = options.filter(
    (option) =>
      option.name !== current.name &&
      `${option.name} ${option.tier} ${option.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        aria-labelledby="swap-title"
        aria-modal="true"
        className="swap-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <header>
          <div>
            <p className="eyebrow">Replace one item</p>
            <h2 id="swap-title">Replace {current.name}</h2>
          </div>
          <button aria-label="Close side swap" className="icon-button" onClick={onClose} type="button">
            ×
          </button>
        </header>
        {isBread(current.name) ? (
          <p className="policy-note">
            Soft Hawaiian Rolls and Butter is the same included product as Rolls and Butter—there is no upcharge.
          </p>
        ) : null}
        <p className="dietary-legend">GF = gluten free · V = vegan · Veg = vegetarian</p>
        <label className="search-field" htmlFor="side-search">
          <span>Search side dishes</span>
          <input
            id="side-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try salad, potatoes or GF"
            ref={searchRef}
            type="search"
            value={query}
          />
        </label>
        <div className="swap-options" role="radiogroup" aria-label="Replacement choices">
          {filtered.map((option) => (
            <label className="swap-option" key={option.id}>
              <input
                checked={selected?.id === option.id}
                name="replacement-side"
                onChange={() => setSelected(option)}
                type="radio"
              />
              <span>
                <strong>{option.name}</strong>
                <small>
                  {option.tier}
                  {option.tags.length ? ` · ${option.tags.join(" · ")}` : ""}
                </small>
              </span>
              <b>{option.delta ? `+${formatCurrency(option.delta)} / person` : "Included"}</b>
            </label>
          ))}
        </div>
        <footer>
          <button className="button button-quiet" onClick={onClose} type="button">Cancel</button>
          <button
            className="button button-primary"
            disabled={!selected}
            onClick={() => {
              if (!selected) return;
              onConfirm({ name: selected.name, delta: selected.delta, tags: selected.tags });
            }}
            type="button"
          >
            Confirm replacement
          </button>
        </footer>
      </section>
    </div>
  );
}

function AskBecky({
  orderType,
  billedGuests,
  total,
  menuName,
}: {
  orderType: OrderType;
  billedGuests: number;
  total: number;
  menuName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask about the minimum, delivery fee, tax or this estimate.",
  );

  function reply(nextQuestion = question) {
    const normalized = nextQuestion.toLowerCase();
    if (/minimum|under 50|guest/.test(normalized)) {
      setAnswer("You may enter the actual count. To Go orders are billed for at least 50 guests, and billed counts under 100 include a separate $2-per-person adjustment.");
    } else if (/delivery|pickup|fee/.test(normalized)) {
      setAnswer(orderType === "Delivery" ? "This estimate includes the starting $125 delivery fee. Bekker’s will confirm the final delivery details." : "Pickup has no delivery fee. The same under-100 pricing rule still applies.");
    } else if (/tax/.test(normalized)) {
      setAnswer("Tax is 7.75% of the taxable To Go subtotal: menu, under-100 adjustment, extras and the delivery fee when delivery is selected.");
    } else if (/total|price|estimate/.test(normalized)) {
      setAnswer(`${menuName ?? "Your menu"} for ${billedGuests} billed guests currently estimates at ${formatCurrency(total)}, including tax.`);
    } else if (/gluten|vegan|vegetarian|allerg/.test(normalized)) {
      setAnswer("GF, V and Veg markers come from Bekker’s published menu. For allergies or an unlisted dietary need, call 619-287-9027 so the office can confirm it.");
    } else {
      setAnswer("I don’t want to guess about that policy. Please call Bekker’s at 619-287-9027 and the catering team will confirm it.");
    }
    setQuestion("");
  }

  return (
    <div className="becky-wrap">
      {open ? (
        <section className="becky-panel" aria-label="Ask Becky help">
          <header>
            <div><strong>Ask Becky</strong><small>Estimate help</small></div>
            <button aria-label="Close Ask Becky" onClick={() => setOpen(false)} type="button">×</button>
          </header>
          <p>{answer}</p>
          <div className="becky-quick">
            {["Minimum", "Delivery fee", "Tax"].map((label) => (
              <button key={label} onClick={() => reply(label)} type="button">{label}</button>
            ))}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); reply(); }}>
            <label htmlFor="becky-question">Your question</label>
            <div>
              <input id="becky-question" onChange={(event) => setQuestion(event.target.value)} value={question} />
              <button type="submit">Ask</button>
            </div>
          </form>
        </section>
      ) : null}
      <button className="becky-button" onClick={() => setOpen((value) => !value)} type="button">
        Ask Becky
      </button>
    </div>
  );
}

function EstimateCard({
  orderType,
  menu,
  pricing,
  step,
  onContinue,
}: {
  orderType: OrderType;
  menu?: ToGoMenu;
  pricing: ReturnType<typeof calculateToGo>;
  step: Step;
  onContinue: () => void;
}) {
  return (
    <aside className="estimate-card" aria-label="Live estimate">
      <header><p className="eyebrow">Updates as you build</p><h2>Live estimate</h2></header>
      {menu ? (
        <>
          <div className="estimate-menu"><span>Menu #{menu.id}</span><strong>{menu.name}</strong><small>{pricing.billedGuests} billed guests</small></div>
          <dl>
            <div><dt>Menu</dt><dd>{formatCurrency(pricing.menu)}</dd></div>
            {pricing.under100 ? <div><dt>Under-100 adjustment</dt><dd>{formatCurrency(pricing.under100)}</dd></div> : null}
            {pricing.sideUpgrades ? <div><dt>Side upgrades</dt><dd>{formatCurrency(pricing.sideUpgrades)}</dd></div> : null}
            {pricing.extras ? <div><dt>Extras</dt><dd>{formatCurrency(pricing.extras)}</dd></div> : null}
            {orderType === "Delivery" ? <div><dt>Delivery fee</dt><dd>{formatCurrency(pricing.delivery)}</dd></div> : null}
            <div className="subtotal"><dt>Taxable subtotal</dt><dd>{formatCurrency(pricing.taxableSubtotal)}</dd></div>
            <div><dt>Tax 7.75%</dt><dd>{formatCurrency(pricing.tax)}</dd></div>
          </dl>
          <div className="estimate-total"><span>Total</span><strong>{formatCurrency(pricing.total)}</strong></div>
          {step === 2 || step === 3 ? (
            <button className="estimate-continue" onClick={onContinue} type="button">
              {step === 2 ? "Customize selected menu" : "Review estimate"} →
            </button>
          ) : null}
        </>
      ) : (
        <p className="estimate-empty">Choose a published menu to see the itemized total.</p>
      )}
    </aside>
  );
}

export function ToGoFlow({
  initialOrderType,
}: {
  initialOrderType: OrderType;
}) {
  const [step, setStep] = useState<Step>(1);
  const [orderType, setOrderType] = useState<OrderType>(initialOrderType);
  const [guests, setGuests] = useState(100);
  const [eventDate, setEventDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [eatTime, setEatTime] = useState("");
  const [address, setAddress] = useState("");
  const [menuId, setMenuId] = useState<number | null>(null);
  const [entree, setEntree] = useState("");
  const [sides, setSides] = useState<SideChoice[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [category, setCategory] = useState("Featured");
  const [menuQuery, setMenuQuery] = useState("");
  const [swapIndex, setSwapIndex] = useState<number | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const menu = toGoMenus.find((item) => item.id === menuId);
  const selectedExtras = toGoExtras.filter((extra) => extras.includes(extra.id));
  const sideUpgradePerPerson = sides.reduce((sum, side) => sum + side.delta, 0);
  const pricing = calculateToGo({
    actualGuests: guests,
    menuPrice: menu?.price ?? 0,
    orderType,
    extras: selectedExtras,
    sideUpgradePerPerson,
  });

  const filteredMenus = useMemo(() => {
    const query = menuQuery.trim().toLowerCase();
    return toGoMenus.filter((item) => {
      const inCategory = category === "Featured" ? featuredToGoIds.has(item.id) : item.category === category;
      const matches = !query || `${item.name} ${item.summary} ${item.category}`.toLowerCase().includes(query);
      return inCategory && matches;
    });
  }, [category, menuQuery]);

  function goTo(next: Step) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseMenu(nextMenu: ToGoMenu) {
    setMenuId(nextMenu.id);
    setEntree(nextMenu.choices?.[0] ?? "");
    setSides(initialSides(nextMenu));
  }

  function toggleExtra(id: string) {
    setExtras((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function chooseOrderType(type: OrderType) {
    setOrderType(type);
    const url = new URL(window.location.href);
    url.searchParams.set("orderType", type);
    window.history.replaceState({}, "", url);
  }

  const detailComplete = Boolean(eventDate && guests > 0 && (orderType === "Pickup" || address.trim().length > 5));

  return (
    <main className="flow-page">
      <SiteHeader compact />
      <div className="flow-progress-shell">
        <div className="flow-kicker">To Go · {orderType}</div>
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
        <section className="flow-main" id="estimate-builder">
          {step === 1 ? (
            <>
              <div className="flow-title"><p className="eyebrow">Step 1 of 4</p><h1>Start with the gathering.</h1><p>Choose delivery or pickup, then add the few details that shape the estimate.</p></div>
              <div className="choice-pair" role="radiogroup" aria-label="Delivery or pickup">
                {(["Delivery", "Pickup"] as OrderType[]).map((type) => (
                  <label className={orderType === type ? "selected" : ""} key={type}>
                    <input checked={orderType === type} name="order-type" onChange={() => chooseOrderType(type)} type="radio" />
                    <strong>{type === "Delivery" ? "Catering delivery" : "Pickup / To Go"}</strong>
                    <span>{type === "Delivery" ? "Starts at $125" : "Mission Gorge Road"}</span>
                  </label>
                ))}
              </div>
              <div className="form-card">
                <div className="field-grid">
                  <label><span>Actual guest count</span><input inputMode="numeric" min="1" onChange={(event) => setGuests(Number(event.target.value))} type="number" value={guests} /><small>{pricing.billedGuests} billed{guests < 50 ? " · 50-guest minimum" : ""}</small></label>
                  <label><span>Event date</span><input min={new Date().toISOString().slice(0, 10)} onChange={(event) => setEventDate(event.target.value)} type="date" value={eventDate} /></label>
                  <label><span>{orderType === "Delivery" ? "Delivery time" : "Pickup time"} <em>Optional</em></span><input onChange={(event) => setDeliveryTime(event.target.value)} type="time" value={deliveryTime} /></label>
                  <label><span>Eat time <em>Optional</em></span><input onChange={(event) => setEatTime(event.target.value)} type="time" value={eatTime} /></label>
                </div>
                {orderType === "Delivery" ? <AddressAutocomplete onChange={setAddress} value={address} /> : <div className="pickup-note"><strong>Pickup location</strong><span>7455 Mission Gorge Road, San Diego, CA 92120</span></div>}
              </div>
              <div className="flow-actions"><span>Menus are priced at the published 100+ rate; the under-100 adjustment is shown separately.</span><button className="button button-primary" disabled={!detailComplete} onClick={() => goTo(2)} type="button">Choose a menu →</button></div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="flow-title"><p className="eyebrow">Step 2 of 4 · 50 published menus</p><h1>Choose the food first.</h1><p>Every price and package name below comes from Bekker’s current Delivery / Pick-up menu.</p></div>
              <div className="menu-tools">
                <div className="category-tabs" role="tablist" aria-label="Menu categories">
                  {toGoCategories.map((item) => <button aria-selected={category === item} key={item} onClick={() => setCategory(item)} role="tab" type="button">{item}</button>)}
                </div>
                <label className="search-field"><span>Search this category</span><input onChange={(event) => setMenuQuery(event.target.value)} placeholder="Try chicken, BBQ or vegan" type="search" value={menuQuery} /></label>
              </div>
              <div className="menu-grid">
                {filteredMenus.map((item) => (
                  <article className={menuId === item.id ? "menu-card selected" : "menu-card"} key={item.id}>
                    <div className="menu-card-top"><span>Menu #{item.id} · {item.category}</span><strong>{formatCurrency(item.price)} <small>/ person · 100+</small></strong></div>
                    <h2>{item.name}</h2>
                    <p>{item.summary}</p>
                  <button aria-pressed={menuId === item.id} onClick={() => chooseMenu(item)} type="button">{menuId === item.id ? "Selected" : "Choose this menu"}</button>
                  </article>
                ))}
              </div>
              <div className="flow-actions"><button className="button button-quiet" onClick={() => goTo(1)} type="button">← Back</button><button className="button button-primary" disabled={!menu} onClick={() => goTo(3)} type="button">Customize →</button></div>
            </>
          ) : null}

          {step === 3 && menu ? (
            <>
              <div className="flow-title"><p className="eyebrow">Step 3 of 4</p><h1>Make it yours.</h1><p>Keep the package intact or replace one included side at a time. Nothing changes until you confirm.</p></div>
              <article className="selected-menu-strip"><span>Menu #{menu.id}</span><div><h2>{menu.name}</h2><p>{formatCurrency(menu.price)} per billed guest</p></div><button onClick={() => goTo(2)} type="button">Change menu</button></article>
              {menu.choices?.length ? <fieldset className="option-card"><legend>Choose one entrée</legend><div className="choice-pair compact">{menu.choices.map((choice) => <label className={entree === choice ? "selected" : ""} key={choice}><input checked={entree === choice} name="entree" onChange={() => setEntree(choice)} type="radio" /><strong>{choice}</strong></label>)}</div></fieldset> : null}
              {sides.length ? <section className="option-card"><div className="option-heading"><div><p className="eyebrow">Included with the package</p><h2>Sides & named breads</h2></div><span>Pay-for-50 applies</span></div><div className="included-grid">{sides.map((side, index) => <article key={`${index}-${side.name}`}><div><small>Included item {index + 1}</small><strong>{side.name}</strong><span>{side.tags.join(" · ") || "Included"}{side.delta ? ` · +${formatCurrency(side.delta)} per guest` : ""}</span></div><button onClick={() => setSwapIndex(index)} type="button">Swap</button></article>)}</div></section> : null}
              <section className="option-card extras-card"><div className="option-heading"><div><p className="eyebrow">Optional</p><h2>Add only what you need.</h2></div></div>{Array.from(new Set(toGoExtras.map((extra) => extra.group))).map((group, groupIndex) => <details key={group} open={groupIndex === 0}><summary>{group}<span>{toGoExtras.filter((extra) => extra.group === group && extras.includes(extra.id)).length || ""}</span></summary><div className="extras-grid">{toGoExtras.filter((extra) => extra.group === group).map((extra) => <label key={extra.id}><input checked={extras.includes(extra.id)} onChange={() => toggleExtra(extra.id)} type="checkbox" /><span><strong>{extra.name}</strong><small>{extra.description}</small><em>{extra.tags?.join(" · ")}</em></span><b>{formatCurrency(extra.price)} {extra.unit === "person" ? "/ person" : "flat"}</b></label>)}</div></details>)}</section>
              <div className="flow-actions"><button className="button button-quiet" onClick={() => goTo(2)} type="button">← Back</button><button className="button button-primary" onClick={() => goTo(4)} type="button">Review estimate →</button></div>
            </>
          ) : null}

          {step === 4 && menu ? (
            <>
              <div className="flow-title"><p className="eyebrow">Step 4 of 4</p><h1>Your catering estimate.</h1><p>Clear, itemized and ready to print. Bekker’s will confirm availability, delivery distance and final details.</p></div>
              <section className="proposal-card">
                <header><div><p className="eyebrow">Bekker’s Catering · To Go</p><h2>{orderType} estimate</h2></div><div><span>{eventDate || "Date pending"}</span><strong>{guests} actual · {pricing.billedGuests} billed</strong></div></header>
                <div className="proposal-summary"><div><span>Selected menu</span><strong>#{menu.id} · {menu.name}</strong><small>{entree || menu.summary}</small></div><div><span>Service</span><strong>{orderType}</strong><small>{orderType === "Delivery" ? address : "7455 Mission Gorge Road"}</small></div></div>
                <div className="proposal-lines">
                  <div><span>Menu at published 100+ price</span><small>{pricing.billedGuests} × {formatCurrency(menu.price)}</small><strong>{formatCurrency(pricing.menu)}</strong></div>
                  {pricing.under100 ? <div><span>Under-100 adjustment</span><small>{pricing.billedGuests} × $2.00</small><strong>{formatCurrency(pricing.under100)}</strong></div> : null}
                  {sides.filter((side) => side.delta).map((side, index) => <div key={`${side.name}-${index}`}><span>{side.name} upgrade</span><small>{pricing.billedGuests} × {formatCurrency(side.delta)}</small><strong>{formatCurrency(side.delta * pricing.billedGuests)}</strong></div>)}
                  {selectedExtras.map((extra) => <div key={extra.id}><span>{extra.name}</span><small>{extra.unit === "person" ? `${pricing.billedGuests} × ${formatCurrency(extra.price)}` : "Flat price"}</small><strong>{formatCurrency(extra.price * (extra.unit === "person" ? pricing.billedGuests : 1))}</strong></div>)}
                  {orderType === "Delivery" ? <div><span>Delivery fee</span><small>Starting fee</small><strong>{formatCurrency(pricing.delivery)}</strong></div> : null}
                  <div className="proposal-subtotal"><span>Taxable subtotal</span><small></small><strong>{formatCurrency(pricing.taxableSubtotal)}</strong></div>
                  <div><span>Tax 7.75%</span><small></small><strong>{formatCurrency(pricing.tax)}</strong></div>
                </div>
                <footer><span>Total</span><strong>{formatCurrency(pricing.total)}</strong></footer>
              </section>
              <section className="contact-card"><div><p className="eyebrow">Contact for this estimate</p><h2>Who should the office ask for?</h2><p>These details print with your estimate. Call when you are ready for Bekker’s to review availability and final details.</p></div><div className="contact-fields"><label><span>Name</span><input autoComplete="name" onChange={(event) => setContact({ ...contact, name: event.target.value })} value={contact.name} /></label><label><span>Email</span><input autoComplete="email" onChange={(event) => setContact({ ...contact, email: event.target.value })} type="email" value={contact.email} /></label><label><span>Phone</span><input autoComplete="tel" onChange={(event) => setContact({ ...contact, phone: event.target.value })} type="tel" value={contact.phone} /></label></div></section>
              <div className="review-actions"><button className="button button-quiet" onClick={() => goTo(3)} type="button">← Edit estimate</button><button className="button button-secondary" onClick={() => window.print()} type="button">Print estimate</button><a className="button button-primary" href="tel:16192879027">Call 619-287-9027</a></div>
            </>
          ) : null}
        </section>
        <EstimateCard
          menu={menu}
          onContinue={() => goTo(step === 2 ? 3 : 4)}
          orderType={orderType}
          pricing={pricing}
          step={step}
        />
      </div>

      {menu ? <div className="sticky-total"><div><span>Total</span><strong>{formatCurrency(pricing.total)}</strong><small>{pricing.billedGuests} billed guests · tax included</small></div><button onClick={() => step < 4 ? goTo((step + 1) as Step) : window.print()} type="button">{step < 4 ? "Continue" : "Print"} →</button></div> : null}
      <AskBecky billedGuests={pricing.billedGuests} menuName={menu?.name} orderType={orderType} total={pricing.total} />

      {swapIndex !== null && sides[swapIndex] ? <SideSwapDialog current={sides[swapIndex]} onClose={() => setSwapIndex(null)} onConfirm={(choice) => { setSides((current) => current.map((item, index) => index === swapIndex ? choice : item)); setSwapIndex(null); }} /> : null}
    </main>
  );
}
