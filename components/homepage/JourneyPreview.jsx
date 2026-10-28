const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Foundation",
    description: "Building a strong base in interface craft, responsive layouts and modern web fundamentals.",
  },
  {
    number: "02",
    title: "Full Stack Focus",
    description: "Growing from polished frontend experiences into complete, practical web applications.",
  },
  {
    number: "03",
    title: "What’s Next",
    description: "Continuing to learn, ship meaningful products and solve problems that matter.",
  },
];

export default function JourneyPreview() {
  return (
    <section className="border-t border-white/10 bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-accent">
            THE JOURNEY
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-heading sm:text-4xl lg:text-5xl">
            Always Building Forward
          </h2>
        </div>

        <ol className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3">
          {JOURNEY_STEPS.map((step) => (
            <li
              key={step.number}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <span className="text-sm font-bold tracking-widest text-accent">
                {step.number}
              </span>
              <h3 className="mt-10 text-2xl font-bold text-heading">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-subtext">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <span className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-subtext lg:mt-12">
          Learn More About Me
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </section>
  );
}
