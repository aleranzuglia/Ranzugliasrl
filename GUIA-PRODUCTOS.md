# 📝 Guía para Agregar/Quitar Productos

## ¿Dónde está el catálogo?

El catálogo de productos está en el archivo:
```
src/app/data/catalog.ts
```

## 🆕 Cómo AGREGAR un producto nuevo

### Paso 1: Abrí el archivo `catalog.ts`

### Paso 2: Copiá esta plantilla al final del array `CATALOG`:

```typescript
{
  id: 'producto-nuevo',                    // ID único (sin espacios ni tildes)
  estado: 'nuevo',                         // 'nuevo' o 'usado'
  categoria: 'tractor',              // Ver categorías disponibles abajo
  marca: 'Pauny · Bravo',                  // Nombre de la marca
  nombre: '540 C Bravo',                   // Nombre del modelo
  hp: '220 HP',                            // Potencia (opcional)
  tags: ['220 HP', 'Articulado', '4×4'],  // Etiquetas descriptivas
  descripcion: 'Descripción completa del producto...',
  imagen: '/ruta/a/imagen.png',            // Opcional - si no hay imagen, se muestra la marca
  peso: '9.8 T',                           // Opcional
  cabina: 'Cerrada c/ A.A.',              // Opcional
  origen: 'Las Varillas, Cba.',           // Opcional
},
```

### Paso 3: Completá los datos

**Categorías disponibles:**
- `'tractor'` → Tractores (Hanomag, Pauny, Gravo...)
- `'pala'` → Palas cargadoras (Hanomag, Michigan...)
- `'elevador'` → Elevadores y autoelevadores (Hanomag, Michigan...)
- `'sembradora'` → Sembradoras
- `'acoplado'` → Acoplados
- `'implemento'` → Implementos
- `'vial'` → Equipos Viales

**Marca:** el filtro de marca sale de `marca` (lo que va antes del ` · `). Ej: `'Pauny · Bravo'` → marca Pauny. Hanomag y Michigan se muestran primero con la etiqueta "Oficial" (`OFFICIAL_BRANDS` en `catalog.ts`).

**Estado:**
- `'nuevo'` → Aparece en la pestaña "Nuevos"
- `'usado'` → Aparece en la pestaña "Usados"

### Ejemplo completo:

```typescript
{
  id: 'p250a-nuevo',
  estado: 'nuevo',
  categoria: 'tractor',
  marca: 'Pauny · Estándar',
  nombre: '250 A',
  hp: '170 HP',
  tags: ['170 HP', 'Estándar', '4×4'],
  descripcion: 'Tractor estándar versátil para tareas mixtas. Doble tracción, caja de cambios sincronizada.',
  peso: '6.2 T',
  cabina: 'Cerrada c/ A.A.',
  origen: 'Las Varillas, Cba.',
},
```

## ❌ Cómo ELIMINAR un producto

### Opción 1: Buscar por ID
1. Abrí `catalog.ts`
2. Buscá el producto por su `id` (ejemplo: `id: 'p540c'`)
3. Eliminá todo el bloque del producto (desde `{` hasta `},`)

### Opción 2: Buscar por nombre
1. Abrí `catalog.ts`
2. Buscá el nombre del producto (ejemplo: `nombre: '540 C Bravo'`)
3. Eliminá todo el bloque del producto

## ✏️ Cómo MODIFICAR un producto

1. Abrí `catalog.ts`
2. Buscá el producto que querés modificar
3. Cambiá los valores que necesites
4. Guardá el archivo

## 📸 Cómo agregar IMÁGENES

### Si tenés la imagen:
1. Guardá la imagen en: `src/imports/` o `public/`
2. En el producto, agregá la ruta:
   ```typescript
   imagen: '/src/imports/mi-tractor.png',
   ```

### Si NO tenés imagen:
- Dejá el campo `imagen` sin definir o con valor `undefined`
- El sistema mostrará automáticamente el nombre de la marca en un fondo de color

## 💡 Tips importantes

✅ **Cada producto DEBE tener**:
- `id` único (sin repetir)
- `estado`
- `categoria`
- `marca`
- `nombre`
- `tags` (aunque sea un array vacío `[]`)
- `descripcion`

⚠️ **Campos opcionales**:
- `hp`
- `imagen`
- `peso`
- `cabina`
- `origen`

🎨 **Para productos SIN imagen**:
- Los productos de PAUNY aparecen con fondo amarillo
- Los productos de GRAVO aparecen con fondo negro
- Los productos de SYL aparecen con fondo rojo
- Otros productos aparecen con fondo gris

## 🔄 Ver los cambios

1. Guardá el archivo `catalog.ts`
2. El navegador se recargará automáticamente
3. Los productos nuevos/modificados aparecerán inmediatamente

---

## 📋 Ejemplo completo de varios productos

```typescript
export const CATALOG: Product[] = [
  {
    id: 'p540c',
    estado: 'nuevo',
    categoria: 'tractor',
    marca: 'Pauny · Bravo',
    nombre: '540 C Bravo',
    hp: '220 HP',
    tags: ['220 HP', 'Articulado', '4×4'],
    descripcion: 'Tractor articulado, doble tracción permanente.',
    peso: '9.8 T',
    cabina: 'Cerrada c/ A.A.',
    origen: 'Las Varillas, Cba.',
  },
  {
    id: 'sembradora-gherardi',
    estado: 'nuevo',
    categoria: 'sembradora',
    marca: 'Gherardi',
    nombre: 'Air Drill G 600',
    tags: ['Granos finos y gruesos', '41–57 líneas'],
    descripcion: 'Siembra a chorrillo. Trenes independientes.',
    peso: 'Consultar',
    origen: 'Argentina',
  },
  {
    id: 'usado-pauny-250',
    estado: 'usado',
    categoria: 'tractor',
    marca: 'Pauny · Estándar',
    nombre: '250 A — Usado 2019',
    hp: '170 HP',
    tags: ['170 HP', 'Usado', '4500 hs'],
    descripcion: '4500 horas. Dos dueños. Muy buen estado.',
    peso: '6.2 T',
    cabina: 'Cerrada c/ A.A.',
    origen: 'Las Varillas, Cba.',
  },
];
```

---

¿Tenés dudas? El código está en TypeScript, pero es muy similar a JavaScript. 
Solo seguí la estructura de los ejemplos y todo funcionará perfecto! 🚜✨
