<template>
  <div class="signin">
    <div class="center-form">
      <h1>Sign In</h1>
      <h3>&nbsp;or <router-link to="/register">Register</router-link></h3>
      <br /><br />
      <!-- SCROLLBAR TODO -->
      <form>
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            v-model="user.username"
            class="form-control"
            id="username-input"
            placeholder="Your username"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <span class="right"
            ><a href="http://localhost:8080/passwordreset" tabindex="1"
              >Forgot password?</a
            >
          </span>
          <input
            type="password"
            v-model="user.password"
            id="password-input"
            class="form-control"
            placeholder="Your Password"
          />
        </div>

        <div v-for="succ in success" v-bind:key="succ" class="success">
          {{ succ }}
        </div>

        <div v-for="error in errors" v-bind:key="error" class="errors">
          {{ error }}
        </div>

        <button id="but" type ="submit" @click="signIn">Sign In</button>
      </form>
    </div>
  </div>
</template>
<script >
import axios from "axios";
export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      errors: [],
      success: [],
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signIn: function (e) {
      e.preventDefault();
      this.errors = [];
      if (this.user.username == "") this.errors.push("Provide your username");
      if (this.user.password == "") this.errors.push("Provide your password");
      if (this.errors.length > 0) return;
      axios
        .post("/login", this.user)
        .then((response) => {
          const user = {
            token: response.data.access_token,
            id: response.data.id,
            nickname: this.user.username,
          };
          
          window.localStorage.setItem("user", JSON.stringify(user));
           window.localStorage.setItem("userid", response.data.id);
          this.$router.go();
        })
        .catch((error) => {
          this.success = [];
          this.errors = [];
          if (error.response.data.message)
            this.errors.push(error.response.data.message);
        });
    },
  },
  mounted() {
    if (this.$router.path !== "/signin") {
      this.$router.replace("/signin");
    }
    let path = window.location.pathname;
    let segments = path.split("/");
    if (segments[2] == "registered")
      this.success.push(
        "Succesfuly registered now check your email to confirm."
      );
    if (segments[2] == "changed")
      this.success.push("Password succesfully changed.");
    if (segments[2] == "updated")
      this.success.push("Email have been verified.");
    if (segments[2] == "wrong")
      this.errors.push("Provided link was incorrect.");
    if (segments[2] == "error")
      this.errors.push("Something went wrong while verifying your email.");
    return;
  },
  computed: {},
};
</script>
<style scoped>
.center-form {
  border-radius: 2vh;
  box-shadow: 0.625rem 0.625rem 1.25rem #bababa,
    -0.625rem -0.625rem 1.25rem #ffffff;
  box-sizing: border-box;
  padding: 4.75%;
  overflow: auto;
  padding-top: 2rem !important;
  height:auto;
}
@media screen and (min-width: 1281px) {
  .center-form {
    grid-column: 5/9;
  }
}

@media screen and (max-width: 1280px) {
  .center-form {
    grid-column: 2/12;
  }
}

.signin {
  padding: clamp(2rem, 2%, 5rem);
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: min-content;
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
</style>