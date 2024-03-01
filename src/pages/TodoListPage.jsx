import React, { useState } from "react";
import { useQueries } from "react-query";
import { useSelector } from "react-redux";
import { getTodoListDetail, updateTodoDetail } from "src/apis/tutor-module";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import { useUpdateMutation } from "src/hooks/useToastMutation";
import { useAppDispatch } from "src/store";
import { fetchTodoList, listTasks } from "src/store/features/getTodo";

function TodoListPage() {
  const [todoDetail, setTodoDetail] = useState(undefined);
  const [newTodoDetail, setNewTodoDetail] = useState(undefined);
  const usingId = 2;

  const tasks = useSelector(listTasks);
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    // @ts-ignore
    dispatch(fetchTodoList());
  };

  useQueries([
    {
      queryKey: ["getTodoDetail"],
      queryFn: async () => {
        const response = await getTodoListDetail(usingId);
        setTodoDetail(response?.data);
        setNewTodoDetail(response?.data);
        return response?.data;
      },
    },
  ]);

  const { updateMutation: updateTodoMutation } = useUpdateMutation(
    usingId,
    updateTodoDetail,
    "getTodoDetail",
    "Update todo successfully",
    handleClick
  );

  const handleClickUpdate = () => {
    // @ts-ignore
    updateTodoMutation.mutate(newTodoDetail);
  };

  return (
    <div>
      <div>ABCD</div>
      <div onClick={handleClick}>Fetch API Call</div>
      <div>
        Get detail: {todoDetail?.id} - {todoDetail?.title}
      </div>
      <PrimaryInput
        title={"Todo"}
        onChange={(e) => {
          setNewTodoDetail({
            ...newTodoDetail,
            title: e.target.value,
          });
        }}
        value={newTodoDetail?.title ? newTodoDetail?.title : ""}
      />

      <PrimaryBtn onClick={handleClickUpdate}>Update todo</PrimaryBtn>

      <div>List task:</div>
      {tasks?.map((i) => (
        <div key={i?.id}>
          {i?.id} - {i?.title}
        </div>
      ))}
    </div>
  );
}

export default TodoListPage;
