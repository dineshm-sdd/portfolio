"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { projects } from "../data/projects";

const filters = ["All", "Live Website", "Figma / UI UX", "Clone Product", "In-house Project"];

// High-level featured domain groups with keyword matching
const FEATURED_DOMAINS: Record<string, string[]> = {
  "Healthcare & Medical": [
    "health",
    "telehealth",
    "medical",
    "doctor",
    "dental",
    "clinic",
    "caregiver",
    "fertility",
    "mental health",
    "therapy",
    "counselling",
    "depression",
    "pharma",
    "skin",
  ],
  "E-Commerce & Retail": [
    "commerce",
    "shop",
    "e-comm",
    "buying",
    "selling",
    "dropship",
    "pos",
    "marketplace",
    "product",
    "fashion",
  ],
  "Gaming & Entertainment": [
    "gaming",
    "game",
    "entertainment",
    "music",
    "camp",
    "sports",
  ],
  "Fintech & Finance": [
    "fintech",
    "finance",
    "cpa",
    "tax",
    "loan",
    "invoicing",
    "billing",
    "investment",
    "trading",
    "stock",
    "nft",
    "blockchain",
    "payment",
    "insurance",
  ],
  "Real Estate & Property": [
    "real estate",
    "realestate",
    "property",
  ],
  "AI & SaaS Solutions": [
    "ai",
    "chatbot",
    "model",
    "saas",
    "crm",
    "task",
    "tools",
    "dashboard",
  ],
  "Education & E-Learning": [
    "education",
    "educational",
    "course",
    "lms",
    "study",
    "college",
  ],
  "Fitness & Wellness": [
    "fitness",
    "wellness",
    "beauty",
  ],
  "Logistics & Telematics": [
    "shipping",
    "fleet",
    "courier",
    "gps",
    "tracking",
    "telematics",
    "distribution",
  ],
  "Travel & Hospitality": [
    "travel",
    "tour",
    "yatch",
    "hotel",
    "booking",
    "restaurant",
    "ride",
  ],
};

const getInitials = (name?: string) => {
  if (!name) return "SD";
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 3);
};

const short = (s?: string) => (s ? s.replace(/\s+/g, " ").trim() : "Digital product and technology project.");

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Extract all unique individual categories
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // Filter projects based on type, search query, and domain/category
  const visible = useMemo(() => {
    return projects.filter((p) => {
      // 1. Type filter
      if (filter !== "All" && p.type !== filter) {
        return false;
      }

      // 2. Domain / Category filter
      if (domain !== "All") {
        if (domain in FEATURED_DOMAINS) {
          const keywords = FEATURED_DOMAINS[domain];
          const cat = (p.category || "").toLowerCase();
          const matchesDomain = keywords.some((kw) => cat.includes(kw));
          if (!matchesDomain) return false;
        } else {
          // Specific exact category selected
          if ((p.category || "").trim().toLowerCase() !== domain.trim().toLowerCase()) {
            return false;
          }
        }
      }

      // 3. Search query filter
      if (q.trim()) {
        const query = q.toLowerCase();
        const searchCorpus = `${p.name} ${p.category} ${p.technology || ""} ${p.description || ""} ${p.designer || ""}`.toLowerCase();
        if (!searchCorpus.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [filter, domain, q]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return visible.slice(start, start + pageSize);
  }, [visible, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const el = document.getElementById("work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPageNumbers = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const stats = [
    ["Total projects", projects.length],
    ["Live websites", projects.filter((p) => p.type === "Live Website").length],
    ["UI/UX projects", projects.filter((p) => p.type === "Figma / UI UX").length],
    ["In-house", projects.filter((p) => p.type === "In-house Project").length],
  ];

  return (
    <main>
      {/* Navigation */}
      <nav className="nav">
        <div className="brand">
          <a href="#" className="brand-badge" title="smartData Enterprises">
            <Image
              src="/assets/logo-updated.png"
              alt="smartData Enterprises"
              width={160}
              height={38}
              priority
              className="h-8 w-auto object-contain"
            />
          </a>
        </div>
        <div className="navlinks">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="navcta" href="#contact">
          Start a project ↗
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="eyebrow">
          <span>●</span> SMARTDATA ENTERPRISES • DIGITAL INNOVATION • ENGINEERING
        </div>
        <h1>
          We build <em>digital experiences</em> that move businesses forward.
        </h1>
        <p>
          Explore a curated collection of enterprise software, SaaS platforms, UI/UX designs, product clones, and
          in-house innovations crafted by smartData Enterprises.
        </p>
        <div className="heroactions">
          <a href="#work" className="primary">
            Explore projects ↓
          </a>
          <a href="#contact" className="secondary">
            Let's work together ↗
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        {stats.map(([label, val]) => (
          <div key={label}>
            <strong>{val}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      {/* Work Section */}
      <section id="work" className="work">
        <div className="sectionhead">
          <div>
            <div className="eyebrow">
              <span>●</span> SELECTED WORK
            </div>
            <h2>Projects & case studies</h2>
          </div>

          <div className="filter-controls">
            {/* Domain / Category Dropdown */}
            <div className="domain-select-wrapper">
              <select
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setPage(1);
                }}
                className="domain-select"
                aria-label="Filter by Domain or Category"
              >
                <option value="All">All Domains ({projects.length})</option>
                <optgroup label="🌟 Featured Domains">
                  {Object.keys(FEATURED_DOMAINS).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="📂 All Categories (A–Z)">
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </optgroup>
              </select>
              <span className="domain-arrow">▼</span>
            </div>

            {/* Keyword Search */}
            <div className="search">
              <span>⌕</span>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search projects, tech, category..."
              />
            </div>
          </div>
        </div>

        {/* Project Type Filter Buttons */}
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid">
          {paginatedProjects.map((p, i) => {
            const globalIndex = (currentPage - 1) * pageSize + i + 1;
            return (
              <article className="card" key={`${p.name}-${i}-${globalIndex}`}>
                <div className="visual">
                  <div className="visualnoise" />
                  <span className="number">{String(globalIndex).padStart(2, "0")}</span>
                  <span className="type">{p.type}</span>
                  <div className="monogram">{p.name.slice(0, 2).toUpperCase()}</div>
                </div>
                <div className="cardbody">
                  <div className="meta">
                    <span>{p.category}</span>
                    {p.year && <span>{p.year}</span>}
                  </div>
                  <h3>{p.name}</h3>
                  <p>{short(p.description)}</p>
                  <div className="tags">
                    {p.technology && <span>{p.technology}</span>}
                    {p.device && <span>{p.device}</span>}
                    {p.designer && (
                      <span className="dev-initials" title={`Designed by ${p.designer}`}>
                        Dev: {getInitials(p.designer)}
                      </span>
                    )}
                  </div>
                  <div className="links">
                    {p.url && p.url.startsWith("http") && (
                      <a href={p.url} target="_blank" rel="noreferrer">
                        View project ↗
                      </a>
                    )}
                    {p.github && p.github.startsWith("http") && (
                      <a href={p.github} target="_blank" rel="noreferrer">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {!visible.length && (
          <div className="empty">
            <p>No projects match your selected filters.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {visible.length > 0 && (
          <div className="pagination-wrapper">
            <div className="pagination-info">
              Showing{" "}
              <strong>
                {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, visible.length)}
              </strong>{" "}
              of <strong>{visible.length}</strong> projects
              {domain !== "All" && ` in "${domain}"`}
            </div>

            <div className="pagination-controls">
              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous Page"
              >
                ‹ Prev
              </button>

              {getPageNumbers(currentPage, totalPages).map((pNum, idx) =>
                pNum === "..." ? (
                  <span key={`ellipsis-${idx}`} className="page-ellipsis">
                    …
                  </span>
                ) : (
                  <button
                    key={`page-${pNum}`}
                    className={`page-btn ${currentPage === pNum ? "active" : ""}`}
                    onClick={() => handlePageChange(pNum as number)}
                  >
                    {pNum}
                  </button>
                )
              )}

              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Next Page"
              >
                Next ›
              </button>
            </div>

            <div className="page-size-selector">
              <span>Projects per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="eyebrow">
          <span>●</span> ABOUT SMARTDATA ENTERPRISES
        </div>
        <h2>From idea to enterprise software people rely on daily.</h2>
        <p>
          smartData Enterprises is a global technology and digital innovation partner. Our engineering portfolio spans
          custom software architecture, product design, and full-stack delivery across healthcare, fintech, education,
          real estate, AI integrations, SaaS ecosystems, and high-performance cloud platforms.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div>
          <div className="eyebrow">
            <span>●</span> HAVE A PROJECT?
          </div>
          <h2>
            Let's create something<br />
            <em>remarkable.</em>
          </h2>
        </div>
        <a className="contactbtn" href="mailto:designers.sdm@smartdatainc.net">
          Get in touch ↗
        </a>
      </section>

      {/* Footer */}
      <footer>
        <span>© {new Date().getFullYear()} smartData Enterprises. All rights reserved.</span>
        <span>
          Global Delivery · <a href="#work">Featured Projects</a> · Built with Next.js & Tailwind CSS
        </span>
      </footer>
    </main>
  );
}
