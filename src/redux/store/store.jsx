import cartReducer from '../slices/cartSlice'
import detailReducer from '../slices/modalCardDetail'
import providerReducer from '../slices/modalProvider'
import shoeReducer from '../slices/modalShoe'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage
}

const cardPersistedReducer = persistReducer(persistConfig, cartReducer)

const store = configureStore({
  reducer: {
    cart: cardPersistedReducer,
    detail: detailReducer,
    provider: providerReducer,
    shoe: shoeReducer
  },
  middleware: [thunk]
})

export default store
export const persistor = persistStore(store)
