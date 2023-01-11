import { useMutation } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";

const insertData = async (insertDataObj, relation) => {
  const { data, error } = await supabase
    .from(relation)
    .insert([insertDataObj])
    .select("*");

  if (error) throw new Error(`${error.message}: ${error.details}`);
  return data;
};

const useInsertData = (insertDataObj, relation) =>
  useMutation({
    mutationFn: () => insertData(insertDataObj, relation),
  });

export default useInsertData;
