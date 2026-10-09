import type { Product } from './catalog';
import hanomagLogo from '../../imports/hanomag/hanomag.png';
import michiganLogo from '../../imports/michigan/michigan.png';

// Filtro que se aplica en el catálogo de Ranzuglia (categoría + marca, y opcionalmente una
// búsqueda para acotar a una línea). `id` cambia en cada pedido para que repetir el mismo
// filtro vuelva a aplicarse.
export interface FiltroCatalogo {
  id: number;
  categoria: Product['categoria'];
  marca: string;
  busqueda?: string;
}

export interface LineaMarca {
  label: string;
  // Web de la marca para esa línea
  url: string;
  // Si la línea ya está cargada en el catálogo de Ranzuglia (hanomag.ts / michigan.ts):
  // el link filtra el catálogo en vez de ir a la web de la marca.
  filtro?: { categoria: Product['categoria']; busqueda?: string };
}

// Clases de Tailwind con los colores propios de cada marca (Hanomag: rojo; Michigan: amarillo).
export interface EstilosMarca {
  // Botón "Ver catálogo completo" de la sección Representación oficial
  botonWeb: string;
  // Etiquetas de líneas que filtran el catálogo (sección Representación oficial)
  chipCatalogo: string;
  // Etiquetas de otras líneas en la tarjeta "Más modelos" del catálogo
  chipTarjeta: string;
}

export interface MarcaOficial {
  nombre: string;
  logo: string;
  url: string;
  dominio: string;
  descripcion: string;
  estilos: EstilosMarca;
  lineas: LineaMarca[];
}

// Marcas con representación oficial. El nombre debe coincidir con la marca que devuelve
// brandOf() en catalog.ts (parte de `marca` antes del " · ").
export const MARCAS_OFICIALES: Record<string, MarcaOficial> = {
  Hanomag: {
    nombre: 'Hanomag',
    logo: hanomagLogo,
    url: 'https://www.hanomag.com.ar',
    dominio: 'hanomag.com.ar',
    descripcion: 'Tractores, palas cargadoras, elevadores, excavadoras y motores estacionarios.',
    estilos: {
      botonWeb: 'border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500',
      chipCatalogo: 'border-red-500/60 text-red-400 hover:border-red-600 hover:bg-red-600 hover:text-white',
      chipTarjeta: 'border-red-200 bg-red-50 text-red-700 hover:border-red-600',
    },
    lineas: [
      { label: 'Tractores Stark', url: 'https://www.hanomag.com.ar/productos-linea/tractores-linea-stark', filtro: { categoria: 'tractor', busqueda: 'Hanomag · Stark' } },
      { label: 'Tractores TR Heavy Duty', url: 'https://www.hanomag.com.ar/productos-linea/tractores_heavy_duty', filtro: { categoria: 'tractor', busqueda: 'Hanomag · TR Heavy Duty' } },
      { label: 'Tractores Agrícola', url: 'https://www.hanomag.com.ar/productos-linea/tractores-linea-agricola', filtro: { categoria: 'tractor', busqueda: 'Hanomag · Agrícola' } },
      { label: 'Tractores Parque', url: 'https://www.hanomag.com.ar/productos-linea/tractores-linea-parque', filtro: { categoria: 'tractor', busqueda: 'Hanomag · Parque' } },
      { label: 'Palas cargadoras', url: 'https://www.hanomag.com.ar/productos-linea/palas-agricolas', filtro: { categoria: 'pala' } },
      { label: 'Elevadores', url: 'https://www.hanomag.com.ar/productos-linea/elevadores', filtro: { categoria: 'elevador' } },
      { label: 'Excavadoras', url: 'https://www.hanomag.com.ar/productos-linea/excavadoras-hanomag' },
      { label: 'Motores estacionarios', url: 'https://www.hanomag.com.ar/productos-linea/motores-estacionarios' },
      { label: 'Modelos anteriores', url: 'https://www.hanomag.com.ar/modelos-anteriores' },
    ],
  },
  Michigan: {
    nombre: 'Michigan',
    logo: michiganLogo,
    url: 'https://www.michiganweb.com.ar',
    dominio: 'michiganweb.com.ar',
    descripcion: 'Maquinaria vial y de carga: palas cargadoras, autoelevadores, motoniveladoras, excavadoras y más.',
    estilos: {
      botonWeb: 'border-white text-white hover:bg-white hover:text-zinc-950',
      chipCatalogo: 'border-yellow-400/50 text-yellow-400 hover:bg-yellow-400 hover:text-zinc-950',
      chipTarjeta: 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-950',
    },
    lineas: [
      { label: 'Autoelevadores', url: 'https://www.michiganweb.com.ar/autoelevadores', filtro: { categoria: 'elevador', busqueda: 'Michigan · Autoelevadores' } },
      { label: 'Línea eléctrica', url: 'https://www.michiganweb.com.ar/linea-electrica', filtro: { categoria: 'elevador', busqueda: 'Michigan · Línea eléctrica' } },
      { label: 'Palas cargadoras', url: 'https://www.michiganweb.com.ar/palas-cargadoras', filtro: { categoria: 'pala' } },
      { label: 'Palas eléctricas', url: 'https://www.michiganweb.com.ar/palas-cargadoras-electricas', filtro: { categoria: 'pala', busqueda: 'Michigan · Palas eléctricas' } },
      { label: 'Mini palas', url: 'https://www.michiganweb.com.ar/mini-palas' },
      { label: 'Retropalas', url: 'https://www.michiganweb.com.ar/retro-palas' },
      { label: 'Motoniveladoras', url: 'https://www.michiganweb.com.ar/motoniveladoras' },
      { label: 'Excavadoras', url: 'https://www.michiganweb.com.ar/excavadoras' },
      { label: 'Compactadores', url: 'https://www.michiganweb.com.ar/compactadores-de-residuos' },
      { label: 'Porta troncos', url: 'https://www.michiganweb.com.ar/cargadoras-porta-troncos' },
      { label: 'Modelos anteriores', url: 'https://www.michiganweb.com.ar/modelos-anteriores' },
    ],
  },
};
