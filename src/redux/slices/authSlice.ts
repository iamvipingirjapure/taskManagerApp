import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type AuthState = {
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await axios.post(
        'https://reqres.in/api/login',
        { email, password },
        {
          headers: { 'x-api-key': 'reqres-free-v1' },
        },
      );
      return res.data.token as string;
    } catch (err: any) {
      throw err;
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.post('https://reqres.in/api/register', {
      email,
      password,
    });
    return res.data.token as string;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, s => {
        s.loading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload;
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Login failed';
      })
      .addCase(signup.pending, s => {
        s.loading = true;
        s.error = null;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload;
      })
      .addCase(signup.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? 'Signup failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
