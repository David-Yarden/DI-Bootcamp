import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
/** immer */

const initialState = {
  count: 10,
  status: "",
};

export const delayIncremetAsync = createAsyncThunk("counter/delay", () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(5);
    }, 5 * 1000);
  });
});

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      //   setTimeout(() => {
      //     state.count++;
      //   }, 5 * 1000);
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    reset: (state) => {
      state.count = 0;
    },
    addByVal: (state, action) => {
      console.log("=>", action);
      state.count += Number(action.payload.a) + Number(action.payload.b);
    },
    addByValPrepare: {
      reducer(state, action) {
        state.count += action.payload;
      },
      prepare(a, b) {
        return { payload: a + b };
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(delayIncremetAsync.pending, (state, action) => {
      console.log("pending=>", action);
      state.status = "loading";
    });
    builder.addCase(delayIncremetAsync.fulfilled, (state, action) => {
      console.log("fulfilled=>", action);
      state.status = "";
      state.count += action.payload;
    });
    builder.addCase(delayIncremetAsync.rejected, (state, action) => {
      state.status = "error";
      console.log("rejected=>", action);
    });
  },
});

/** redux-thunk */
// console.log(counterSlice.actions);

export const { increment, decrement, reset, addByVal, addByValPrepare } =
  counterSlice.actions;
export default counterSlice.reducer;