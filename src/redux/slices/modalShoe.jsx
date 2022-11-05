import { createSlice } from '@reduxjs/toolkit'

const state = {
  visible: false,
  shoe: {}
}

export const modalShoe = createSlice({
  name: 'modalShoe',
  initialState: state,
  reducers: {
    open: (state, action) => {
      state.visible = true
      state.value = action.payload
    },
    close: (state, action) => {
      state.visible = false
      state.shoe = {}
    },
    setShoe: (state, action) => {
      state.shoe = action.payload
    }
  }
})

export default modalShoe.reducer

export const { open, close, setShoe } = modalShoe.actions
