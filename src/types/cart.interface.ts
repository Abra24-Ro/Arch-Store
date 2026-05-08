export interface Address {
    firstName:  string;
    lastName:   string;
    phone:      string;
    address:    string;
    city:       string;
    state:      string;
    postalCode: string;
    country:    string;
  }




export const FIELDS: { label: string; key: keyof Address }[] = [
  { label: "Nombre",     key: "firstName"  },
  { label: "Apellido",   key: "lastName"   },
  { label: "Teléfono",   key: "phone"      },
  { label: "Dirección",  key: "address"    },
  { label: "Ciudad",     key: "city"       },
  { label: "Estado",     key: "state"      },
  { label: "C.P.",       key: "postalCode" },
  { label: "País",       key: "country"    },
];