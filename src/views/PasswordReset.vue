<template>
  <div class="register">
    <div class="center">
      <h1>Reset your password</h1>
      <br />
      <br />
      <label
        >Enter your user account's verified email address and we will send you a
        password reset link.</label
      >
      <form>
        <div class="form-group">
          <input
            type="text"
            v-model="user.email"
            class="form-control"
            id="username-input"
            placeholder="Enter your email address"
          />
        </div>
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a>
        apply.<br />
        <div v-for="succ in success" v-bind:key="succ" class="success">
          {{ succ }}
        </div>

        <div v-for="error in errors" v-bind:key="error" class="errors">
          {{ error }}
        </div>

        <button id="but" @click="resetPassword" data-badge="inline">
          Reset Password
        </button>
      </form>
    </div>
  </div>
</template>
<script >
import axios from "axios";
export default {
  name: "resetPassword",
  components: {},
  data() {
    return {
      errors: [],
      success: [],
      user: {
        email: "",
      },
    };
  },
  methods: {
    resetPassword: function (e) {
      e.preventDefault();
      this.errors = [];
      let credentials = {};
      this.$recaptcha("login").then((token) => {
        credentials.token = token;
        credentials.secret = "6LfmM_AUAAAAAPOwrNo4IP-Geiyf9Bom16tT3ySx";
        axios
          .post("http://localhost:3000/captcha", credentials)
          .then((response) => {
            if (response.data.success == true) {
              axios
                .post("http://localhost:3000/forgotPassword", this.user)
                .then((response) => {
                  this.success = [];
                  this.errors = [];
                  if (response.data.msg == "error")
                    this.success.push("Message was already sent");
                  if (response.data.msg == "sent")
                    this.success.push("Message sent, check your email");
                })
                .catch((err) => {
                  this.success = [];
                  this.errors = [];
                  this.errors.push("This email doesn't exists");
                });
            }
          });
      });
    },
  },
  mounted() {
    if (this.$router.path !== "/passwordreset") {
      this.$router.replace("/passwordreset");
    }
    let path = window.location.pathname;
    let segments = path.split("/");
    if (segments[2] == "registered")
      this.success.push(
        "Succesfuly registered now check your email to confirm."
      );
    if (segments[2] == "updated")
      this.success.push("Email have been verified.");
    if (segments[2] == "wrong")
      this.errors.push("Provided link was incorrect.");
    if (segments[2] == "error")
      this.errors.push("Something went wrong while verifying your email.");
    return;
  },
  created() {},
  computed: {},
};
</script>
<style scoped>
.center {
  position: absolute;
  margin: auto;
  left: clamp(2rem, 40%, 35%);
  top: 6%;
  width: clamp(30rem, 35vw, 30vw);
  height: auto;
  max-height: 92%;
  border-radius: 2vh;
  box-shadow: 0.625rem 0.625rem 1.25rem #bababa,
    -0.625rem -0.625rem 1.25rem #ffffff;
  box-sizing: border-box;
  padding: 2rem;
  overflow: auto;
  padding-top: 2rem !important;
}

button {
  margin: 25px 0 0 0;
  width: 100%;
  height: 3.125rem;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  background: #dde1e7;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 25px;
  opacity: 0.8;
  box-shadow: 2px 2px 5px #bababa, -5px -5px 0.625rem #ffffff;
}

button:active {
  color: #3498db;
  box-shadow: inset 2px 2px 5px #bababa, inset -5px -5px 0.625rem #ffffff;
}
button:disabled {
  color: grey;
  box-shadow: inset 2px 2px 5px #bababa, inset -5px -5px 0.625rem #ffffff;
}
.form-control {
  height: 3rem !important;
  height: 100%;
  width: 100%;
  padding-left: 45px;
  font-size: 18px;
  outline: none;
  border: none;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 0.625rem #ffffff;
}
.form-control input:focus ~ label {
  box-shadow: inset 2px 2px 5px #babecc, inset -1px -1px 2px #ffffff;
}
.right {
  float: right;
}
h1,
h3 {
  display: inline;
}
.errors {
  font-weight: 700;
  color: red;
}
.success {
  font-weight: 700;
  color: green;
}
.grecaptcha-badge {
  visibility: hidden;
}
</style>