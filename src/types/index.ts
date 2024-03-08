// -----------------------------article types--------------------------------
export interface SingleArticle {
  title: string;
  content: string;
  _id: string;
  slug: string;
  image: string;
  paid: boolean;
  category: string;
  tags: object[];
  createdAt: string;
  updatedAt: string;
  author: { name: string; profile: string };
}

export interface Articles {
  articles: SingleArticle[];
}

// ---------------------category types-------------------------
export interface SingleCategory {
  name: string;
  _id: string;
  image: string;
  showOnNavbar: boolean;
}

export interface Categories {
  categories: SingleCategory[];
}

// ----------------------user ---------------------

export interface AuthState {
  loading: boolean;
  user: null | UserType;
  error: null | object;
  token: null | string;
  verifyToken: null | string;
  email: null | string;
  addresses: null | {
    billingAddress: BillingAddress;
    shippingAddress: ShippingAddress;
  };
  addressLoading: boolean;
  editProfileLoading: boolean;
}

export interface UserType {
  fname: string;
  lname: string;
  email: string;
  phone: number | string;
  civility: string;
  password: string;
  mobile: number | string;
  company: string;
  shippingAddress: Address;
  token?: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface Addresses {
  billingAddress: Address;
  shippingAddress: Address;
}

export interface Address {
  address1: string;
  address2?: string;
  address3?: string;
  zipCode: string;
  city: string;
  province: string;
  country: string;
  addressType?: string;
  token?: string | null;
}

export type BillingAddress = Address | null;

export type ShippingAddress = Address | null;

export interface CountryType {
  currency: string;
  flag: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
  phonecode: string;
}

export interface StateType {
  countryCode: string;
  isoCode: string ;
  latitude?: string | undefined | null;
  longitude?: string | undefined | null;
  name: string;
}

export interface SignupPayload {
  subscriber: UserType;
  token: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  token: string | null;
}

// -----------------------------------------api response -----------------------------

export interface SingelArticleResponse {
  article: SingleArticle;
  success: string;
  message: string;
  code: number;
}
