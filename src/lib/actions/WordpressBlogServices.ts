// import Error from "next/error";
import WordPressApiService from "./WorpressApiService";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://phoecloud.com/wp-json/wp/v2",
  // https://phoecloud.com/wp-json/wp/v2
  // headers: {
  //   Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
  // },
});

// Categories
// export const fetchCategories = async () => api.get("/api/categories");

// Articles

export async function getAllPosts<T>(): Promise<T> {
  const url = "/posts?_embed=author,wp:term,wp:featuredmedia";
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    maxRedirects: 5,
  };

  try {
    const response = await WordPressApiService.fetchData<T>(axiosConfig);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Data:", error);
    throw error;
  }
}

export async function getPostById<T>(slug: string): Promise<T> {
  // const url = `/posts?slug=hello-world&_embed=author,wp:term,wp:featuredmedia`;

  const url = `/posts?slug=${slug}&_embed=author,wp:term,wp:featuredmedia`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    maxRedirects: 5,
  };

  try {
    const response = await WordPressApiService.fetchData<T>(axiosConfig);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Data:", error);
    throw error;
  }
}

export async function getSimilarArticleByCategories<T>(
  categories: string,
  postId: number
): Promise<T> {
  // const url = `/posts?slug=hello-world&_embed=author,wp:term,wp:featuredmedia`;

  const url = `/posts?categories=${categories}&exclude=${postId}&_embed=author,wp:term,wp:featuredmedia`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    maxRedirects: 5,
  };

  try {
    const response = await WordPressApiService.fetchData<T>(axiosConfig);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Data:", error);
    throw error;
  }
}

export async function getSimilarArticleByTags<T>(
  tags: string,
  postId: number
): Promise<T> {
  // const url = `/posts?slug=hello-world&_embed=author,wp:term,wp:featuredmedia`;

  const url = `/posts?tags=${tags}&exclude=${postId}&_embed=author,wp:term,wp:featuredmedia`;
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: "GET",
    maxRedirects: 5,
  };

  try {
    const response = await WordPressApiService.fetchData<T>(axiosConfig);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Data:", error);
    throw error;
  }
}

export const fetchAllCategories = async () => {
  const data = await api.get(`/categories`);
  return data.data;
};
export const fetchArticlesById = async (id: string) => {
  const blog = await api.get(`/posts/${id}`);
  console.log(blog);
  const category = await fetchCategoryById(blog?.data?.categories[0]);
  const author = await fetchAuthorById(blog?.data?.author);
  const media =
    blog?.data?.featured_media &&
    (await fetchMediaById(blog?.data?.featured_media));

  const BlogData = {
    blog: blog.data,
    category,
    author,
    media,
  };

  return BlogData;
};

export const fetchCategoryById = async (id: number) => {
  // console.log(process.env.WORDPRESS_API_URL);
  const data = await api.get(`/categories/${id}`);
  return data?.data;
};
export const fetchAuthorById = async (id: number) => {
  // console.log(process.env.WORDPRESS_API_URL);
  const data = await api.get(`/users/${id}`);
  return data?.data;
};
export const fetchMediaById = async (id: number) => {
  // console.log(process.env.WORDPRESS_API_URL);
  const data = await api.get(`/media/${id}`);
  return data?.data;
};
