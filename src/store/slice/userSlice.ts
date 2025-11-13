import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user_id: string;
  name: string;
  email: string;
  token: string | null;
}

const initialState: UserState = {
  user_id: '',
  name: '',
  email: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user_id: string; token: string; name: string; email: string }>) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user_id = '';
      state.name = '';
      state.email = '';
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
