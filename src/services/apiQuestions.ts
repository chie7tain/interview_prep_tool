import supabase from "./supabase";

export async function getQuestions() {
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*");
  if (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
  return questions;
}

export async function getQuestionsByCategory(categoryId: string | null) {
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("category_id", categoryId);
  if (error) {
    console.error(
      `Error fetching questions for category ${categoryId}:`,
      error
    );
    throw new Error("Failed to fetch questions for category");
  }
  return questions;
}
