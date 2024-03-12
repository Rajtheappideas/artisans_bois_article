import { GetUrl } from "@/BaseUrl";
import {
  Articles,
  Categories,
  HomeContent,
  SingelArticleResponse,
  SingleArticle,
  SingleCategory,
} from "@/types/index";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const handleGetArticles = createAsyncThunk(
  "getcontent/handleGetArticles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl<Articles>("article");
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleGetHomePageConent = createAsyncThunk(
  "getcontent/handleGetHomePageConent",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl<HomeContent>("");
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleGetArticleBySlug = createAsyncThunk(
  "getcontent/handleGetArticleBySlug",
  async ({ slug }: { slug: string }, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl<SingelArticleResponse>(`article/${slug}`);
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const handleGetCategories = createAsyncThunk(
  "getcontent/handleGetCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await GetUrl<Categories>("category");
      return data;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

interface GetContentState {
  articleLoading: boolean;
  articles: SingleArticle[];
  singleArticle: SingleArticle | null;
  homePageLoading: boolean;
  homePageContent: HomeContent | null;
  categoryLoading: boolean;
  categories: SingleCategory[];
  searchedArticles: SingleArticle[];
  searchTerm: string;
  error: null | object;
}

const initialState: GetContentState = {
  articleLoading: false,
  articles: [],
  singleArticle: null,
  homePageLoading: false,
  homePageContent: null,
  categoryLoading: false,
  categories: [],
  searchedArticles: [],
  searchTerm: "",
  error: null,
};

const GetContentSlice = createSlice({
  name: "getcontent",
  initialState,
  reducers: {
    handleChangeSingleArticle: (state, { payload }) => {
      state.singleArticle = payload;
    },
    handleChangeSearchArticles: (state, { payload }) => {
      state.searchedArticles = payload;
    },
    handleChangeSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
  },
  extraReducers: (builder) => {
    // get articles
    builder
      .addCase(handleGetArticles.pending, (state, action) => {
        state.articleLoading = true;
      })
      .addCase(
        handleGetArticles.fulfilled,
        (state, { payload: { articles } }: PayloadAction<Articles>) => {
          state.articleLoading = false;
          state.articles = articles;
          state.error = null;
        }
      )
      .addCase(
        handleGetArticles.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.articleLoading = false;
          state.error = payload;
          state.articles = [];
        }
      );

    // get home page content
    builder
      .addCase(handleGetHomePageConent.pending, (state, action) => {
        state.homePageLoading = true;
      })
      .addCase(
        handleGetHomePageConent.fulfilled,
        (state, { payload }: PayloadAction<HomeContent>) => {
          state.homePageLoading = false;
          state.homePageContent = payload;
          state.error = null;
        }
      )
      .addCase(
        handleGetHomePageConent.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.homePageLoading = false;
          state.error = payload;
          state.homePageContent = null;
        }
      );

    // get article by slug
    builder
      .addCase(handleGetArticleBySlug.pending, (state, action) => {
        state.articleLoading = true;
      })
      .addCase(
        handleGetArticleBySlug.fulfilled,
        (
          state,
          { payload: { article } }: PayloadAction<SingelArticleResponse>
        ) => {
          state.articleLoading = false;
          state.singleArticle = article;
          state.error = null;
        }
      )
      .addCase(
        handleGetArticleBySlug.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.articleLoading = false;
          state.error = payload;
          state.singleArticle = null;
        }
      );

    // get categories
    builder
      .addCase(handleGetCategories.pending, (state, action) => {
        state.categoryLoading = true;
      })
      .addCase(
        handleGetCategories.fulfilled,
        (state, { payload: { categories } }: PayloadAction<Categories>) => {
          state.categoryLoading = false;
          state.categories = categories;
          state.error = null;
        }
      )
      .addCase(
        handleGetCategories.rejected,
        (state, { payload }: PayloadAction<any>) => {
          state.categoryLoading = false;
          state.error = payload;
          state.categories = [];
        }
      );
  },
});

export const {
  handleChangeSingleArticle,
  handleChangeSearchTerm,
  handleChangeSearchArticles,
} = GetContentSlice.actions;

export default GetContentSlice.reducer;
