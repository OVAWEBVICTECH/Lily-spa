import { useState, useEffect } from "react";
import { Sparkles, Calendar, Menu, X, ShoppingBag } from "lucide-react";
import { Treatment } from "../types";

interface HeaderProps {
  cart: Treatment[];
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export default function Header({ cart, onOpenBooking, onOpenQuiz }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const navItems = [
    { label: "Treatments", id: "menu" },
    { label: "Our Story", id: "about" },
    { label: "Atmosphere", id: "atmosphere" },
    { label: "Therapists", id: "therapists" },
    { label: "FAQs", id: "faqs" }
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-stone-200/50 py-3 shadow-sm"
          : "bg-gradient-to-b from-stone-900/40 via-stone-900/10 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className={`p-2 rounded-full transition-colors ${
              isScrolled ? "bg-gold-50 text-gold-600" : "bg-white/10 text-gold-200 group-hover:bg-white/20"
            }`}>
              <Sparkles className="w-5 h-5" id="logo-icon" />
            </div>
            <div>
              <span className={`block font-serif text-xl tracking-widest font-semibold uppercase ${
                isScrolled ? "text-stone-900" : "text-white"
              }`}>
                LILY SPA
              </span>
              <span className={`block text-[8px] tracking-[4px] uppercase ${
                isScrolled ? "text-stone-500" : "text-stone-300"
              }`}>
                Beauty & Wellness
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`text-sm tracking-wider uppercase font-medium hover:text-gold-600 transition-colors cursor-pointer ${
                  isScrolled ? "text-stone-600" : "text-stone-100 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenQuiz}
              className={`text-xs tracking-wider uppercase font-semibold px-4 py-2 border rounded-full transition-all cursor-pointer ${
                isScrolled
                  ? "border-gold-300 text-gold-700 bg-gold-50/50 hover:bg-gold-50"
                  : "border-white/30 text-white bg-white/5 hover:bg-white/10"
              }`}
            >
              Skin Advisor
            </button>

            <button
              onClick={onOpenBooking}
              className="relative flex items-center gap-2 text-xs tracking-wider uppercase font-semibold px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-500 text-white shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white shadow-sm border border-gold-400">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex md:hidden items-center gap-4">
            {cart.length > 0 && (
              <button
                onClick={onOpenBooking}
                className={`p-2 rounded-full relative cursor-pointer ${
                  isScrolled ? "text-gold-700 bg-gold-50" : "text-white bg-white/10"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-0 right-0 h-4.5 w-4.5 rounded-full bg-gold-600 text-[9px] font-bold text-white flex items-center justify-center">
                  {cart.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg cursor-pointer ${
                isScrolled ? "text-stone-800 hover:bg-stone-50" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200/80 shadow-lg absolute top-full left-0 right-0 p-5 space-y-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-left py-2 text-stone-700 hover:text-gold-600 font-medium tracking-wide text-sm border-b border-stone-100 uppercase"
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full text-center py-2.5 border border-gold-400 text-gold-700 bg-gold-50/50 rounded-full text-xs uppercase font-semibold tracking-wider"
            >
              Skin Advisor Quiz
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-full text-xs uppercase font-semibold tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Appointment</span>
              {cart.length > 0 && (
                <span className="bg-stone-900 border border-gold-300 text-white px-2 py-0.5 rounded-full text-[10px]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
