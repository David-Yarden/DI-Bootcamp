import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { StoriesState, Story, CreateStoryInput, UpdateStoryInput } from '../../app/types';
import { storiesApi } from '../../app/api';

const initialState: StoriesState = {
  stories: [],
  currentStory: null,
  isLoading: false,
  error: null
};

export const fetchStories = createAsyncThunk(
  'stories/fetchAll',
  async (filter?: string, { rejectWithValue }) => {
    try {
      return await storiesApi.getAll(filter);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStory = createAsyncThunk(
  'stories/fetchOne',
  async (id: number, { rejectWithValue }) => {
    try {
      return await storiesApi.getOne(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createStory = createAsyncThunk(
  'stories/create',
  async (data: CreateStoryInput, { rejectWithValue }) => {
    try {
      return await storiesApi.create(data.title, data.content);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStory = createAsyncThunk(
  'stories/update',
  async ({ id, data }: { id: number; data: UpdateStoryInput }, { rejectWithValue }) => {
    try {
      return await storiesApi.update(id, data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStory = createAsyncThunk(
  'stories/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await storiesApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setCurrentStory: (state, action: PayloadAction<Story | null>) => {
      state.currentStory = action.payload;
    },
    clearStoriesError: (state) => {
      state.error = null;
    },
    updateCurrentStoryLocally: (state, action: PayloadAction<Partial<Story>>) => {
      if (state.currentStory) {
        state.currentStory = { ...state.currentStory, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all stories
      .addCase(fetchStories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single story
      .addCase(fetchStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentStory = action.payload;
      })
      .addCase(fetchStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create story
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories.unshift(action.payload);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update story
      .addCase(updateStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.stories[index] = { ...state.stories[index], ...action.payload };
        }
        if (state.currentStory?.id === action.payload.id) {
          state.currentStory = { ...state.currentStory, ...action.payload };
        }
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete story
      .addCase(deleteStory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories = state.stories.filter(s => s.id !== action.payload);
        if (state.currentStory?.id === action.payload) {
          state.currentStory = null;
        }
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setCurrentStory, clearStoriesError, updateCurrentStoryLocally } = storiesSlice.actions;
export default storiesSlice.reducer;
