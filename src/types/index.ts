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

// -----------------------------------------api response -----------------------------

export interface SingelArticleResponse {
  article: SingleArticle;
  success: string;
  message: string;
  code: number;
}
