import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const initialState = {
    // login: '',
    fullName: '',
    // email: '',
    // password: '',
    loading: false,
    // error: '',
    isAuthenticated: false,
};

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const userSlice = createSliceWithThunk({
    name: 'user',
    initialState,
    selectors: {
        userState: (state) => state.user,
    },
    reducers: (create) =>({
        userAuthenticated: create.reducer((state) => {
          state.isAuthenticated = true;
        }),
        userfullName: create.reducer((state, action) => {
          state.fullName = action.payload;
        }),
        fetchUserLogin: create.asyncThunk(
            async ( loginPassword, { rejectWithValue }) => {
                try {
                    const response = await fetch('http://127.0.0.1:8000/enter/', {
                        method: 'POST',
                        body: JSON.stringify(loginPassword),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                    });
                    if (!response.ok) {
                      if (response.status === 500) {
                        return rejectWithValue('Пользователь с таким логином не найден!')
                      } else if (response.status === 401) {
                        return rejectWithValue('Неверный пароль!')
                      } else if (response.status === 402) {
                        return rejectWithValue('Права администратора отсутствуют!')
                      }
                    }
                    const data = await response.json()
                    return {status: response.status, data}
                } catch (e) {
                    return rejectWithValue('сервер не доступен!');
                }
            },
            {
                pending: (state) => {
                  // console.log('pending')
                  state.loading = true;
                  // state.error = "";
                },
                fulfilled: (state, action) => {
                  // console.log('fulfilled')
                  // console.log(action.payload.data['fullName'])
                  state.fullName = action.payload.data['fullName']
                  // state.error = "";
                },
                rejected: (state, action) => {
                  // console.log('rejected')
                  // state.error = action.payload;
                },
                settled: (state) => {
                  // console.log('settled')
                  state.loading = false;
                },
              }
        ),
        fetchUserRegister: create.asyncThunk(
          async (registrForm, { rejectWithValue }) => {
              try {
                  const response = await fetch('http://127.0.0.1:8000/RegistrationUser/', {
                      method: 'POST',
                      body: JSON.stringify(registrForm),
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                  });
                  if (!response.ok) {
                      return rejectWithValue('Пользователь с таким логином уже сущетсвует')
                  }
                  return response.status
              } catch (e) {
                  return rejectWithValue('сервер не доступен!');
              }
          },
          {
              pending: (state) => {
                state.loading = true;
                // state.error = "";
              },
              fulfilled: (state, action) => {
                // state.login = action.payload;
                // state.error = "";
              },
              rejected: (state, action) => {
                // state.error = action.payload;
              },
              settled: (state) => {
                state.loading = false;
              },
            }
      )
    })
})

export const { userAuthenticated, userfullName, fetchUserLogin, fetchUserRegister } = userSlice.actions;
export const { userState } = userSlice.selectors;
export default userSlice.reducer;