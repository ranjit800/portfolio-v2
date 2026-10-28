"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import NeumorphicLink from "@/components/common/NeumorphicLink";
import { CONTACT_DETAILS, CONTACT_SOCIALS } from "@/data/contact";

const inputStyle = "mt-2 w-full rounded-xl border border-white/12 bg-black/20 px-4 py-3.5 text-base text-heading outline-none transition-colors placeholder:text-slate-600 hover:border-white/25 focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:opacity-60";
const topics = ["Project collaboration", "Full stack development", "AI & computer vision", "Career opportunity", "Just saying hello"];

function ContactIcon({ kind }) {
  const paths = {
    email: "M3 5h18v14H3zM3 6l9 7 9-7",
    phone: "M6 3h4l2 5-3 2a13 13 0 0 0 5 5l2-3 5 2v4a3 3 0 0 1-3 3C10 20 4 14 3 6a3 3 0 0 1 3-3Z",
    location: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d={paths[kind]} /></svg>;
}

function ContactForm({ canSend }) {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const statusRef = useRef(null);
  const inFlight = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    if (!canSend) {
      const subject = encodeURIComponent(`${values.topic} — ${values.name}`);
      const body = encodeURIComponent(`Hi Ranjit,\n\n${values.message}\n\n${values.name}\nReply to: ${values.email}`);
      window.location.href = `mailto:${CONTACT_DETAILS.email}?subject=${subject}&body=${body}`;
      setState("draft");
      setFeedback("Your email draft is ready in your email app. Review it and press Send there.");
      return;
    }

    inFlight.current = true;
    setState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again or email me directly.");
      setState("sent");
      setFeedback("Thanks for reaching out. Your message has been submitted successfully.");
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error.name === "TimeoutError" ? "The request timed out. Please email me directly, or try again shortly." : error.message || "Something went wrong. Please email me directly.");
    } finally {
      inFlight.current = false;
      statusRef.current?.focus();
    }
  }

  return (
    <div className="relative rounded-[1.75rem] border border-white/12 bg-[#0e141b]/90 p-6 shadow-[0_2rem_5rem_rgba(0,0,0,0.2)] sm:p-9 lg:p-10">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div><p className="font-mono text-[0.6rem] tracking-[0.18em] text-accent">START A CONVERSATION</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-heading">A little context goes a long way.</h2></div>
        <span aria-hidden="true" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-xl text-accent sm:flex">↗</span>
      </div>

      <form onSubmit={submit} aria-busy={state === "sending"}>
        <fieldset disabled={state === "sending"} className="space-y-6">
          <legend className="sr-only">Contact Ranjit</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block text-sm text-slate-300" htmlFor="contact-name">Your name <span className="text-accent">*</span><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="What should I call you?" className={inputStyle} /></label>
            <label className="block text-sm text-slate-300" htmlFor="contact-email">Email address <span className="text-accent">*</span><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" className={inputStyle} /></label>
          </div>
          <label className="block text-sm text-slate-300" htmlFor="contact-topic">What brings you here?<select id="contact-topic" name="topic" defaultValue={topics[0]} className={inputStyle}>{topics.map((topic) => <option key={topic} className="bg-surface">{topic}</option>)}</select></label>
          <label className="block text-sm text-slate-300" htmlFor="contact-message">Your message <span className="text-accent">*</span><textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={6} placeholder="Tell me a little about your idea, project, or what you have in mind…" className={`${inputStyle} min-h-40 resize-y`} /></label>
          <div aria-hidden="true" className="hidden"><label htmlFor="contact-website">Leave this empty<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <p id="contact-delivery" className="text-xs leading-6 text-slate-400">{canSend ? "Your message goes directly to my inbox. I’ll use your email only to reply to your enquiry." : "This opens a prefilled draft in your email app. Review it and send when you’re ready."}</p>
          <motion.button
            type="submit"
            aria-describedby="contact-delivery"
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98, y: 0 }}
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[#ffba67]/60 bg-linear-to-br from-[#ff9d2e] to-[#ed7600] px-7 py-3.5 text-sm font-semibold text-surface shadow-[0.35rem_0.45rem_0.9rem_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.45)] transition-[filter,box-shadow] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:shadow-[inset_0_2px_6px_rgba(117,47,0,0.35)] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {state === "sending" ? "Sending…" : canSend ? "Send Message" : "Open Email Draft"}
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </motion.button>
        </fieldset>
        <p ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className={`mt-5 text-sm leading-6 outline-none ${state === "error" ? "text-red-300" : "text-slate-300"}`}>{feedback}</p>
      </form>
    </div>
  );
}

export default function ContactPage({ canSend }) {
  const reduceMotion = useReducedMotion();
  const details = [
    { kind: "email", label: "EMAIL", value: CONTACT_DETAILS.email, href: `mailto:${CONTACT_DETAILS.email}` },
    { kind: "phone", label: "PHONE", value: CONTACT_DETAILS.phone, href: CONTACT_DETAILS.phoneHref },
    { kind: "location", label: "BASED IN", value: CONTACT_DETAILS.location },
  ];

  return (
    <main id="contact" className="relative isolate overflow-x-clip bg-surface pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute top-20 right-0 -z-10 h-96 w-96 rounded-full bg-accent/[0.06] blur-[100px]" />
      <div className="container">
        <motion.header initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-14 max-w-4xl sm:mb-20">
          <p className="font-mono text-xs font-semibold tracking-[0.22em] text-accent">CONTACT / SAY HELLO</p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.045em] text-heading">Good things start<br />with a <span className="text-accent">conversation.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-subtext sm:text-lg">A product idea, an interesting problem, or just a hello. Tell me what you’re thinking — let’s see what we can build.</p>
        </motion.header>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="min-w-0">
            <p className="text-xl font-semibold tracking-tight text-heading">{CONTACT_DETAILS.name}</p>
            <p className="mt-2 text-sm text-subtext">{CONTACT_DETAILS.role}</p>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {details.map((detail) => {
                const content = <><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-accent"><ContactIcon kind={detail.kind} /></span><span className="min-w-0"><span className="block font-mono text-[0.6rem] tracking-[0.17em] text-slate-500">{detail.label}</span><span className="mt-1.5 block break-words text-sm text-heading sm:text-base">{detail.value}</span></span>{detail.href && <span aria-hidden="true" className="ml-auto text-subtext transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none">↗</span>}</>;
                return detail.href ? <a key={detail.kind} href={detail.href} className="group flex items-center gap-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{content}</a> : <div key={detail.kind} className="flex items-center gap-4 py-6">{content}</div>;
              })}
            </div>
            <p className="mt-9 font-mono text-[0.6rem] tracking-[0.18em] text-slate-500">ELSEWHERE ON THE INTERNET</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {CONTACT_SOCIALS.map((social) => <NeumorphicLink key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 text-xs">{social.name}</NeumorphicLink>)}
            </div>
            <a href={CONTACT_DETAILS.resume} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-subtext underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">A little more about my work — View CV <span aria-hidden="true">↗</span></a>
          </motion.div>
          <ContactForm canSend={canSend} />
        </div>
      </div>
    </main>
  );
}
