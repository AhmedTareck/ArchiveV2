import Swal from 'sweetalert2'
import moment from 'moment';
//import Edit from './Edit/Edit.vue';
import Schlamania from './Schlamania/Schlamania.vue';
import SchlamaniaInfo from './Schlamania/Info/Info.vue';


import Malary from './Malary/Malary.vue';
import MalaryInfo from './Malary/Info/Info.vue';

import Ebola from './Ebola/Ebola.vue';
import EbolaInfo from './Ebola/Info/Info.vue';

import Immediate from './Immediate/Immediate.vue';
import ImmediateInfo from './Immediate/Info/Info.vue';
import hepatitis from './hepatitis/Info/Info.vue';
export default {
    name: 'AddUser',
    created() {
        this.GetInfo();
        //this.GetHospitalsName();
        this.CheckLoginStatus();
        this.GetMunicipalitiesAllName();
    },
    components: {
        'Schlamania': Schlamania,
        'SchlamaniaInfo': SchlamaniaInfo,
        'hepatities': hepatitis,
        'Malary': Malary,
        'MalaryInfo': MalaryInfo,

        'Ebola': Ebola,
        'EbolaInfo': EbolaInfo,

        'Immediate': Immediate,
        'ImmediateInfo': ImmediateInfo,
    },
    filters: {
        moment: function (date) {
            if (date === null) {
                return "فارغ";
            }
            // return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            return moment(date).format('MMMM Do YYYY');
        }
    },
    data() {
        return {

            MunicipalitieId: '',
            Municipalitie: [],

            loginDetails: null,
            pageNo: 1,
            pageSize: 10, 
            pages: 0,
            state: 0,
            Info: [],

            Hospitals: [],
            HospitalId:'',
            

            ViewDilog: false,
            SelectedItem: '',

            SelectSchlamania: '',
            SelectMalary: '',


            ruleForm: {
                Id:'',
                Name: '',
            },
            rules: {
                Name: [
                    { required: true, message: 'الرجاء إدخال إسم المدينة', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                ],
            },
            
        };
    },
    methods: {

        GetMunicipalitiesAllName() {
            this.$blockUI.Start();
            this.$http.GetMunicipalitiesAllName()
                .then(response => {
                    this.$blockUI.Stop();
                    this.Municipalitie = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },

        CheckLoginStatus() {
            try {
                this.loginDetails = JSON.parse(localStorage.getItem('currentUser-client'));
                if (this.loginDetails == null) {
                    window.location.href = '/Login';
                }
            } catch (error) {
                window.location.href = '/Login';
            }
        },

        GetHospitalsName() {
            this.HospitalId = '';
            this.$blockUI.Start();
            this.$http.GetHospitalsAllName(this.MunicipalitieId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Hospitals = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },

        GetInfo(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.GetRequest(this.pageNo, this.pageSize, this.HospitalId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Info = response.data.info;
                    this.pages = response.data.count;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                    this.pages = 0;
                });

        },

        deleteItem(id) {
            Swal.fire({
                title: 'هـل انت متأكد من عملية الحذف ؟',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `تأكيد العملية`,
                denyButtonText: `الغاء العملية`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$blockUI.Start();
                    this.$http.DeleteDailyForm(id)
                        .then(response => {
                            this.$blockUI.Stop();
                            this.FormPorgress = 100;
                            Swal.fire({
                                icon: 'success',
                                title: '..نجـاح العملية',
                                html:
                                    response.data,
                                showCancelButton: true,
                                //confirmButtonText: `حـفظ`,
                                denyButtonText: `خروج`,
                            }).then(() => {
                                this.$blockUI.Stop();
                                this.GetInfo();
                            });


                        })
                        .catch((err) => {
                            this.$blockUI.Stop();
                            this.$notify({
                                title: 'خطأ بعملية الحذف',
                                dangerouslyUseHTMLString: true,
                                type: 'error',
                                message: err.response.data
                            });
                        });
                    return;
                }
            })
        },

        

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.EditCity(formName);
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        ViewItem(item) {
            this.ViewDilog = true;
            this.SelectedItem = item;
        },



        //Add(item) {
        //    this.SelectedItem = item;
        //    this.state = 1;
        //},






        AddSchalmania(item) {
            this.SelectedItem = item;
            this.state = 1;
        },

        ViewShalamina(item) {
            this.SelectSchlamania = item;
            this.state = 2;
        },



        
        AddMalary(item) {
            this.SelectedItem = item;
            this.state = 3;
        },

        viewMalaryForm(item) {
            this.SelectMalary = item;
            this.state = 4;
        },


        AddEbola(item) {
            this.SelectedItem = item;
            this.state = 5;
        },

        viewEbolaForm(item) {
            this.SelectedItem = item;
            this.state = 6;
        },


        AddImmediate(item) {
            this.SelectedItem = item;
            this.state = 7;
        },

        viewImmediate(item) {
            this.SelectedItem = item;
            this.state = 8;
        },
        viewHepatities(item) {
            this.SelectedItem = item;
            this.state = 9;
        },


        

    }
}
