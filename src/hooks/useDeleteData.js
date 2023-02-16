import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const useDeleteData = (tableName, colName, qkey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteData(tableName, colName, qkey),
    onSuccess: () => {
      queryClient.setQueryData([tableName], (oldData) =>
        oldData.filter((e) => e.id !== qkey)
      );
    },
  });
};

export default useDeleteData;
