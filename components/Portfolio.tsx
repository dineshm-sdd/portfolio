"use client";
import { useMemo, useState } from "react";
import { projects } from "../data/projects";

const filters = ["All", "Live Website", "Figma / UI UX", "Clone Product", "In-house Project"];
const short = (s?: string) => s ? s.replace(/\s+/g, " ").trim() : "Digital product and technology project.";

export default function Portfolio() {
    const [filter, setFilter] = useState("All"); const [q, setQ] = useState("");
    const visible = useMemo(() => projects.filter(p => (filter === "All" || p.type === filter) && `${p.name} ${p.category} ${p.technology || ""}`.toLowerCase().includes(q.toLowerCase())), [filter, q]);
    const stats = [['Total projects', projects.length], ['Live websites', projects.filter(p => p.type === 'Live Website').length], ['UI/UX projects', projects.filter(p => p.type === 'Figma / UI UX').length], ['In-house', projects.filter(p => p.type === 'In-house Project').length]];
    return <main>
        <nav className="nav"><div className="brand">D<span>.</span>PORTFOLIO</div><div className="navlinks"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div><a className="navcta" href="#contact">Start a project ↗</a></nav>
        <section className="hero"><div className="eyebrow">DIGITAL PRODUCTS • DESIGN • DEVELOPMENT</div><h1>We build <em>digital experiences</em> that move businesses forward.</h1><p>Explore a curated collection of websites, SaaS platforms, UI/UX concepts, product clones and in-house experiments.</p><div className="heroactions"><a href="#work" className="primary">Explore projects ↓</a><a href="#contact" className="secondary">Let's work together ↗</a></div></section>
        <section className="stats">{stats.map(([k, v]) => <div key={k}><strong>{v}</strong><span>{k}</span></div>)}</section>
        <section id="work" className="work"><div className="sectionhead"><div><div className="eyebrow">SELECTED WORK</div><h2>Projects & case studies</h2></div><div className="search"><span>⌕</span><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search projects..." /></div></div>
            <div className="filters">{filters.map(f => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div>
            <div className="grid">{visible.map((p, i) => <article className="card" key={`${p.name}-${i}`}><div className="visual"><div className="visualnoise" /><span className="number">{String(i + 1).padStart(2, '0')}</span><span className="type">{p.type}</span><div className="monogram">{p.name.slice(0, 2).toUpperCase()}</div></div><div className="cardbody"><div className="meta"><span>{p.category}</span>{p.year && <span>{p.year}</span>}</div><h3>{p.name}</h3><p>{short(p.description)}</p><div className="tags">{p.technology && <span>{p.technology}</span>}{p.device && <span>{p.device}</span>}{p.designer && <span>{p.designer}</span>}</div><div className="links">{p.url && p.url.startsWith('http') && <a href={p.url} target="_blank" rel="noreferrer">View project ↗</a>}{p.github && p.github.startsWith('http') && <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}</div></div></article>)}</div>
            {!visible.length && <div className="empty">No projects match your search.</div>}
        </section>
        <section id="about" className="about"><div className="eyebrow">ABOUT THE WORK</div><h2>From idea to a product people can actually use.</h2><p>Our portfolio spans product strategy, interface design and full-stack delivery across healthcare, fintech, education, real estate, marketplaces, AI, SaaS and more.</p></section>
        <section id="contact" className="contact"><div><div className="eyebrow">HAVE A PROJECT?</div><h2>Let's create something<br /><em>remarkable.</em></h2></div><a className="contactbtn" href="mailto:designers.sdm@smartdatainc.net">Get in touch ↗</a></section>
        <footer><span>© {new Date().getFullYear()} Digital smartData Portfolio</span><span>Built for the web · Deployed on Vercel</span></footer>
    </main>
}
