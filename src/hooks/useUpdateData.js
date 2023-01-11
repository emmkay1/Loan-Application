import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../config/supabaseClient";

const updateData = async (dataObj, relation, colName, key) => {
  const { data, error } = await supabase
    .from(relation)
    .update(dataObj)
    .eq(colName, key)
    .select();

  if (error) throw new Error(`${error.message}: ${error.details}`);
  return data;
};

const useUpdateData = (dataObj, relation, colName, key, qkey) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [relation, colName, key],
    mutationFn: () => updateData(dataObj, relation, colName, key),
    onSuccess: (data) => {
      queryClient.setQueryData([qkey.tbl, qkey.id], data);
    },
  });
};
export default useUpdateData;
