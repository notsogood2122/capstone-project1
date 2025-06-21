"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll text-gray-800 bg-white">
      {/* FIXED HEADER with Login Button */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#6A5ACD]">Learn2Learn</h1>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-[#CFCEFF] text-gray-800 px-4 py-2 rounded-full hover:bg-[#B6B3F5] transition font-semibold"
        >
          Staff/Parent Login
        </button>
      </header>

      {/* HERO + INQUIRY */}
      <section className="h-screen snap-start flex items-center px-6 lg:px-20 pt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
          <div>
            <h2 className="text-4xl font-bold text-[#6A5ACD] mb-4">
              Welcome to Learn2Learn
            </h2>
            <p className="text-lg mb-6">
              Empowering children with special needs through compassionate
              occupational therapy.
            </p>
            <Image
              src="/learning.png"
              alt="Learning illustration"
              width={600}
              height={400}
              className="rounded-xl object-cover w-full"
            />
          </div>
          <div className="bg-[#F1F0FF] p-6 rounded-xl shadow-md w-full">
            <h3 className="text-2xl font-bold text-[#6A5ACD] mb-4">Inquiry Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-[#CFCEFF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C3EBFA]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Email or Contact Number
                </label>
                <input
                  type="text"
                  className="w-full border border-[#CFCEFF] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C3EBFA]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Your Concern</label>
                <textarea
                  rows={4}
                  className="w-full border border-[#CFCEFF] rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#C3EBFA]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C3EBFA] text-gray-800 font-bold py-2 rounded-full hover:bg-[#A6DBF2] transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="h-screen snap-start flex items-center px-6 bg-[#EDF9FD] pt-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#6A5ACD] mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            To provide personalized therapy and support that helps children
            achieve their fullest potential.
          </p>
          <h2 className="text-3xl font-bold text-[#6A5ACD] mt-10 mb-6">Our Vision</h2>
          <p className="text-gray-700 text-lg">
            A world where every child with special needs is empowered to learn,
            grow, and thrive.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="h-screen snap-start flex items-center px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#6A5ACD] mb-6">
            Frequently Asked Questions
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
            <li>How do I get an account? – Accounts are created by admins.</li>
            <li>
              Can I inquire online? – Yes, you can through the inquiry form on
              this website.
            </li>
            <li>
              Can I register online? – No, registration is done by admins only.
            </li>
          </ul>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="h-screen snap-start flex items-center px-6 bg-[#F1F0FF] pt-24">
        <div className="max-w-4xl mx-auto text-gray-700 text-lg space-y-3">
          <h2 className="text-3xl font-bold text-[#6A5ACD] mb-4">Contact Us</h2>
          <p>
            📍 Address: Unit G & H RMM88 Bldg. Public Market Road, Naic, Cavite
          </p>
          <p>📞 Phone: 0915 310 4298</p>
          <p>📧 Email: brightskills2020@gmail.com</p>
          <p>
            🔗 Facebook:{" "}
            <a
              href="https://www.facebook.com/BrightSkillsDevelopmentAndLearningCenter"
              target="_blank"
              rel="noreferrer"
              className="text-[#6A5ACD] underline"
            >
              Bright Skills Development and Learning Center
            </a>
          </p>
        </div>
      </section>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div
          onClick={() => setShowLogin(false)}
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg w-80 shadow-lg"
          >
            <h2 className="text-xl font-bold text-[#6A5ACD] mb-4">Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Logging in...");
                setShowLogin(false);
              }}
            >
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full border border-[#CFCEFF] rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#C3EBFA]"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full border border-[#CFCEFF] rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C3EBFA]"
              />
              <button
                type="submit"
                className="w-full bg-[#CFCEFF] text-gray-800 py-2 rounded-full hover:bg-[#BDBAFE] transition"
              >
                Login
              </button>
            </form>
            <button
              onClick={() => setShowLogin(false)}
              className="mt-3 w-full text-[#6A5ACD] font-semibold hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
