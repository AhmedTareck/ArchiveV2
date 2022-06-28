import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'Add',
    created() {
        this.GetHospitals();
        this.GetDevices();
        this.GetAllFilterNames();

        this.ruleForm.Id = this.$parent.SelectedItem.id;
        this.ruleForm.HospitalId = this.$parent.SelectedItem.hospitalId;
        this.ruleForm.DeviceId = this.$parent.SelectedItem.deviceId;
        this.ruleForm.FilterTypeId = this.$parent.SelectedItem.filterTypeId;
        this.ruleForm.OldId = this.$parent.SelectedItem.oldId;
        this.ruleForm.FirstName = this.$parent.SelectedItem.firstName;
        this.ruleForm.FatherName = this.$parent.SelectedItem.fatherName;
        this.ruleForm.GrandFatherName = this.$parent.SelectedItem.grandFatherName;
        this.ruleForm.FamilyName = this.$parent.SelectedItem.familyName;
        this.ruleForm.BirthDate = this.$parent.SelectedItem.birthDate;
        this.ruleForm.Nationality = this.$parent.SelectedItem.nationality;
        this.ruleForm.Workplace = this.$parent.SelectedItem.workplace;
        this.ruleForm.SocialStatus = this.$parent.SelectedItem.socialStatus;
        this.ruleForm.Nid = this.$parent.SelectedItem.nid;
        this.ruleForm.Address = this.$parent.SelectedItem.address;
        this.ruleForm.StartDate = this.$parent.SelectedItem.startDate;
        this.ruleForm.BloodType = this.$parent.SelectedItem.bloodType;
        this.ruleForm.ViralTestResults = this.$parent.SelectedItem.viralTestResults;
        this.ruleForm.WashingCount = this.$parent.SelectedItem.washingCount;
        this.ruleForm.Resone = this.$parent.SelectedItem.resone;
        this.company = this.$parent.SelectedItem.company;
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

            company: '',
            Hospitals: [],
            Devices: [],
            FilterTypes: [],

            ruleForm: {
                Id:'',
                HospitalId: null,
                DeviceId: null,
                FilterTypeId: null,
                OldId: '',
                FirstName: '',
                FatherName: '',
                GrandFatherName: '',
                FamilyName: '',
                BirthDate: '',
                Nationality: '',
                Workplace: '',
                SocialStatus: null,
                Nid: '',
                Address: '',
                StartDate: '',
                BloodType: null,
                ViralTestResults: null,
                WashingCount: null,
                Resone: null,
            },
            rules: {
                HospitalId: [
                    { required: true, message: 'الرجاء اختيار  الجهة', trigger: 'blur' },
                ],
                DeviceId: [
                    { required: true, message: 'الرجاء اختيار  نوع الجهاز', trigger: 'blur' },
                ],
                FilterTypeId: [
                    { required: true, message: 'الرجاء اختيار  نوع الفلتر الخاص بالجهاز', trigger: 'blur' },
                ],
                OldId: [
                    { required: true, message: 'الرجاء ادخال رقم القيد بالمنظومة', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],
                FirstName: [
                    { required: true, message: 'الرجاء إدخال الاسم الاول', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                ],
                FatherName: [
                    { required: true, message: 'الرجاء إدخال إسم الاب', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                ],
                GrandFatherName: [
                    { required: true, message: 'الرجاء إدخال إسم الجد', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                ],
                FamilyName: [
                    { required: true, message: 'الرجاء إدخال اللقب', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' },
                    { required: true, pattern: /[\u0600-\u06FF]/, message: 'الرجاء إدخال حروف العربية فقط', trigger: 'blur' }
                ],
                BirthDate: [
                    { required: true, message: 'الرجاء اختيار  تاريخ الميلاد', trigger: 'blur' },
                ],
                Nationality: [
                    { required: true, message: 'الرجاء ادخال  الجنسية', trigger: 'blur' },
                ],
                Workplace: [
                    { required: true, message: 'الرجاء ادخال  مكان العمل', trigger: 'blur' },
                ],
                SocialStatus: [
                    { required: true, message: 'الرجاء اختيار الوضع العائلي  ', trigger: 'blur' },
                ],
                Nid: [
                    { required: true, message: 'الرجاء ادخال  الرقم الوطني', trigger: 'blur' },
                    { min: 12, max: 12, message: "يجب ان يكون طول الرقم الوطني 12 رقم ", trigger: "blur", },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },

                ],
                Address: [
                    { required: true, message: 'الرجاء ادخال  مكان السكن', trigger: 'blur' },
                ],
                StartDate: [
                    { required: true, message: 'الرجاء ادخال  تاريخ البداية', trigger: 'blur' },
                ],
                BloodType: [
                    { required: true, message: 'الرجاء ادخال  فصيلة الدم', trigger: 'blur' },
                ],
                ViralTestResults: [
                    { required: true, message: 'الرجاء اختيار  نتائج التحليل الفيروسية', trigger: 'blur' },
                ],
                WashingCount: [
                    { required: true, message: 'الرجاء ادخال  عدد فترات الغسيل', trigger: 'blur' },
                ],
                Resone: [
                    { required: true, message: 'الرجاء اختيار سبب الفشل الكلوى  ', trigger: 'blur' },
                ],
            },
            
        };
    },
    methods: {

        back() {
            this.$parent.state = 0;
        },

        GetHospitals() {
            this.$blockUI.Start();
            this.$http.GetHospitalsAllName()
                .then(response => {
                    this.$blockUI.Stop();
                    this.Hospitals = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },

        GetDevices() {
            this.$blockUI.Start();
            this.$http.GetDevicesNames()
                .then(response => {
                    this.$blockUI.Stop();
                    this.Devices = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },

        GetDevicesbyCompany() {
            this.ruleForm.DeviceId = '';
            this.ruleForm.FilterTypeId = '';
            this.$blockUI.Start();
            this.$http.GetDevicesbyCompany(this.company)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Devices = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },

        GetFilter() {
            this.FilterTypes = null;
            this.ruleForm.FilterTypeId = '';
            this.$blockUI.Start();
            this.$http.GetFilterNames(this.ruleForm.DeviceId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.FilterTypes = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },


        GetAllFilterNames() {
            this.$blockUI.Start();
            this.$http.GetAllFilterNames()
                .then(response => {
                    this.$blockUI.Stop();
                    this.FilterTypes = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });

        },




        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddItem(formName);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: '..تنبيه',
                        // text: '<strong>Something went wrong!</strong>',
                        html:
                            'الرجاء التأكد من ادخال جميع البيانات',
                        // showCloseButton: true,
                        showCancelButton: false,
                        //confirmButtonText: `حـفظ`,
                        //denyButtonText: `مواق`,
                    }).then(() => {
                        this.resetForm(formName);
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
      
        AddItem(formName) {

            if (!this.ruleForm.FilterTypeId)
                this.ruleForm.FilterTypeId = 0;

            this.$blockUI.Start();
            this.$http.EditApplications(this.ruleForm)
                .then(response => {
                    this.$blockUI.Stop();
                    this.ruleForm.FilterTypeId = null;

                    this.resetForm(formName);
                    this.$parent.SelectedItem = '';
                    this.$parent.state = 0;
                    this.$parent.GetInfo();
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
