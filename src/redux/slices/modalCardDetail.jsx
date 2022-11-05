import { createSlice } from '@reduxjs/toolkit'

export const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    visible: false,
    value: [{}]
  },
  reducers: {
    open: (state, action) => {
      state.visible = true
      state.value = action.payload
    },
    close: (state, action) => {
      state.visible = false
    }
  }
})

export default detailSlice.reducer

export const { open, close } = detailSlice.actions
