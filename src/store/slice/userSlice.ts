import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user_id: string;
  token: string | null;
}

const initialState: UserState = {
  user_id: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user_id: string; token: string }>) => {
      state.user_id = action.payload.user_id;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user_id = '';
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
