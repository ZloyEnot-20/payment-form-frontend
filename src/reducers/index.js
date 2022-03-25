import { combineReducers } from "redux";
import paymentDetails from "./payment/payment-slice";

const reducers = combineReducers({
  paymentDetails,
});

export default reducers;
