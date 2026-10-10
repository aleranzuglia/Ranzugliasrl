import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoHR from "../../imports/humberto-ranzuglia-small.svg";

const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "catalogo", label: "Catálogo" },
  { id: "financiamiento", label: "Financiamiento" },
  { id: "repuestos", label: "Repuestos" },
  { id: "nosotros", label: "Nosotros" },
  { id: "contacto", label: "Contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (
          section.el &&
          section.el.offsetTop <= scrollPosition
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menú abierto: la página de fondo no se mueve, Escape lo cierra y, si la ventana pasa al
  // ancho de escritorio (donde no hay hamburguesa), se cierra solo.
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    desktop.addEventListener("change", handleDesktop);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      desktop.removeEventListener("change", handleDesktop);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isOpen
            ? "bg-ink border-b border-white/10"
            : isScrolled
              ? "bg-ink/90 backdrop-blur-xl border-b border-white/5"
              : "bg-ink/80 backdrop-blur-md"
        }`}
      >
        {/* Main Navigation */}
        <div className="w-full max-w-[1800px] mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("inicio")}
              className="flex items-center gap-3 transition-opacity hover:opacity-80 relative z-10 px-4 py-2 -ml-4 cursor-pointer"
            >
              <img
                src={logoHR}
                alt="Humberto Ranzuglia"
                className="h-16 w-auto"
              />
              <div className="text-left hidden sm:block">
                <div className="tracking-wider text-white text-lg font-display">
                  HUMBERTO RANZUGLIA S.R.L.
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
                    activeSection === item.id
                      ? "text-accent"
                      : "text-white/70 hover:text-accent"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:text-accent transition-colors cursor-pointer"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls="menu-movil"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation: pantalla completa (la barra del encabezado queda arriba, encima) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[90] flex flex-col bg-ink pt-20"
          >
            <nav className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 flex flex-col justify-center">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.04 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-5 border-b border-white/10 text-xl font-bold font-sans tracking-wide uppercase transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? "text-accent"
                      : "text-white hover:text-accent"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-3 border-t border-white/10 text-sm text-white/80">
              <a
                href="https://wa.me/5492923431570"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
                Ventas · 2923 43 1570
              </a>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" aria-hidden="true" />
                Ruta 51 km 616 · Coronel Pringles
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
