export const baseUrl = process.env.REACT_APP_BASE_URL;

export const refreshAccessTokenUrl = `${baseUrl}auth/refresh-token`;

export const countryUrl = `${baseUrl}countries`;

export const uploadImageUrl = `${baseUrl}/Users/UploadImage`;

export const searchFilterPayments = `${baseUrl}/Payment/search-filter-payment`;

export const createPayment = `${baseUrl}/Payment/create-payment`;

export const getAllEvaluation = `${baseUrl}/Evaluations/get-all-evaluation-by-classId`;

export const getDetailEvaluation = `${baseUrl}/Evaluations/get-detail-evaluation`;

export const addEvaluation = `${baseUrl}/Evaluations/add-evaluation`;

//Test ccommit

export const todoListUrl = `https://jsonplaceholder.typicode.com/todos`;

export const todoWithPagination = `https://dummyjson.com/todos`;

export const employeeDummyUrl = `https://jsonplaceholder.typicode.com/todos`;

export const orderRequestUrl = `${baseUrl}order-requests`;

export const subjectUrl = `${baseUrl}api/Subject/get-subjects`;

export const loginUrl = `${baseUrl}api/Account/login`;

export const resetPassUrl = `${baseUrl}api/Account/reset-password`;

export const registerTutorUl = `${baseUrl}api/Account/register-tutor`;

export const profileUrl = `${baseUrl}api/Person/get-profile`;

export const updateSubjectUrl = `${baseUrl}api/Subject/update-subject`;

export const deleteSubjectUrl = `${baseUrl}api/Subject/delete-subject`;

export const createSubjectUrl = `${baseUrl}api/Subject/add-subject`;
