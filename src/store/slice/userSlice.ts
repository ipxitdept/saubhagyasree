import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  token: string | null;
}

const initialState: UserState = {
  name: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; token: string }>) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.name = '';
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
