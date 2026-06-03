// format.utils.ts
export const formatDate = (date: Date): string => {
  const d = new Date(date);
  
  const datePart = new Intl.DateTimeFormat("es-PE", {
    day:      "numeric",
    month:    "long",
    year:     "numeric",
    timeZone: "America/Lima",
  }).format(d);

  const timePart = new Intl.DateTimeFormat("es-PE", {
    hour:     "2-digit",
    minute:   "2-digit",
    timeZone: "America/Lima",
  }).format(d);

  return `${datePart}, ${timePart}`; // ← separador fijo, sin ambigüedad
};