﻿export default {
    name: 'AppHeader',    
    created() {
        this.CheckLoginStatus();
    },
    data() {
        return {  
            loginDetails: null,
            Info: [],
            TempInfo: [],
            Count: 0,
            Tog: 'navbar-toggle',
        };
    },
  
    methods: {

        IsTogled() {
            if (this.Tog == 'navbar-toggle toggled') {
                this.Tog = 'navbar-toggle';
            } else {
                this.Tog = 'navbar-toggle toggled';
            }
        },

        OpenMenuByToggle() {
            var root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
            var classes = root.getAttribute("class");
            if (classes == "perfect-scrollbar-on") {
                root.setAttribute("class", "perfect-scrollbar-on nav-open");
            }
            else if (classes == null) {
                root.setAttribute("class", "perfect-scrollbar-on nav-open");
            }
            else {
                root.setAttribute("class", "perfect-scrollbar-on");
            }
        },

        href(url) {
            this.$router.push(url);
        },

        Logout() {
            window.location.href = "/Login";
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

        playSound() {
            const audio = new Audio("windows8_email_notif.mp3");
            audio.play();
        }
    }    
}
