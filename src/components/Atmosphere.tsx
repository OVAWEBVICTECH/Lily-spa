import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Atmosphere() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
      title: "Botanical Zen Lounge",
      desc: "Decompress before and after your treatment in our climate-conditioned calm room with fresh-brewed matcha."
    },
    {
      url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=80",
      title: "Double Treatment Suites",
      desc: "Spacious treatment beds configured with organic warming blankets, warm basalt pools, and adjustable LED light paths."
    },
    {
      url: "https://images.unsplash.com/photo-1519735000581-360e2dac293a?w=800&auto=format&fit=crop&q=80",
      title: "Camellia & Hinoki Oils Lab",
      desc: "Our skin lab distills raw Camellia Japonica oils and Japanese hinoki wood essences to fuel custom massage matrices."
    },
    {
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80",
      title: "Hydration Steam Chambers",
      desc: "Open botanical-scented dry and steam compartments designed to open full body pores before exfoliation rituals."
    }
  ];

  return (
    <section id="atmosphere" className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[6px] uppercase font-semibold text-gold-400 block mb-3">
            ATMOSPHERE GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
            Our Calm Sanctuary
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-6" />
          <p className="max-w-xl mx-auto text-stone-400 font-light text-sm leading-relaxed">
            Lily Spa balances organic wood textures with natural stone installations to prompt psychological decompression the second you pass our portal.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative h-[380px] rounded-2xl overflow-hidden border border-stone-800 shadow-lg flex items-end p-6 sm:p-8"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent z-10" />
              </div>

              <div className="relative z-20 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-px w-4 bg-gold-400" />
                  <span className="text-[10px] font-bold tracking-widest text-gold-400 uppercase">
                    Space Ceremony 0{idx + 1}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {img.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-md">
                  {img.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
