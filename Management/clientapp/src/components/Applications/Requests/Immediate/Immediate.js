import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'Add',
    created() {
        this.GetHospitals();
        this.GetDiseases();
        this.ruleForm.Id = this.$parent.SelectedItem.id;
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
            company: '',

            ruleForm: {
                Id:'',
                HospitalId: 1,
                DeateOn: '',
                Unit: '',
                HospitalLocations: '',
                UserFrom: '',
                Name: '',
                Age: '',
                Gender: '',
                Nationality: '',
                City: '',
                Mahla: '',
                Locations: '',
                JobInfo: '',
                DiseaseInfo: '',
                DiseaseDateOn: '',
                FindOn: '',
                ActionsInfo: '',
            },
            rules: {
                Name: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],

                DeateOn: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],

                Age: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],

                Gender: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                Nationality: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                City: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                Mahla: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                Locations: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                JobInfo: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                DiseaseInfo: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                DiseaseDateOn: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                FindOn: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
                ],
                ActionsInfo: [
                    { required: true, message: 'يرجي تعبئة الحقل', trigger: 'blur' },
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

        GetDiseases() {
            this.$blockUI.Start();
            this.$http.GetDiseasesName()
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
            this.$http.AddImmediateForm(this.ruleForm)
                .then(response => {
                    this.$blockUI.Stop();
                    this.ruleForm.FilterTypeId = null;
                    this.resetForm(formName);
                    this.$parent.SelectedItem = '';
                    this.$parent.state = 0;
                    this.$parent.GetInfo();
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
            this.ruleForm.HospitalId = '';
            this.ruleForm.DeateOn = '';
            this.ruleForm.Unit = '';
            this.ruleForm.HospitalLocations = '';
            this.ruleForm.UserFrom = '';
            this.ruleForm.Name = '';
            this.ruleForm.Age = '';
            this.ruleForm.Gender = '';
            this.ruleForm.Nationality = '';
            this.ruleForm.City = '';
            this.ruleForm.Mahla = '';
            this.ruleForm.Locations = '';
            this.ruleForm.JobInfo = '';
            this.ruleForm.DiseaseInfo = '';
            this.ruleForm.DiseaseDateOn = '';
            this.ruleForm.FindOn = '';
            this.ruleForm.ActionsInfo = '';
        }




    }
}
