
"use client";

import { useState } from "react";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { toast, Toaster, ToastBar } from 'react-hot-toast';

/**
 * Props for `Skraningar`.
 */
export type HafaSambandProps = SliceComponentProps<Content.HafaSambandSlice>;

/**
 * Component for "Skraningar" Slices.
 */
const HafaSamband: FC<HafaSambandProps> = ({ slice }) => {
  const [form, setForm] = useState({ name: "", simi:"", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/hafa-samband", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success("Takk fyrir að hafa samband! Við munum hafa samband við þig sem fyrst.");
      setForm({ name: "", simi:"", email: "", message: "" });
    } else {
      toast.error("Villa kom upp við skráningu");
    }
  };

  return (
      <section className="w-full container">
        <h3 className="w-full text-[#53484c] text-4xl font-serif font-bold text-center mb-8">{slice.primary.title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="max-w-[400px] flex flex-col gap-2 mt-4 mx-auto">
            <label className="text-md mb-2">Nafn
              <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Nafn"
                     className="w-full border rounded-xl px-4 py-2 text-lg"/>
            </label>
            <label className="text-md mb-2">Netfang
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Netfang"
                     className="w-full border rounded-xl px-4 py-2 text-lg"/>
            </label>
            <label className="text-md mb-2">Sími
              <input name="simi" value={form.simi} onChange={handleChange} type="text" placeholder="Sími"
                     className="w-full border rounded-xl px-4 py-2 text-lg"/>
            </label>
            <label className="text-md mb-2">Skilaboð
              <textarea name="message" value={form.message} onChange={handleChange} placeholder=""
                        className="w-full border rounded-xl px-4 py-2 text-lg"/>
            </label>
            <button type="submit" className="bg-[#53484c] font-sans text-white font-['poppins'] rounded py-2 px-5 text-lg">Senda
            </button>
          </div>

        </form>
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
        />
      </section>

  );
};

export default HafaSamband;

