// redux/syllabusSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatDate } from '../../helpers/daytimeFormat';

// const formatDate = (date) => {
//   if (!date) return '';
//   const d = new Date(date);
//   return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
// };

// Async thunk for fetching syllabus data
export const fetchSyllabusData = createAsyncThunk(
    'syllabus/fetchSyllabusData',
    async (
        {
            page = 1,
            pageSize = 5,
            tags = [],
            dateFilter,
            sorter = { sortBy: null, order: null },
        },
        thunkAPI
    ) => {
        try {
            let URL = `http://localhost:8080/api/syllabus/list?page=${page}&pageSize=${pageSize}&`;
            let tagsParam = '';
            if (tags.length > 0) {
                tagsParam = tags.reduce((total, item) => {
                    return total + `tagList=${item}&`;
                }, '');

                URL = `http://localhost:8080/api/syllabus/list/tags?page=${page}&pageSize=${pageSize}&${tagsParam}`;
            }
            if (dateFilter?.startDate && dateFilter?.endDate) {
                if (tags.length > 0) {
                    URL += `dateStart=${dateFilter.startDate}&dateEnd=${dateFilter.endDate}&`;
                } else {
                    URL = `http://localhost:8080/api/syllabus/list/tags?page=${page}&pageSize=${pageSize}&dateStart=${dateFilter.startDate}&dateEnd=${dateFilter.endDate}&`;
                }
            }
            const { sortBy, order } = sorter;
            if (sortBy && order) {
                URL += `sortBy=${sortBy}&order=${order}`;
            }

            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in fetchSyllabusData:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for deleting a syllabus
export const deleteSyllabus = createAsyncThunk(
    'syllabus/deleteSyllabus',
    async ({ syllabusId, currentPage, pageSize, totalItems }, thunkAPI) => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/syllabus/${syllabusId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.status === 200 && res.ok) {
                let newPage = currentPage;
                const remainingItems = totalItems - 1;
                const totalPages = Math.ceil(remainingItems / pageSize);
                // Nếu xóa sản phẩm cuối cùng của trang và trang hiện tại lớn hơn tổng số trang mới, giảm trang hiện tại
                if (currentPage > totalPages) {
                    newPage = totalPages;
                    thunkAPI.dispatch(setCurrentPage(newPage));
                }
                thunkAPI.dispatch(
                    fetchSyllabusData({
                        page: newPage,
                        pageSize,
                        tags: [],
                        dateFilter: {},
                    })
                );
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error in deleteSyllabus:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for duplicating a syllabus
export const duplicateSyllabus = createAsyncThunk(
    'syllabus/duplicateSyllabus',
    async ({ syllabusId, currentPage, pageSize, totalItems }, thunkAPI) => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/syllabus/duplicate/${syllabusId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200 && res.ok) {
                thunkAPI.dispatch(
                    fetchSyllabusData({ page: currentPage, pageSize })
                );
            } else {
                throw new Error('Failed to duplicate');
            }
        } catch (error) {
            console.error('Error in duplicateSyllabus:', error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteSyllabusById = createAsyncThunk(
    'syllabus/deleteSyllabusById',
    async (payload, thunkAPI) => {
        try {
            const URL = `http://localhost:8080/api/syllabus/${payload.id}`;
            const response = await fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            if (data && data.id) {
                // Cập nhật danh sách syllabus sau khi xoá
                thunkAPI.dispatch(fetchSyllabusData());
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
const viewSyllabusSlice = createSlice({
    name: 'syllabus',
    initialState: {
        data: [],
        totalItems: 0,
        currentPage: 1,
        pageSize: 5,
        totalPages: 0,
        lastPage: false,
        loading: false,
        error: null,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSyllabusData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSyllabusData.fulfilled, (state, action) => {
                state.data = action.payload.content.map((item, index) => ({
                    ...item,
                    key: item.id,
                    // days: index,
                    status: item.status || '',
                    createdDate: formatDate(item.createdDate),
                    modifiedDate: formatDate(item.modifiedDate),
                }));

                state.totalItems = action.payload.totalElements;
                state.totalPages = action.payload.totalPages;
                state.lastPage = action.payload.lastPage;
                state.loading = false;
            })
            .addCase(fetchSyllabusData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteSyllabusById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSyllabusById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteSyllabusById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCurrentPage, setPageSize } = viewSyllabusSlice.actions;

export default viewSyllabusSlice.reducer;
