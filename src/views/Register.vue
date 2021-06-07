<template>
  <div class="register">
    <div class="center">
      <h1>Zarejestruj się</h1><br/>
      <form>
      <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Akceptuję regulamin serwisu</label>
  </div>
  <button type="submit" class="btn btn-primary" >Zarejestruj się</button>
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
        password: ""
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
  left: 35%;
  top: 10%;
  width: 30%;
  height: 80%;
  border-radius: 2vh;
  box-shadow: 10px 10px 20px #bababa, -10px -10px 20px #ffffff;
  box-sizing: border-box;
  padding: 3%;
}
</style>