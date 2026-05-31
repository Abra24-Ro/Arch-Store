export interface Address {
  firstName:  string;
  lastName:   string;
  phone:      string;
  address:    string;
  address2?:  string;
  city:       string;
  // ← eliminar state
  postalCode: string;
  country:    string;
}

export const FIELDS: { label: string; key: keyof Address }[] = [
  { label: "Nombre",      key: "firstName"  },
  { label: "Apellido",    key: "lastName"   },
  { label: "Teléfono",    key: "phone"      },
  { label: "Dirección",   key: "address"    },
  { label: "Ciudad",      key: "city"       },
  // ← eliminar estado
  { label: "C.P.",        key: "postalCode" },
  { label: "País",        key: "country"    },
  { label: "Dirección 2", key: "address2"   },
];