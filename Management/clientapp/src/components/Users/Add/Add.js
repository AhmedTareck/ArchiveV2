import Swal from 'sweetalert2'
export default {
    name: 'AddUser',
    created() {
        //this.GetBranches();
        this.GetMunicipalitiesAllName();
    },
    data() {
        return {
            MunicipalitieId: '',
            Municipalitie: [],
            Branches: [],

            Branch: [],
            ruleForm: {
                Name: '',
                LoginName: '',
                Email: '',
                Password: '',
                CPassword: '',
                BranchId: '',
                Phone: '',
                UserType: '',
                Status: 1,
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
                Email: [
                    { required: true, message: 'الرجاء إدخال البريد الالكتروني', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 50', trigger: 'blur' },
                    { required: true, pattern: /\S+@\S+\.\S+/, message: 'الرجاء إدخال البريد بطريقة الصحيحه', trigger: 'blur' }
                ],
                Password: [
                    { required: true, message: 'الرجاء إدخال كلمة المرور', trigger: 'blur' },
                    { min: 5, max: 25, message: 'يجب ان يكون الطول من 5 الي 25', trigger: 'blur' },
                ],
                CPassword: [
                    { required: true, message: 'الرجاء إدخال تاكيد كلمة المرور', trigger: 'blur' },
                    { min: 5, max: 25, message: 'يجب ان يكون الطول من 5 الي 25', trigger: 'blur' },
                ],
                BranchId: [
                    { required: true, message: 'الرجاء إختيار الفرع', trigger: 'blur' },
                ],
                Phone: [
                    { required: true, message: 'الرجاء إدخال رقم الهاتف', trigger: 'blur' },
                    { min: 9, max: 13, message: "يجب ان يكون طول رقم الهاتف 9 ارقام علي الاقل", trigger: "blur", },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],
                UserType: [
                    { required: true, message: 'الرجاء اختيار نوع الموظف', trigger: 'blur' },
                ],
                Status: [
                    { required: true, message: 'الرجاء اختيار حالة الحساب', trigger: 'blur' },
                ],
            },

        };
    },
    methods:
    {

        GetHospitalsName() {
            this.HospitalId = '';
            this.ruleForm.BranchId = '';
            this.$blockUI.Start();
            this.$http.GetHospitalsAllName(this.MunicipalitieId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Branches = response.data.info;
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

        GetBranches() {
            this.ruleForm.BranchId = '';
            this.$blockUI.Start();
            this.$http.GetHospitalsAllName(this.MunicipalitieId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Branches = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },

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

            if (this.ruleForm.Password != this.ruleForm.CPassword) {
                this.showMessage('error', 'خطاء بالعملية', 'الرجاء التأكد من تطابق كلمة المرور');
                return;
            }

            this.$blockUI.Start();
            this.$http.AddUser(this.ruleForm)
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

        Back() {
            this.$parent.state = 0;
            this.$parent.GetInfo(this.$parent.pageNo);
        },
    }
}
