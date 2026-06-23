import { useState } from "react";
import { Clock, DollarSign, Plus, Check, Info, ArrowRight } from "lucide-react";
import { Treatment } from "../types";
import { TREATMENTS } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface TreatmentMenuProps {
  cart: Treatment[];
  onToggleCart: (treatment: Treatment) => void;
  onOpenBooking: () => void;
}

export default function TreatmentMenu({ cart, onToggleCart, onOpenBooking }: TreatmentMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const categories = [
    { value: "all", label: "All Ceremonies" },
    { value: "facials", label: "Facial Sculpting" },
    { value: "massages", label: "Therapeutic Massages" },
    { value: "rituals", label: "Body Rituals & Cocoons" }
  ];

  const filteredTreatments = activeCategory === "all"
    ? TREATMENTS
    : TREATMENTS.filter(t => t.category === activeCategory);

  const isSelected = (id: string) => cart.some(item => item.id === id);

  return (
    <section id="menu" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[6px] uppercase font-semibold text-gold-600 block mb-3">
            BESPOKE CURE MENU
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4">
            Our Facial Contouring & Massage Therapies
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-6" />
          <p className="max-w-xl mx-auto text-stone-600 font-light text-sm leading-relaxed">
            Select one or more of our signature wellness treatments. Adding a treatment updates your reservation request automatically.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className="relative px-6 py-2.5 rounded-full text-xs uppercase font-semibold tracking-wider transition-colors duration-200 border cursor-pointer overflow-hidden group"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-stone-900 z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-gold-300" : "text-stone-600 group-hover:text-stone-900"
                }`}>
                  {cat.label}
                </span>
                {!isActive && (
                  <span className="absolute inset-0 bg-gold-50/40 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Treatments Grid with layout animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((tr) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={tr.id}
                className="group flex flex-col justify-between rounded-xl bg-white overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-xl hover:border-gold-300/40 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tr.image}
                    alt={tr.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
                  
                  {/* Specialty Tags */}
                  {tr.specialtyTag && (
                    <span className="absolute top-4 left-4 text-[9px] font-semibold tracking-wider uppercase bg-stone-900 text-gold-300 px-3 py-1.5 rounded-full shadow-sm">
                      {tr.specialtyTag}
                    </span>
                  )}

                  {/* Micro info trigger */}
                  <button
                    onClick={() => setSelectedTreatment(tr)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-stone-800 hover:bg-white hover:text-gold-600 transition-colors shadow-md cursor-pointer"
                    title="More Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-serif text-lg font-semibold text-stone-950 leading-snug">
                        {tr.name}
                      </h3>
                    </div>
                    <p className="text-stone-600 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                      {tr.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-stone-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-stone-400" />
                        <span className="text-xs">{tr.duration} Min</span>
                      </div>
                      <div className="flex items-center gap-0.5 font-semibold text-stone-800 text-sm">
                        <DollarSign className="w-3.5 h-3.5 text-stone-500" />
                        <span>{tr.price}</span>
                      </div>
                    </div>

                    {/* Add to reservation list */}
                    <button
                      onClick={() => onToggleCart(tr)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                        isSelected(tr.id)
                          ? "bg-gold-50 text-gold-700 border border-gold-300 hover:bg-gold-100"
                          : "bg-stone-900 text-white hover:bg-stone-800"
                      }`}
                    >
                      {isSelected(tr.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Select</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pre-Booking CTA bar if treatments selected */}
        {cart.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 bg-white border border-gold-200/60 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-full bg-gold-50 text-gold-600">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-serif text-lg font-semibold text-stone-900">
                  You've selected {cart.length} treatment{cart.length > 1 ? "s" : ""}
                </h4>
                <p className="text-stone-500 text-xs font-light">
                  Estimated duration: {cart.reduce((s, i) => s + i.duration, 0)} Mins — Subtotal: ${cart.reduce((s, i) => s + i.price, 0)} USD
                </p>
              </div>
            </div>
            
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-500 text-white font-semibold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
            >
              <span>Proceed to Booking Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </div>

      {/* Floating Detail View Overlay Modal */}
      <AnimatePresence>
        {selectedTreatment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTreatment(null)}
              className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gold-100/30 z-10"
            >
              
              <div className="relative h-64 sm:h-72">
                <img
                  src={selectedTreatment.image}
                  alt={selectedTreatment.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white hover:bg-black/80 p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                >
                  &times;
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  {selectedTreatment.specialtyTag && (
                    <span className="inline-block text-[8px] font-bold tracking-widest bg-gold-500 text-stone-950 px-2.5 py-1 rounded-full mb-2 uppercase">
                      {selectedTreatment.specialtyTag}
                    </span>
                  )}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-normal">
                    {selectedTreatment.name}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Short stats */}
                <div className="flex gap-6 pb-4 border-b border-stone-100 mb-5 text-sm">
                  <div>
                    <span className="text-stone-400 text-xs block font-medium">ESTIMATED DURATION</span>
                    <span className="text-stone-800 font-semibold">{selectedTreatment.duration} minutes</span>
                  </div>
                  <div className="w-px bg-stone-200" />
                  <div>
                    <span className="text-stone-400 text-xs block font-medium">CEREMONY INVESTMENT</span>
                    <span className="text-stone-900 font-bold">${selectedTreatment.price} USD</span>
                  </div>
                </div>

                {/* Paragraph details */}
                <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                  {selectedTreatment.fullDescription}
                </p>

                {/* Bulleted Benefits list */}
                <h4 className="text-xs font-bold tracking-widest text-stone-900 uppercase mb-3">
                  Expected Therapeutic Benefits
                </h4>
                <ul className="space-y-2.5 mb-8">
                  {selectedTreatment.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-stone-600 text-xs font-light">
                      <span className="text-gold-500 mt-0.5 font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Modal Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      onToggleCart(selectedTreatment);
                      setSelectedTreatment(null);
                    }}
                    className={`flex-grow py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-colors text-center cursor-pointer ${
                      isSelected(selectedTreatment.id)
                        ? "bg-gold-50 text-gold-700 border border-gold-300 hover:bg-gold-100"
                        : "bg-stone-900 text-white hover:bg-stone-800"
                    }`}
                  >
                    {isSelected(selectedTreatment.id) ? "Remove From Selection" : "Select Treatment"}
                  </button>
                  
                  <button
                    onClick={() => setSelectedTreatment(null)}
                    className="px-6 py-3 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-full text-xs uppercase font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
