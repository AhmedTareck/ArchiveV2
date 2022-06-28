import addUsers from './AddUsers/AddUsers.vue';
import editUsers from './EditUsers/EditUsers.vue';
import Swal from 'sweetalert2'
import moment from 'moment';

export default {
    name: 'AddUser',
    created(){
        this.getUser();
        this.GetHospitalsName();
    },
    components: {
        'add-Users': addUsers,
        'edit-Users': editUsers
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
            SelectedOfficeId: '',
            UserType:'',
            pageNo: 1,
            pageSize: 10,
            pages: 0,
            state: 0,
            users: [],

            EditUsersObj: [],
        };
    },
    methods: {
        UserTypeSearch() {
            this.SelectedOfficeId = '';
            this.getUser();
        },

        UserTypeSearchOffice() {
            this.getUser();
        },
        OfficeSearch() {

        },
        GetHospitalsName() {
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


        getUser(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.getUser(this.pageNo, this.pageSize, this.UserType, this.SelectedOfficeId)//this.$parent.SuperPackageParent.superPackageId
                .then(response => {
                    this.$blockUI.Stop();
                    this.users = response.data.user;
                    this.pages = response.data.count;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                    // console.error(err);
                    this.pages = 0;
                });
        },

        addUser() {
            this.state = 1;
        },

        EditUser(User) {
            this.state = 2;
            this.EditUsersObj = User;

        },



        DeactivateUser(UserId) {
            Swal.fire({
                title: 'هـل انت متأكد من ايقاف تفعيل المستخدم ؟',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `تأكيد العملية`,
                denyButtonText: `الغاء العملية`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$blockUI.Start();
                    this.$http.DeactivateUser(UserId)
                        .then(response => {
                            this.$blockUI.Stop();
                            this.FormPorgress = 100;
                            Swal.fire({
                                icon: 'success',
                                title: '..نجـاح العملية',
                                html:
                                    response.data,
                                showCancelButton: true,
                                //confirmButtonText: `حـفظ`,
                                denyButtonText: `خروج`,
                            }).then(() => {

                            });
                            this.$blockUI.Stop();

                            if (this.users.lenght === 1) {
                                this.pageNo--;
                                if (this.pageNo <= 0) {
                                    this.pageNo = 1;
                                }
                            }

                            this.getUser();


                        })
                        .catch((err) => {
                            this.$blockUI.Stop();
                            this.$notify({
                                title: 'خطأ بعملية الايقاف',
                                dangerouslyUseHTMLString: true,
                                type: 'error',
                                message: err.response.data
                            });
                        });
                    return;
                }
            })
        },

        ActivateUser(UserId) {
            Swal.fire({
                title: 'هـل انت متأكد من  تفعيل المستخدم ؟',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `تأكيد العملية`,
                denyButtonText: `الغاء العملية`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$blockUI.Start();
                    this.$http.ActivateUser(UserId)
                        .then(response => {
                            this.$blockUI.Stop();
                            this.FormPorgress = 100;
                            Swal.fire({
                                icon: 'success',
                                title: '..نجـاح العملية',
                                html:
                                    response.data,
                                showCancelButton: true,
                                //confirmButtonText: `حـفظ`,
                                denyButtonText: `خروج`,
                            }).then(() => {

                            });
                            this.$blockUI.Stop();

                            if (this.users.lenght === 1) {
                                this.pageNo--;
                                if (this.pageNo <= 0) {
                                    this.pageNo = 1;
                                }
                            }

                            this.getUser();


                        })
                        .catch((err) => {
                            this.$blockUI.Stop();
                            this.$notify({
                                title: 'خطأ بعملية التفعيل',
                                dangerouslyUseHTMLString: true,
                                type: 'error',
                                message: err.response.data
                            });
                        });
                    return;
                }
            })
        },


        delteUser(UserId) {
            Swal.fire({
                title: 'هـل انت متأكد من عملية الحذف ؟',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `تأكيد العملية`,
                denyButtonText: `الغاء العملية`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$blockUI.Start();
                    this.$http.delteUser(UserId)
                        .then(response => {
                            this.$blockUI.Stop();
                            this.FormPorgress = 100;
                            Swal.fire({
                                icon: 'success',
                                title: '..نجـاح العملية',
                                html:
                                    response.data,
                                showCancelButton: true,
                                //confirmButtonText: `حـفظ`,
                                denyButtonText: `خروج`,
                            }).then(() => {
                                
                            });
                            this.$blockUI.Stop();

                            if (this.users.lenght === 1) {
                                this.pageNo--;
                                if (this.pageNo <= 0) {
                                    this.pageNo = 1;
                                }
                            }

                            this.getUser();


                        })
                        .catch((err) => {
                            this.$blockUI.Stop();
                            this.$notify({
                                title: 'خطأ بعملية الحذف',
                                dangerouslyUseHTMLString: true,
                                type: 'error',
                                message: err.response.data
                            });
                        });
                    return;
                }
            })
        },


    }
}
