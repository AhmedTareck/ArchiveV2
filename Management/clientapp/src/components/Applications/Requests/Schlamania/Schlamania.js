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
                DateOn: '',
                LastPleace: '',
                InfectiedPleace: '',
                Locations: '',
                WorckPleace: '',
                EnyPleace: '',
                IsRodents: '',
                IsSandTank: '',
                FamilyInficted: '',
                NameOne: '',
                NameTwo: '',
                NameThree: '',
                LastMidsone: '',
                Diagnosis: '',
                Treatment: '',
                InformerName: '',
                InformerJobDiscriptions: '',

                DeateOn: '',
            },
            rules: {
                

                DeateOn: [
                    { required: true, message: 'الرجاء اختيار  تاريخ ', trigger: 'blur' },
                ],


                DiseaseId: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                FullName: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],


                Age: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                Gender: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                Nationality: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],


                DateOn: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                LastPleace: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                InfectiedPleace: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                Locations: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                WorckPleace: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                EnyPleace: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                IsRodents: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                IsSandTank: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                FamilyInficted: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                NameOne: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                NameTwo: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],

                NameThree: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                LastMidsone: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                Diagnosis: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                Treatment: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                InformerName: [
                    { required: true, message: 'الرجاء الاجابة علي السؤال', trigger: 'blur' },
                ],
                InformerJobDiscriptions: [
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
            this.$http.FillSchlamaniaRequest(this.ruleForm)
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
