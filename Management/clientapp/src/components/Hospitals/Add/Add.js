import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'Add',
    created() {
        this.GetMunicipalitiesAllName();
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

            MunicipalitieId: '',
            Municipalitie: [],

            ruleForm: {
                Name: '',
                MunicipalitieId: '',
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

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddCity(formName);
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
      
        AddCity(formName) {
           
            this.$blockUI.Start();
            this.$http.AddHospitals(this.ruleForm)
                .then(response => {
                    this.resetForm(formName);
                    this.$blockUI.Stop();
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
                        title: 'خطأ بعملية الاضافة',
                        dangerouslyUseHTMLString: true,
                        type: 'error',
                        message: err.response.data
                    });
                });
        }


        

    }
}
