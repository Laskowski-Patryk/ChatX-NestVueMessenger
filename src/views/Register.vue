<template>
  <div class="register">
    <div class="center-form">
      <h1>Register</h1>
      <h3>&nbsp;or <router-link to="/signin">Sign in</router-link></h3>
      <br /><br />
      <!-- SCROLLBAR TODO -->
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            v-model="user.email"
            class="form-control"
            id="email-input"
            aria-describedby="emailHelp"
            v-bind:class="emailCheck"
            icon="envelope"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            v-model="user.username"
            class="form-control"
            id="username-input"
            v-bind:class="usernameCheck"
            placeholder="Your username"
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="user.password"
            id="password-input"
            v-bind:class="passwordCheck"
            class="form-control"
            placeholder="Your Password"
          />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            v-model="user.password2"
            id="password2-input"
            v-bind:class="password2Check"
            class="form-control"
            placeholder="Your Password"
          />
        </div>
        <label>Personal</label>
        <div class="form-group personal">
          <input
            type="text"
            v-model="user.name"
            id="name-input"
            v-bind:class="nameCheck"
            class="form-control"
            placeholder="Your Name"
          />
          <input
            type="text"
            v-model="user.surname"
            id="surname-input"
            v-bind:class="surnameCheck"
            class="form-control"
            placeholder="Your Surname"
          />
        </div>
        <div class="form-group">
          <label>City</label>
          <input
            type="text"
            v-model="user.city"
            id="city-input"
            v-bind:class="cityCheck"
            class="form-control"
            placeholder="Type your city"
          />
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="checkbox-input"
            v-bind:class="checkboxCheck"
            v-model="user.terms"
          />
          <label class="form-check-label" for="checkbox-input"
            >I accept <a href="">terms</a> of use.</label
          >
        </div>
        <div v-for="err in errors" v-bind:key="err">
          <div
            v-for="(error, index) in errors"
            v-bind:key="error"
            class="errors"
          >
            {{ error }}
            <span v-if="index != Object.keys(errors).length - 1">, </span>
          </div>
        </div>
        <button id="but" type ="submit" @click="register" :disabled="!allCheck">
          Register
        </button>
      </form>
    </div>
  </div>
</template>
<script >
import axios from "axios";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      errors: [],
      user: {
        username: "",
        name: "",
        surname: "",
        city: "",
        email: "",
        password: "",
        password2: "",
        public_key: "sadczx2",
        terms: false,
      },
    };
  },
  methods: {
    register: function (e) {
      e.preventDefault();

      if (this.emailCheck == "wrong") return;
      if (this.usernameCheck == "wrong") return;
      if (this.passwordCheck == "wrong") return;
      if (this.password2Check == "wrong") return;
      if (this.surnameCheck == "wrong") return;
      if (this.nameCheck == "wrong") return;
      if (this.cityCheck == "wrong") return;
      if (this.checkboxCheck == "wrong") return;

      let credentials = {};
      this.$recaptcha("login").then((token) => {
        credentials.token = token;
        credentials.secret = "6LfmM_AUAAAAAPOwrNo4IP-Geiyf9Bom16tT3ySx";
        axios
          .post("/captcha", credentials)
          .then((response) => {
            if (response.data.success == true) {
              axios
                .post("/register", this.user)
                .then((response) => {
                  if (response.status == 201)
                    this.$router.push("/signin/registered");
                })
                .catch((error) => {
                  this.errors = [];
                  if (
                    error.response.data.message[0] == "Login have to be unique"
                  )
                    this.errors.push("This username already exists.");
                  if (
                    error.response.data.message[0] == "Email have to be unique"
                  )
                    this.errors.push("This email is already in use.");
                });
            }
          });
      });
    },
  },
  computed: {
    allCheck: function () {
      let good = true;
      Object.keys(this.user).forEach((key) => {
        if (this.user[key] == "") good = false;
      });
      return good;
    },
    emailCheck: function () {
      if (this.user.email.length == 0) return;
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.user.email)) return "good";
      return "wrong";
    },
    usernameCheck: function () {
      if (this.user.username.length == 0) return;
      if (this.user.username.length >= 3 && this.user.username.length <= 20)
        return "good";
      return "wrong";
    },
    passwordCheck: function () {
      if (this.user.password.length == 0) return;
      if (this.user.password.length >= 5 && this.user.password.length <= 20)
        return "good";
      return "wrong";
    },
    password2Check: function () {
      if (this.user.password2.length == 0) return;
      if (
        this.user.password2.length >= 5 &&
        this.user.password2.length <= 20 &&
        this.user.password2 == this.user.password
      )
        return "good";
      return "wrong";
    },
    nameCheck: function () {
      if (this.user.name.length == 0) return;
      if (
        this.user.name.length <= 20 &&
        this.user.name.charAt(0) == this.user.name.charAt(0).toUpperCase()
      )
        return "good";
      return "wrong";
    },
    surnameCheck: function () {
      if (this.user.surname.length == 0) return;
      if (
        this.user.surname.length <= 40 &&
        this.user.surname.charAt(0) == this.user.surname.charAt(0).toUpperCase()
      )
        return "good";
      return "wrong";
    },
    cityCheck: function () {
      if (this.user.city.length == 0) return;
      if (
        this.user.city.length <= 40 &&
        this.user.city.charAt(0) == this.user.city.charAt(0).toUpperCase()
      )
        return "good";
      return "wrong";
    },
    checkboxCheck: function () {
      if (this.user.terms == true) return "good";
      return "wrong";
    },
  },
};
</script>
<style scoped>
.wrong:focus {
  /* outline: none !important; */
  border: 1px solid red;
  box-shadow: 0 0 10px red;
}

.good:focus {
  /* outline: none !important; */
  border: 1px solid green;
  box-shadow: 0 0 10px green;
}

.personal {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.center-form {
  /* max-height: 92%; */
  border-radius: 2vh;
  box-shadow: 0.625rem 0.625rem 1.25rem #bababa,
    -0.625rem -0.625rem 1.25rem #ffffff;
  box-sizing: border-box;
  padding: 4.75%;
  overflow: auto;
  padding-top: 2rem !important;
  height: auto;
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

.register {
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
h1,
h3 {
  display: inline;
}
.errors {
  font-weight: 700;
  color: red;
}
</style>