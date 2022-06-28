import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'AddUser',
    created() {
        this.GetInfo();
        this.GetMunicipalitiesAllName();
        this.CheckLoginStatus();
    },
    components: {
       
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
            loginDetails: null,

            MunicipalitieId: '',
            Municipalitie: [],
            pageNo: 1,
            pageSize: 10,
            pages: 0,
            state: 0,
            Info: [],

            EditDialog: false,
            SelectedItem: '',


            ruleForm: {
                Name: '',
                EngilshName: '',
            },
            rules: {
                Name: [
                    { required: true, message: 'الرجاء إدخال إسم المستشفي', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                ],

                EngilshName: [
                    { required: true, message: 'الرجاء إدخال إسم المستشفي', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                    { required: true, pattern: /^[a-zA-Z ]+$/, message: 'الرجاء إدخال حروف انجليزية فقط', trigger: 'blur' }
                ],
            },
            
        };
    },
    methods: {


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
      


        GetInfo(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.GetHospitals(this.pageNo, this.pageSize, this.MunicipalitieId)
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
                    this.$http.deleteHospitals(id)
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
            //this.SelectedItem = item;
            this.ruleForm.Id = item.id;
            this.ruleForm.Name = item.name;
            this.ruleForm.EngilshName = item.engilshName;
            this.EditDialog = true;
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

        EditCity(formName) {

            this.$blockUI.Start();
            this.$http.EditHospitals(this.ruleForm)
                .then(response => {
                    this.resetForm(formName);
                    this.$blockUI.Stop();
                    this.EditDialog = false;
                    this.GetInfo();
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

                    });
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    this.$notify({
                        title: 'خطأ بالعملية ',
                        dangerouslyUseHTMLString: true,
                        type: 'error',
                        message: err.response.data
                    });
                });
        }

        

    }
}
