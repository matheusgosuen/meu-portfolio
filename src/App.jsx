import { useState } from "react";

// ─────────────────────────────────────────────
// DADOS — edite aqui sem mexer no visual
// ─────────────────────────────────────────────
const GITHUB_URL  = "https://github.com/matheusgosuen";
const LINKEDIN_URL = "https://www.linkedin.com/in/matheusgosuen/";

const SKILLS = [
  { icon: "🐍", label: { pt: "Python", en: "Python" },         sub: { pt: "Dados & Dashboards", en: "Data & Dashboards" } },
  { icon: "🌐", label: { pt: "JS & HTML", en: "JS & HTML" },    sub: { pt: "Web", en: "Web" } },
  { icon: "📦", label: { pt: "SolidWorks / Inventor / Ansys", en: "SolidWorks / Inventor / Ansys" }, sub: { pt: "CAD, CAM, Simulação", en: "CAD, CAM, Simulation" } },
  { icon: "📊", label: { pt: "OriginPro / SciDavis", en: "OriginPro / SciDavis" }, sub: { pt: "Dados", en: "Data" } },
  { icon: "📝", label: { pt: "LaTeX", en: "LaTeX" },             sub: { pt: "Documentação", en: "Documentation" } },
  { icon: "🗂️", label: { pt: "Office", en: "Office" },           sub: { pt: "", en: "" } },
];

const LANGUAGES = [
  { color: "#22c55e", name: "Português", level: { pt: "Nativo (BR)", en: "Native (BR)" }, cert: "" },
  { color: "#3b82f6", name: "Inglês",    level: { pt: "Fluente (B2)", en: "Fluent (B2)" }, cert: "FCE – University of Cambridge" },
  { color: "#eab308", name: "Espanhol",  level: { pt: "Avançado (A2)", en: "Advanced (A2)" }, cert: "DELE – Instituto Cervantes" },
];

const PROJECTS = [
  // ── DASHBOARDS ──
  {
    id: 1, category: "dashboard",
    icon: "📊", color: "#3b82f6", tag: "Python / API",
    title: { pt: "Central F1 Analytics", en: "F1 Analytics Hub" },
    desc: { pt: "Hub de dashboards interativos da F1. Telemetria, qualificação e histórico.", en: "Interactive F1 dashboards hub. Telemetry, qualifying, and championship history." },
    link: "https://dashf1-vbfbft5y8ujrzwsz7lcwkb.streamlit.app/",
  },
  {
    id: 2, category: "dashboard",
    icon: "🌍", color: "#10b981", tag: "Data Science",
    title: { pt: "Mundo em Dados", en: "World in Data" },
    desc: { pt: "Dashboard populacional e econômico global com insights socioeconômicos.", en: "Global population and economic dashboard with socioeconomic insights." },
    link: "#",
  },
  {
    id: 3, category: "dashboard",
    icon: "🌤️", color: "#06b6d4", tag: "Open-Meteo API",
    title: { pt: "Dashboard Clima", en: "Weather Dashboard" },
    desc: { pt: "Previsão e histórico climático com visualizações interativas.", en: "Weather forecast and history with interactive visualizations." },
    link: "#",
  },
  // ── CALCULADORAS ──
  {
    id: 4, category: "calc",
    icon: "💱", color: "#8b5cf6", tag: "",
    title: { pt: "Conversor de Moedas", en: "Currency Converter" },
    desc: { pt: "Cotações diárias via API para conversão em tempo real.", en: "Daily rates via API for real-time conversion." },
    link: "#",
  },
  {
    id: 5, category: "calc",
    icon: "🚀", color: "#ef4444", tag: "",
    title: { pt: "Distância de Lançamento", en: "Launch Distance" },
    desc: { pt: "Balística de projéteis com e sem arrasto aerodinâmico.", en: "Projectile ballistics with and without drag." },
    link: "#",
  },
  {
    id: 6, category: "calc",
    icon: "⚡", color: "#f59e0b", tag: "",
    title: { pt: "Choques e Colisões", en: "Collisions" },
    desc: { pt: "Conservação de momento linear e coeficiente de restituição.", en: "Conservation of linear momentum and restitution coefficient." },
    link: "#",
  },
  {
    id: 7, category: "calc",
    icon: "🔄", color: "#ec4899", tag: "",
    title: { pt: "Inércia Rotacional", en: "Rotational Inertia" },
    desc: { pt: "Momentos de inércia para geometrias sólidas e tubulares.", en: "Moments of inertia for solid and tubular geometries." },
    link: "#",
  },
  {
    id: 8, category: "calc",
    icon: "⚙️", color: "#94a3b8", tag: "",
    title: { pt: "Relação de Redução", en: "Gear Reduction" },
    desc: { pt: "Transmissão de engrenagens, polias e torque final.", en: "Gear transmission, pulleys, and final torque." },
    link: "#",
  },
  {
    id: 9, category: "calc",
    icon: "🚗", color: "#84cc16", tag: "BAJA",
    title: { pt: "Distância de Frenagem", en: "Braking Distance" },
    desc: { pt: "Dinâmica longitudinal, transferência de carga e frenagem.", en: "Longitudinal dynamics, load transfer, and braking." },
    link: "#",
  },
  {
    id: 10, category: "calc",
    icon: "📈", color: "#a855f7", tag: "",
    title: { pt: "Calculadora Gráfica", en: "Graphing Calculator" },
    desc: { pt: "Plotagem de funções matemáticas com download dos gráficos.", en: "Math function plotting with chart download." },
    link: "#",
  },
  // ── SIMULAÇÕES / CAD ──
  {
    id: 11, category: ["sim", "cad"],
    icon: "📦", color: "#f59e0b", tag: "Ansys / SW",
    title: { pt: "Simulação Estrutural (FEA)", en: "Structural Simulation (FEA)" },
    desc: { pt: "Análise de Elementos Finitos do chassi Baja e componentes mecânicos.", en: "Finite Element Analysis of Baja chassis and mechanical components." },
    link: "#",
  },
  {
    id: 12, category: "sim",
    icon: "🔥", color: "#f43f5e", tag: "",
    title: { pt: "Análise Térmica", en: "Thermal Analysis" },
    desc: { pt: "Simulação de dissipação de calor, gradientes de temperatura e CFD.", en: "Heat dissipation, temperature gradients, and CFD simulation." },
    link: "#",
  },
  {
    id: 13, category: "sim",
    icon: "〰️", color: "#22d3ee", tag: "",
    title: { pt: "Simulação Modal", en: "Modal Simulation" },
    desc: { pt: "Frequências naturais e modos de vibração para evitar ressonância.", en: "Natural frequencies and vibration modes to avoid resonance." },
    link: "#",
  },
  {
    id: 14, category: "sim",
    icon: "🔌", color: "#8b5cf6", tag: "",
    title: { pt: "Simulação Elétrica/Eletrônica", en: "Electrical Simulation" },
    desc: { pt: "Prototipagem de circuitos, dimensionamento de fiação e quedas de tensão.", en: "Circuit prototyping, wiring sizing, and voltage drops." },
    link: "#",
  },
];

const FILTER_LABELS = [
  { id: "all",       pt: "Todos",          en: "All" },
  { id: "dashboard", pt: "Dashboards",     en: "Dashboards" },
  { id: "calc",      pt: "Calculadoras",   en: "Calculators" },
  { id: "sim",       pt: "Simulações",     en: "Simulations" },
  { id: "cad",       pt: "Projetos CAD",   en: "CAD Projects" },
];

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────
function hasCategory(project, filter) {
  if (filter === "all") return true;
  if (Array.isArray(project.category)) return project.category.includes(filter);
  return project.category === filter;
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function SkillBadge({ icon, label, sub, lang }) {
  return (
    <span style={styles.badge}>
      <span>{icon}</span>
      <span>{label[lang]}</span>
      {sub[lang] && <span style={styles.badgeSub}>({sub[lang]})</span>}
    </span>
  );
}

function ProjectCard({ project, lang }) {
  const isLarge = Array.isArray(project.category)
    ? project.category.includes("sim") || project.category.includes("cad")
    : project.category === "sim" || project.category === "cad" || project.category === "dashboard";

  return (
    <article style={{ ...styles.card, ...(isLarge ? styles.cardLarge : styles.cardSmall) }}>
      <div style={{ ...styles.cardThumb, ...(isLarge ? styles.thumbLarge : styles.thumbSmall) }}>
        <span style={{ ...styles.thumbIcon, fontSize: isLarge ? 48 : 36, filter: "opacity(0.7)" }}>
          {project.icon}
        </span>
        {project.tag && (
          <span style={{ ...styles.tag, borderColor: project.color + "55", color: project.color, background: project.color + "22" }}>
            {project.tag}
          </span>
        )}
      </div>
      <div style={styles.cardBody}>
        <h3 style={isLarge ? styles.cardTitleLg : styles.cardTitleSm}>{project.title[lang]}</h3>
        <p style={isLarge ? styles.cardDescLg : styles.cardDescSm}>{project.desc[lang]}</p>
        {project.link && project.link !== "#" && (
          <div style={styles.cardFooter}>
            <a href={project.link} target="_blank" rel="noreferrer" style={styles.openBtn}>
              {lang === "pt" ? "Abrir App" : "Open App"} ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [tab,    setTab]    = useState("sobre");
  const [lang,   setLang]   = useState("pt");
  const [filter, setFilter] = useState("all");

  const t = (pt, en) => lang === "pt" ? pt : en;

  const filtered = PROJECTS.filter(p => hasCategory(p, filter));

  return (
    <div style={styles.root}>
      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.logo}>
            {t("Meu Portfólio", "My Portfolio")}
          </span>

          <div style={styles.headerRight}>
            {/* Desktop nav */}
            <nav style={styles.desktopNav}>
              <button
                onClick={() => setTab("sobre")}
                style={{ ...styles.navBtn, ...(tab === "sobre" ? styles.navBtnActive : {}) }}
              >
                {t("Sobre Mim", "About Me")}
              </button>
              <button
                onClick={() => setTab("projetos")}
                style={{ ...styles.navBtn, ...(tab === "projetos" ? styles.navBtnActive : {}) }}
              >
                {t("Projetos", "Projects")}
              </button>
              <a href={GITHUB_URL}  target="_blank" rel="noreferrer" style={styles.iconLink}>GitHub</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" style={styles.iconLink}>LinkedIn</a>
            </nav>

            {/* Language toggle */}
            <button onClick={() => setLang(l => l === "pt" ? "en" : "pt")} style={styles.langBtn}>
              🌐 {lang === "pt" ? "EN" : "PT"}
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={styles.main}>

        {/* ════ SOBRE ════ */}
        {tab === "sobre" && (
          <section style={styles.section}>
            <div style={styles.profileCard}>
              <div style={styles.profileTop}>
                {/* Avatar */}
                  <div style={styles.avatar}>
                  {/* Troque o conteúdo abaixo por uma <img> quando tiver foto */}
                  <img src="/meu-portfolio/foto.jpg" alt="Matheus" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                <div style={styles.profileInfo}>
                  <h2 style={styles.name}>Matheus Paranaiba Gosuen</h2>
                  <p style={styles.role}>{t("Estudante de Engenharia Física | UFSCar", "Engineering Physics Student | UFSCar")}</p>

                  <div style={styles.bio}>
                    <p>{t(
                      "Sou estudante de Engenharia Física na Universidade Federal de São Carlos (UFSCar), apaixonado por resolver problemas através de cálculo, tecnologia e dados.",
                      "I am an Engineering Physics student at the Federal University of São Carlos (UFSCar), passionate about solving problems through calculation, technology, and data."
                    )}</p>
                    <p style={{ marginTop: 12 }}>{t(
                      "Além do curso, faço parte do BAJA UFSCar (projeto de extensão off-road). Iniciei no subsistema de Freio e atualmente atuo como Líder do Cálculo Estrutural, unindo FEA e modelagem 3D.",
                      "Alongside my degree, I am part of BAJA UFSCar (an off-road competition project). I started in the Brakes subsystem and now serve as Structural Calculation Leader, combining FEA and 3D modeling."
                    )}</p>
                  </div>

                  {/* Skills + Languages grid */}
                  <div style={styles.skillsLangGrid}>
                    <div>
                      <h3 style={styles.sectionLabel}>💻 {t("Habilidades & Softwares", "Skills & Software")}</h3>
                      <div style={styles.badgeList}>
                        {SKILLS.map((s, i) => <SkillBadge key={i} {...s} lang={lang} />)}
                      </div>
                    </div>

                    <div>
                      <h3 style={styles.sectionLabel}>🌐 {t("Idiomas", "Languages")}</h3>
                      <ul style={styles.langList}>
                        {LANGUAGES.map((l, i) => (
                          <li key={i} style={styles.langItem}>
                            <span style={{ ...styles.langDot, background: l.color }} />
                            <div>
                              <span style={styles.langName}>{l.name}:</span>{" "}
                              <span style={styles.langLevel}>{l.level[lang]}</span>
                              {l.cert && <div style={styles.langCert}>{l.cert}</div>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════ PROJETOS ════ */}
        {tab === "projetos" && (
          <section style={styles.section}>
            <h1 style={styles.projTitle}>{t("Meus Projetos", "My Projects")}</h1>

            {/* Filters */}
            <div style={styles.filters}>
              {FILTER_LABELS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  style={{ ...styles.filterBtn, ...(filter === f.id ? styles.filterBtnActive : {}) }}
                >
                  {f[lang]}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={styles.grid}>
              {filtered.map(p => <ProjectCard key={p.id} project={p} lang={lang} />)}
            </div>
          </section>
        )}
      </main>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav style={styles.bottomNav}>
        <button
          onClick={() => setTab("sobre")}
          style={{ ...styles.bottomBtn, ...(tab === "sobre" ? styles.bottomBtnActive : {}) }}
        >
          <span style={styles.bottomIcon}>👤</span>
          <span style={styles.bottomLabel}>{t("Perfil", "Profile")}</span>
        </button>
        <button
          onClick={() => setTab("projetos")}
          style={{ ...styles.bottomBtn, ...(tab === "projetos" ? styles.bottomBtnActive : {}) }}
        >
          <span style={styles.bottomIcon}>🗂️</span>
          <span style={styles.bottomLabel}>{t("Projetos", "Projects")}</span>
        </button>
      </nav>
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLES  (inline — sem CSS externo necessário)
// ─────────────────────────────────────────────
const C = {
  bg:       "#0f172a",
  card:     "#1e293b",
  border:   "#334155",
  primary:  "#3b82f6",
  primaryH: "#2563eb",
  text:     "#f8fafc",
  muted:    "#94a3b8",
  dark:     "#0f172a",
};

const styles = {
  root: {
    fontFamily: "'Inter', system-ui, sans-serif",
    background: C.bg,
    color: C.text,
    minHeight: "100vh",
    paddingBottom: 80,
  },

  // Header
  header: {
    background: C.card,
    borderBottom: `1px solid ${C.border}`,
    padding: "14px 24px",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerInner: {
    maxWidth: 1152,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.25rem",
    fontWeight: 800,
    background: `linear-gradient(90deg, ${C.primary}, #a855f7)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  headerRight: { display: "flex", alignItems: "center", gap: 20 },
  desktopNav:  { display: "flex", alignItems: "center", gap: 24 },
  navBtn: {
    background: "none",
    border: "none",
    color: C.muted,
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: "4px 0",
    transition: "color .2s",
  },
  navBtnActive: { color: C.primary, fontWeight: 600 },
  iconLink: { color: C.muted, fontSize: "0.85rem", textDecoration: "none" },
  langBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#1e293b",
    border: `1px solid ${C.border}`,
    color: C.text,
    borderRadius: 999,
    padding: "5px 12px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: 600,
  },

  // Main
  main: { maxWidth: 1152, margin: "0 auto", padding: "32px 16px 16px" },
  section: { paddingBottom: 48 },

  // Profile
  profileCard: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 20,
    padding: "32px 28px",
    boxShadow: "0 4px 32px #0006",
  },
  profileTop: {
    display: "flex",
    flexDirection: "row",
    gap: 36,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "#0f172a",
    border: `4px solid ${C.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  avatarIcon: { fontSize: 56 },
  profileInfo: { flex: 1, minWidth: 260 },
  name: { fontSize: "1.7rem", fontWeight: 800, marginBottom: 4 },
  role: { color: C.primary, fontWeight: 600, fontSize: "1rem", marginBottom: 16 },
  bio: { color: "#cbd5e1", lineHeight: 1.7, fontSize: "0.92rem", marginBottom: 24 },

  skillsLangGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 32,
    flexWrap: "wrap",
  },
  sectionLabel: {
    fontSize: "0.9rem",
    fontWeight: 700,
    marginBottom: 12,
    color: C.text,
    borderBottom: `1px solid ${C.border}`,
    paddingBottom: 6,
    display: "inline-block",
  },
  badgeList: { display: "flex", flexWrap: "wrap", gap: 8 },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "#0f172a",
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "5px 10px",
    fontSize: "0.8rem",
    color: "#cbd5e1",
  },
  badgeSub: { opacity: 0.55, fontSize: "0.75rem" },

  langList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 },
  langItem: { display: "flex", alignItems: "flex-start", gap: 8 },
  langDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0, marginTop: 5 },
  langName: { fontWeight: 700, fontSize: "0.85rem" },
  langLevel: { fontSize: "0.85rem", color: "#cbd5e1" },
  langCert: { fontSize: "0.72rem", color: C.muted, marginTop: 2 },

  // Projects
  projTitle: {
    fontSize: "1.6rem",
    fontWeight: 800,
    marginBottom: 24,
    background: `linear-gradient(90deg, ${C.primary}, #a855f7)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  },
  filters: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32, overflowX: "auto" },
  filterBtn: {
    background: C.card,
    border: `1px solid ${C.border}`,
    color: "#cbd5e1",
    borderRadius: 999,
    padding: "7px 18px",
    fontSize: "0.82rem",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all .2s",
  },
  filterBtnActive: { background: C.primary, borderColor: C.primary, color: "#fff", fontWeight: 700 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
    gap: 20,
  },
  card: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 12px #0004",
    transition: "transform .2s, box-shadow .2s",
    cursor: "default",
  },
  cardLarge: {},
  cardSmall: {},
  cardThumb: {
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  thumbLarge: { height: 140 },
  thumbSmall: { height: 104 },
  thumbIcon: {},
  tag: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: "0.7rem",
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 6,
    border: "1px solid",
  },
  cardBody: { padding: "14px 16px 16px" },
  cardTitleLg: { fontSize: "1rem", fontWeight: 700, marginBottom: 6 },
  cardTitleSm: { fontSize: "0.9rem", fontWeight: 700, marginBottom: 4 },
  cardDescLg: { fontSize: "0.83rem", color: "#94a3b8", lineHeight: 1.5, marginBottom: 10,
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  cardDescSm: { fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5, marginBottom: 8,
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  cardFooter: { display: "flex", justifyContent: "flex-end" },
  openBtn: {
    color: C.primary,
    fontSize: "0.8rem",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },

  // Bottom nav
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: C.card,
    borderTop: `1px solid ${C.border}`,
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 24px",
    zIndex: 50,
  },
  bottomBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "none",
    border: "none",
    color: C.muted,
    cursor: "pointer",
    padding: "4px 16px",
  },
  bottomBtnActive: { color: C.primary },
  bottomIcon: { fontSize: 22 },
  bottomLabel: { fontSize: "0.65rem", fontWeight: 600 },
};