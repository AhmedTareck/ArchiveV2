import moment from 'moment';
import Swal from 'sweetalert2'
export default {
    name: 'EditUsersProfile',    
    created() {
        this.loginDetails = localStorage.getItem('currentUser-client');
        if (this.loginDetails != "null" && this.loginDetails != null && this.loginDetails != "" && this.loginDetails != "[object Object]")
        {
            this.loginDetails = JSON.parse(this.loginDetails);
            this.ruleForm.LoginName = this.loginDetails.loginName;
            this.ruleForm.FullName = this.loginDetails.fullName;
            //this.form.UserType = this.loginDetails.userType;
            this.ruleForm.Email = this.loginDetails.email;
            this.ruleForm.Gender = this.loginDetails.gender;
            this.ruleForm.Phone = this.loginDetails.phone;
            this.ruleForm.DateOfBirth = this.loginDetails.dateOfBirth;
        } else {
            window.location.href = "/Login";
        }
     
    },
    data() {  
       
        return {


            ruleForm: {
                FullName: '',
                LoginName: '',
                Email: '',

                Gender: '',
                DateOfBirth: '',

                Phone: '',

                CreatedOn: '',
            },
            rules: {
                FullName: [
                    { required: true, message: 'الرجاء ادخال الاسم', trigger: 'blur' },
                    { min: 3, max: 50, message: 'الرجاء كتابة اسم صحيح', trigger: 'blur' },
                    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                ],

                LoginName: [
                    { required: true, message: 'الرجاء ادخال الاسم', trigger: 'blur' },
                    { min: 3, max: 50, message: 'الرجاء كتابة اسم صحيح', trigger: 'blur' },
                    { required: true, pattern: /^[a-zA-Z ]+$/, message: 'الرجاء إدخال حروف انجليزية فقط', trigger: 'blur' }
                ],

                Email: [
                    { required: true, message: 'الرجاء ادخال البريد الالكتروني', trigger: 'blur' },
                    { min: 3, max: 50, message: 'الرجاء كتابة البريد الالكتروني بشكل صحيح', trigger: 'blur' },
                    { required: true, pattern: /\S+@\S+\.\S+/, message: 'الرجاء إدخال البريد بطريقة الصحيحه', trigger: 'blur' } 
                ],

                Gender: [
                    { required: true, message: 'الرجاء اختيار الجنس', trigger: 'blur' },
                ],

                DateOfBirth: [
                    { required: true, message: 'الرجاء ادخال تاريخ الميلاد', trigger: 'blur' },
                ],

                Phone: [
                    { required: true, message: "الرجاء إدخال رقم الهاتف", trigger: "blur", },
                    { min: 9, max: 13, message: "يجب ان يكون طول رقم الهاتف 9 ارقام علي الاقل", trigger: "blur", },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],   

            },









            form: {
                LoginName: '',
                Password: '',
                FullName: '',
                UserType: '',
                Email: '',
                Gender: '',
                Phone:'',
                DateOfBirth: '',
                Status: 0,
                OfficeName: [],
                AllData: [],
                loginDetails: null,
                photo:[]

            }, 
            
            form2: {
                Phone: '',
                Email: '',
                LoginName: '',
                FullName: '',
                Gender: '',
                DateOfBirth: '',
                Status: 0,
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
                    this.EditUsersProfile(formName);
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        EditUsersProfile() {

            this.$blockUI.Start();
            this.$http.EditUsersProfile(this.ruleForm)
                .then(response => {
                    //this.resetForm(formName);
                    this.loginDetails.email = this.ruleForm.Email;
                    this.loginDetails.phone = this.ruleForm.Phone;
                    this.loginDetails.loginName = this.ruleForm.LoginName;
                    this.loginDetails.fullName = this.ruleForm.FullName;
                    this.loginDetails.gender = this.ruleForm.Gender;
                    this.loginDetails.dateOfBirth = this.ruleForm.DateOfBirth;
                    localStorage.setItem('currentUser-admin', JSON.stringify(this.loginDetails));
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
        },

















        validPhone: function (Phone) {

            var mobileRegex = /^09[1|2|3|4|5][0-9]{7}$/i;

            return mobileRegex.test(Phone);
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
                UserId: this.loginDetails.userId
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
        validEmail: function (email) {
            var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validLoginName: function (LoginName) {
            var login = /^[a-zA-Z]{0,40}$/;
            return login.test(LoginName);
        },
        //Save() {
        //    if (!this.form.LoginName) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الـرجاء إدخال اسم الدخول'
        //        });
        //        return;
        //    } else if (!this.validLoginName(this.form.LoginName)) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الرجاء إدخال اسم الدخول بطريقه صحيحه '
        //        });
        //        return;
        //    }
        //    if (!this.form.Email) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الرجاء إدخال البريد الإلكتروني '
        //        });
        //        return;
        //    } else if (!this.validEmail(this.form.Email)) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الرجاء إدخال البريد الإلكتروني بطريقه صحيحه '
        //        });
        //        return;
        //    }

        //    if (!this.form.Gender) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الرجاء إختيار الجنس '
        //        });
        //        return;
        //    }

        //    if (!this.form.DateOfBirth) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الرجاء إختيار تاريخ الميلاد '
        //        });
        //        return;
        //    }
        //    if (!this.form.Phone) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الرجاء رقم الهاتف '
        //        });
        //        return;
        //    } else if (!this.validPhone(this.form.Phone)) {
        //        this.$message({
        //            type: 'error',
        //            message: 'الرجاء إدخال رقم الهاتف  بطريقه صحيحه '
        //        });
        //        return;
        //    }

        //    this.form2.Phone = this.form.Phone
        //    this.form2.Email = this.form.Email;
        //    this.form2.LoginName = this.form.LoginName;
        //    this.form2.FullName = this.form.FullName;
        //    this.form2.Gender = this.form.Gender;
        //    this.form2.DateOfBirth = this.form.DateOfBirth;
       
        //    this.$http.EditUsersProfile(this.form2)
        //        .then(response => {
        //            this.loginDetails.email = this.form2.Email;
        //            this.loginDetails.phone = this.form2.Phone;
        //            this.loginDetails.loginName = this.form2.LoginName;
        //            this.loginDetails.fullName = this.form2.FullName;
        //            this.loginDetails.gender = this.form2.Gender;
        //            this.loginDetails.dateOfBirth = this.form2.DateOfBirth;
        //            localStorage.setItem('currentUser-admin', JSON.stringify(this.loginDetails));
        //            this.$message({
        //                type: 'info',
        //                message: response.data
        //            });
                  
        //        })
        //        .catch((err) => {
        //            this.$message({
        //                type: 'error',
        //                message: err.response.data
        //            });
        //        });
        //},

    }
}
