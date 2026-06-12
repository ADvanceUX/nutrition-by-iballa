import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@formspree/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail, Menu, X, Calendar, CreditCard, RotateCcw, Droplet, Leaf,
  Venus, Soup, HeartPulse, Stethoscope, Linkedin, Instagram, ChevronDown,
  ArrowLeft, ArrowRight, Clock, User, Tag, CheckCircle2, ClipboardList,
  GlassWater, Wheat, Dumbbell, Apple, Utensils, ShieldCheck, LogOut,
  Scale, Syringe, ChevronUp
} from "lucide-react";
import "./App.css";
import "./index.css";
import { useTranslation } from "react-i18next";
import IntestineIcon from "./Icons/IntestineIcon";
import { Analytics } from "@vercel/analytics/react"
import { blogPosts, getBlogPost } from "./blogPosts";
import { servicesContent } from "./servicesData";
import {
  assessmentSteps,
  calculateAssessmentResults,
  getCompletedQuestionCount,
  getQuestionCount
} from "./nutritionAssessment";
import { isSupabaseConfigured, supabase } from "./supabaseClient";
import {
  clearAssessmentDraft,
  createAssessmentLead,
  getCurrentSession,
  isCurrentUserAdmin,
  listSubscribers,
  loadAssessmentDraft,
  saveAssessmentDraft,
  saveAssessmentResponse,
  signInAdmin,
  signOutAdmin,
  subscribeFromBlog,
  updateUnsubscribeStatus
} from "./submissionService";

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

const serviceIcons = {
  clipboard: ClipboardList,
  droplet: Droplet,
  gut: IntestineIcon,
  scale: Scale,
  syringe: Syringe,
  venus: Venus
};

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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function NewsletterSignupForm({ compact = false }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", consent: false });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.firstName.trim() || !form.lastName.trim() || !isValidEmail(form.email)) {
      setStatus({ type: "error", message: "Please enter your first name, last name and a valid email address." });
      return;
    }

    if (!form.consent) {
      setStatus({ type: "error", message: "Please tick the consent box before subscribing." });
      return;
    }

    setSubmitting(true);
    try {
      await subscribeFromBlog({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email
      });
      setForm({ firstName: "", lastName: "", email: "", consent: false });
      setStatus({ type: "success", message: "Thanks for subscribing. You have been added to the newsletter list." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white overflow-hidden ${compact ? "lg:h-full lg:flex lg:flex-col" : ""}`}>
      <div className={`bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-5 py-6 text-white ${compact ? "" : "sm:px-8"}`}>
        <h2 id="newsletter-signup-heading" className={`${compact ? "text-2xl" : "text-2xl sm:text-3xl"} font-semibold`}>
          Get nutrition tips in your inbox
        </h2>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/95">
          Receive new blog posts and practical nutrition guidance by email.
        </p>
      </div>
      <form className={`space-y-4 p-5 ${compact ? "lg:flex-1 lg:flex lg:flex-col lg:justify-center" : "sm:p-8"}`} onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-800">First name</span>
            <input
              type="text"
              value={form.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              autoComplete="given-name"
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-800">Last name</span>
            <input
              type="text"
              value={form.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              autoComplete="family-name"
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-800">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
              required
            />
          </label>
        </div>
        <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            className="mt-1 h-5 w-5 rounded border border-[#7fae9e] checked:bg-[#3b5f58] focus:ring-2 focus:ring-[#cde4dc]"
          />
          <span>
            Yes, I’d like to receive nutrition tips and new blog posts by email. I can unsubscribe at any time.
          </span>
        </label>
        {status.message && (
          <p className={`text-sm font-semibold ${status.type === "success" ? "text-[#3b5f58]" : "text-red-600"}`}>
            {status.message}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-6 py-2 text-sm font-semibold text-white shadow transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Subscribe"}
          <Mail size={18} />
        </button>
      </form>
    </div>
  );
}

function BlogOverview() {
  const latestPost = blogPosts[blogPosts.length - 1];
  const postsNewestFirst = [...blogPosts].reverse();

  return (
    <main className="bg-white text-gray-900">
      <section className="pt-10 pb-10 text-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-wide mb-3">Nutrition by Iballa Blogs</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Evidence-based nutrition guidance
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Practical, supportive articles to help you understand your health and build sustainable nutrition habits.
          </p>
        </div>
      </section>

      <section className="relative bg-gray-50 py-10 sm:py-14" aria-labelledby="latest-blog-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <h2 id="latest-blog-heading" className="text-3xl font-semibold mb-6">
            Latest Blog
          </h2>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.8fr)] lg:items-stretch">
            <div>
              <article className="h-full rounded-xl shadow-lg ring-1 ring-[#7fae9e] overflow-hidden bg-white transition-all duration-200 hover:ring-2">
                <div className="grid md:grid-cols-2 min-h-[30rem]">
                  <img
                    src={latestPost.image}
                    alt=""
                    className="h-64 md:h-full w-full object-cover object-center"
                  />
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                      <span className="inline-flex items-center rounded-full bg-[#cde4dc] px-3 py-1 font-semibold text-[#3b5f58]">
                        {latestPost.category}
                      </span>
                      <span>{formatPostDate(latestPost.date)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={16} />
                        {latestPost.readingTime}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
                      {latestPost.title}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-6">
                      {latestPost.excerpt}
                    </p>
                    <a
                      href={`/blog/${latestPost.slug}`}
                      className="self-start inline-flex items-center gap-2 bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white text-sm font-semibold px-6 py-2 rounded-full shadow hover:brightness-105 transition"
                    >
                      Read More
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="h-full">
              <NewsletterSignupForm compact />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14" aria-labelledby="all-blog-posts-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <h2 id="all-blog-posts-heading" className="text-3xl font-semibold mb-6">
            All Posts
          </h2>
          <div className="space-y-5">
            {postsNewestFirst.map((post) => (
              <article key={post.slug} className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] overflow-hidden bg-white transition-all duration-200 hover:ring-2">
                <a href={`/blog/${post.slug}`} className="grid sm:grid-cols-[12rem_1fr] group">
                  <img src={post.image} alt="" className="h-48 sm:h-full w-full object-cover object-center" />
                  <div className="p-5 sm:p-6">
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
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-3 group-hover:text-[#3b5f58] transition">
                      {post.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-700">
                      {post.excerpt}
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

function BlogSection({ section }) {
  const renderText = (text) => {
    if (!Array.isArray(text)) return text;

    return text.map((part) =>
      typeof part === "string" ? (
        part
      ) : (
        <a
          key={`${part.href}-${part.label}`}
          href={part.href}
          className="text-[#3b5f58] underline hover:text-[#7fae9e] transition"
        >
          {part.label}
        </a>
      )
    );
  };

  return (
    <section className="mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900">{section.heading}</h2>
      {section.body?.map((paragraph) => (
        <p key={paragraph} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
          {renderText(paragraph)}
        </p>
      ))}
      {section.list && (
        <ul className="list-disc pl-6 space-y-2 text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.table && (
        <div className="overflow-x-auto rounded-xl shadow ring-1 ring-[#7fae9e] bg-white mb-4">
          <table className="min-w-full text-left text-sm sm:text-base">
            <thead className="bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
              <tr>
                {section.table.headers.map((header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cde4dc]">
              {section.table.rows.map((row) => (
                <tr key={row.join("-")} className="hover:bg-gray-50 transition">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.bodyAfter?.map((paragraph) => (
        <p key={paragraph} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
          {renderText(paragraph)}
        </p>
      ))}
      {section.subsections?.map((subsection) => (
        <div key={subsection.heading} className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-[#3b5f58]">{subsection.heading}</h3>
          {subsection.body?.map((paragraph) => (
            <p key={paragraph} className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
              {renderText(paragraph)}
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

const assessmentIcons = {
  "basics": ClipboardList,
  "fruit-vegetables": Apple,
  "fibre-wholegrains": Wheat,
  protein: Utensils,
  hydration: GlassWater,
  "meal-patterns": Clock,
  lifestyle: Dumbbell
};

function AssessmentContactForm({ contact, onContactChange, onSubmit, submitting, error }) {
  return (
    <motion.div
      key="assessment-contact"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-5 py-6 text-white sm:px-8">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white/90 p-3 text-[#3b5f58] shadow">
            <User size={28} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">Before you start</h2>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/95">
              Add your details to begin your personalised nutrition overview.
            </p>
          </div>
        </div>
      </div>
      <form className="space-y-4 p-5 sm:p-8" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-800">First name</span>
            <input
              type="text"
              value={contact.firstName}
              onChange={(event) => onContactChange("firstName", event.target.value)}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-gray-800">Last name</span>
            <input
              type="text"
              value={contact.lastName}
              onChange={(event) => onContactChange("lastName", event.target.value)}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
              required
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Email</span>
          <input
            type="email"
            value={contact.email}
            onChange={(event) => onContactChange("email", event.target.value)}
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
            required
          />
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
          <input
            type="checkbox"
            checked={contact.newsletterOptIn}
            onChange={(event) => onContactChange("newsletterOptIn", event.target.checked)}
            className="mt-1 h-5 w-5 rounded border border-[#7fae9e] checked:bg-[#3b5f58] focus:ring-2 focus:ring-[#cde4dc]"
          />
          <span>
            Yes, I’d like to receive nutrition tips and new blog posts by email. I can unsubscribe at any time.
          </span>
        </label>
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-6 py-2 text-sm font-semibold text-white shadow transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Start assessment"}
          <ArrowRight size={18} />
        </button>
      </form>
    </motion.div>
  );
}

function NutritionAssessmentPage() {
  const draft = loadAssessmentDraft();
  const [contact, setContact] = useState(draft?.contact || {
    firstName: "",
    lastName: "",
    email: "",
    newsletterOptIn: false
  });
  const [leadId, setLeadId] = useState(draft?.leadId || "");
  const [contactSubmitted, setContactSubmitted] = useState(Boolean(draft?.leadId));
  const [answers, setAnswers] = useState(draft?.answers || {});
  const [currentStep, setCurrentStep] = useState(draft?.currentStep || 0);
  const [showResults, setShowResults] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [assessmentError, setAssessmentError] = useState("");
  const [savingResults, setSavingResults] = useState(false);
  const totalQuestions = getQuestionCount();
  const completedQuestions = getCompletedQuestionCount(answers);
  const progress = showResults
    ? 100
    : Math.round((completedQuestions / totalQuestions) * 100);
  const step = assessmentSteps[currentStep];
  const StepIcon = assessmentIcons[step.id] || ClipboardList;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === assessmentSteps.length - 1;
  const currentStepComplete = step.questions.every((question) => question.optional || answers[question.id]);

  useEffect(() => {
    if (!showResults) {
      saveAssessmentDraft({
        contact,
        leadId,
        answers,
        currentStep
      });
    }
  }, [answers, contact, currentStep, leadId, showResults]);

  const updateContact = (field, value) => {
    setContact((currentContact) => ({
      ...currentContact,
      [field]: value
    }));
  };

  const updateAnswer = (questionId, value) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: value
    }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    setContactError("");

    if (!contact.firstName.trim() || !contact.lastName.trim() || !isValidEmail(contact.email)) {
      setContactError("Please enter your first name, last name and a valid email address.");
      return;
    }

    setContactSubmitting(true);
    try {
      const { leadId: savedLeadId } = await createAssessmentLead(contact);
      setLeadId(savedLeadId);
      setContactSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setContactError(error.message);
    } finally {
      setContactSubmitting(false);
    }
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentStep(assessmentSteps.length - 1);
      return;
    }

    setCurrentStep((stepIndex) => Math.max(0, stepIndex - 1));
  };

  const goNext = async () => {
    if (!currentStepComplete) return;

    if (isLastStep) {
      const result = calculateAssessmentResults(answers);
      setAssessmentError("");
      setSavingResults(true);
      try {
        await saveAssessmentResponse({ leadId, answers, result });
        clearAssessmentDraft();
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        setAssessmentError(error.message);
      } finally {
        setSavingResults(false);
      }
      return;
    }

    setCurrentStep((stepIndex) => stepIndex + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restartAssessment = () => {
    clearAssessmentDraft();
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      newsletterOptIn: false
    });
    setLeadId("");
    setContactSubmitted(false);
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setAssessmentError("");
    setContactError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-white text-gray-900">
      <section className="pt-10 pb-10 text-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-wide mb-3">
            Nutrition by Iballa
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Nutrition Assessment
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Get a general overview of your everyday nutrition habits and simple ideas to support your goals.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="mb-6 rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#3b5f58]">
                  {showResults ? "Assessment complete" : contactSubmitted ? `Step ${currentStep + 1} of ${assessmentSteps.length}` : "Contact details"}
                </p>
                <p className="text-sm text-gray-600">
                  This tool provides general educational insights only. It does not diagnose or replace personalised medical or dietetic advice.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#cde4dc] px-3 py-1 text-sm font-semibold text-[#3b5f58]">
                <CheckCircle2 size={16} />
                {progress}% complete
              </span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div
                key="assessment-results"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.25 }}
              >
                <AssessmentResults answers={answers} onBack={goBack} onRestart={restartAssessment} />
              </motion.div>
            ) : !contactSubmitted ? (
              <AssessmentContactForm
                contact={contact}
                onContactChange={updateContact}
                onSubmit={submitContact}
                submitting={contactSubmitting}
                error={contactError}
              />
            ) : (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-5 py-6 text-white sm:px-8">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white/90 p-3 text-[#3b5f58] shadow">
                      <StepIcon size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{step.title}</h2>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/95">{step.intro}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="space-y-6">
                    {step.questions.map((question) => (
                      <fieldset key={question.id} className="space-y-3">
                        <legend className="text-base sm:text-lg font-semibold text-gray-900">
                          {question.label}
                          {question.helper && (
                            <span className="ml-2 text-sm font-normal text-gray-500">{question.helper}</span>
                          )}
                        </legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {question.options.map((option) => {
                            const selected = answers[question.id] === option.value;
                            return (
                              <label
                                key={option.value}
                                className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm sm:text-base transition ${
                                  selected
                                    ? "border-[#3b5f58] bg-[#cde4dc] text-[#3b5f58] shadow"
                                    : "border-gray-200 bg-white text-gray-800 hover:border-[#7fae9e] hover:bg-gray-50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.value}
                                  checked={selected}
                                  onChange={() => updateAnswer(question.id, option.value)}
                                  className="h-5 w-5 rounded-full border border-[#7fae9e] checked:bg-[#3b5f58] focus:ring-2 focus:ring-[#cde4dc]"
                                />
                                <span className="font-medium leading-snug">{option.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={isFirstStep}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#3b5f58] shadow ring-1 ring-[#7fae9e] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!currentStepComplete || savingResults}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-6 py-2 text-sm font-semibold text-white shadow transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {savingResults ? "Saving..." : isLastStep ? "View Results" : "Next"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  {assessmentError && (
                    <p className="mt-4 text-sm font-semibold text-red-600">{assessmentError}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function AssessmentResults({ answers, onBack, onRestart }) {
  const results = calculateAssessmentResults(answers);
  const categoryOrder = ["fibre", "protein", "fruitVegetables", "hydration", "lifestyle"];

  return (
    <div className="space-y-6">
      <section className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#3b5f58]">Your general summary</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">
              {results.overall.rating}
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-700">
              {results.overall.summary}
            </p>
          </div>
          <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#cde4dc] to-[#a3c9b9] text-[#3b5f58] shadow mx-auto lg:mx-0">
            <div className="text-center">
              <div className="text-4xl font-bold">{results.overall.score}</div>
              <div className="text-sm font-semibold">out of 100</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {categoryOrder.map((category) => {
          const item = results.categories[category];
          return (
            <article key={category} className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 transition hover:ring-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#3b5f58]">{item.rating}</p>
                </div>
                <span className="rounded-full bg-[#cde4dc] px-3 py-1 text-sm font-bold text-[#3b5f58]">
                  {item.score}/100
                </span>
              </div>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-700">{item.summary}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:p-8">
        <h3 className="text-2xl font-semibold text-gray-900">Practical recommendations</h3>
        <ul className="mt-5 space-y-3">
          {results.recommendations.map((recommendation) => (
            <li key={recommendation} className="flex gap-3 text-base leading-relaxed text-gray-700">
              <CheckCircle2 className="mt-1 shrink-0 text-[#3b5f58]" size={20} />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl shadow-lg bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-semibold">Looking for tailored nutrition guidance?</h3>
            <p className="mt-3 text-base sm:text-lg leading-relaxed">
              While this assessment provides general nutrition insights, a consultation can provide personalised recommendations based on your goals, lifestyle, and health history.
            </p>
          </div>
          <a
            href="/#appointments"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#3b5f58] shadow transition hover:bg-gray-100"
          >
            BOOK A CONSULTATION
            <Calendar size={18} />
          </a>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#3b5f58] shadow ring-1 ring-[#7fae9e] transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back to answers
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-6 py-2 text-sm font-semibold text-white shadow transition hover:brightness-105"
        >
          <RotateCcw size={18} />
          Restart assessment
        </button>
      </div>
    </div>
  );
}

function AdminSubscribersPage() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);

  const loadAdminData = async () => {
    setLoadingSubscribers(true);
    setStatus({ type: "", message: "" });
    try {
      const admin = await isCurrentUserAdmin();
      setIsAdmin(admin);
      if (admin) {
        setSubscribers(await listSubscribers());
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoadingSubscribers(false);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCheckingSession(false);
      return undefined;
    }

    let mounted = true;

    getCurrentSession()
      .then((currentSession) => {
        if (!mounted) return;
        setSession(currentSession);
        setCheckingSession(false);
      })
      .catch((error) => {
        if (!mounted) return;
        setStatus({ type: "error", message: error.message });
        setCheckingSession(false);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setIsAdmin(false);
      setSubscribers([]);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      loadAdminData();
    }
  }, [session]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      await signInAdmin(form.email, form.password);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
      setSession(null);
      setIsAdmin(false);
      setSubscribers([]);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const toggleUnsubscribed = async (subscriber) => {
    setStatus({ type: "", message: "" });
    try {
      await updateUnsubscribeStatus(subscriber.id, !subscriber.unsubscribed);
      setSubscribers(await listSubscribers());
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <main className="bg-white text-gray-900">
      <section className="pt-10 pb-10 text-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-wide mb-3">Admin</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Review subscriber consent, signup source and unsubscribe status.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {!isSupabaseConfigured ? (
            <div className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900">Supabase is not configured</h2>
              <p className="mt-3 text-gray-700">
                Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY to .env.local to enable admin login.
              </p>
            </div>
          ) : checkingSession ? (
            <div className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:p-8">
              <p className="font-semibold text-[#3b5f58]">Checking session...</p>
            </div>
          ) : !session ? (
            <form className="mx-auto max-w-md rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:p-8" onSubmit={handleLogin}>
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-full bg-[#cde4dc] p-3 text-[#3b5f58]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Admin sign in</h2>
                  <p className="text-sm text-gray-600">Use your Supabase Auth admin account.</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-800">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-gray-800">Password</span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cde4dc]"
                    required
                  />
                </label>
                {status.message && <p className="text-sm font-semibold text-red-600">{status.message}</p>}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] px-6 py-2 text-sm font-semibold text-white shadow transition hover:brightness-105"
                >
                  Sign in
                  <ShieldCheck size={18} />
                </button>
              </div>
            </form>
          ) : !isAdmin ? (
            <div className="rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900">Admin access required</h2>
              <p className="mt-3 text-gray-700">
                You are signed in, but this account is not listed in the admin_users table.
              </p>
              {status.message && <p className="mt-3 text-sm font-semibold text-red-600">{status.message}</p>}
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#3b5f58] shadow ring-1 ring-[#7fae9e] transition hover:bg-gray-100"
              >
                Sign out
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#3b5f58]">Signed in as admin</p>
                  <p className="text-sm text-gray-600">{session.user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#3b5f58] shadow ring-1 ring-[#7fae9e] transition hover:bg-gray-100"
                >
                  Sign out
                  <LogOut size={18} />
                </button>
              </div>

              {status.message && (
                <p className={`text-sm font-semibold ${status.type === "error" ? "text-red-600" : "text-[#3b5f58]"}`}>
                  {status.message}
                </p>
              )}

              <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-[#7fae9e] bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Email</th>
                        <th className="px-4 py-3 font-semibold">Source</th>
                        <th className="px-4 py-3 font-semibold">Consent</th>
                        <th className="px-4 py-3 font-semibold">Signup date</th>
                        <th className="px-4 py-3 font-semibold">Unsubscribe status</th>
                        <th className="px-4 py-3 font-semibold">MailerLite sync</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cde4dc]">
                      {loadingSubscribers ? (
                        <tr>
                          <td colSpan="8" className="px-4 py-6 text-center text-gray-700">Loading subscribers...</td>
                        </tr>
                      ) : subscribers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-4 py-6 text-center text-gray-700">No subscribers yet.</td>
                        </tr>
                      ) : (
                        subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-gray-800">
                              {subscriber.first_name || subscriber.last_name
                                ? `${subscriber.first_name || ""} ${subscriber.last_name || ""}`.trim()
                                : subscriber.name}
                            </td>
                            <td className="px-4 py-3 text-gray-800">{subscriber.email}</td>
                            <td className="px-4 py-3 text-gray-700 capitalize">{subscriber.source}</td>
                            <td className="px-4 py-3 text-gray-700">
                              {subscriber.newsletter_opt_in ? "Consented" : "No consent"}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {formatPostDate(subscriber.signup_date)}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {subscriber.unsubscribed ? "Unsubscribed" : "Subscribed"}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {subscriber.provider_sync?.status || "not_configured"}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                type="button"
                                onClick={() => toggleUnsubscribed(subscriber)}
                                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#3b5f58] shadow ring-1 ring-[#7fae9e] transition hover:bg-gray-100"
                              >
                                {subscriber.unsubscribed ? "Mark subscribed" : "Mark unsubscribed"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
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
  const [expandedServiceKey, setExpandedServiceKey] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  const slug = path.startsWith("/blog/") ? path.replace("/blog/", "") : "";
  const activePost = slug ? getBlogPost(slug) : null;
  const isBlogRoute = path === "/blog";
  const isArticleRoute = path.startsWith("/blog/");
  const isAssessmentRoute = path === "/nutrition-assessment";
  const isAdminSubscribersRoute = path === "/admin/subscribers";
  const serviceCopy = servicesContent[lang] || servicesContent.en;

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
        (!href.startsWith("/blog") && !href.startsWith("/nutrition-assessment") && !href.startsWith("/admin/subscribers") && !href.startsWith("/#"))
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
      : isAssessmentRoute
        ? "Nutrition Assessment | Nutrition by Iballa"
      : isAdminSubscribersRoute
        ? "Admin Subscribers | Nutrition by Iballa"
      : isBlogRoute
        ? "Blog | Nutrition by Iballa"
        : "Nutrition by Iballa";
    const description = activePost
      ? activePost.excerpt
      : isAssessmentRoute
        ? "A general nutrition habits assessment from Nutrition by Iballa with educational insights and practical recommendations."
      : isAdminSubscribersRoute
        ? "Admin-only newsletter subscriber management for Nutrition by Iballa."
      : isBlogRoute
        ? "Evidence-based nutrition articles from Nutrition by Iballa."
        : "Personalised, evidence-based nutrition advice and care in English and Spanish.";

    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", isAdminSubscribersRoute ? "noindex, nofollow" : "index, follow");
    upsertCanonical(activePost ? `/blog/${activePost.slug}` : isAdminSubscribersRoute ? "/admin/subscribers" : isAssessmentRoute ? "/nutrition-assessment" : isBlogRoute ? "/blog" : "/");
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
        : isAssessmentRoute
          ? {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Nutrition Assessment",
            description,
            url: `${window.location.origin}/nutrition-assessment`
          }
        : isAdminSubscribersRoute
          ? {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Admin Subscribers",
              description,
              url: `${window.location.origin}/admin/subscribers`
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
  }, [activePost, isAdminSubscribersRoute, isAssessmentRoute, isBlogRoute]);

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
      <nav className="hidden md:flex">
        <a href="/">{t("nav.home")}</a>
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
      <a href="/" onClick={() => setNavOpen(false)}>
        {t("nav.home")}
      </a>
    </nav>
  )}
</header>


{isBlogRoute ? (
  <BlogOverview />
) : isAssessmentRoute ? (
  <NutritionAssessmentPage />
) : isAdminSubscribersRoute ? (
  <AdminSubscribersPage />
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


 <section id="services" className="relative overflow-hidden bg-[#f7faf8]">
  {/* Background Image Layer */}
  <img
    src="/banner2.png"
    alt="Services Banner"
    className="absolute inset-0 w-full h-full object-cover object-top sm:object-center z-0"
  />

  {/* Optional overlay for readability */}
  <div className="absolute inset-0 bg-white/90 z-10"></div>

  {/* Content Layer */}
  <div className="relative z-20 px-4 py-12 sm:px-8 sm:py-16 md:px-12">
    <div className="mx-auto mb-9 max-w-3xl text-center">
    <h2 className="mb-3 text-3xl font-semibold text-[#294b43] sm:text-4xl">
      {t("services.heading")}
    </h2>
      <p className="text-base leading-relaxed text-gray-700 sm:text-lg">{serviceCopy.intro}</p>
    </div>
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:gap-5">
      {serviceCopy.services.map((service) => {
        const Icon = serviceIcons[service.icon];
        const isExpanded = expandedServiceKey === service.key;
        const panelId = `service-panel-${service.key}`;
        return (
          <article
            key={service.key}
            className={`overflow-hidden rounded-2xl border border-[#cde4dc] bg-white shadow-[0_8px_30px_rgba(59,95,88,0.09)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(59,95,88,0.14)] ${
              isExpanded ? "col-span-2" : ""
            }`}
          >
            <div className="flex h-full flex-col">
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                aria-label={`${isExpanded ? serviceCopy.readLess : serviceCopy.readMore}: ${service.title}`}
                onClick={() => setExpandedServiceKey(isExpanded ? null : service.key)}
                className="group relative flex h-full w-full flex-col p-3 pr-11 text-left transition-colors hover:bg-[#f7fbf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#477b6c] sm:p-5 sm:pr-14 md:p-6 md:pr-16"
              >
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#edf6f2] text-[#315f55] transition group-hover:bg-[#dceee7] sm:right-5 sm:top-5">
                  {isExpanded ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
                </span>
                <span className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${service.iconBackground}`}>
                    <Icon size={23} className={`${service.iconColor} sm:h-[27px] sm:w-[27px]`} aria-hidden="true" />
                  </span>
                  <span>
                    <span role="heading" aria-level="3" className="block text-[15px] font-semibold leading-snug text-[#294b43] sm:text-lg md:text-xl">{service.title}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-gray-700 sm:text-sm md:text-[15px]">{service.summary}</span>
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={service.title}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.3 }, opacity: { duration: 0.2 } }}
                    className="overflow-hidden px-3 pb-3 sm:px-5 sm:pb-5 md:px-6 md:pb-6"
                  >
                    <div className="border-t border-[#dbeae4] pt-6">
                      <div className="grid gap-5 md:grid-cols-3">
                        <div>
                          <h4 className="font-semibold text-[#315f55]">{serviceCopy.headings.what}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">{service.what}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#315f55]">{serviceCopy.headings.who}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">{service.who}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#315f55]">{serviceCopy.headings.expect}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">{service.expect}</p>
                        </div>
                      </div>
                      <div className="mt-6 rounded-xl bg-[#edf6f2] p-5">
                        <h4 className="font-semibold text-[#294b43]">{serviceCopy.headings.book}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-gray-700">{serviceCopy.bookingText}</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a
                            href={appointmentTypes[lang]?.[0]?.calendlyUrl || appointmentTypes.en[0].calendlyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#477b6c] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#365f54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315f55] focus-visible:ring-offset-2"
                          >
                            {serviceCopy.bookConsultation}
                          </a>
                          <a
                            href="#contact"
                            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7fae9e] bg-white px-5 py-2 text-sm font-semibold text-[#315f55] transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315f55] focus-visible:ring-offset-2"
                          >
                            {serviceCopy.contactMe}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </article>
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

