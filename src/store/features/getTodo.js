import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListTodo } from "src/apis/tutor-module";

export const fetchTodoList = createAsyncThunk(
  "get/todo",
  async (_, thunkAPI) => {
    try {
      const res = await getListTodo();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  tasks: [],
  status: "idle",
};

const taskSlice = createSlice({
  name: "get/todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder
      .addCase(fetchTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
      });
  },
});
// export const {} = taskSlice.actions;
export const listTasks = (state) => state.getTodo.tasks;

export default taskSlice.reducer;
