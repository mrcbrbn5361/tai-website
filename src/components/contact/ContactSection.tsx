"use client";

import { useState } from "react";
import { ExternalLink, Copy, Check, Send, Instagram, Youtube, Disc, Music2 } from "lucide-react";
import { SOCIAL_LINKS } from "@/src/data/socials";
import { ARTIST_DATA } from "@/src/data/artist";

export function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("Performance / Festival Booking");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case "Music2":
        return <Music2 className="w-5 h-5" />;
      case "Instagram":
        return <Instagram className="w-5 h-5" />;
      case "Youtube":
        return <Youtube className="w-5 h-5" />;
      default:
        return <Disc className="w-5 h-5" />;
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ccff00] mb-2">
        <span>05</span>
        <span aria-hidden="true">/</span>
        <span>CONNECTIVITY</span>
      </div>
      <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans mb-12">
        DISPATCH & SOCIAL
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Verified Official Streaming & Social Channels */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">
            VERIFIED ARTIST CHANNELS
          </span>

          {SOCIAL_LINKS.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-[#0c0c0c] border border-zinc-800 hover:border-zinc-600 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00]">
                  {getPlatformIcon(item.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white uppercase group-hover:text-[#ccff00] transition-colors">
                      {item.platform}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      ({item.handle})
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(item.url, item.id)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                  title="Copy Link"
                  aria-label={`Copy link for ${item.platform}`}
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-[#ccff00]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-zinc-400 hover:text-[#ccff00] transition-colors"
                  aria-label={`Open ${item.platform} in new tab`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}

          {/* Direct Spotify Quick Card */}
          <div className="p-6 bg-[#111111] border border-[#ccff00]/40 mt-6">
            <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest block mb-1">
              PRIMARY STREAMING RADAR
            </span>
            <h4 className="text-xl font-bold text-white uppercase mb-2">
              SPOTIFY VERIFIED PROFILE
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Access the complete discography, guest features, and release history on Spotify.
            </p>
            <a
              href={ARTIST_DATA.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#ccff00] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
            >
              <span>OPEN SPOTIFY ARTIST APP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right: Management & Booking Inquiry Console */}
        <div className="lg:col-span-6 bg-[#0c0c0c] border border-zinc-800 p-6 sm:p-8">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
            OFFICIAL MANAGEMENT & BOOKING
          </span>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">
            TRANSMISSION INQUIRY
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            For festival bookings, live concerts, press, sync licensing, and producer inquiries regarding TAI / JUNGE.
          </p>

          {formSubmitted ? (
            <div className="p-6 bg-zinc-900 border border-[#ccff00] text-center py-10">
              <Check className="w-10 h-10 text-[#ccff00] mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white uppercase mb-1">
                TRANSMISSION LOGGED
              </h4>
              <p className="text-xs font-mono text-zinc-400 mb-4">
                Inquiry registered. Management reviews communications on rolling schedule.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-mono text-[#ccff00] underline uppercase cursor-pointer"
              >
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block text-zinc-400 uppercase mb-1.5">
                  INQUIRY TYPE
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#141414] border border-zinc-800 text-zinc-200 px-3.5 py-2.5 focus:border-[#ccff00] focus:outline-none"
                >
                  <option>Performance / Festival Booking</option>
                  <option>Production / Feature Request</option>
                  <option>Press / Editorial Interview</option>
                  <option>Sync / Commercial Licensing</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1.5">
                  CONTACT / SENDER NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festival Director / Producer Name"
                  className="w-full bg-[#141414] border border-zinc-800 text-zinc-200 px-3.5 py-2.5 focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1.5">
                  ELECTRONIC MAIL (ORGANIZATION)
                </label>
                <input
                  type="email"
                  required
                  placeholder="management@organization.com"
                  className="w-full bg-[#141414] border border-zinc-800 text-zinc-200 px-3.5 py-2.5 focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1.5">
                  DISPATCH PROPOSAL / MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Include dates, venue specifications, city, and proposal scope..."
                  className="w-full bg-[#141414] border border-zinc-800 text-zinc-200 px-3.5 py-2.5 focus:border-[#ccff00] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black font-bold uppercase tracking-wider hover:bg-[#ccff00] transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
