import {createSlice, createAsyncThunk, nanoid} from '@reduxjs/toolkit';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users: [],
    status: 'idle',
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(USERS_URL);
    const data = await response.json();
    return data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        adduser: (state, action) => {
            state.users.push({id: nanoid(), name: action.payload.name, email: action.payload.email});
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { adduser } = userSlice.actions;
export default userSlice.reducer;