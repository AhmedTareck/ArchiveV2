import Swal from 'sweetalert2'
import Add from './Add/Add.vue';
import moment from 'moment';

export default {
    name: 'AddUser',
    created() {
        this.GetInfo();
        
    },
    components: {
        'Add': Add,
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
            pageNo: 1,
            pageSize: 10, 
            pages: 0,
            state: 0,
            Info: [],
            

            EditDialog: false,
            SelectedItem: '',


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



        Add() {
            this.state = 1;
        },
        


        GetInfo(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.GetAttach(this.pageNo, this.pageSize)
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
                    this.$http.deleteAttach(id)
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
                                this.GetInfo(this.pageNo);
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
            this.$http.EditBranches(this.ruleForm)
                .then(response => {
                    this.resetForm(formName);
                    this.$blockUI.Stop();
                    this.EditDialog = false;
                    this.GetInfo(this.pageNo);
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
