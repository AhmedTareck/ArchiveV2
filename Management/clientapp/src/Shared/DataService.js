import axios from 'axios';

axios.defaults.headers.common['X-CSRF-TOKEN'] = document.cookie.split("=")[1];

//const baseUrl = 'http://localhost:4810/Api';

export default {

    IsLoggedin() {
        return axios.get(`/Security/IsLoggedin`);
    },
    loginUser(OBJ) {
        return axios.post(`/Security/loginUser`, OBJ);
    },
    Logout() {
        return axios.post(`/Security/Logout`);
    },

    //users
    GetUserInfo(pageNo, pageSize, UserType) {
        return axios.get(`/api/User/Get?pageNo=${pageNo}&pagesize=${pageSize}&UserType=${UserType}`);
    },

    GetUsersName() {
        return axios.get(`/api/User/GetAll`);
    },

    AddUser(bodyObject) {
        return axios.post('/api/User/Add', bodyObject);
    },

    EditUser(bodyObject) {
        return axios.post('/api/User/Edit', bodyObject);
    },

    DeactivateUser(id) {
        return axios.post(`/api/User/${id}/Deactivate`);
    },

    ActivateUser(id) {
        return axios.post(`/api/User/${id}/Active`);
    },

    DelteUser(id) {
        return axios.post(`/api/User/${id}/Delete`);
    },

    UploadImage(bodyObject) {
        return axios.post('/api/User/UploadImage', bodyObject);
    },

    EditUsersProfile(bodyObject) {
        return axios.post('/api/User/EditProfile', bodyObject);
    },

    ChangePassword(bodyObject) {
        return axios.post(`/api/User/ChangePassword`, bodyObject);
    },



    // **********************************    Hospital ***********************
    GetAllBranches() {
        return axios.get(`/api/Branches/GetNames`);
    },


    
   

    // **********************************    Applications ***********************

    AddApplications(bodyObject) {
        return axios.post(`/Api/Admin/Applications/Add`, bodyObject);
    },

    EditApplications(bodyObject) {
        return axios.post(`/Api/Admin/Applications/Edit`, bodyObject);
    },

    GetApplications(pageNo, pageSize, SelectedHospitalsId) {
        return axios.get(`/Api/Admin/Applications/Get?pageno=${pageNo}&pagesize=${pageSize}&selectedHospitalsId=${SelectedHospitalsId}`);
    },

    deleteApp(id) {
        return axios.post(`/Api/Admin/Applications/${id}/delete`);
    },

    GetBranchesName(id) {
        return axios.get(`/Api/Admin/Applications/GetBranchesNames?cityId=${id}`);
    },

    GetBranchesAllName() {
        return axios.get(`/Api/Admin/Applications/GetAllBranchesNames`);
    },

    

    // **********************************    Hospitals ***********************

    GetHospitalsAllName(MunicipalitieId) {
        return axios.get(`/Api/Admin/Hospitals/GetAllHospitalsNames?MunicipalitieId=${MunicipalitieId}`);
    },

    AddHospitals(bodyObject) {
        return axios.post(`/Api/Admin/Hospitals/Add`, bodyObject);
    },

    GetHospitals(pageNo, pageSize, MunicipalitieId) {
        return axios.get(`/Api/Admin/Hospitals/Get?pageno=${pageNo}&pagesize=${pageSize}&MunicipalitieId=${MunicipalitieId}`);
    },

    EditHospitals(bodyObject) {
        return axios.post(`/Api/Admin/Hospitals/Edit`, bodyObject);
    },

    deleteHospitals(id) {
        return axios.post(`/Api/Admin/Hospitals/${id}/delete`);
    },


    // **********************************    Municipalities ***********************

    GetMunicipalitiesAllName() {
        return axios.get(`/Api/Admin/Municipalities/GetAll`);
    },

    AddMunicipalities(bodyObject) {
        return axios.post(`/Api/Admin/Municipalities/Add`, bodyObject);
    },

    GetMunicipalities(pageNo, pageSize) {
        return axios.get(`/Api/Admin/Municipalities/Get?pageno=${pageNo}&pagesize=${pageSize}`);
    },

    EditMunicipalities(bodyObject) {
        return axios.post(`/Api/Admin/Municipalities/Edit`, bodyObject);
    },

    deleteMunicipalities(id) {
        return axios.post(`/Api/Admin/Municipalities/${id}/delete`);
    },

    // **********************************    Attachemnts ***********************

    AddAttachmentsFile(bodyObject) {
        return axios.post(`/api/Attach/Add`, bodyObject);
    },

    GetAttach(pageNo, pageSize) {
        return axios.get(`/api/Attach/Get?pageno=${pageNo}&pagesize=${pageSize}`);
    },

    deleteAttach(id) {
        return axios.post(`/api/Attach/${id}/delete`);
    },


    //GetHospitalsAllName(MunicipalitieId) {
    //    return axios.get(`/Api/Admin/Hospitals/GetAllHospitalsNames?MunicipalitieId=${MunicipalitieId}`);
    //},

    

    

    //EditHospitals(bodyObject) {
    //    return axios.post(`/Api/Admin/Hospitals/Edit`, bodyObject);
    //},

    



    // **********************************    Diseases ***********************
    GetDiseasesName(Type) {
        return axios.get(`/Api/Diseases/GetAll?Type=${Type}`);
    },

    GetDiseases(pageNo, pageSize, Type) {
        return axios.get(`/Api/Diseases/Get?pageno=${pageNo}&pagesize=${pageSize}&Type=${Type}`);
    },

    AddDiseases(bodyObject) {
        return axios.post(`/Api/Diseases/Add`, bodyObject);
    },

    EditDiseases(bodyObject) {
        return axios.post(`/Api/Diseases/Edit`, bodyObject);
    },

    DeleteDiseases(id) {
        return axios.post(`/Api/Diseases/${id}/Delete`);
    },

    ChangeStatusDiseases(id) {
        return axios.post(`/Api/Diseases/${id}/ChangeStatus`);
    },



    // **********************************    FormsDaily ***********************
    AddDailyForm(bodyObject) {
        return axios.post(`/Api/Forms/AddDailyForm`, bodyObject);
    },

    GetDailyForm(pageNo, pageSize, HospitalId) {
        return axios.get(`/Api/Forms/GetDailyForm?pageno=${pageNo}&pagesize=${pageSize}&HospitalId=${HospitalId}`);
    },

    DeleteDailyForm(Id) {
        return axios.post(`/Api/Forms/${Id}/DeleteDailyForm`);
    },

    AddImmediateForm(bodyObject) {
        return axios.post(`/Api/Forms/AddImmediateForm`, bodyObject);
    },

    GetImmediateForm(pageNo, pageSize, HospitalId) {
        return axios.get(`/Api/Forms/GetImmediateForm?pageno=${pageNo}&pagesize=${pageSize}&HospitalId=${HospitalId}`);
    },

    GetImmediateFormById(Id) {
        return axios.get(`/Api/Forms/GetImmediateFormById?id=${Id}`);
    },

    AddRequest(bodyObject) {
        return axios.post(`/Api/Forms/AddRequest`, bodyObject);
    },

    GetRequest(pageNo, pageSize, HospitalId) {
        return axios.get(`/Api/Forms/GetRequest?pageno=${pageNo}&pagesize=${pageSize}&HospitalId=${HospitalId}`);
    },

    FillSchlamaniaRequest(bodyObject) {
        return axios.post(`/Api/Forms/FillSchlamaniaRequest`, bodyObject);
    },

    FillMalaryaRequest(bodyObject) {
        return axios.post(`/Api/Forms/FillMalaryaRequest`, bodyObject);
    },

    FillEbolaForm(bodyObject) {
        return axios.post(`/Api/Forms/FillEbolaForm`, bodyObject);
    },

    GetRequestFormsById(id) {
        return axios.get(`/Api/Forms/GetRequestFormsById?id=${id}`);
    },

    GetMalaryFormsById(id) {
        return axios.get(`/Api/Forms/GetMalaryFormsById?id=${id}`);
    },

    GetEbolaFormsById(id) {
        return axios.get(`/Api/Forms/GetEbolaFormsById?id=${id}`);
    },

    SearchByDate(MunicipalitieId,HospitalId, x, y) {
        return axios.get(`/Api/Forms/SearchByDate?MunicipalitieId=${MunicipalitieId}&HospitalId=${HospitalId}&date1=${x}&date2=${y}`);
    },

    SearchByDateCharts(MunicipalitieId,HospitalId, x, y, DiseaseId) {
        return axios.get(`/Api/Forms/SearchByDateCharts?MunicipalitieId=${MunicipalitieId}&HospitalId=${HospitalId}&date1=${x}&date2=${y}&DiseaseId=${DiseaseId}`);
    },

    GetDashboardInfo() {
        return axios.get(`/Api/Forms/GetDashboardInfo`);
    },




    ExportToExcel(MunicipalitieId,HospitalId, x, y) {
        return axios.get(`/Api/Forms/ExportToExcel?MunicipalitieId=${MunicipalitieId}&HospitalId=${HospitalId}&date1=${x}&date2=${y}`);
    },
    

    // **********************************    GetDevicesName ***********************

    GetDevicesNames() {
        return axios.get(`/Api/Admin/Devices/GetDevicesName`);
    },

    GetDevicesbyCompany(id) {
        return axios.get(`/Api/Admin/Devices/GetDevicesbyCompany?id=${id}`);
    },

    GetFilterNames(id) {
        return axios.get(`/Api/Admin/Devices/GetFilterName?id=${id}`);
    },

    GetAllFilterNames() {
        return axios.get(`/Api/Admin/Devices/GetAllNames`);
    },

    //AddHospitals(bodyObject) {
    //    return axios.post(`/Api/Admin/Devices/Add`, bodyObject);
    //},

    //GetHospitals(pageNo, pageSize, SelectedCityId) {
    //    return axios.get(`/Api/Admin/Devices/GetBranches?pageno=${pageNo}&pagesize=${pageSize}&selectedCityId=${SelectedCityId}`);
    //},

    //EditHospitals(bodyObject) {
    //    return axios.post(`/Api/Admin/Devices/EditBranches`, bodyObject);
    //},

    //deleteHospitals(id) {
    //    return axios.post(`/Api/Admin/Devices/${id}/deleteBranches`);
    //},



}