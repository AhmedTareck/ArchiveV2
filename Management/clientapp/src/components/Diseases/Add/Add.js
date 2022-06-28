import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'Add',
    created() {
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

            ruleForm: {
                Name: '',
                EngilshName: '',
                Descriptions: '',
                Type: '',
            },
            rules: {
                Name: [
                    { required: true, message: 'الرجاء إدخال إسم المرض', trigger: 'blur' },
                ],

                EngilshName: [
                    { required: true, message: 'الرجاء إدخال إسم المرض', trigger: 'blur' },
                ],

                Type: [
                    { required: true, message: 'الرجاء إختيار القسم', trigger: 'blur' },
                ],
            },
            
        };
    },
    methods: {

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
            this.$http.AddDiseases(this.ruleForm)
                .then(response => {
                    this.resetForm(formName);
                    this.ruleForm.Descriptions = '';
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
