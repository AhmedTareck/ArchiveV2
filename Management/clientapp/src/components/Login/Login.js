export default {
    name: 'Login',
    components: {
    },
    created() {
        this.$blockUI.$loading = this.$loading;
        this.logout();
    },
    data() {
        return {
            isAuthenticated: false,
            isActive: false,
            form: {
                Password: null,
                Email: null
            }
        };
    },
    methods: {

        logout() {
            localStorage.removeItem('currentUser-client');
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            this.$blockUI.Start();
            this.$http.Logout()
                .then(() => {
                    this.$blockUI.Stop();
                    //  window.location.href = "/Login";
                })
                .catch((err) => {
                    this.$blockUI.Stop(err);
                    //console.error(err);
                });
        },

        login() {
            if (!this.form.Email) {
                this.$notify({
                    title: 'خطأ',
                    dangerouslyUseHTMLString: true,
                    message: '<strong>' + 'الرجاء إدخال البريد الإلكتروني' + '</strong>',
                    type: 'error'
                });
                return;
            }
            if (!this.form.Password) {
                this.$notify({
                    title: 'خطأ',
                    dangerouslyUseHTMLString: true,
                    message: '<strong>' + 'الرجاء إدخال الرقم السري' + '</strong>',
                    type: 'error'
                });
                return;
            }

            //this.Loading = true;
            this.$blockUI.Start();
            this.$http.loginUser(this.form)
                .then(response => {
                    //debugger;
                    this.$blockUI.Stop();
                    localStorage.setItem('currentUser-client', JSON.stringify(response.data));
                    window.location.href = '/';
                })
                .catch((error) => {
                    this.$blockUI.Stop();
                    //$blockUI.close();
                    //debugger;
                    // this.Loading = false;
                    this.$notify({
                        title: 'خطأ',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>' + error.response.data + '</strong>',
                        type: 'error'
                    });
                });
        }
    }
}
