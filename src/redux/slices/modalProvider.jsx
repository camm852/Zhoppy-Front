import { createSlice } from '@reduxjs/toolkit'

const state = {
  visible: false,
  provider: {}
}

export const modalProvider = createSlice({
  name: 'modalProvider',
  initialState: state,
  reducers: {
    open: (state, action) => {
      state.visible = true
      state.value = action.payload
    },
    close: (state, action) => {
      state.visible = false
      state.provider = {}
    },
    setProvider: (state, action) => {
      state.provider = action.payload
    }
  }
})

export default modalProvider.reducer

export const { open, close, setProvider } = modalProvider.actions
