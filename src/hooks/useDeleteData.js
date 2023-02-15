import { useMutation } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";

const deleteData = async (tableName, colName, key) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq(colName, key)
    .select();

  if (error) throw new Error(`${error.message}: ${error.details}`);
  return data;
};

const useDeleteData = (tableName, colName, qkey) =>
  useMutation({
    mutationFn: () => deleteData(tableName, colName, qkey),
  });

export default useDeleteData;
