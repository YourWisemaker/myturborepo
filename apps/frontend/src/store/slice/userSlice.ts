import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserUpdateRequest, UserResponse } from '../../types/shared';
import { fetchUserData, updateUserData } from '../../apis/userApi';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchUserData();
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user data');
  }
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: UserUpdateRequest, { rejectWithValue }) => {
    try {
      const response = await updateUserData(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
      state.loading = false;
      state.user = action.payload.data || null;
      state.success = action.payload.success;
      state.error = action.payload.error || null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to fetch user data';
    });

    // Update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
      state.loading = false;
      if (action.payload.data) {
        state.user = action.payload.data;
      }
      state.success = action.payload.success;
      state.error = action.payload.error || null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to update user data';
      state.success = false;
    });
  },
});

export const { clearUserError, resetSuccess, logoutUser } = userSlice.actions;

export default userSlice.reducer;
