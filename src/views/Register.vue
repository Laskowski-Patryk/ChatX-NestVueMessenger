<template>
  <div class="register">
    <div class="center">
      <h1>Zarejestruj się</h1>
      <h3>lub <router-link to="/signin">Zaloguj</router-link></h3> <!-- SCROLLBAR TODO -->
      <form>
      <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" icon="envelope" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label >Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Podaj Login">
  </div>
  <div class="form-group">
    <label >Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Podaj Hasło">
  </div>
  <div class="form-group">
    <label >Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Podaj Imie">
  </div>
  <div class="form-group">
    <label >Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Podaj Nazwisko">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="user.terms">
    <label class="form-check-label" for="exampleCheck1">Akceptuję regulamin serwisu</label>
  </div>
  <button type="submit">Zarejestruj się</button>
  </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      user: {
        login: "",
        name: "",
        surname: "",
        city: "",
        email: "",
        password: "",
        terms: false,
      }
    };
  },
  computed:{
    checktyped: function(){
      let good = true;
      return good;
    }
  }
};
</script>
<style scoped>
.center {
  position: absolute;
  margin: auto;
  left: clamp(2rem, 40%, 35%);
  top: 8%;
  width: clamp(10%, 35%, 30%);
  height: 86%;
  border-radius: 2vh;
  box-shadow: 10px 10px 20px #bababa, -10px -10px 20px #ffffff;
  box-sizing: border-box;
  padding: clamp(2rem, 3%, 35%);
  overflow: auto;
  padding-top:2rem !important;
}

button{
  margin: 25px 0 0 0;
  width: 100%;
  height: 50px;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  background: #dde1e7;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 25px;
  opacity: 0.8;
  box-shadow: 2px 2px 5px #bababa,
              -5px -5px 10px #ffffff;
}

button:focus{
  color: #3498db;
  box-shadow: inset 2px 2px 5px #bababa,
              inset -5px -5px 10px #ffffff;
}
.form-control{
  height:3rem !important;
  height: 100%;
  width: 100%;
  padding-left: 45px;
  font-size: 18px;
  outline: none;
  border: none;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc,
              inset -5px -5px 10px #ffffff;
}
.form-control input:focus ~ label{
  box-shadow: inset 2px 2px 5px #babecc,
              inset -1px -1px 2px #ffffff;
}

</style>