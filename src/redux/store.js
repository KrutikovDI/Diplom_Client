import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filesReducer from "../slices/filesSlice";
// import usersReducer from "../slices/usersSlice";




export const store = configureStore({
  reducer: combineReducers ({
    files: filesReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
