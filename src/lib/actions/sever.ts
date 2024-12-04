"use server";
import { revalidatePath } from "next/cache";
import { getAllModules, getFilteredModules } from "./module.action";

export const getModules = async <T>({
  page,
  pageSize,
  search,
  category,
}: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
  rating?: number;
}) => {
  try {
    const resp = await getFilteredModules<T>({
      page,
      pageSize,
      search,
      category,
    });
    console.log(resp);
    // revalidatePath("/modules");
    return resp;
  } catch (error) {
    console.log(error);
  }
};
