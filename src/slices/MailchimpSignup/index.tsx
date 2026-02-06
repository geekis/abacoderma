
"use client";

import { useState } from "react";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { toast, Toaster } from 'react-hot-toast';

/**
 * Props for `MailchimpSignup`.
 */
export type MailchimpSignupProps = SliceComponentProps<any>; // Using any because types are not regenerated

/**
 * Component for "MailchimpSignup" Slices.
 */
const MailchimpSignup: FC<MailchimpSignupProps> = ({ slice }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Takk fyrir að skrá þig!");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Villa kom upp við skráningu");
      }
    } catch (error) {
      toast.error("Villa kom upp við tengingu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full container py-12">
      <div className="max-w-2xl mx-auto text-center">
        {slice.primary.title && (
          <h3 className="text-[#53484c] text-3xl font-serif font-bold mb-4">
            {slice.primary.title}
          </h3>
        )}
        {slice.primary.description && (
          <div className="mb-8 text-lg">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Fornafn"
            className="w-full sm:max-w-xs border rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#53484c]"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Eftirnafn"
            className="w-full sm:max-w-xs border rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#53484c]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Netfang"
            required
            className="w-full sm:max-w-xs border rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#53484c]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#53484c] font-sans text-white font-['poppins'] rounded-xl py-2 px-8 text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Bíður..." : (slice.primary.button_text || "Skrá mig")}
          </button>
        </form>
      </div>
      <Toaster position="top-center" />
    </section>
  );
};

export default MailchimpSignup;
