import React, { useState, useRef, useEffect } from "react";
import { useForm } from "@formspree/react";
import {
  Mail, Menu, Calendar, CreditCard, RotateCcw, Droplet, Leaf,
  Venus, Soup, HeartPulse, Stethoscope, Linkedin, Instagram, ChevronDown
} from "lucide-react";
import "./App.css";
import "./flipcards.css";
import "./index.css";
import { useTranslation } from "react-i18next";
import IntestineIcon from "./Icons/IntestineIcon";

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

export default function NutritionByIballa() {
  const [state, handleSubmit] = useForm("xzzvqdlq");
  const [messageValue, setMessageValue] = useState("");
  const messageRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const { t, i18n } = useTranslation();

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

  const appointmentTypes = [
    {
      key: "initial",
      icon: Calendar,
      calendlyUrl: "https://calendly.com/iballa-mtzyanes/initial-consultation"
    },
    {
      key: "review",
      icon: RotateCcw,
      calendlyUrl: "https://calendly.com/iballa-mtzyanes/30min"
    }
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
    {/* Header */}
    <header className="h-24 shadow-md bg-white">
  <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
    {/* Logo */}
    <img
      src="/logo.png"
      alt="Nutrition by Iballa Logo"
      className="h-20 w-[180px] object-contain object-left"
    />

    {/* Right-aligned controls */}
    <div className="flex items-center gap-6">
      {/* Language Switcher */}
      <LanguageDropdown />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <a href="#services">{t("nav.services")}</a>
        <a href="#about">{t("nav.about")}</a>
        <a href="#appointments">{t("nav.appointments")}</a>
        <a href="#contact">{t("nav.contact")}</a>
      </nav>

      {/* Mobile Toggle */}
      <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
        <Menu />
      </button>
    </div>
  </div>

  {/* Mobile Navigation */}
  {navOpen && (
    <nav className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 p-4 z-50 md:hidden">
      <a href="#services" onClick={() => setNavOpen(false)}>{t("nav.services")}</a>
      <a href="#about" onClick={() => setNavOpen(false)}>{t("nav.about")}</a>
      <a href="#appointments" onClick={() => setNavOpen(false)}>{t("nav.appointments")}</a>
      <a href="#contact" onClick={() => setNavOpen(false)}>{t("nav.contact")}</a>
    </nav>
  )}
</header>

    {/* Hero Section */}
    <section className="pt-16 pb-20 text-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
      <div className="max-w-7xl mx-auto w-full px-4">
        <h1 className="text-4xl font-bold mb-4">
          {t("hero.title") || "Nutrición by Iballa"}
        </h1>
        <p className="text-base sm:text-lg leading-snug max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-6">
          {t("hero.subtitle")}
        </p>
        <a
          href="#appointments"
          className="inline-block bg-white text-[#3b5f58] font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          {t("hero.cta")}
        </a>
      </div>
    </section>

 {/* Services */}
<section
  id="services"
  style={{
    backgroundImage: "url('/banner2.png')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  className="relative p-12 bg-white"
>
  {/* Optional overlay for readability */}
  <div className="absolute inset-0 bg-white/80 z-0"></div>

{/* Content */}
<div className="relative z-10">
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
                <p className="text-sm text-center leading-relaxed">
                  {t(`services.items.${service.key}.description`)}
                </p>
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
        className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl"
        dangerouslySetInnerHTML={{ __html: t("about.paragraph1") }}
      />
      <p
        className="text-justify text-[15px] md:text-lg leading-relaxed max-w-md md:max-w-2xl"
        dangerouslySetInnerHTML={{ __html: t("about.paragraph2") }}
      />
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
  <div className="relative z-10 flex flex-col md:flex-row-reverse max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
    
    {/* Appointment Cards */}
    <div className="order-1 md:order-2 w-full md:w-1/2 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-md items-center">
        {appointmentTypes.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={idx} className="rounded-xl shadow-lg overflow-hidden flex flex-col w-full">
              {/* Card Header */}
              <div className="flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 text-white p-4">
                <Icon size={32} className="mr-2" />
                <h3 className="text-lg font-bold">
                  {t(`appointments.types.${service.key}.title`)}
                </h3>
              </div>

              {/* Card Body */}
              <div className="flex-grow flex flex-col items-center justify-center bg-white text-gray-800 px-6 py-4 text-sm text-center">
                <p>{t(`appointments.types.${service.key}.description`)}</p>
                <a
                  href={service.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-green-600 text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-green-700 transition"
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
    <div
      className="order-2 md:order-1 w-full md:w-1/2 h-48 sm:h-64 md:h-auto mt-8 md:mt-0 bg-no-repeat bg-contain bg-center"
      style={{
        backgroundImage: "url('/banner1.png')",
      }}
    ></div>
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
              href="https://www.linkedin.com/in/aaron-doyle-06b793158"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition duration-200"
            >
              <Linkedin size={20} color="#1e1e5a" />
            </a>
            <a
              href="https://www.instagram.com/yourusername" // Replace with actual handle
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition duration-200"
            >
              <Instagram size={20} color="#1e1e5a" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

