import React, { useState, useRef, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, Menu, Calendar, CreditCard, RotateCcw, Droplet, Leaf, Venus, Soup, HeartPulse, Stethoscope, Linkedin, Instagram } from "lucide-react";
import "./App.css";
import "./flipcards.css";
import './index.css';

const services = [
  {
    title: "Diabetes",
    description: "Personalised support for managing blood sugar levels, medication, and lifestyle changes.",
    icon: Droplet,
    iconColor: "text-red-500",
    backColor: "bg-red-100"
  },
  {
    title: "Gut Health & IBS",
    description: "Guidance on FODMAPs, bloating, and digestive wellness.",
    icon: Stethoscope,
    iconColor: "text-orange-500",
    backColor: "bg-orange-100"
  },
  {
    title: "Heart Health",
    description: "Nutrition strategies for cholesterol, blood pressure, and cardiovascular risk.",
    icon: HeartPulse,
    iconColor: "text-pink-500",
    backColor: "bg-pink-100"
  },
  {
    title: "Women's Health",
    description: "Hormonal balance, PCOS, fertility, and menopause support.",
    icon: Venus,
    iconColor: "text-purple-500",
    backColor: "bg-purple-100"
  },
  {
    title: "Healthy Eating",
    description: "Practical, sustainable nutrition advice for everyday wellbeing.",
    icon: Leaf,
    iconColor: "text-green-500",
    backColor: "bg-green-100"
  },
  {
    title: "Malnutrition",
    description: "Specialist support for undernutrition, recovery, and nourishment.",
    icon: Soup,
    iconColor: "text-sky-500",
    backColor: "bg-sky-100"
  }
];

export default function NutritionByIballa() {
  const [state, handleSubmit] = useForm("xzzvqdlq");
  const [messageValue, setMessageValue] = useState("");
  const messageRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);

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

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Header */}
     <header className="h-24 px-4 shadow-md flex justify-between items-center">
  <img
    src="/logo.png"
    alt="Nutrition by Iballa Logo"
    className="h-full w-[200px] object-contain"

  />
  <nav className="hidden md:flex space-x-6">
    <a href="#services">Services</a>
    <a href="#about">About</a>
    <a href="#appointments">Appointments</a>
    <a href="#contact">Contact</a>
  </nav>
  <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
    <Menu />
  </button>
  {navOpen && (
    <nav className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 p-4 z-50 md:hidden">
      <a href="#services" onClick={() => setNavOpen(false)}>Services</a>
      <a href="#about" onClick={() => setNavOpen(false)}>About</a>
      <a href="#appointments" onClick={() => setNavOpen(false)}>Appointments</a>
      <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
    </nav>
  )}
</header>

      {/* Hero */}
      <section className="p-12 text-center bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
        <h1 className="text-4xl font-bold mb-4">Nutrition by Iballa</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Personalised dietetic care, rooted in science, delivered across Ireland & Spain.
        </p>
        <a
          href="#appointments"
          className="inline-block bg-white text-[#3b5f58] font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          Book
        </a>
      </section>

      {/* Services */}
      <section id="services" className="p-12 bg-white">
        <h2 className="text-3xl font-semibold mb-12 text-center">Specialist Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="flip-card h-56 overflow-hidden">
                <div className="flip-card-inner relative w-full h-full rounded-xl shadow-lg">
                  {/* Front Side */}
                  <div className="flip-card-front absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-[#cde4dc] to-[#a3c9b9] text-white rounded-xl p-6">
                    <Icon size={36} className={`mb-3 ${service.iconColor}`} />
                    <h3 className="text-lg font-bold text-center">{service.title}</h3>
                  </div>

                  {/* Back Side */}
                  <div className={`flip-card-back absolute inset-0 flex flex-col justify-center items-center ${service.backColor} text-gray-900 rounded-xl p-6`}>
                    <p className="text-sm text-center leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section id="about" className="p-12 bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <img
            src="/profile.png"
            alt="Iballa Martinez"
            className="rounded-full h-40 w-40 object-cover shadow-lg"
          />

          {/* Text Content */}
          <div className="text-left">
            <h2 className="text-3xl font-semibold mb-4">About</h2>
            <p className="text-lg leading-relaxed mb-4">
              Hi, I’m Iballa Lucia Martinez Yanes — a Masters-trained Dietitian Consultant offering personalised nutrition services tailored to your health goals and lifestyle. I hold a Master’s degree in Dietetics from the University of Limerick, and I’m proudly registered with <strong>Coru</strong> and a member of the <strong>Irish Nutrition & Dietetic Institute (INDI)</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              My approach is rooted in evidence-based practice, empathy, and empowerment. Whether you're managing a medical condition, seeking preventative guidance, or simply striving for balance, I’m here to support you with expert care across Ireland, Spain, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Appointments */}
      <section id="appointments" className="p-12 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-12 text-center">Book a Consultation</h2>

        {/* Appointment Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {[
            {
              title: "Initial Consultation",
              description: "55 minutes — In-depth assessment of your goals, medical history, and tailored nutrition plan.",
              icon: Calendar,
              calendlyUrl: "https://calendly.com/iballa-mtzyanes/initial-consultation"
            },
            {
              title: "Review Consultation",
              description: "30 minutes — Progress review, adjustments, and continued support.",
              icon: RotateCcw,
              calendlyUrl: "https://calendly.com/iballa-mtzyanes/30min"
            }
          ].map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="rounded-xl shadow-lg overflow-hidden h-56 flex flex-col">
                {/* Header bar */}
                <div className="flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 text-white p-4">
                  <Icon size={32} className="mr-2" />
                  <h3 className="text-lg font-bold">{service.title}</h3>
                </div>
                {/* Description */}
                <div className="flex-grow flex flex-col items-center justify-center bg-white text-gray-800 px-4 text-sm text-center">
                  <p>{service.description}</p>
                  <a
                    href={service.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="p-12 bg-gradient-to-r from-[#a3c9b9] to-[#7fae9e] text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>
        <p className="text-lg max-w-xl mx-auto mb-8">
          You can submit this form for <strong>general inquiries</strong>, <strong>business consultations</strong>, or <strong>collaborations</strong>. I’ll respond personally—usually 	  within 1–2 business days.
        </p>

        {state.succeeded ? (
          <p className="text-white text-lg">Thanks for your message! I’ll be in touch soon.</p>
        ) : (
          <form className="max-w-2xl mx-auto w-full" onSubmit={handleSubmit}>
            <table className="w-full text-left text-white">
              <tbody>
                {/* Name Row */}
                <tr className="align-top">
                  <td className="pr-4 py-2 font-display text-sm font-medium">Name</td>
                  <td className="w-full">
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </td>
                </tr>

                {/* Email Row */}
                <tr className="align-top">
                  <td className="pr-4 py-2 font-display text-sm font-medium">Email</td>
                  <td className="w-full">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </td>
                </tr>

                {/* Message Row */}
                <tr className="align-top">
                  <td className="pr-4 py-2 font-display text-sm font-medium">Message</td>
                  <td className="w-full">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      ref={messageRef}
                      value={messageValue}
                      onChange={(e) => setMessageValue(e.target.value)}
                      className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-			white"
                    />
                    <p className="text-sm text-white/80 mt-2">We usually respond within 1–2 business days.</p>
                  </td>
                </tr>

                {/* Submit Button Row */}
                <tr>
                  <td></td>
                  <td className="pt-4 text-right">
                    <button
                      type="submit"
                      className="cursor-pointer rounded-md bg-white px-8 py-3 text-sm font-medium text-green-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      Send
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
      </section>

      {/* Footer */}
      {/* ✅ always left-to-right; wraps if absolutely necessary */}
        <footer className="bg-white text-[#1e1e5a] px-4 py-6 rounded-t-lg shadow-inner">
  <div className="flex flex-row items-center justify-between gap-4 w-full">
    {/* Logo */}
    <img
      src="/favicon.png"
      alt="ADvanceUX Logo"
      className="w-6 h-6 rounded-full object-cover shrink-0"
    />

    {/* Bio wrapped in a flex column for vertical centering */}
    <div className="flex flex-col justify-center max-w-[60%] sm:max-w-md">
      <p className="text-[10px] leading-tight text-left">
        WalkMe-certified builder crafting user-first digital adoption experiences that drive real impact.
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
        href="https://www.instagram.com/yourusername" // Replace with your actual handle
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
