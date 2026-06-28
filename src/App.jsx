import { useState, useEffect, useRef } from "react";

const products = [
  // Starter / gateway
  {
    id: "first-30-prompts",
    title: "Your First 30 Prompts",
    subtitle: "Non-Technical Edition",
    desc: "30 prompts across 6 categories: writing, understanding documents, planning, research, explaining things to others, and everyday decisions. Works with Claude, ChatGPT, or Gemini.",
    platform: "Any AI",
    price: "$9",
    category: "starter",
    available: true,
    gumroad: "https://mysterwolf.gumroad.com/l/nontechai",
  },
  {
    id: "first-30-plus-25",
    title: "Your First 30 Prompts + 25 More",
    subtitle: "Semi-Technical Edition",
    desc: "Everything in the Non-Technical Edition, plus 25 prompts for reading code, debugging logic, technical writing, documentation, and evaluating tools and systems.",
    platform: "Any AI",
    price: "$14",
    category: "starter",
    available: true,
    gumroad: null,
  },
  // Role-specific
  {
    id: "field-pm-copilot",
    title: "Field PM Copilot Playbook",
    desc: "For field project managers using M365 Copilot",
    platform: "M365",
    price: "$29",
    category: "role",
    available: true,
    gumroad: "https://mysterwolf.gumroad.com/l/PMAIPlaybook",
  },
  {
    id: "data-quality-copilot",
    title: "Data Quality Copilot Playbook",
    desc: "For Finance Operations and CDM professionals",
    platform: "M365",
    price: "$24",
    category: "role",
    available: true,
    gumroad: "https://forgeprompt.gumroad.com/l/data-quality-copilot",
  },
  {
    id: "people-manager-pack",
    title: "People Manager Prompt Pack",
    desc: "For people managers and team leads using M365 Copilot",
    platform: "M365",
    price: "$29",
    category: "role",
    available: true,
    gumroad: "https://mysterwolf.gumroad.com/l/peoplepack",
  },
  {
    id: "social-worker-gemini",
    title: "Social Worker's Gemini Playbook",
    desc: "For social services professionals using Google Gemini",
    platform: "Gemini",
    price: "Coming soon",
    category: "role",
    available: false,
    gumroad: null,
  },
  {
    id: "admin-assistant-copilot",
    title: "Admin Assistant Copilot Playbook",
    desc: "For executive and administrative assistants using M365 Copilot",
    platform: "M365",
    price: "Coming soon",
    category: "role",
    available: false,
    gumroad: null,
  },
  // Developer series
  {
    id: "developer-prompt-pack",
    title: "Developer Prompt Pack",
    subtitle: "Developer Series",
    desc: "27 copy-paste prompts for developers. Reading and explaining code, debugging, technical communication, writing documentation, and evaluating tools and systems.",
    platform: "Claude · ChatGPT · Gemini",
    price: "$19",
    category: "developer",
    available: true,
    gumroad: null,
  },
  // Everyday life
  {
    id: "ai-everyday-life",
    title: "AI for Everyday Life",
    subtitle: "35 Prompts for the World Outside Work",
    desc: "35 prompts across 7 categories: travel, cooking, shopping, news, health and fitness, money, and learning anything new. Works with any AI.",
    platform: "Any AI",
    price: "$9",
    category: "everyday",
    available: true,
    gumroad: null,
  },
];

const steps = [
  {
    n: "01",
    label: "Download",
    desc: "Purchase your playbook and download the PDF. No account required.",
  },
  {
    n: "02",
    label: "Open your AI tool",
    desc: "Open M365 Copilot, Google Gemini, or whichever platform your playbook targets.",
  },
  {
    n: "03",
    label: "Paste and go",
    desc: "Copy the prompt, paste it into your AI tool, and get professional-grade output immediately.",
  },
];

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setV(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, y = 20 }) {
  const [ref, v] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function PlatformBadge({ platform }) {
  const colors = {
    M365:   { bg: "#E8EEF5", text: "#1B3A5C", border: "#B8C9DC" },
    Gemini: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
    "Any AI": { bg: "#F5F3FF", text: "#4C3D9E", border: "#DDD6FE" },
    "Claude · ChatGPT · Gemini": { bg: "#F1F5F9", text: "#0F172A", border: "#CBD5E1" },
  };
  const c = colors[platform] || colors.M365;
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.06em",
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      fontFamily: "var(--fp-mono)",
    }}>
      {platform}
    </span>
  );
}

function ProductCard({ p, index }) {
  const [hov, setHov] = useState(false);
  const [ref, v] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(18px)",
        transition: `opacity 0.6s ease ${(index % 2) * 0.1}s, transform 0.6s ease ${(index % 2) * 0.1}s`,
      }}
    >
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "28px 28px 24px",
          background: "#fff",
          border: `1px solid ${hov && p.available ? "#1B3A5C44" : "#E5E7EB"}`,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          height: "100%",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: hov && p.available
            ? "0 4px 24px rgba(27,58,92,0.08)"
            : "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div>
          <PlatformBadge platform={p.platform} />
        </div>
        <div>
          <div style={{
            fontSize: 17,
            fontWeight: 600,
            color: "#1A1A1A",
            lineHeight: 1.3,
            marginBottom: p.subtitle ? 4 : 8,
            fontFamily: "var(--fp-sans)",
          }}>
            {p.title}
          </div>
          {p.subtitle && (
            <div style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "var(--fp-mono)", letterSpacing: "0.03em", marginBottom: 8 }}>
              {p.subtitle}
            </div>
          )}
          <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
            {p.desc}
          </div>
        </div>
        <div style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: 16,
          borderTop: "1px solid #F3F4F6",
        }}>
          {p.available && p.gumroad ? (
            <a
              href={p.gumroad}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "9px 20px",
                background: "#1B3A5C",
                color: "#fff",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "background 0.15s, transform 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#142D47";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#1B3A5C";
                e.currentTarget.style.transform = "none";
              }}
            >
              Get it now
            </a>
          ) : p.available ? (
            <span style={{
              display: "inline-block",
              padding: "9px 16px",
              background: "#F9FAFB",
              color: "#9CA3AF",
              borderRadius: 6,
              fontSize: 12,
              fontFamily: "var(--fp-mono)",
              letterSpacing: "0.04em",
              border: "1px solid #E5E7EB",
            }}>
              Available soon
            </span>
          ) : (
            <span style={{
              display: "inline-block",
              padding: "9px 16px",
              background: "#F9FAFB",
              color: "#9CA3AF",
              borderRadius: 6,
              fontSize: 12,
              fontFamily: "var(--fp-mono)",
              letterSpacing: "0.04em",
              border: "1px solid #E5E7EB",
            }}>
              Notify me
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function CatalogDivider({ label, note, gold = false }) {
  return (
    <Reveal>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <span style={{
          fontSize: 10,
          fontFamily: "var(--fp-mono)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: gold ? "#C9A84C" : "#1B3A5C",
          flexShrink: 0,
        }}>
          {label}
        </span>
        <div style={{ flex: 1, height: 1, background: gold ? "#F0EAD6" : "#E5E7EB" }} />
        {note && (
          <span style={{ fontSize: 12, color: "#9CA3AF", flexShrink: 0 }}>{note}</span>
        )}
      </div>
    </Reveal>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const starters   = products.filter(p => p.category === "starter");
  const roleItems  = products.filter(p => p.category === "role");
  const devItems   = products.filter(p => p.category === "developer");
  const everyday   = products.filter(p => p.category === "everyday");

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh", color: "#1A1A1A", fontFamily: "var(--fp-sans)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --fp-sans:        'Inter', system-ui, sans-serif;
          --fp-mono:        'JetBrains Mono', ui-monospace, monospace;
          --fp-accent:      #1B3A5C;
          --fp-accent-dark: #142D47;
          --fp-gold:        #C9A84C;
          --fp-bg:          #FAFAFA;
          --fp-white:       #FFFFFF;
          --fp-text:        #1A1A1A;
          --fp-muted:       #6B7280;
          --fp-border:      #E5E7EB;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #FAFAFA; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 2px; }

        .fp-sec { max-width: 1080px; margin: 0 auto; padding: 0 48px; }

        .fp-nav-link {
          background: none; border: none; cursor: pointer;
          font-size: 13px; color: #6B7280; font-family: var(--fp-sans);
          padding: 0; transition: color 0.15s;
        }
        .fp-nav-link:hover { color: #1A1A1A; }

        .fp-cta {
          display: inline-block; padding: 13px 28px;
          background: var(--fp-accent); color: #fff;
          border: none; border-radius: 6px; cursor: pointer;
          font-size: 14px; font-weight: 500; font-family: var(--fp-sans);
          text-decoration: none; letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.15s;
        }
        .fp-cta:hover { background: var(--fp-accent-dark); transform: translateY(-1px); }

        .fp-cta-outline {
          display: inline-block; padding: 12px 28px;
          background: transparent; color: var(--fp-accent);
          border: 1.5px solid var(--fp-accent); border-radius: 6px; cursor: pointer;
          font-size: 14px; font-weight: 500; font-family: var(--fp-sans);
          text-decoration: none; letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.15s;
        }
        .fp-cta-outline:hover { background: #E8EEF5; transform: translateY(-1px); }

        .fp-label {
          font-size: 11px; font-family: var(--fp-mono); letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--fp-accent);
          display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
        }
        .fp-label::before {
          content: ''; display: block; width: 20px; height: 1.5px; background: var(--fp-accent);
        }

        @keyframes fpFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fpFade   { from { opacity:0; } to { opacity:1; } }

        @media (max-width: 768px) {
          .fp-sec                { padding: 0 24px; }
          .fp-products-grid      { grid-template-columns: 1fr !important; }
          .fp-steps-row          { grid-template-columns: 1fr !important; }
          .fp-about-cols         { grid-template-columns: 1fr !important; gap: 40px !important; }
          .fp-hero-h1            { font-size: clamp(32px, 7vw, 52px) !important; }
          .fp-nav-links          { display: none !important; }
          .fp-footer-inner       { flex-direction: column !important; gap: 20px !important; text-align: center; }
          .fp-footer-links       { display: none !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        transition: "all 0.25s ease",
        padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6, background: "#1B3A5C",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 4h10M3 8h7M3 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1A1A1A", letterSpacing: "-0.01em", lineHeight: 1 }}>
              PromptSmith
            </div>
            <div style={{
              fontSize: 9, color: "#6B7280", letterSpacing: "0.08em",
              textTransform: "uppercase", fontFamily: "var(--fp-mono)", marginTop: 2,
            }}>
              .store
            </div>
          </div>
        </div>

        <div className="fp-nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["products", "Playbooks"], ["how-it-works", "How it works"], ["about", "About"]].map(([id, label]) => (
            <button key={id} className="fp-nav-link" onClick={() => go(id)}>{label}</button>
          ))}
          <button className="fp-cta" style={{ padding: "9px 20px", fontSize: 13 }} onClick={() => go("products")}>
            Browse Playbooks
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 48px 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.35,
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "8%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(27,58,92,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }} />

        <div className="fp-sec" style={{ padding: 0, position: "relative", zIndex: 1, maxWidth: 900 }}>
          <div style={{ opacity: 0, animation: "fpFadeUp 0.7s ease 0.1s forwards" }}>
            <div className="fp-label">Prompt Playbooks for Professionals</div>
          </div>

          <div style={{ opacity: 0, animation: "fpFadeUp 0.8s ease 0.2s forwards" }}>
            <h1 className="fp-hero-h1" style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#1A1A1A",
              maxWidth: 760,
              marginBottom: 28,
            }}>
              Prompt playbooks for professionals who don&rsquo;t have time to figure out AI.
            </h1>
          </div>

          <div style={{ opacity: 0, animation: "fpFadeUp 0.8s ease 0.32s forwards", marginBottom: 44 }}>
            <p style={{ fontSize: 18, color: "#6B7280", maxWidth: 560, lineHeight: 1.75 }}>
              Role-specific, validated prompt libraries for M365 Copilot, Google Gemini, and more.
            </p>
          </div>

          <div style={{ opacity: 0, animation: "fpFadeUp 0.8s ease 0.44s forwards", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="fp-cta" onClick={() => go("products")}>Browse Playbooks</button>
            <button className="fp-cta-outline" onClick={() => go("how-it-works")}>See how it works</button>
          </div>

          <div style={{ opacity: 0, animation: "fpFade 0.8s ease 0.7s forwards", marginTop: 64, display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap" }}>
            {["Validated by real professionals", "Works on day one", "No AI knowledge required"].map(text => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280" }}>
                <span style={{ color: "#1B3A5C", fontWeight: 700, fontSize: 15 }}>✓</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" style={{ padding: "96px 0", background: "#fff", borderTop: "1px solid #E5E7EB" }}>
        <div className="fp-sec">
          <Reveal>
            <div style={{ marginBottom: 52 }}>
              <div className="fp-label">Playbook Library</div>
              <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", color: "#1A1A1A", marginBottom: 14, lineHeight: 1.15 }}>
                Find your playbook.
              </h2>
              <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 520, lineHeight: 1.7 }}>
                Role-specific prompt libraries, starter packs, and everyday guides — all tested against real workflows.
              </p>
            </div>
          </Reveal>

          {/* Starter packs */}
          <CatalogDivider label="Start Here" note="New to AI? These are the fastest way in." gold />
          <div className="fp-products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 52 }}>
            {starters.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>

          {/* Role-specific */}
          <CatalogDivider label="Role-Specific Playbooks" />
          <div className="fp-products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 52 }}>
            {roleItems.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>

          {/* Developer series */}
          <CatalogDivider label="Developer Series" />
          <div className="fp-products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 52 }}>
            {devItems.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>

          {/* Everyday life */}
          <CatalogDivider label="Beyond Work" />
          <div className="fp-products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {everyday.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: "96px 0", background: "#FAFAFA", borderTop: "1px solid #E5E7EB" }}>
        <div className="fp-sec">
          <Reveal>
            <div style={{ marginBottom: 56, textAlign: "center" }}>
              <div className="fp-label" style={{ justifyContent: "center" }}>Simple by design</div>
              <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", color: "#1A1A1A", marginBottom: 14, lineHeight: 1.15 }}>
                How it works
              </h2>
              <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
                No training. No onboarding. No AI expertise required.
              </p>
            </div>
          </Reveal>

          <div className="fp-steps-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#E5E7EB", borderRadius: 10, overflow: "hidden" }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div style={{ background: "#fff", padding: "40px 32px", height: "100%" }}>
                  <div style={{ fontSize: 11, fontFamily: "var(--fp-mono)", color: "#1B3A5C", letterSpacing: "0.1em", marginBottom: 20, fontWeight: 500 }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>
                    {s.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button className="fp-cta" onClick={() => go("products")}>Browse Playbooks</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "96px 0", background: "#fff", borderTop: "1px solid #E5E7EB" }}>
        <div className="fp-sec">
          <div className="fp-about-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <div className="fp-label">About PromptSmith</div>
              <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", color: "#1A1A1A", marginBottom: 24, lineHeight: 1.15 }}>
                Built by consultants.<br />
                Tested on real work.
              </h2>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8, marginBottom: 20 }}>
                Built by ProcessMind. Every playbook is validated against real workflows by real professionals.
              </p>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8, marginBottom: 32 }}>
                We don&rsquo;t publish prompts that sound good in a demo. We test them in the tools your team already uses — M365 Copilot, Google Gemini — and refine them until they produce professional-grade output on the first try.
              </p>
              <a href="https://www.theprocessmind.com" target="_blank" rel="noopener noreferrer" className="fp-cta-outline">
                About ProcessMind
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ background: "#FAFAFA", border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
                {[
                  ["Validation", "Every prompt tested against real professional workflows"],
                  ["Platforms", "M365 Copilot, Google Gemini, Claude, ChatGPT (more coming)"],
                  ["Format", "PDF download — no account required"],
                  ["Updates", "Playbooks updated as platform behavior changes"],
                  ["Support", "Questions? hello@promptsmith.store"],
                ].map(([label, val], i) => (
                  <div
                    key={label}
                    style={{
                      padding: "18px 24px",
                      display: "flex", gap: 20, alignItems: "baseline",
                      borderBottom: i < 4 ? "1px solid #E5E7EB" : "none",
                      background: "#fff",
                    }}
                  >
                    <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "var(--fp-mono)", letterSpacing: "0.08em", textTransform: "uppercase", minWidth: 80, flexShrink: 0, paddingTop: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{val}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ padding: "80px 0", background: "#1B3A5C", borderTop: "1px solid #142D47" }}>
        <div className="fp-sec">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 10 }}>
                  Ready to work smarter with AI?
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
                  Professional prompts. Validated workflows. No guesswork.
                </p>
              </div>
              <button
                style={{
                  padding: "14px 32px", background: "#fff", color: "#1B3A5C",
                  border: "none", borderRadius: 6, cursor: "pointer",
                  fontSize: 14, fontWeight: 600, fontFamily: "var(--fp-sans)",
                  letterSpacing: "0.01em", flexShrink: 0, transition: "transform 0.15s",
                }}
                onClick={() => go("products")}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >
                Browse Playbooks
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#fff", borderTop: "1px solid #E5E7EB" }}>
        <div
          className="fp-footer-inner"
          style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: "#1B3A5C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 4h10M3 8h7M3 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
              PromptSmith
            </span>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>
              · A{" "}
              <a href="https://www.theprocessmind.com" target="_blank" rel="noopener noreferrer" style={{ color: "#1B3A5C", textDecoration: "none" }}>
                ProcessMind
              </a>
              {" "}product
            </span>
          </div>

          <div className="fp-footer-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[["products", "Playbooks"], ["how-it-works", "How it works"], ["about", "About"]].map(([id, label]) => (
              <button key={id} className="fp-nav-link" style={{ fontSize: 12 }} onClick={() => go(id)}>{label}</button>
            ))}
          </div>

          <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "var(--fp-mono)", letterSpacing: "0.04em" }}>
            © 2026 ProcessMind LLC
          </div>
        </div>
      </footer>
    </div>
  );
}
