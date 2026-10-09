import type { Product } from './catalog';

// Arma un producto con sus fotos para los catálogos de marca (hanomag.ts, michigan.ts).
// `fotos` es el resultado de import.meta.glob de la carpeta de la marca y `carpeta` la ruta
// base dentro del glob. Las fotos de cada producto son <carpeta>/<slug>/<slug>-N.webp
// (la primera es la principal).
export function crearProducto(
  fotos: Record<string, string>,
  carpeta: string,
  idPrefix: string,
  categoriaPorDefecto: Product['categoria'],
  slug: string,
  cantidadFotos: number,
  datos: Pick<Product, 'marca' | 'nombre' | 'tags' | 'descripcion'> & Partial<Product>,
): Product {
  const imagenes = Array.from(
    { length: cantidadFotos },
    (_, k) => fotos[`${carpeta}/${slug}/${slug}-${k + 1}.webp`],
  );
  return {
    id: `${idPrefix}-${slug}`,
    estado: 'nuevo',
    categoria: categoriaPorDefecto,
    ...datos,
    imagen: imagenes[0],
    imagenes: imagenes.length > 1 ? imagenes : undefined,
    fotoCompleta: imagenes.length > 0,
  };
}
