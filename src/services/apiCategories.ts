import supabase from "./supabase";

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
  return categories;
}

