export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';

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

// * Tipo mínimo compartido — funciona tanto con SeedProduct como con Product de Prisma


export interface CartProduct {
  slug: string;
  title: string;
  price: number;
  images: string[];
  sizes: ValidSizes[];
  gender: string;
  tags?: string[];
  description?: string;
}