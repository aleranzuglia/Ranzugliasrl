import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import logoHR from "../../imports/humberto-ranzuglia-small.svg";

export function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="w-full lg:max-w-[1024px]   xl:max-w-[1280px]  2xl:max-w-[1536px] mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoHR}
                alt="Humberto Ranzuglia"
                className="h-12 w-auto"
              />
              <div>
                <div className="text-base tracking-wide uppercase font-display">
                  Humberto Ranzuglia S.R.L
                </div>
              </div>
            </div>
            <p className="text-sm text-text-muted-on-dark leading-relaxed mb-4">
              Distribuidor oficial Hanomag y Michigan. Sembradoras, acoplados e implementos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/humbertoranzugliasrl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border-2 border-white/20 rounded flex items-center justify-center hover:bg-accent hover:border-accent hover:text-ink transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5492923431570"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border-2 border-white/20 rounded flex items-center justify-center hover:bg-accent hover:border-accent hover:text-ink transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catálogo */}
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-accent mb-4">
              Catálogo
            </div>
            <div className="space-y-2">
              {[
                "Tractores Hanomag",
                "Maquinaria Michigan",
                "Sembradoras",
                "Acoplados",
                "Implementos",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection("catalogo")}
                  className="block text-sm text-text-muted-on-dark hover:text-accent transition-colors text-left cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-accent mb-4">
              Empresa
            </div>
            <div className="space-y-2">
              {[
                { label: "Sobre nosotros", id: "nosotros" },
                {
                  label: "Financiamiento",
                  id: "financiamiento",
                },
                { label: "Contacto", id: "contacto" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-sm text-text-muted-on-dark hover:text-accent transition-colors text-left cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://www.instagram.com/humbertoranzugliasrl"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-text-muted-on-dark hover:text-accent transition-colors cursor-pointer"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-accent mb-4">
              Contacto
            </div>
            <div className="space-y-3">
              <a
                href="https://wa.me/5492923431570"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 break-all text-sm text-text-muted-on-dark hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                2923 43 1570
              </a>
              <a
                href="mailto:ranzugliasrl@gmail.com"
                className="flex items-center gap-2 break-all text-sm text-text-muted-on-dark hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                humbertoranzugliasrl@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-text-muted-on-dark">
                <MapPin className="w-4 h-4" />
                Av. 25 de Mayo 1541, Coronel Pringles, Bs. As. <br />
                Ruta 51 km 616, Coronel Pringles, Bs. As.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full lg:max-w-[1024px]   xl:max-w-[1280px]  2xl:max-w-[1536px] mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-muted-on-dark">
            <div>© {year} Humberto Ranzuglia S.R.L.</div>
            <div>
             Distribuidor oficial Hanomag · Michigan · Coronel Pringles
            </div>
            <div>
              Diseño y desarrollo:{" "}
              <a
                href="https://alejandraranzuglia.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Alejandra Ranzuglia
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
