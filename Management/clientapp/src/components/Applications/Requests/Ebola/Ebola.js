import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'Add',
    created() {
        this.GetDiseases();

        this.ruleForm.Id = this.$parent.SelectedItem.id;
        this.ruleForm.DiseaseId = this.$parent.SelectedItem.diseaseId;
        this.ruleForm.CreatedBy = this.$parent.SelectedItem.createdBy;
        this.ruleForm.Desriptions = this.$parent.SelectedItem.desriptions;
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

            Diseases: [],

            ruleForm: {
                Id: '',
                DiseaseId: '',
                CreatedBy: '',
                Desriptions: '',

                FullName: '',
                Age: '',
                Gender: '',
                Nationality: '',
                Phone: '',

                Resident: '',
                NonResident: '',
                
                DateTravel: '',
                PlaceTravel: '',

                Locations: '',
                Mahla: '',

                JobInfo: '',

                SymptomsDate: '',

                Fever: '',
                Headache: '',
                MusclePain: '',

                Vomiting: '',
                BloodyDiarrhea: '',
                Bleeding: '',

                Other: '',

                FamileyContacts: '',
                WorckContacts: '',

                PatintStatusNow: '',

                Home: '',
                Hospital: '',

                InformerName: '',
                InformerPhone: '',

                DeateOn: '',
            },
            rules: {
                DiseaseId: [
                    { required: true, message: 'الرجاء اختيار  المرض', trigger: 'blur' },
                ],

                Gender: [
                    { required: true, message: 'الرجاء اختيار  الجنس', trigger: 'blur' },
                ],

                DateTravel: [
                    { required: true, message: 'الرجاء اختيار  تاريخ السفر', trigger: 'blur' },
                ],

                SymptomsDate: [
                    { required: true, message: 'الرجاء اختيار  تاريخ ظهور الاعراض', trigger: 'blur' },
                ],

                FamileyContacts: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                WorckContacts: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],



                IsHospitalBefore: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                IsMotherInfected: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                IsConfirmInfected: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                IsHospital: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                HospitalOn: [
                    { required: true, message: 'الرجاء تحديد التاريخ', trigger: 'blur' },
                ],

                IsCompleteTreatment: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                PatintType: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                DeateOn: [
                    { required: true, message: 'الرجاء تحديد التاريخ', trigger: 'blur' },
                ],

                BloodTransferOn: [
                    { required: true, message: 'الرجاء تحديد التاريخ', trigger: 'blur' },
                ],

                IsInsectRepellents: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                IsAquariums: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
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
                       /* this.resetForm(formName);*/
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
            this.$http.FillEbolaForm(this.ruleForm)
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
