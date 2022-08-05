// input employee details
export interface typeInput {
    empName: String,
    empAddress: String
}

// response employee details type
export interface typeEmpResponse {
    empId: String,
    empName: String,
    empAddress: String,
    createdAt: String,
    completed: Boolean
}