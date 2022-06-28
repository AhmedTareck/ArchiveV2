
import moment from 'moment';
export default {
    name: 'AddUser',
    created() {
        this.GetInfo();
        this.GetInfo2();
        this.CheckLoginStatus();
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
            loginDetails: null,
            pageNo: 1,
            pageSize: 5, 
            pages: 0,
            state: 0,
            Info: [],
            Info2:[]
        };
    },
    methods: {
        GetInfo2(pageNo) {
            this.pageNo = pageNo;
            if (this.pageNo === undefined) {
                this.pageNo = 1;
            }

            this.$blockUI.Start();
            this.$http.GetDailyForm(this.pageNo, this.pageSize, this.HospitalId)
                .then(response => {
                    this.$blockUI.Stop();
                    this.Info2 = response.data.info;
                    this.pages = response.data.count;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                    this.pages = 0;
                });
        },

        CheckLoginStatus() {
            try {
                this.loginDetails = JSON.parse(localStorage.getItem('currentUser-client'));
                if (this.loginDetails == null) {
                    window.location.href = '/Login';
                }
            } catch (error) {
                window.location.href = '/Login';
            }
        },
        GetInfo() {
            this.$blockUI.Start();
            this.$http.GetDashboardInfo()
                .then(response => {
                    this.$blockUI.Stop();
                    this.Info = response.data.info;
                })
                .catch(() => {
                    this.$blockUI.Stop();
                });
        },


    }
}
