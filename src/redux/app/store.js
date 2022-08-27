import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../features/account/accountSlice";
import linkSlice from "../features/link/linkSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice,
        link: linkSlice,
    },
});
