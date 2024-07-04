//npm install @reduxjs/toolkit

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authReducer";
import { TitleReducer } from "./titleReducer";
import { CustomerReducer } from "./customerReducer";
import { GuestReducer } from "./guestReducer";

//which reducers should we use
const reducers = combineReducers({auth:AuthReducer,title:TitleReducer,customer:CustomerReducer,guest:GuestReducer});

//combine all reducer to one single and happy store
export const systemStore = configureStore({
    reducer: reducers,
    middleware: (getDefualtMiddleWare)=> getDefualtMiddleWare({serializableCheck:false})
});