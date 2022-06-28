import Swal from 'sweetalert2';

import { DonutChart } from 'vue-morris';
import { BarChart } from 'vue-morris';
import { LineChart } from 'vue-morris';


import moment from 'moment';

export default {
    name: 'AddUser',
    created() {
        //this.GetInfo();
        this.GetMunicipalitiesAllName();
        this.CheckLoginStatus();

        //this.GetDiseases();
    },
    components: {
        DonutChart, BarChart, LineChart
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

            Diseases: [],
            DiseaseId: '',

            donutData3: [
                { year: "01-02-2022", a: 30, b: 5 },
                { year: "02-02-2022", a: 25, b: 15 },
                { year: "03-02-2022", a: 29, b: 25 },
                { year: "04-02-2022", a: 50, b: 20 },
            ],


            Type:'',


            loginDetails: null,

            MunicipalitieId: '',
            Municipalitie: [],

            ByHospital: [],
            ByAge: [],
            byNat: [],
            byVaccivations: [],
            byGender: [],

            pageNo: 1,
            pageSize: 10,
            pages: 0,
            state: 0,
            Info: [],
            LineChartsInfo: [],

            date1:'',
            date2:'',

            Hospitals: [],
            HospitalId: '',


            ViewDilog: false,
            ViewRequestDilog: false,
            SelectedItem: '',


            ruleForm: {
                FormsDailyId: '',
                DiseaseId: '',
                Desriptions: '',
                Count: null,
                CountNow: '',
            },
            rules: {
                //Name: [
                //    { required: true, message: 'الرجاء إدخال إسم المدينة', trigger: 'blur' },
                //    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                //    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                //],
            },

        };
    },
    methods: {

        GetDiseases() {
            this.$blockUI.Start();
            this.$http.GetDiseasesName(this.Type)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Diseases = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },

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

        convertDate(date) {
            if (date === null) {
                return "null";
            }
            return moment(date).format('YYYY-MM-DDThh:mm:ss.SSS');
            //return moment(date).format('MMMM Do YYYY');
        },

        convertDateOnly(date) {
            if (date === null) {
                return "null";
            }
            return moment(date).format('YYYY-MM-DD');
            //return moment(date).format('MMMM Do YYYY');
        },

        Search() {
            //debugger
            let x=this.convertDate(this.date1);
            let y = this.convertDate(this.date2);
            this.$blockUI.Start();
            this.$http.SearchByDateCharts(this.MunicipalitieId,this.HospitalId, x, y, this.DiseaseId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Info = response.data.info;
                    this.LineChartsInfo = response.data.lineChartsInfo;


                    this.ByHospital = response.data.byHospital;
                    this.ByAge = response.data.byAge;
                    this.byNat = response.data.byNat;
                    this.byVaccivations = response.data.byVaccivations;
                    this.byGender = response.data.byGender;


                    //this.LineChartsInfo = this.LineChartsInfo.forEach(element => element.dayInfo = this.convertDateOnly(element.dayInfo));


                    this.LineChartsInfo.forEach((element) => {
                        element.dayInfo = this.convertDateOnly(element.dayInfo);
                    });



                })
                .catch(() => {
                    this.$blockUI.Stop();
                });
        },

        ExportExel() {
            let x = this.convertDate(this.date1);
            let y = this.convertDate(this.date2);
            this.$blockUI.Start();
            this.$http.ExportToExcel(this.HospitalId, x, y)
                .then(response => {
                    window.open(
                        response.data,
                        '_blank'
                    );
                    this.$blockUI.Stop();
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
            this.$http.GetDailyForm(this.pageNo, this.pageSize, this.HospitalId)
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

        EditItem(item) {
            this.SelectedItem = item;
            this.state = 1;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddItem(formName);
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

        AddRequest(item) {
            this.ruleForm.CountNow = item.countCases;
            this.ruleForm.FormsDailyId = item.id;
            this.ruleForm.DiseaseId = item.diseaseId;
            this.ViewRequestDilog = true;
            this.SelectedItem = item;
        },

        AddItem(formName) {

            this.$blockUI.Start();
            this.$http.AddRequest(this.ruleForm)
                .then(response => {

                    this.$blockUI.Stop();
                    this.resetForm(formName);
                    this.ViewRequestDilog = false;
                    Swal.fire({
                        icon: 'success',
                        title: '..نجـاح العملية',
                        // text: '<strong>Something went wrong!</strong>',
                        html:
                            response.data,
                        // showCloseButton: true,
                        showCancelButton: false,
                        //confirmButtonText: `حـفظ`,
                        //denyButtonText: `مواق`,
                    }).then(() => {
                        this.ViewRequestDilog = false;
                    });
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    this.$notify({
                        title: 'خطأ بعملية الاضافة',
                        dangerouslyUseHTMLString: true,
                        type: 'error',
                        message: err.response.data
                    });
                });
        },


    }
}
