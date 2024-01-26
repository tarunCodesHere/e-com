import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = { products: [], isLoading: true };
export const getProductsFromDB = createAsyncThunk(
  "products/initial",
  async (arg, thunkAPI) => {
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    const data1 = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      data1.push(doc.data());
    });
    thunkAPI.dispatch(setInitalProduct(data1));
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setInitalProduct: (state, action) => {
      console.log(action);
      state.products = action.payload;
      state.isLoading = false;
    },
  },
});

export const productReducer = productSlice.reducer;
export const { setInitalProduct } = productSlice.actions;
export const productSelector = (state) => state.productReducer;
