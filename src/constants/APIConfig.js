export const baseUrl = process.env.REACT_APP_BASE_URL;

export const refreshAccessTokenUrl = `${baseUrl}auth/refresh-token`;

export const countryUrl = `${baseUrl}countries`;

export const uploadImageUrl = `${baseUrl}/Users/UploadImage`;

export const searchFilterPaymentsUrl = `${baseUrl}api/Payment/search-filter-payment`;

export const createPaymentUrl = `${baseUrl}api/Payment/create-payment`;

export const getAllEvaluationUrl = `${baseUrl}api/Evaluations/get-all-evaluation-by-classId-no-paging`;

export const parentEvaluationUrl = `${baseUrl}api/Evaluations/get-evaluation-for-parent-no-paging`;

export const getDetailEvaluationUrl = `${baseUrl}api/Evaluations/get-detail-evaluation`;

export const addEvaluation = `${baseUrl}api/Evaluations/add-evaluation`;

//Test ccommit

export const todoListUrl = `https://jsonplaceholder.typicode.com/todos`;

export const todoWithPagination = `https://dummyjson.com/todos`;

export const employeeDummyUrl = `https://jsonplaceholder.typicode.com/todos`;

export const orderRequestUrl = `${baseUrl}order-requests`;

export const subjectUrl = `${baseUrl}api/Subject/get-subjects`;

export const loginUrl = `${baseUrl}api/Account/login`;

export const resetPassUrl = `${baseUrl}api/Account/reset-password`;

export const registerTutorUl = `${baseUrl}api/Account/register-tutor`;

export const registerParentUrl = `${baseUrl}api/Account/register-parent`;

export const profileUrl = `${baseUrl}api/Person/get-profile`;

export const updateSubjectUrl = `${baseUrl}api/Subject/update-subject`;

export const deleteSubjectUrl = `${baseUrl}api/Subject/delete-subject`;

export const createSubjectUrl = `${baseUrl}api/Subject/add-subject`;

export const getClassUrl = `${baseUrl}api/Class/get-classes`;

export const getTutorClassUrl = `${baseUrl}api/Class/get-class-for-tutor`;

export const getParentClassUrl = `${baseUrl}api/Class/get-class-for-parent`;

export const getClassDetailUrl = `${baseUrl}api/Class/get-class-details`;

export const getStudentsClassUrl = `${baseUrl}api/Class/get-students-in-class`;

export const addStudentIntoClassUrl = `${baseUrl}api/Class/add-students-in-class`;

export const deleteStudentUrl = `${baseUrl}api/Class/delete-student-in-class`;

export const createClassStudentUrl = `${baseUrl}api/Class/add-class`;

export const updateClassStudentUrl = `${baseUrl}api/Class/update-class`;

export const scheduleUrl = `${baseUrl}api/Schedule/get-schedule-for-current-user-and-class-id`;

export const requestForTutorUrl = `${baseUrl}api/Request/get-requests-for-tutor`;

export const requestByIdUrl = `${baseUrl}api/Request/get-request-by-id`;

export const addStudentUrl = `${baseUrl}api/Student/add-student`;

export const updateStudentUrl = `${baseUrl}api/Student/update-student`;

export const deleteStudentInParentUrl = `${baseUrl}api/Student/delete-student`;

export const deleteClassroomForTutorUrl = `${baseUrl}api/Class/suspend-class`;

export const declineRequestUrl = `${baseUrl}api/Request/decline-request`;

export const acceptRequestUrl = `${baseUrl}api/Request/accept-request`;

export const requestForParentUrl = `${baseUrl}api/Request/get-requests-for-parent`;

export const cancelRequestUrl = `${baseUrl}api/Request/cancel-request`;

export const createOrderRequestUrl = `${baseUrl}api/Request/add-request`;

export const addSubjectTutorUrl = `${baseUrl}api/SubjectTutor/add-subject-tutor`;

export const deleteSubjectTutorUrl = `${baseUrl}api/SubjectTutor/delete-subject-tutor`;

export const filteredScheduleUrl = `${baseUrl}api/Schedule/get-filter-schedule`;

export const exploreTutorUrl = `${baseUrl}api/Tutor/get-tutors`;

export const getAllStaffUrl = `${baseUrl}api/Person/get-staffs`;

export const registerStaffUrl = `${baseUrl}api/Account/register-staff`;

export const getAccountsUrl = `${baseUrl}api/Person/get-accounts`;

export const deleteSTaffUrl = `${baseUrl}api/Person/delete-staff`;

export const editProfileUrl = `${baseUrl}api/Person/edit-profile`;

export const changePasswordUrl = `${baseUrl}api/Account/change-password`;

export const getPaymentDetailUrl = `${baseUrl}api/Payment/get-payment-by-id`;

export const updatePaymentUrl = `${baseUrl}api/Payment/update-payment`;

export const updatePaymentDescUrl = `${baseUrl}api/Payment/update-payment-description`;

export const suspendAccountUrl = `${baseUrl}api/Account/suspend-account`;

export const getAttendStudentsUrl = `${baseUrl}api/Attendent/get-attend-students`;

export const updateAttendStudentsUrl = `${baseUrl}api/Attendent/update-attend-students`;

export const getSubjectTutorUrl = `${baseUrl}api/Subject/get-subjects-tutor`;

export const getParentClassDetailUrl = `${baseUrl}api/Class/get-parent-class-details`;
