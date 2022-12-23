import { useQuery } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";

const fetchData = async (tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .order("created_at", { ascending: false });
  if (error) throw new Error(`${error.message}: ${error.details}`);
  return data;
};

const useFetchData = (tableName) =>
  useQuery({ queryKey: [tableName], queryFn: () => fetchData(tableName) });

export default useFetchData;
