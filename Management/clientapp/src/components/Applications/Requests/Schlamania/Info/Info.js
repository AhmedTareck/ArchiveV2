import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'Add',
    created() {
        this.GetDiseases();

        this.selectedItem = this.$parent.SelectSchlamania;
        this.GetInfo();
        //this.ruleForm.DiseaseId = this.$parent.SelectedItem.diseaseId;
        //this.ruleForm.CreatedBy = this.$parent.SelectedItem.createdBy;
        //this.ruleForm.Desriptions = this.$parent.SelectedItem.desriptions;
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

            selectedItem:'',
            company: '',
            Hospitals: [],
            Devices: [],
            FilterTypes: [],
            Info: [],
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
            },
            rules: {
                DiseaseId: [
                    { required: true, message: 'الرجاء اختيار  المرض', trigger: 'blur' },
                ],
                
            },
            
        };
    },
    methods: {

        GetInfo() {

            this.$blockUI.Start();
            this.$http.GetRequestFormsById(this.selectedItem.id)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Info = response.data.info;
                    //this.pages = response.data.count;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                    //this.pages = 0;
                });

        },


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
        },
        Print2(item){
            try {
                let reportHTML = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png">
                    <link rel="icon" type="image/png" href="./img/AllScreen.png">
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                          rel="stylesheet">
                    <title></title>
                    <link href="db.onlinewebfonts.com/c/ce7b5754581057e6f7444e2192850cc8?family=Sakkal+Majalla" rel="stylesheet" type="text/css" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                </head>
                <body dir="rtl">
                    <script src="https://cdn.rtlcss.com/bootstrap/v4.0.0/js/bootstrap.min.js" integrity="sha384-54+cucJ4QbVb99v8dcttx/0JRx4FHMmhOWi4W+xrXpKcsKQodCBwAvu3xxkZAwsH" crossorigin="anonymous"></script>
                    <div>
                        <div class="box">
                            <!-- Header One -->
                            <div class="header-one">
                                <div class="right-side">
                                    <p class="small-font"></p>
                                </div>
                                <div class="center-side" style="text-align:center">
                                    <h3 style="font-weight:bold">المــركز الوطنــــــي لمكافحــــــة الأمـــــراض </h3>
                                    <hr style="margin: 0px 50px; background-color:black; height: 100%;" >
                                    <h3 style="font-weight:bold">إدارة الرصد والإستجابة السريعة  </h3>
                                    <h3> استمارت تقصي عن مرض الشلمانيا الجلدية</h3>
                                </div>
                                <div class="left-side" dir="ltr">
                                    <img src="data:image/jpeg;base64,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" />
                                </div>
                            </div>
                            <!-- <div class="line-top"></div> -->
                            <!-- End Header One -->
                            <hr />
                
                            <!-- Header Two -->
                            <div class="content-place">
                
                                <table>
                                    <tr>
                                        <th class="header">الاسم: ${item.fullName}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            <div class="content-place">
                
                                <table>
                                    <tr>
                                        <th class="header"> العمر:${item.age} </th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            <div class="content-place">
                
                
                                <table>
                                    <tr>
                                        <th class="header">الجنس:${item.gender==1?'ذكر':'انثى'}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            <div class="content-place">
                
                
                                <table>
                                    <tr>
                                        <th class="header">الجنسية: ${item.nationality}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            
                
                            <div class="content-place">
                                <table>
                                    <tr>
                                        
                                        <th class="header" >1- :تاريخ ظهور الاصابة: ${item.dateOn ==null?'-':item.dateOn.split('T')[0]} الاماكن التي زارها المريض خلال الشهرين الاخرين قبل الظهور المرض  :${item.lastPleace}</th>
                                      
                                    </tr>
                                </table>
                                <br />
                            </div>
                            <div class="content-place">
                                <table>
                                    <tr> 
                                        <th class="header" >2-  هل بامكانه تحديد مكان حدوث الاصابة :${item.locations}  ${item.worckPleace +' - '+item.enyPleace}: مكان الإقامة، مكان العمل أو اي مكان اخر زاره المريض ،</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            <div class="content-place">
                                <table>
                                    <tr>
                                        <th class="header" >3-هل يوجد في مكان الإقامة والعمل الحالي قوارض: ${item.isRodents==1?'نعم':"لا"} ذباب الرمال  :${item.familyInficted==1?'نعم':"لا"}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            <div class="content-place">
                                <table>
                                    <tr>
                                        <th class="header" >4- هل يعاني المريض من أي امراض أخرى: ${item.isSandTank ==1?'نعم':'لا'}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            <div class="content-place">
                                <table>
                                    <tr>
                                        <th class="header" >5- هل توجد إصابة في الأسرة او اخرين يعرفهم المصاب: ${item.familyInficted==1?'نعم':'لا'} / اسمائهم: ${item.nameOne+' - '+item.nameTwo +' - '+item.nameThree}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                            <div class="content-place">
                                <table>
                                    <tr>
                                        <th class="header" >6- :علاجات المستعملة سابقا  ${item.lastMidsone} </th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                            <div class="content-place">
                                <table>
                                    <tr>
                                        <th class="header" >7- 
                                         التشخيص السريري: ${item.treatment}
                                          مخبري: ${item.diagnosis}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                            <div class="content-place">
                                <table>
                                    <tr>
                                        <th class="header" >العلاج والمتابعة: ${item.hospital} </th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                          
                            <div class="content-place" >
                                <table>
                                    <tr>
                                        <th class="header" style="width:60%">اسم المبلغ عن الحالة: ${item.informerName}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                            <div class="content-place" >
                                <table>
                                    <tr>
                                        <th class="header" style="width:60%">الصفة: ${item.informerJobDiscriptions}</th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                
                
                            <div class="content-place">
                                <table>
                                    <tr>
                                        <th class="header" style="width:60%">التاريخ: ${item.dateOn==null?'-':item.dateOn.split('T')[0]}</th>
                                        <th class="header" style="width:30%"> التوقيع:........................... </th>
                                    </tr>
                                </table>
                                <br />
                            </div>
                        </div>
                        <!-- End Box -->
                        </body>
                <style>
                
                
                    @page {
                        size: 7in 9.25in;
                        margin: 6.35mm 6.35mm 6.35mm 6.35mm;

                    }
                
                
                    .breakPage {
                        page-break-after: always !important;
                        page-break-inside: avoid;
                    }
                
                    .container {
                        width: 920px;
                    }
                
                
                    header{
                        text-align:right!important
                    }
                
                
                
                
                    body {
                        margin: 0px;
                        padding: 0px;
                        font-family: "Tajawal", sans-serif;
                        font-family: "Cairo", sans-serif;
                        direction: rtl;
                    }
                
                    .item {
                        float: right;
                        width: 96%;
                        margin: 0px 2%;
                        background: white;
                    }
                
                        .item .item-header {
                            float: right;
                            width: 98%;
                            height: 46px;
                            line-height: 46px;
                            margin: 2px 1%;
                            border: 1px solid #333;
                            text-align: center;
                        }
                
                
                
                            .item .item-header .entity-name {
                                float: right;
                                width: 100%;
                                font-size: 20px;
                                font-family: Tajawal;
                                font-weight: 600;
                                color: #24a7d3;
                                text-align: center;
                            }
                
                        .item .item-element {
                            float: right;
                            width: 98%;
                            height: 34px;
                            line-height: 34px;
                            background-color: #efefef;
                            margin: 2px 1%;
                            border: 1px solid #aaa;
                            color: #444;
                        }
                
                    .subject-title {
                        font-weight: bold;
                    }
                
                    
                
                    .small-font {
                        font-size: small;
                    }
                    /* Box */
                    .out-box {
                        float: right;
                        width: 720px;
                        background-color: white;
                        margin-top: 0px;
                        margin-bottom: 50px;
                        margin-right: 0px;
                        margin-left: 0px;
                        box-shadow: 0 5px 10px rgb(0 0 0 / 7%);
                    }
                
                    .box {
                        float: right;
                        width: 920px;
                        margin-top: 0px;
                        margin-bottom: 50px;
                        margin-right: 0px;
                        margin-left: 0px;
                        /* border-top: 2px solid #555;
                        border-bottom: 2px solid #555; */
                        background-color: white;
                    }
                    /* Header */
                    .header-one {
                        float: right;
                        width: 95%;
                        margin: 10px 2.5%;
                        abackground: orange;
                    }
                
                        .header-one .right-side {
                            float: right;
                            width: 30%;
                            abackground: blue;
                        }
                
                            .header-one .right-side img {
                                margin-top: 20px;
                                width: 100px;
                            }
                
                        .header-one .left-side {
                            float: left;
                            width: 30%;
                            abackground: blue;
                        }
                
                            
                
                            .header-one .left-side img {
                                float: left;
                                width: 52%;
                            }
                
                        .header-one .center-side {
                            float: right;
                            width: 40%;
                            abackground: blue;
                        }
                
                            .header-one .center-side img {
                                display: block;
                                margin-left: auto;
                                margin-right: auto;
                                width: 50%;
                            }
                    /* .header-one .center-side {
                        float: right;
                        height: 140px;
                        width: 34%;
                    } */
                
                    /* .header-one .center-side .hnec-title {
                            float: right;
                            width: 100%;
                            margin-top: 40px;
                            text-align: center;
                            height: 36px;
                            line-height: 36px;
                            font-size: 22px;
                            font-weight: 500;
                            font-family: Tajawal;
                            color: #0885cd;
                        } */
                
                    .line-top {
                        float: right;
                        width: 100%;
                        height: 6px;
                        background: #faae2b;
                    }
                
                    .line-top-private {
                        float: right;
                        width: 100%;
                        height: 6px;
                        background: #d83c8e;
                    }
                
                    /* Header Two */
                    .header-two {
                        float: right;
                        width: 95%;
                        margin: 25px 2.5%;
                        abackground: blue;
                    }
                
                        .header-two .right-header {
                            float: right;
                            width: 33.333%;
                            text-align: right;
                            font-weight: 500;
                            font-size: 18px;
                            font-family: Tajawal;
                            color: #555;
                            margin-bottom: 20px;
                        }
                
                            .header-two .right-header span {
                                color: #0885cd;
                                margin-right: 8px;
                            }
                
                        .header-two .right-answer {
                            float: right;
                            width: 31%;
                            margin-right: 2.33333%;
                            text-align: right;
                            font-weight: 500;
                            font-size: 18px;
                            font-family: Tajawal;
                            color: #0885cd;
                        }
                
                        .header-two .center-header {
                            float: right;
                            width: 33.333%;
                            text-align: center;
                            font-weight: 500;
                            font-size: 18px;
                            font-family: Tajawal;
                            color: #555;
                            margin-bottom: 20px;
                        }
                
                        .header-two .center-answer {
                            float: right;
                            width: 33.333%;
                            text-align: center;
                            font-weight: 500;
                            font-size: larger;
                            font-family: Tajawal;
                            /*  color: #0885cd; */
                        }
                
                        .header-two .center-header span {
                            color: #0885cd;
                            margin-right: 8px;
                        }
                
                        .header-two .left-header {
                            float: left;
                            width: 29.6%;
                            text-align: left;
                            font-weight: 500;
                            font-size: 18px;
                            font-family: Tajawal;
                            color: #555;
                            margin-left: 3.4%;
                            margin-bottom: 20px;
                        }
                
                        .header-two .left-answer {
                            float: right;
                            width: 31%;
                            margin-left: 2.33333%;
                            text-align: left;
                            font-weight: 500;
                            font-size: 18px;
                            font-family: Tajawal;
                            color: black;
                        }
                
                    .content-place {
                        margin-top:-3px;
                        float: right;
                        width: 100%;
                        abackground: red;
                        height: 100%;
                    }
                
                    .header {
                        font-size: 20px;
                        text-align:right
                    }
                
                    .name-header {
                        font-size: 23px;
                        word-spacing: 10px;
                    }
                
                    table {
                        width: 95%;
                        margin: 0px 2.5%;
                        text-align: center;
                        font-size: 15px;
                    }
                
                    .genral th {
                        font-weight: 500;
                        background: #faae2b;
                        color: white;
                        line-height: 58px;
                    }
                
                    .private th {
                        font-weight: 500;
                        background: #d83c8e;
                        color: white;
                        line-height: 58px;
                    }
                
                    tr:nth-of-type(even) {
                        background-color: #f3f3f3;
                    }
                
                    tr td {
                        line-height: 57px;
                    }
                    /* Footer */
                    .footer {
                        float: right;
                        width: 90%;
                        padding: 0px 2.5%;
                        abackground: orange;
                        border-top: 1px solid #9a9a9a;
                        margin: 20px 2.5%;
                    }
                
                        .footer .note {
                            float: right;
                            width: 100%;
                            text-align: center;
                            font-family: Tajawal;
                            font-weight: 500;
                            color: #0885cd;
                            font-size: 14px;
                        }
                
                        .footer .page-number {
                            float: right;
                            width: 45%;
                            margin: 0px 5% 0px 0px;
                            abackground: red;
                            text-align: center;
                            font-family: Tajawal;
                            font-size: 14px;
                            color: #444;
                        }
                
                        .footer .date {
                            float: left;
                            width: 45%;
                            margin: 0px 0px 0px 5%;
                            text-align: center;
                            font-family: Tajawal;
                            color: #444;
                            font-size: 14px;
                            abackground: blue;
                        }
                
                
                
                
                
                </style>
                </html>`;
                const WinPrint = window.open();
                let is_chrome = Boolean(WinPrint.chrome);
              
                  WinPrint.document.write(reportHTML);
        setTimeout(() => {
          if (is_chrome) {
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
          
        } else {
          WinPrint.document.close();
          WinPrint.focus();
        
        }
        }, 1000);
                  
               
              } catch (error) {
                return console.log(error);
              }
            }


        

    }
}
