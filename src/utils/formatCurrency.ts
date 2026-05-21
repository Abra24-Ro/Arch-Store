const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  });
  
export const formatCurrency = (value: number): string => {
    return formatter.format(value);
  };