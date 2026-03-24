"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { sendContactEmail } from "@/lib/emailjs";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const budgetOptions = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000+",
  "Let's discuss",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await sendContactEmail(formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        budget: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
        <h3 className="font-serif text-2xl text-foreground mb-2">
          Message Sent!
        </h3>
        <p className="text-secondary mb-6">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm uppercase tracking-[0.15em] text-accent hover:text-foreground transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-[0.15em] text-secondary mb-2"
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-accent focus:outline-none transition-colors placeholder:text-secondary/40"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-[0.15em] text-secondary mb-2"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-accent focus:outline-none transition-colors placeholder:text-secondary/40"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-xs uppercase tracking-[0.15em] text-secondary mb-2"
        >
          Subject *
        </label>
        <input
          id="subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-accent focus:outline-none transition-colors placeholder:text-secondary/40"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label
          htmlFor="budget"
          className="block text-xs uppercase tracking-[0.15em] text-secondary mb-2"
        >
          Budget Range
        </label>
        <select
          id="budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="" className="bg-card text-secondary">
            Select a range
          </option>
          {budgetOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-card text-foreground">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-[0.15em] text-secondary mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-accent focus:outline-none transition-colors resize-none placeholder:text-secondary/40"
          placeholder="Tell me about your project..."
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          Something went wrong. Please try again or email directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-3 px-8 py-3 bg-accent text-background text-sm uppercase tracking-[0.15em] font-medium hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
        <Send
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
