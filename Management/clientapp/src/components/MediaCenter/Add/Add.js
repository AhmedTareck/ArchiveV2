import Swal from 'sweetalert2'
import moment from 'moment';
import Uploder from 'vuejs-uploader';

export default {
    name: 'Add',
    created() {
    },
    components: {
        'Uploder': Uploder
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
                Descriptions: '',
                //Type: '',
                //MediaType: '',
                fileList: [],
            },
            rules: {
                Name: [
                    { required: true, message: 'الرجاء إدخال إسم الفرع', trigger: 'blur' },
                    { min: 3, max: 25, message: 'يجب ان يكون الطول من 3 الي 25', trigger: 'blur' }
                ],

                Descriptions: [
                    { required: true, message: 'الرجاء إدخال وصف توضيحي', trigger: 'blur' },
                ],

                Type: [
                    { required: true, message: 'الرجاء اختيار  نوع المادة الدعائية', trigger: 'blur' },
                ],

                MediaType: [
                    { required: true, message: 'الرجاء اختيار  نوع المادة الدعائية', trigger: 'blur' },
                ],

                fileList: [
                    { required: true, message: 'الرجاء اختيار  اضافة الملف ', trigger: 'blur' },
                ],
            },
            
        };
    },
    methods: {


        back() {
            this.$parent.state = 0;
            this.$parent.GetInfo();
        },


        //handleChange(file, fileList) {
        //    debugger
        //    this.fileList.push(fileList);
        //    this.ruleForm.Descriptions = file;
        //},
        //handlePreview(file) {
        //    debugger
        //    //console.log(file);
        //    this.fileList.push(file);
        //},
        beforeRemove(file, fileList) {
            this.ruleForm.Descriptions = fileList;
            return this.$confirm(`حذف الملف التالي :  ${file.name} ?`);
        },




        onBeforeUpload(file) {
            const isCorrectFormat = file.type === 'image/jpg' || 'image/png' || '.pdf' || '.docx' || '.xlsx' || '.csv' || '.jpg';

            if (!isCorrectFormat) {
                Swal.fire({
                    icon: 'warning',
                    title: '..الرجاء التاكد من البيانات',
                    // text: '<strong>Something went wrong!</strong>',
                    html:
                        'يجب ان يكون امتداد الملف png,jpg,docx,xlsx,.csv.pdf',
                    // showCloseButton: true,
                    showCancelButton: false,
                    //confirmButtonText: `حـفظ`,
                    //denyButtonText: `مواق`,
                }).then(() => {
                    return;
                });
                return;
            }
            return isCorrectFormat;
        },



        handleExceed() {
            this.$message.warning(`لايمكن تحميل أكتر من  ملف `);
        },
        handleRemoveFile(file) {
            var $this = this;
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function () {
                $this.ruleForm.fileList.splice($this.ruleForm.fileList.indexOf(reader.result), 1);
            }
        },
        FileChanged(file) {

            //debugger

            //if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            //    Swal.fire({
            //        icon: 'warning',
            //        title: '..يجب ان يكون الملف من نوع',
            //        // text: '<strong>Something went wrong!</strong>',
            //        html:
            //            ' png, jpg, mp4 ',
            //        // showCloseButton: true,
            //        showCancelButton: false,
            //        //confirmButtonText: `حـفظ`,
            //        //denyButtonText: `مواق`,
            //    }).then(() => {
            //        return;
            //    });
            //    this.handleRemoveFile(file);
            //    return;
            //}
            //let str = file.raw.type;

            //debugger    

            //pptx
            //if (str == "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
            //    this.ruleForm.Type = '.pptx';
            //}

            //if (str == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            //    this.ruleForm.Type=".docx"
            //}

            //if (str == "application/pdf") {
            //    this.ruleForm.MediaType = '4';
            //}

            //str = str.substring(0, 5);

            //if (str == "image/jpeg") {
            //    this.ruleForm.MediaType = '.jpeg';
            //}



            //if (str == "video") {
            //    this.ruleForm.MediaType = '1';
            //}

            var $this = this;
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function () {
                var obj =
                {
                    fileName: file.raw.name,
                    fileBase64: reader.result,
                };
                $this.ruleForm.fileList.push(obj);
            }
            //console.log($this.ruleForm.attashFile);
        },















        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.AddItem(formName);
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.ruleForm.fileList = [];
        },
      
        AddItem(formName) {
            debugger
            this.$blockUI.Start();
            this.$http.AddAttachmentsFile(this.ruleForm)
                .then(response => {
                    this.resetForm(formName);
                    this.$blockUI.Stop();
                    this.back();

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
                    console.log(err);
                    this.$notify({
                        title: 'خطأ بعملية الاضافة',
                        dangerouslyUseHTMLString: true,
                        type: 'error',
                        message: err.response.data
                    });
                });
        },








        submitUpload() {
            this.$refs.upload.submit();
        }


        

    }
}
