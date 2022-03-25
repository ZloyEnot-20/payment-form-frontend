import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  requestId: "",
  isLoading: false,
  error: "",
  isPaid: false,
};

const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {
    sendPayment(state) {
      state.isLoading = true;
      state.isPaid = false;
    },
    paymentSuccess(state, action) {
      state.isLoading = false;
      state.requestId = action.payload;
      state.isPaid = true;
    },
    paymentError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.isPaid = false;
    },
  },
});

export const handlePayment = (data) => async (dispatch) => {
  try {
    dispatch(payment.actions.sendPayment());

    await axios
      .post("http://localhost:5000/api/pay", data)
      .then(({ data: id }) => dispatch(payment.actions.paymentSuccess(id)));
  } catch (e) {
    dispatch(payment.actions.paymentError(e.message));
  }
};

export default payment.reducer;
