import { Calendar, Compass, MoveDown } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
  onExploreMenu: () => void;
}

export default function Hero({ onOpenBooking, onOpenQuiz, onExploreMenu }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-10">
      {/* Immersive background image with sophisticated darken gradients */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=90"
          alt="Bespoke luxury spa environment"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Radial vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/60 to-stone-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-900/20" />
      </div>

      {/* Floating Japanese Zen botanical detail circles for aesthetic layering */}
      <div className="absolute top-[25%] left-[5%] w-72 h-72 bg-gold-400/5 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-stone-300/10 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Hero Content container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 pt-1">
        
        {/* Humble luxury tagline */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 rounded-full mb-6 transition-all tracking-[4px] uppercase text-[9px] font-semibold text-gold-200"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          <span>Kyoto Heritage Meets Western Wellness Skin Labs</span>
        </motion.div>

        {/* Master headline */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-normal leading-tight mb-6"
        >
          Rebalance Your Skin.
          <span className="block italic text-gold-300 font-light mt-1">Sculpt Your Wellness Contours.</span>
        </motion.h1>

        {/* Elegant subtext */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-stone-300 font-light text-base sm:text-lg mb-10 leading-relaxed"
        >
          Inspired by <span className="text-white font-medium">biyouspa.com</span>'s bespoke therapies, we combine traditional Kobi-Do Japanese facial sculpting, hyperbaric oxygen treatments, and neuro-calming aromatherapy to uncover physical rejuvenation.
        </motion.p>

        {/* Action Triggers */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-stone-950 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-gold-500/20 transition-all cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            <span className="tracking-wider uppercase text-xs">Reserve Bespoke Treatment</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 backdrop-blur-sm font-semibold px-8 py-4 rounded-full transition-all cursor-pointer"
          >
            <Compass className="w-5 h-5 text-gold-300" />
            <span className="tracking-wider uppercase text-xs">Skin Smart Quiz (AI)</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
          onClick={onExploreMenu}
        >
          <span className="text-[9px] tracking-[4px] uppercase text-stone-400 font-medium">Explore Treatment Menu</span>
          <MoveDown className="w-4 h-4 text-gold-400 animate-bounce" />
        </motion.div>

      </div>
    </section>
  );
}
