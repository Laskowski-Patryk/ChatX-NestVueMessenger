<template>
  <div class="profile">
    <div class="center-form">
      <h1>Your Credentials</h1>
      <br /><br />
      <form>
        <div class="form-group">
          <label>Change avatar</label>
          <div id="preview">
            <img v-if="url" :src="url" style="height:14rem;" />
          </div>
          <br />
          <input
            type="file"
            ref="file"
            accept="image/jpeg, image/png"
            @change="selectFile"
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
        <div v-for="succ in success" v-bind:key="succ" class="success">
          {{ succ }}
        </div>
        <button id="but" type="submit" @click="save" :disabled="!allCheck">
          Save changes
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      errors: [],
      success: [],
      url: null,
      user: {
        name: "",
        surname: "",
        city: "",
        avatar: "",
        
      },
    };
  },
  mounted() {
    const userid = { _id: window.localStorage.getItem("userid") };
    axios
      .get("/profile")
      .then((response) => {
        this.user.name = response.data.name;
        this.user.surname = response.data.surname;
        this.user.city = response.data.city;
        this.url = response.data.avatar;
      })
      .catch((error) => {
        this.errors.push(error.message);
      });
  },
  methods: {
    selectFile: function() {
      this.user.avatar = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.user.avatar);
    },

    save: function(e) {
      e.preventDefault();
      if (this.usernameCheck == "wrong") return;
      if (this.nameCheck == "wrong") return;
      if (this.surnameCheck == "wrong") return;
      if (this.cityCheck == "wrong") return;
      const formdata = new FormData();
      formdata.append("image", this.user.avatar);
      fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers: {
          Authorization: "Client-ID 597fcfd343df5bb",
        },
        body: formdata,
      })
        .then((data) => data.json())
        .then((data) => {
          this.user.avatar = data.data.link;
          axios
            .post("/updateUser", this.user)
            .then((response) => {
              if (response.status == 201) this.success.push("Zaktualizowano");
            })
            .catch((error) => {
              this.errors = [];
              this.errors.push(error.message);
            });
        });
    },
  },
  computed: {
    allCheck: function() {
      let good = true;
      Object.keys(this.user).forEach((key) => {
        if (this.user[key] == "" && key != "avatar") good = false;
      });
      if (this.nameCheck != "good") good = false;
      if (this.surnameCheck != "good") good = false;
      if (this.cityCheck != "good") good = false;
      return good;
    },
    nameCheck: function() {
      if (this.user.name.length == 0) return;
      if (
        this.user.name.length <= 20 &&
        this.user.name.charAt(0) == this.user.name.charAt(0).toUpperCase()
      )
        return "good";
      return "wrong";
    },
    surnameCheck: function() {
      if (this.user.surname.length == 0) return;
      if (
        this.user.surname.length <= 40 &&
        this.user.surname.charAt(0) == this.user.surname.charAt(0).toUpperCase()
      )
        return "good";
      return "wrong";
    },
    cityCheck: function() {
      if (this.user.city.length == 0) return;
      if (
        this.user.city.length <= 40 &&
        this.user.city.charAt(0) == this.user.city.charAt(0).toUpperCase()
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

.profile {
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
.success {
  font-weight: 700;
  color: green;
}
@media only screen and (max-width: 650px) {
  
.center-form{
  grid-column: 1/35;
    overflow-x:hidden;
  }
}
</style>
