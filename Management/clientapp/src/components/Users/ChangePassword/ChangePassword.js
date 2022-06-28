import Swal from 'sweetalert2'
export default {
    created() {
    },
    data() {
        return {

            ruleForm: {
                Password: '',
                NewPassword: '',
                CPassword: '',
            },
            rules: {
                Password: [
                    { required: true, message: 'الرجاء إدخال كلمة المرور', trigger: 'blur' },
                    { min: 5, max: 25, message: 'يجب ان يكون الطول من 5 الي 25', trigger: 'blur' },
                ],
                NewPassword: [
                    { required: true, message: 'الرجاء إدخال تاكيد كلمة المرور', trigger: 'blur' },
                    { min: 5, max: 25, message: 'يجب ان يكون الطول من 5 الي 25', trigger: 'blur' },
                ],
                CPassword: [
                    { required: true, message: 'الرجاء إدخال تاكيد كلمة المرور', trigger: 'blur' },
                    { min: 5, max: 25, message: 'يجب ان يكون الطول من 5 الي 25', trigger: 'blur' },
                ],
            },

        };
    },
    methods: {

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddInfo(formName);
                } else {
                    this.showMessage('warning', 'عملية غير ناجحة ', 'الرجاء التحقق من ادخال جميع البيانات');

                }
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        AddInfo(formName) {

            if (this.ruleForm.NewPassword != this.ruleForm.CPassword) {
                this.showMessage('error', 'خطاء بالعملية', 'الرجاء التأكد من تطابق كلمة المرور');
                return;
            }

            this.$blockUI.Start();
            this.$http.ChangePassword(this.ruleForm)
                .then(response => {
                    this.resetForm(formName);
                    this.$blockUI.Stop();
                    this.showMessage('success', '..نجـاح العملية', response.data);
                    this.Back();
                })
                .catch((err) => {
                    this.$blockUI.Stop();
                    this.showMessage('error', 'خطاء بالعملية', err.response.data);

                });
        },

        showMessage(icon, title, html) {
            Swal.fire({
                icon: icon,
                title: title,
                html: html,
                showCancelButton: false,
            }).then(() => {

            });
        },

   
    }
}
