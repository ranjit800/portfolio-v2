import NeumorphicLink from "@/components/common/NeumorphicLink";
import { CONTACT_DETAILS } from "@/data/contact";

export default function ContactPreview() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-white/10 bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 sm:px-10 sm:py-14 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:px-16 lg:py-18">
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -bottom-24 -z-10 h-72 w-72 rounded-full bg-accent/[0.07] blur-3xl" />
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-accent">
              LET&apos;S CONNECT
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
              Have an idea?<br />Let&apos;s make it <span className="text-accent">happen.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-subtext sm:text-lg">
              Whether you have a project in mind or just want to say hello,
              I&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:mt-0 lg:flex-none">
            <NeumorphicLink href="/contact" className="px-6 py-3 text-sm">Let&apos;s Talk</NeumorphicLink>
            <a href={`mailto:${CONTACT_DETAILS.email}`} className="break-all text-sm text-subtext underline decoration-white/20 underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">{CONTACT_DETAILS.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
