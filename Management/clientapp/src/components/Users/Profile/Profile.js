import moment from 'moment';
import Swal from 'sweetalert2'
export default {
    created() {
        this.loginDetails = localStorage.getItem('currentUser-client');
        if (this.loginDetails != "null" && this.loginDetails != null && this.loginDetails != "" && this.loginDetails != "[object Object]")
        {
            this.loginDetails = JSON.parse(this.loginDetails);
            this.ruleForm.Name = this.loginDetails.name;
            this.ruleForm.LoginName = this.loginDetails.loginName;
            this.ruleForm.Phone = this.loginDetails.phone;
            this.ruleForm.Email = this.loginDetails.email;
        } else {
            window.location.href = "/Login";
        }
     
    },
    data() {  
       
        return {

            loginDetails: null,
            photo: [],

            ruleForm: {
                Name: '',
                LoginName: '',
                Email: '',
                Phone: '',
            },
            rules: {
                Name: [
                    { required: true, message: 'الرجاء إدخال الاسم', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                ],
                LoginName: [
                    { required: true, message: 'الرجاء إدخال اسم الدخول', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                ],
                BranchId: [
                    { required: true, message: 'الرجاء إختيار الفرع', trigger: 'blur' },
                ],
                Phone: [
                    { required: true, message: 'الرجاء إدخال رقم الهاتف', trigger: 'blur' },
                    { min: 9, max: 13, message: "يجب ان يكون طول رقم الهاتف 9 ارقام علي الاقل", trigger: "blur", },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],
                Email: [
                    { required: true, message: 'الرجاء ادخال البريد الالكتروني', trigger: 'blur' },
                    { min: 3, max: 50, message: 'الرجاء كتابة البريد الالكتروني بشكل صحيح', trigger: 'blur' },
                    { required: true, pattern: /\S+@\S+\.\S+/, message: 'الرجاء إدخال البريد بطريقة الصحيحه', trigger: 'blur' } 
                ], 

            },
        }
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

    methods: {

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.EditInfo();
                } else {
                    this.showMessage('warning', 'عملية غير ناجحة ', 'الرجاء التحقق من ادخال جميع البيانات');

                }
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        EditInfo() {
            this.$blockUI.Start();
            this.$http.EditUsersProfile(this.ruleForm)
                .then(response => {
                    this.$blockUI.Stop();
                    this.loginDetails.email = this.ruleForm.Email;
                    this.loginDetails.phone = this.ruleForm.Phone;
                    this.loginDetails.loginName = this.ruleForm.LoginName;
                    this.loginDetails.name = this.ruleForm.Name;
                    localStorage.setItem('currentUser-admin', JSON.stringify(this.loginDetails));
                    this.showMessage('success', '..نجـاح العملية', response.data);
                })
                .catch((err) => {
                    this.EditDialog = false;
                    this.$blockUI.Stop();
                    this.showMessage('error', 'خطاء بالعملية', err.response.data);

                });
        },

        FileChanged(e) {
            var files = e.target.files;

            if (files.length <= 0) {
                return;
            }

            if (files[0].type !== 'image/jpeg' && files[0].type !== 'image/png') {
                this.$message({
                    type: 'error',
                    message: 'عفوا يجب انت تكون الصورة من نوع JPG ,PNG'
                });
                this.photo = null;
                return;
            }

            var $this = this;

            var reader = new FileReader();
            reader.onload = function () {
                $this.photo = reader.result;
                $this.UploadImage();
            };
            reader.onerror = function () {
                $this.photo = null;
            };
            reader.readAsDataURL(files[0]);
        },

        UploadImage() {
           
            this.$blockUI.Start();
            var obj = {
                Photo: this.photo,
                Id: this.loginDetails.id
            };
            this.$http.UploadImage(obj)
                .then(response => {
                    this.$blockUI.Stop();
                    this.$message({
                        type: 'info',
                        message: response.data
                    });

                    setTimeout(() =>
                        window.location.href = '/'
                        , 500);

                })
                .catch((err) => {
                    this.$blockUI.Stop(err);
                    this.pages = 0;
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
