import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// rootReducer를 직접 import하지 않고, 아래의 slice들을 이용하여 rootReducer를 생성합니다.
import testSlice from "./testSlice";
import createUserSlice from "./createUserSlice";
import newsSlice from "./newsSlice";
import userInfoSlice from "./userInfoSlice";
import darkmodeSlice from "./darkmodeSlice";
import userpositionSlice from "./userpositionSlice";



// persistConfig 설정: 저장소로 AsyncStorage를 사용합니다.
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// 각 slice를 combineReducers를 통해 하나의 rootReducer로 합칩니다.
const rootReducer = combineReducers({
  test: testSlice,
  createUser: createUserSlice,
  news: newsSlice,
  userInfo: userInfoSlice,
  darkmode: darkmodeSlice,
  userposition: userpositionSlice,
});

// persistReducer를 사용하여 rootReducer를 감싸 줍니다.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore에 persistedReducer를 전달합니다.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// persistStore를 사용하여 store를 persistor와 연결합니다.
export const persistor = persistStore(store);

export default store;
