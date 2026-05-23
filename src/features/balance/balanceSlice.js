import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBalance } from '@/service/allService';

export const fetchBalance = createAsyncThunk(
  'balance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getBalance();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    balance: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    clearBalanceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status === 0) {
          state.balance = action.payload.data?.balance || 0;
        } else {
          state.error = action.payload?.message || 'Gagal memuat saldo';
        }
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Terjadi kesalahan koneksi internet.';
      });
  },
});

export const { setBalance, clearBalanceError } = balanceSlice.actions;
export default balanceSlice.reducer;
