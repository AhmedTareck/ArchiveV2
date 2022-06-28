import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'Add',
    created() {
        this.GetHospitals();
        //this.GetDiseases();
        //this.GetDevices();
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

            Hospitals: [],
            Diseases: [],
            Devices: [],
            FilterTypes: [],
            company:'',
            Type:'',

            ruleForm: {
                DiseaseId:'',
                CountCases: '0',
                dateOn:'',
                VaccinationStatus:'0',
                notVaccinationStatus:'0',
                Male:'0',
                Fmale: '0',
                Libyan: '0',
                NLibyan: '0',
                Deaths: '0',
                OverFive: '0',
                LessFive: '0',
                LessTen: '0',
                LessFifteen: '0',
                LessTwenty: '0',
                LessTwentyFive: '0',
                LessThirty: '0',
                LessFiveThirty: '0',
                LessForty: '0',
                LessFortyFive: '0',
                OverFifty: '0',
            },
            rules: {
                dateOn: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],

                VaccinationStatus: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],

                notVaccinationStatus: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],

                DiseaseId: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                CountCases: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],
                Male: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],
                Fmale: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],
                Libyan: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],
                NLibyan: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                    { required: true, pattern: /^[0-9]*$/, message: 'الرجاء إدخال ارقام فقط', trigger: 'blur' },
                ],

            },
            
        };
    },
    methods: {

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
            this.$http.AddDailyForm(this.ruleForm)
                .then(response => {
                    this.$blockUI.Stop();
                    this.ruleForm.FilterTypeId = null;
                    this.resetForm(formName);
                    this.Clear();
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

        Clear() {
            this.ruleForm.DiseaseId = '';
            this.ruleForm.CountCases = 0;
            this.ruleForm.Male = 0;
            this.ruleForm.Fmale = 0;
            this.ruleForm.Libyan = 0;
            this.ruleForm.NLibyan = 0;
            this.ruleForm.Deaths = 0;
            this.ruleForm.OverFive = 0;
            this.ruleForm.LessFive = 0;
            this.ruleForm.LessTen = 0;
            this.ruleForm.LessFifteen = 0;
            this.ruleForm.LessTwenty = 0;
            this.ruleForm.LessTwentyFive = 0;
            this.ruleForm.LessThirty = 0;
            this.ruleForm.LessFiveThirty = 0;
            this.ruleForm.LessForty = 0;
            this.ruleForm.LessFortyFive = 0;
            this.ruleForm.OverFifty = 0;
        }


        

    }
}
