import { useQuery } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";

const fetchData = async (tableName, colName, key) => {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .eq(colName, key);
  if (error) throw new Error(`${error.message}: ${error.details}`);
  return data;
};

const useFetchSingle = (tableName, colName, qkey) =>
  useQuery({
    queryKey: [qkey.tbl, qkey.id],
    queryFn: () => fetchData(tableName, colName, qkey.id),
  });

export default useFetchSingle;
