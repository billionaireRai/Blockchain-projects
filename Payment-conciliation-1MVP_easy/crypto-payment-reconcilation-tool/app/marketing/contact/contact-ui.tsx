
import React from "react";
import { ArrowUpRight, MessageSquare, BriefcaseBusiness, Handshake, Lightbulb, Mail, Send, Sparkles, Clock3, ShieldCheck, Code2, ChevronDown } from "lucide-react";

const opportunities = [
  {
    icon: BriefcaseBusiness,
    title: "Professional Work",
    description:
      "Have a project, technical challenge, or an idea that needs the right engineering approach? Let's discuss how we can work together.",
  },
  {
    icon: Handshake,
    title: "Business & Partnerships",
    description:
      "Interested in collaborating, exploring integrations, or building something valuable together? I'd love to hear about it.",
  },
  {
    icon: Lightbulb,
    title: "Product Feedback",
    description:
      "Tried Paylume and have suggestions, ideas, or feedback? Your perspective can help shape what comes next.",
  },
];

export function Contact() {
  return (
    <main className="relative overflow-hidden bg-white text-zinc-950">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-52 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-zinc-100/80 blur-[120px]" />
        <div className="absolute -right-50 top-225 h-100 w-100 rounded-full bg-zinc-100/70 blur-[110px]" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32 lg:px-12">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-zinc-600 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            OPEN TO MEANINGFUL COLLABORATIONS
          </div>

          <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
            Good things start with
            <span className="mt-2 block text-zinc-400">
              a conversation.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
            Enjoying Paylume? Have an interesting project, a business
            opportunity, or an idea worth exploring? I'd love to hear
            from you. Let's connect and create something meaningful.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-xl"
            >
              Start a conversation
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#opportunities"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-50 hover:shadow-md"
            >
              Explore opportunities
            </a>
          </div>

        </div>
      </section>

      {/* Contact cards */}
      <section
        id="opportunities"
        className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12"
      >
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-400">
            LET'S CONNECT
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            What would you like to discuss?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500">
            Whether you're here for business, collaboration, or simply
            to share an idea, there's always room for a good conversation.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {opportunities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-zinc-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-800 transition-all duration-300 group-hover:bg-zinc-950 group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {item.description}
                </p>

                <a
                  href="#contact-form"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-zinc-800 transition-colors hover:text-zinc-500"
                >
                  Let's talk
                  <ArrowUpRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main contact form */}
      <section
        id="contact-form"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="grid overflow-hidden rounded-4xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/4 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Left panel */}
          <div className="relative overflow-hidden bg-zinc-950 p-8 text-white sm:p-12 lg:p-14">

            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/[0.07]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-zinc-300">
                <MessageSquare size={14} />
                GET IN TOUCH
              </div>

              <h2 className="mt-10 max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Have something
                <span className="block text-zinc-500">in mind?</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-8 text-zinc-400">
                Every meaningful collaboration begins somewhere.
                Share what's on your mind and let's see where the
                conversation takes us.
              </p>

              <div className="mt-12 space-y-7">

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Professional inquiries
                    </p>
                    <p className="mt-1 text-xs leading-6 text-zinc-500">
                      Projects, opportunities, partnerships and ideas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6">
                    <Clock3 size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Thoughtful conversations
                    </p>
                    <p className="mt-1 text-xs leading-6 text-zinc-500">
                      Share the context and details of your inquiry.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Your information matters
                    </p>
                    <p className="mt-1 text-xs leading-6 text-zinc-500">
                      Your submitted details should be handled responsibly.
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-16 border-t border-white/10 pt-7">
                <p className="text-xs font-medium text-zinc-500">
                  BUILT WITH PURPOSE. OPEN TO POSSIBILITIES.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight">
                    Paylume
                  </span>
                  <Sparkles size={15} className="text-zinc-500" />
                </div>
              </div>

            </div>
          </div>

          {/* Right panel - Form */}
          <div className="p-8 sm:p-12 lg:p-14">

            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Send an inquiry
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-500">
                Tell me a little about yourself and what you'd like to
                discuss.
              </p>
            </div>

            <form
              action="/api/contact"
              method="POST"
              className="mt-9 space-y-6"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-sm font-semibold text-zinc-700"
                  >
                    Your name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-sm font-semibold text-zinc-700"
                  >
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5"
                  />
                </div>

              </div>

              <div>
                <label
                  htmlFor="inquiry"
                  className="mb-2.5 block text-sm font-semibold text-zinc-700"
                >
                  What would you like to discuss?
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    id="inquiry"
                    name="inquiry"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 pr-11 text-sm text-zinc-600 outline-none transition-all hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5"
                  >
                    <option value="" disabled>
                      Select an inquiry type
                    </option>
                    <option value="professional-work">
                      Professional Work
                    </option>
                    <option value="business-partnership">
                      Business & Partnerships
                    </option>
                    <option value="collaboration">
                      Collaboration
                    </option>
                    <option value="product-feedback">
                      Product Feedback
                    </option>
                    <option value="other">
                      Something Else
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2.5 block text-sm font-semibold text-zinc-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="A brief introduction to your inquiry"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5"
                />
              </div>

              <div>
                <div className="mb-2.5 flex items-center justify-between gap-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-zinc-700"
                  >
                    Your message <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-zinc-400">
                    Be as detailed as you'd like
                  </span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Hey! I recently came across Paylume and really liked what you're building. I'd love to discuss..."
                  className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3.5 text-sm leading-7 outline-none transition-all placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5"
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-zinc-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-xl active:translate-y-0"
              >
                <Send
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
                Send your inquiry
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <p className="text-center text-xs leading-6 text-zinc-400">
                By submitting this form, you agree to have your information
                used to respond to your inquiry.
              </p>

            </form>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-12">

        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-400">
            A FEW THINGS TO KNOW
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Before you reach out
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-500">
            A little clarity before we get the conversation started.
          </p>
        </div>

        <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">

          {[
            {
              question: "Can I reach out for professional work?",
              answer:
                "Absolutely. Share your project requirements, goals, and relevant context. We can discuss potential opportunities and whether there's a good fit.",
            },
            {
              question: "Can I suggest a feature or improvement for Paylume?",
              answer:
                "Definitely. Product feedback, feature ideas, and suggestions are welcome. They help identify opportunities to improve the Paylume experience.",
            },
            {
              question: "Can I discuss a business partnership or integration?",
              answer:
                "Yes. Use the inquiry form and select Business & Partnerships. Include a brief overview of your organization and the opportunity you're exploring.",
            },
            {
              question: "What should I include in my message?",
              answer:
                "Introduce yourself, explain the purpose of your inquiry, and include any relevant links, requirements, or project details that would help provide context.",
            },
          ].map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-sm font-semibold text-zinc-800 marker:hidden">
                {item.question}

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all duration-300 group-open:rotate-180 group-open:bg-zinc-950 group-open:text-white group-open:border-zinc-950">
                  <ChevronDown size={16} />
                </span>
              </summary>

              <p className="mt-4 max-w-3xl pr-10 text-sm leading-7 text-zinc-500">
                {item.answer}
              </p>
            </details>
          ))}

        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 lg:px-12">

        <div className="relative overflow-hidden rounded-4xl bg-zinc-100 px-7 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-40 h-80 w-80 rounded-full border border-zinc-300/60" />
          <div className="pointer-events-none absolute -left-10 -top-32 h-60 w-60 rounded-full border border-zinc-300/60" />
          <div className="pointer-events-none absolute -bottom-48 -right-20 h-96 w-96 rounded-full border border-zinc-300/60" />

          <div className="relative z-10 mx-auto max-w-2xl">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <Code2 size={22} />
            </div>

            <h2 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
              The next great idea could start here.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-zinc-500 sm:text-base">
              Whether you have a vision to share, a challenge to solve,
              or an opportunity worth exploring, don't hesitate to reach out.
            </p>

            <a
              href="#contact-form"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-xl"
            >
              Let's connect
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

          </div>
        </div>
      </section>

    </main>
  );
}
