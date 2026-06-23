import { useState, FormEvent } from "react";
import { Search, ChevronDown, ChevronUp, MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react";
import { FAQS } from "../data";

export default function Footer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState("");

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      setEmailSubscribed(true);
      setSubEmail("");
    }
  };

  return (
    <footer className="bg-stone-50 border-t border-stone-200/50">
      
      {/* FAQ Accordion Section */}
      <div id="faqs" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[6px] uppercase font-semibold text-gold-600 block mb-3">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
            Frequently Asked Queries
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4 mb-8" />
          
          {/* FAQ Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search spa guidelines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 focus:border-gold-400 focus:outline-none rounded-full text-sm text-stone-800"
            />
          </div>
        </div>

        {/* Accordion body */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden transition-shadow shadow-sm hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-6 py-4.5 text-left font-serif text-sm sm:text-base font-semibold text-stone-900 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gold-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-stone-600 text-xs sm:text-sm font-light leading-relaxed border-t border-stone-50 animate-[fadeIn_0.15s_ease-out]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-stone-400 text-xs">
              No matching guidelines found. Try general keywords like "pregnant" or "early".
            </p>
          )}
        </div>
      </div>

      {/* Main Base Grid (Story, Contact, Hours, News) */}
      <div id="about" className="bg-stone-950 text-white border-t border-stone-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Brand story */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-300" />
              <span className="font-serif text-lg tracking-widest font-semibold uppercase">LILY SPA</span>
            </div>
            
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              We replicate the luxurious botanical elegance of Biyou Spa. Merging medical-standard skin-purifying technology with ancient eastern sculpting postures, our practitioners bring quietness to your cells.
            </p>

            <div className="pt-2">
              <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Designed For Rebalance
              </p>
              <p className="text-xs text-gold-400 font-mono">biyouspa.com Replica</p>
            </div>
          </div>

          {/* Col 2: Coordinates */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-gold-200 uppercase tracking-wider">
              Aesthetic Coordinates
            </h4>
            
            <div className="space-y-3.5 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-gold-500 mt-0.5 flex-shrink-0" />
                <p>12B, Old Federal Road, Ikoyi Peninsula, Lagos State, Nigeria.</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-gold-500 flex-shrink-0" />
                <p>+234 (1) 812-700-4590</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-gold-500 flex-shrink-0" />
                <p>rebalance@lilybiyouspa.com</p>
              </div>
            </div>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-gold-200 uppercase tracking-wider">
              Ceremonial Schedule
            </h4>
            
            <div className="space-y-3.5 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday – Friday</p>
                  <p>09:00 AM – 08:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Saturday – Sunday</p>
                  <p>10:00 AM – 07:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-gold-200 uppercase tracking-wider">
              Circulatory Notes
            </h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Receive private notifications regarding therapist visits, Kyoto Camellia oil harvests, and exclusive wellness pricing.
            </p>

            {emailSubscribed ? (
              <p className="text-gold-400 text-xs font-semibold animate-pulse">
                ✓ Welcome to the Inner Circle. Look out for dispatch.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  required
                  type="email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="Insert secret email..."
                  className="w-full bg-stone-900 border border-stone-850 px-4 py-2.5 pr-11 rounded-xl text-xs focus:outline-none focus:border-gold-500 text-stone-100"
                />
                <button
                  type="submit"
                  className="absolute right-2 text-gold-400 hover:text-white p-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Credit Line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-900 mt-16 pt-8 text-center text-stone-600 text-[10px] sm:text-xs">
          <p>© 2026 Lily Spa. Formulated strictly following biyouspa.com luxury designs. Built for complete physical rebalance.</p>
        </div>

      </div>

    </footer>
  );
}
