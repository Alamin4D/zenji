"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCartStore, useCartTotals, useHydrated } from "@/lib/store";

export default function CheckoutClient() {
  const hydrated = useHydrated();
  const { items, subtotal, shipping, total, count } = useCartTotals();
  const clearCart = useCartStore((state) => state.clearCart);
  const [placed, setPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderRef(`ZJ-${Math.floor(100000 + Math.random() * 899999)}`);
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="skeleton h-96 w-full" />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-crimson bg-crimson text-white">
          <Check className="h-9 w-9" />
        </span>
        <h2 className="mt-8 font-display text-3xl uppercase tracking-wide sm:text-4xl">
          Order placed
        </h2>
        <p className="mt-3 text-sm text-mist">
          Your order reference is{" "}
          <span className="font-semibold text-bone">{orderRef}</span>. A
          confirmation email is on its way — this demo does not process real
          payments.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="bg-bone px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-crimson hover:text-white"
          >
            Continue shopping
          </Link>
          <Link
            href="/lookbook"
            className="border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] transition-colors hover:border-bone"
          >
            View lookbook
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
          Nothing to check out
        </h2>
        <p className="mt-3 text-sm text-mist">
          Add a piece from the current drop to continue.
        </p>
        <Link
          href="/shop"
          className="mt-8 bg-bone px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-crimson hover:text-white"
        >
          Shop the drop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
      <form
        onSubmit={submit}
        className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16"
      >
        <div>
          <fieldset className="border-b border-white/10 pb-8">
            <legend className="font-display text-2xl uppercase tracking-wide">
              Contact
            </legend>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" autoComplete="given-name" />
              <Field label="Last name" name="lastName" autoComplete="family-name" />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                className="sm:col-span-2"
              />
            </div>
          </fieldset>

          <fieldset className="border-b border-white/10 py-8">
            <legend className="font-display text-2xl uppercase tracking-wide">
              Shipping
            </legend>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Address"
                name="address"
                autoComplete="street-address"
                className="sm:col-span-2"
              />
              <Field label="City" name="city" autoComplete="address-level2" />
              <Field label="Postcode" name="postcode" autoComplete="postal-code" />
              <Field label="Country" name="country" defaultValue="Australia" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </fieldset>

          <fieldset className="py-8">
            <legend className="font-display text-2xl uppercase tracking-wide">
              Payment
            </legend>
            <p className="mt-3 flex items-center gap-2 text-xs text-mist">
              <ShieldCheck className="h-4 w-4 text-crimson" />
              Demo checkout — no card is charged and no data leaves your browser.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Card number"
                name="card"
                placeholder="4242 4242 4242 4242"
                className="sm:col-span-2"
              />
              <Field label="Expiry" name="expiry" placeholder="MM / YY" />
              <Field label="CVC" name="cvc" placeholder="123" />
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-crimson px-8 py-5 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-crimson-soft sm:w-auto sm:px-14"
          >
            Place order — {formatPrice(total)}
          </button>
        </div>

        <aside className="h-fit border border-white/10 bg-ink-soft p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl uppercase tracking-wide">
            Order Summary
          </h2>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mist">
            {count} {count === 1 ? "item" : "items"}
          </p>

          <ul className="mt-6 space-y-4">
            {items.map((line) => (
              <li key={line.id} className="flex gap-4">
                <span className="relative h-20 w-16 shrink-0 overflow-hidden bg-ink">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-base uppercase tracking-wide">
                    {line.name}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-mist">
                    Size {line.size} · Qty {line.quantity}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">
                    {formatPrice(line.unitPrice * line.quantity)}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <dt className="font-display text-lg uppercase tracking-wide">
                Total
              </dt>
              <dd className="font-display text-2xl text-crimson-soft">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
        </aside>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  className?: string;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  className = "",
}: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-mist">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-white/15 bg-ink px-3 py-3 text-sm text-bone placeholder:text-mist/50 focus:border-crimson focus:outline-none"
      />
    </label>
  );
}
