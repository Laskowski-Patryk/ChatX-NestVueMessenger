<template>
  <div class="register">
    <div class="center">
      <h1>Provide new password for your account</h1>
      <br />
      <br />
      <!-- SCROLLBAR TODO -->
      <form>
        <div class="form-group">
          <input
            type="password"
            v-model="user.password"
            class="form-control"
            id="username-input"
            v-bind:class="passwordCheck"
            placeholder="Enter new password"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="user.password2"
            v-bind:class="password2Check"
            class="form-control"
            id="username-input"
            placeholder="Renter new password"
          />
        </div>
        <div v-for="succ in success" v-bind:key="succ" class="success">
          {{ succ }}
        </div>

        <div v-for="error in errors" v-bind:key="error" class="errors">
          {{ error }}
        </div>

        <button id="but" @click="resetPassword" data-badge="inline">
          Reset my password
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
        password: "",
        password2: "",
        token: "",
      },
    };
  },
  methods: {
    resetPassword: function (e) {
      e.preventDefault();
      this.errors = [];
      if (this.user.password == "" || this.user.password == "") {
        this.errors.push("Fields can't be empty");
        return;
      }
      if (this.user.password != this.user.password2) {
        this.errors.push("Passwords aren't the same");
        return;
      }
      if (this.passwordCheck == "wrong" || this.password2Check == "wrong") {
        this.errors.push("Fill corectly new passwords");
        return;
      }

      axios
        .post("/changepassword", this.user)
        .then((response) => {
            window.location.replace("http://localhost:8080/signin/changed");
        })
        .catch((err) => {
          window.location.replace("http://localhost:8080/signin/wrong");
        });
    },
  },
  mounted() {
    let path = window.location.pathname;
    let segments = path.split("/");
    let token = [segments[2]];
    axios
      .post("/verifyToken", token)
      .then((response) => {
        if (response.data.msg != "good")
          window.location.replace("http://localhost:8080/signin/wrong");
        this.user.token = token[0];
      })
      .catch((err) => {
        window.location.replace("http://localhost:8080/signin/wrong");
      });

    return;
  },
  created() {},
  computed: {
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