import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const initialState = {
    login: '',
    fullName: '',
    email: '',
    password: '',
    files: [],
    loading: false,
    error: "",
};

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const filesSlice = createSliceWithThunk({
    name: 'files',
    initialState,
    selectors: {
        filesState: (state) => state.files,
    },
    reducers: (create) =>({
        registrData: create.reducer((state, action) => {
        }),
        fetchUserLogin: create.asyncThunk(
            async (_, { rejectWithValue }) => {
                try {
                    const response = await fetch('http://127.0.0.1:8000/users/?fullName=Ольга');
                    if (!response.ok) {
                        return rejectWithValue('Пользователь не найден!')
                    }
                    return await response.json();
                } catch (e) {
                    return rejectWithValue(e);
                }
            },
            {
                pending: (state) => {
                  state.loading = true;
                  state.error = "";
                },
                fulfilled: (state, action) => {
                  state.login = action.payload;
                  state.error = "";
                },
                rejected: (state, action) => {
                  state.error = action.payload;
                },
                settled: (state) => {
                  state.loading = false;
                },
              }
        )
    })
})

export const { registrData, fetchUserLogin } = filesSlice.actions;
export const { filesState } = filesSlice.selectors;
export default filesSlice.reducer;