import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@formspree/react";
import {
  Mail, Menu, X, Calendar, CreditCard, RotateCcw, Droplet, Leaf,
  Venus, Soup, HeartPulse, Stethoscope, Linkedin, Instagram, ChevronDown,
  ArrowLeft, ArrowRight, Clock, User, Tag
} from "lucide-react";
import "./App.css";
import "./flipcards.css";
import "./index.css";
import { useTranslation } from "react-i18next";
import IntestineIcon from "./Icons/IntestineIcon";
import { Analytics } from "@vercel/analytics/react"
import { blogPosts, getBlogPost } from "./blogPosts";

// Language Dropdown Component
function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "/en.png" },
    { code: "es", label: "Español", flag: "/es.png" }
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow hover:bg-gray-100 transition"
      >
        <img
          src={`/${i18n.language}.png`}
          alt={i18n.language}
          className="w-5 h-5 rounded"
        />
        <span className="text-sm font-medium capitalize">{i18n.language}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 hover:bg-gray-100"
            >
              <img src={lang.flag} alt={lang.label} className="w-5 h-5 rounded mr-2" />
              <span className="text-sm">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Services Array
const services = [
  { key: "diabetes", icon: Droplet, iconColor: "text-red-500", backColor: "bg-red-100" },
  { key: "gut", icon: IntestineIcon, iconColor: "text-orange-500", backColor: "bg-orange-100" },
  { key: "heart", icon: HeartPulse, iconColor: "text-pink-500", backColor: "bg-pink-100" },
  { key: "women", icon: Venus, iconColor: "text-purple-500", backColor: "bg-purple-100" },
  { key: "healthy", icon: Leaf, iconColor: "text-green-500", backColor: "bg-green-100" },
  { key: "malnutrition", icon: Soup, iconColor: "text-sky-500", backColor: "bg-sky-100" }
];

function formatPostDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

function upsertMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(pathname) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", `${window.location.origin}${pathname}`);
}

function upsertStructuredData(data) {
  let tag = document.getElementById("nutrition-by-iballa-structured-data");
  if (!tag) {
    tag = document.createElement("script");
    tag.id = "nutrition-by-iballa-structured-data";
    tag.type = "application/ld+json";
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

function BlogOverview() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToPost = (index) => {
    const nextIndex = Math.max(0, Math.min(index, blogPosts.length - 1));
    const container = carouselRef.current;
    const slide = container?.children[nextIndex];

    if (slide) {
      slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveIndex(nextIndex);
    }
  };

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    const nextIndex = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(Math.max(0, Math.min(nextIndex, blogPosts.length - 1)));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") scrollToPost(activeIndex + 1);
    if (event.key === "ArrowLeft") scrollToPost(activeIndex - 1);
  };

  return (
    <main className="bg-white text-gray-900">
      <section className="pt-10 pb-10 text-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-wide mb-3">Nutrition by Iballa Blog</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Evidence-based nutrition guidance
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Practical, supportive articles to help you understand your health and build sustainable nutrition habits.
          </p>
        </div>
      </section>

      <section
        className="relative bg-gray-50 py-10 sm:py-14"
        aria-label="Blog posts carousel"
        onKeyDown={handleKeyDown}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-3xl font-semibold">Latest Posts</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToPost(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="h-10 w-10 rounded-full bg-white text-[#3b5f58] shadow ring-1 ring-[#7fae9e] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Previous blog post"
              >
                <ArrowLeft size={20} className="mx-auto" />
              </button>
              <button
                type="button"
                onClick={() => scrollToPost(activeIndex + 1)}
                disabled={activeIndex === blogPosts.length - 1}
                className="h-10 w-10 rounded-full bg-white text-[#3b5f58] shadow ring-1 ring-[#7fae9e] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Next blog post"
              >
                <ArrowRight size={20} className="mx-auto" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth gap-6 pb-4"
            role="region"
            aria-roledescription="carousel"
            tabIndex={0}
          >
            {blogPosts.map((post, index) => (
              <article
                key={post.slug}
                className="snap-center shrink-0 w-full rounded-xl shadow-lg ring-1 ring-[#7fae9e] overflow-hidden bg-white transition-all duration-200 hover:ring-2"
                aria-label={`${index + 1} of ${blogPosts.length}: ${post.title}`}
              >
                <div className="grid md:grid-cols-2 min-h-[30rem]">
                  <img
                    src={post.image}
                    alt=""
                    className="h-64 md:h-full w-full object-cover object-center"
                  />
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                      <span className="inline-flex items-center rounded-full bg-[#cde4dc] px-3 py-1 font-semibold text-[#3b5f58]">
                        {post.category}
                      </span>
                      <span>{formatPostDate(post.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={16} />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
                      {post.title}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-6">
                      {post.excerpt}
                    </p>
                    <a
                      href={`/blog/${post.slug}`}
                      className="self-start bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white text-sm font-semibold px-6 py-2 rounded-full shadow hover:brightness-105 transition"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BlogSection({ section }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900">{section.heading}</h2>
      {section.body?.map((paragraph) => (
        <p key={paragraph} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
          {paragraph}
        </p>
      ))}
      {section.list && (
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.bodyAfter?.map((paragraph) => (
        <p key={paragraph} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
          {paragraph}
        </p>
      ))}
      {section.subsections?.map((subsection) => (
        <div key={subsection.heading} className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-[#3b5f58]">{subsection.heading}</h3>
          {subsection.body?.map((paragraph) => (
            <p key={paragraph} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
          {subsection.list && (
            <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg leading-relaxed text-gray-700">
              {subsection.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

function BlogArticle({ post }) {
  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <main className="bg-white text-gray-900">
      <article>
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#3b5f58]/50"></div>
          <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col justify-center text-white">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 mb-5 text-sm font-semibold hover:text-gray-100 transition"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </a>
            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 font-semibold text-[#3b5f58]">
                <Tag size={15} />
                {post.category}
              </span>
              <span>{formatPostDate(post.date)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={16} />
                {post.readingTime}
              </span>
              <span className="inline-flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-[#cde4dc] text-[#3b5f58] p-5 sm:p-6 mb-10">
            <p className="text-base sm:text-lg font-semibold leading-relaxed">{post.callout}</p>
          </div>

          {post.sections.map((section) => (
            <BlogSection key={section.heading} section={section} />
          ))}

          <section className="border-t border-[#cde4dc] pt-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">References</h2>
            <ol className="list-decimal pl-6 space-y-3 text-sm sm:text-base leading-relaxed text-gray-700">
              {post.references.map((reference) => (
                <li key={reference.url}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b5f58] underline hover:text-[#7fae9e] transition"
                  >
                    {reference.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>

      <nav className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 flex flex-col sm:flex-row gap-4 justify-between">
        {previousPost ? (
          <a
            href={`/blog/${previousPost.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#3b5f58] shadow ring-1 ring-[#7fae9e] hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Previous Article
          </a>
        ) : (
          <span></span>
        )}
        {nextPost ? (
          <a
            href={`/blog/${nextPost.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-105 transition"
          >
            Next Article
            <ArrowRight size={18} />
          </a>
        ) : (
          <a
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-105 transition"
          >
            Back to Blog
            <ArrowRight size={18} />
          </a>
        )}
      </nav>
    </main>
  );
}

export default function NutritionByIballa() {
  const [state, handleSubmit] = useForm("xzzvqdlq");
  const [messageValue, setMessageValue] = useState("");
  const messageRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  const slug = path.startsWith("/blog/") ? path.replace("/blog/", "") : "";
  const activePost = slug ? getBlogPost(slug) : null;
  const isBlogRoute = path === "/blog";
  const isArticleRoute = path.startsWith("/blog/");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleInternalNavigation = (event) => {
      const anchor = event.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

      if (
        !href ||
        isModifiedClick ||
        anchor.target === "_blank" ||
        (!href.startsWith("/blog") && !href.startsWith("/#"))
      ) {
        return;
      }

      event.preventDefault();
      window.history.pushState({}, "", href);
      setPath(window.location.pathname);

      window.setTimeout(() => {
        if (window.location.hash) {
          document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 0);
    };

    document.addEventListener("click", handleInternalNavigation);
    return () => document.removeEventListener("click", handleInternalNavigation);
  }, []);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
    }
  }, [messageValue]);

  useEffect(() => {
    const widgetContainer = document.getElementById("calendly-widget");
    const alreadyLoaded = widgetContainer?.querySelector("iframe");

    if (window.Calendly && widgetContainer && !alreadyLoaded) {
      window.Calendly.initInlineWidget({
        url: "https://calendly.com/iballa-mtzyanes",
        parentElement: widgetContainer,
        prefill: {},
        utm: {}
      });
    }
  }, []);

  useEffect(() => {
    const title = activePost
      ? `${activePost.title} | Nutrition by Iballa`
      : isBlogRoute
        ? "Blog | Nutrition by Iballa"
        : "Nutrition by Iballa";
    const description = activePost
      ? activePost.excerpt
      : isBlogRoute
        ? "Evidence-based nutrition articles from Nutrition by Iballa."
        : "Personalised, evidence-based nutrition advice and care in English and Spanish.";

    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", "index, follow");
    upsertCanonical(activePost ? `/blog/${activePost.slug}` : isBlogRoute ? "/blog" : "/");
    upsertStructuredData(
      activePost
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: activePost.title,
            description: activePost.excerpt,
            image: `${window.location.origin}${activePost.image}`,
            datePublished: activePost.date,
            author: {
              "@type": "Person",
              name: activePost.author
            },
            publisher: {
              "@type": "Organization",
              name: "Nutrition by Iballa"
            },
            mainEntityOfPage: `${window.location.origin}/blog/${activePost.slug}`
          }
        : isBlogRoute
          ? {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Nutrition by Iballa Blog",
            description,
            url: `${window.location.origin}/blog`
          }
          : {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Nutrition by Iballa",
              description,
              url: window.location.origin
            }
    );
  }, [activePost, isBlogRoute]);

 const appointmentTypes = {
  en: [
    {
      key: "initial",
      icon: Calendar,
      calendlyUrl: "https://calendly.com/iballa-mtzyanes/initial-consultation"
    },
    {
      key: "review",
      icon: RotateCcw,
      calendlyUrl: "https://calendly.com/iballa-mtzyanes/review-consultation"
    }
  ],
  es: [
    {
      key: "initial",
      icon: Calendar,
      calendlyUrl: "https://calendly.com/iballa-mtzyanes/consulta-inicial"
    },
    {
      key: "review",
      icon: RotateCcw,
      calendlyUrl: "https://calendly.com/iballa-mtzyanes/consulta-seguimiento"
    }
  ]
};

  return (
   <div className="bg-white text-gray-900 font-sans">
    {/* Header */}
  <header className="h-24 shadow-md bg-white relative z-[999]">
  <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center relative z-[1000]">
    <img src="/logo.png" alt="Logo" className="h-20 w-[180px] object-contain" />

    <div className="flex items-center gap-6 relative z-[1000]">
      <LanguageDropdown />
      <nav className="hidden md:flex space-x-6">
        <a href="/#services">{t("nav.services")}</a>
        <a href="/#about">{t("nav.about")}</a>
        <a href="/#appointments">{t("nav.appointments")}</a>
        <a href="/blog">Blog</a>
        <a href="/#contact">{t("nav.contact")}</a>
      </nav>

      {/* Mobile Toggle */}
      <button
        className="md:hidden relative z-[1100] text-gray-900"
        onClick={() => setNavOpen(!navOpen)}
      >
        {navOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

  {/* Mobile Navigation */}
  {navOpen && (
    <nav className="absolute top-24 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 p-6 z-60 md:hidden">
      <a href="/#services" onClick={() => setNavOpen(false)}>
        {t("nav.services")}
      </a>
      <a href="/#about" onClick={() => setNavOpen(false)}>
        {t("nav.about")}
      </a>
      <a href="/#appointments" onClick={() => setNavOpen(false)}>
        {t("nav.appointments")}
      </a>
      <a href="/blog" onClick={() => setNavOpen(false)}>
        Blog
      </a>
      <a href="/#contact" onClick={() => setNavOpen(false)}>
        {t("nav.contact")}
      </a>
    </nav>
  )}
</header>


{isBlogRoute ? (
  <BlogOverview />
) : isArticleRoute && activePost ? (
  <BlogArticle post={activePost} />
) : isArticleRoute ? (
  <main className="bg-gray-50 px-4 py-16 text-center">
    <h1 className="text-3xl font-semibold mb-4">Article not found</h1>
    <p className="text-gray-700 mb-6">The article you are looking for is not available.</p>
    <a
      href="/blog"
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-6 py-2 text-sm font-semibold text-white shadow hover:brightness-105 transition"
    >
      <ArrowLeft size={18} />
      Back to Blog
    </a>
  </main>
) : (
<>
{/* Hero Section */}
<section className="pt-10 pb-10 text-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
  <div className="max-w-[90rem] mx-auto w-full px-6 lg:px-12">

    {/* Title */}
    <div className="max-w-xl w-full mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
        {t("hero.title") || "Nutrición by Iballa"}
      </h1>
    </div>

    {/* Paragraph */}
    <div className="max-w-5xl w-full mx-auto px-4">
      <p className="text-base sm:text-lg leading-snug mb-6">
        {t("hero.subtitle")}
      </p>
    </div>

    {/* Button */}
    <div className="max-w-xl w-full mx-auto px-4">
      <a
        href="#appointments"
        className="inline-block bg-white text-[#3b5f58] font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        {t("hero.cta")}
      </a>
    </div>
  </div>
</section>


 <section id="services" className="relative bg-white overflow-hidden">
  {/* Background Image Layer */}
  <img
    src="/banner2.png"
    alt="Services Banner"
    className="absolute inset-0 w-full h-full object-cover object-top sm:object-center z-0"
  />

  {/* Optional overlay for readability */}
  <div className="absolute inset-0 bg-white/80 z-10"></div>

  {/* Content Layer */}
  <div className="relative z-20 px-4 sm:px-8 md:px-12 py-12">
    <h2 className="text-3xl font-semibold mb-12 text-center">
      {t("services.heading")}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {services.map((service, idx) => {
        const Icon = service.icon;
        return (
          <div key={idx} className="flip-card h-56 overflow-hidden">
            <div className="flip-card-inner relative w-full h-full rounded-xl shadow-lg">
              <div className="flip-card-front absolute inset-0 flex flex-col justify-start items-center bg-gradient-to-br from-[#cde4dc] to-[#a3c9b9] text-white rounded-xl p-6">
                <RotateCcw className="absolute top-3 right-3 w-5 h-5 text-white opacity-70" />
                <div className="h-6"></div>
                <Icon size={36} className={`${service.iconColor} mb-3`} />
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-center leading-snug max-w-[14ch] sm:max-w-none mx-auto break-words">
                  {t(`services.items.${service.key}.title`)}
                </h3>
              </div>
              <div className={`flip-card-back absolute inset-0 flex flex-col justify-center items-center ${service.backColor} text-gray-900 rounded-xl p-6`}>
                {(() => {
                  const desc = t(`services.items.${service.key}.description`, { returnObjects: true });
                  return Array.isArray(desc) ? (
                    <ul className="list-disc list-inside text-left text-sm leading-relaxed space-y-1">
                      {desc.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-center leading-relaxed">
                      {desc}
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


      {/* About */}
 <section id="about" className="p-12 bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <img
          src="/profile1.png"
          alt="Iballa Martinez"
          className="rounded-full h-48 md:h-80 lg:h-96 shadow-lg border-4 border-white"
        />
        <div className="text-left">
          <h2 className="text-3xl font-semibold mb-4">{t("about.heading")}</h2>

          <p
            className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl mb-4"
            dangerouslySetInnerHTML={{ __html: t("about.paragraph1") }}
          />
          <p
            className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl mb-4"
            dangerouslySetInnerHTML={{ __html: t("about.paragraph2") }}
          />

          {/* Mobile-only toggle */}
          {isMobile ? (
            <>
              {expanded && (
                <>
                  <p
                    className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl mb-4"
                    dangerouslySetInnerHTML={{ __html: t("about.paragraph3") }}
                  />
                  <p
                    className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl mb-4"
                    dangerouslySetInnerHTML={{ __html: t("about.paragraph4") }}
                  />
                </>
              )}
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm underline text-white hover:text-gray-200 transition"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            </>
          ) : (
            <>
              {/* Always show on desktop */}
              <p
                className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl mb-4"
                dangerouslySetInnerHTML={{ __html: t("about.paragraph3") }}
              />
              <p
                className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl mb-4"
                dangerouslySetInnerHTML={{ __html: t("about.paragraph4") }}
              />
            </>
          )}
        </div>
      </div>
    </section>
	
{/* Appointments */}
<section
  id="appointments"
  className="relative bg-gray-50 pt-8 pb-12 sm:pt-12 sm:pb-20"
>
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-white/70 z-0"></div>

  {/* Centered Title */}
  <div className="relative z-10 text-center mb-8 sm:mb-12">
    <h2 className="text-3xl font-semibold">
      {t("appointments.heading")}
    </h2>
  </div>

  {/* Responsive Layout: Cards first on mobile, image second */}
  <div className="relative z-10 flex flex-col xl:flex-row-reverse max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
    
    {/* Appointment Cards */}
    <div className="order-1 xl:order-2 w-full xl:w-1/2 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-md items-center">
        {appointmentTypes[lang].map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={idx} className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] hover:ring-2 transition-all duration-200 overflow-hidden flex flex-col w-full">
              {/* Card Header */}
              <div className="flex items-center justify-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white p-4">
                <Icon size={32} className="mr-2" />
                <h3 className="text-lg font-bold">
                  {t(`appointments.types.${service.key}.title`)}
                </h3>
              </div>

              {/* Card Body */}
              <div className="flex-grow flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm md:text-base text-justify">
                {(() => {
  const desc = t(`appointments.types.${service.key}.description`, { returnObjects: true });

  return Array.isArray(desc) ? (
    <ul className="list-disc list-inside text-left text-sm leading-relaxed space-y-1">
      {desc.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  ) : (
    <p className="text-xs sm:text-sm md:text-base text-center leading-relaxed">
      {desc}
    </p>
  );
})()}

                <a
                  href={service.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white text-xs font-semibold px-6 py-2 rounded-full hover:brightness-105 transition"
                >
                  {t("appointments.cta")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Image */}
   <div className="order-2 xl:order-1 w-full xl:w-1/2 h-48 sm:h-64 xl:h-auto mt-8 xl:mt-0 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: "url('/banner1.png')" }}></div>
  </div>
</section>

     {/* Contact */}
<section id="contact" className="p-8 sm:p-12 bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white text-center">
  <h2 className="text-3xl font-semibold mb-4">{t("contact.heading")}</h2>

  <p
    className="text-base sm:text-lg max-w-xl mx-auto mb-6"
    dangerouslySetInnerHTML={{ __html: t("contact.intro") }}
  />

  {state.succeeded ? (
    <p className="text-white text-lg">{t("contact.success")}</p>
  ) : (
    <form className="max-w-xl mx-auto w-full space-y-4" onSubmit={handleSubmit}>
      {/* Name */}
      <input
        id="name"
        name="name"
        required
        placeholder={t("contact.fields.name")}
        className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
      />

      {/* Email */}
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder={t("contact.fields.email")}
        className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
      />

      {/* Message */}
      <textarea
        id="message"
        name="message"
        required
        rows={4}
        ref={messageRef}
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        placeholder={t("contact.fields.message")}
        className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
      />

      <p className="text-sm text-white/80">{t("contact.fields.note")}</p>

      {/* Submit */}
      <div className="text-center pt-2">
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-white px-8 py-3 text-sm font-medium text-green-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {t("contact.fields.submit")}
        </button>
      </div>
    </form>
  )}
</section>

      </>
)}

      {/* Footer */}
      <footer className="bg-white text-[#1e1e5a] px-4 py-6 rounded-t-lg shadow-inner">
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          {/* Logo */}
          <img
            src="/favicon.png"
            alt={t("footer.logoAlt")}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />

          {/* Bio */}
          <div className="flex flex-col justify-center max-w-[60%] sm:max-w-md">
            <p className="text-[10px] leading-tight text-left">
              {t("footer.bio")}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://linkedin.com/in/iballamartinezyanes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition duration-200"
            >
              <Linkedin size={20} color="#1e1e5a" />
            </a>
            <a
              href="https://www.instagram.com/nutrition.by.iballa?igsh=cWVjbXM3ODl2cWZ5" // Replace with actual handle
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition duration-200"
            >
              <Instagram size={20} color="#1e1e5a" />
            </a>
          </div>
        </div>
      </footer>
     <Analytics />
    </div>
  );
}

