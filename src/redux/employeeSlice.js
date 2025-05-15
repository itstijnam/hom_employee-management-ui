import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        adminCount: 0,
        employeeCount: 0,
        salaryCount: 0,
        employee: [],
        categories: [],
        selectedEmployee: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.userInfo = action.payload
        },
        incrementAdminCount: (state) => {
            state.adminCount += 1;
        },
        decrementAdminCount: (state) => {
            state.adminCount -= 1;
        },
        incrementEmployeeCount: (state) => {
            state.employeeCount += 1;
        },
        decrementEmployeeCount: (state) => {
            state.employeeCount -= 1;
        },
        incrementSalaryCount: (state, action) => {
            state.salaryCount += action.payload;
        },
        decrementSalaryCount: (state, action) => {
            state.salaryCount -= action.payload;
        },

        setEmployee: (state, action) => {
            state.employee = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setSelectedEmployee: (state, action) => {
            state.selectedEmployee = action.payload
        }
    }
});

export const {
    setAuthUser,
    setEmployee,
    setSelectedEmployee,
    incrementAdminCount,
    decrementAdminCount,
    incrementEmployeeCount,
    decrementEmployeeCount,
    incrementSalaryCount,
    decrementSalaryCount,
    setCategories
} = employeeSlice.actions;

export default employeeSlice.reducer;