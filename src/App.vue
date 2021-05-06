<template>
  <div>
    <div id="btn-logo">
      <img id="logo-image" src="./assets/images/Logo2.png">
    </div>
    <Chaty></Chaty>
  </div>
</template>

<script>

import Chaty from './components/Chaty'

export default {
  name: 'App',
  components:{
    Chaty
  }
};
</script>

<style>



#app {
  height:96vh;
  width:98vw;
  position: absolute;
  top: 2vh;
  left: 1vw;
  right: 1vw;
  bottom: 0;
  border-radius: 51px;
  background: #e0e0e0;
  box-shadow: inset 10px 10px 21px #5a5a5a,
              inset -10px -10px 21px #ffffff;
}
#btn-logo{
-webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
  cursor:pointer;
  background-color:#e0e0e0;
  margin-top: clamp(30px, 4vh, 100px);
  margin-left: clamp(30px, 3vw, 100px);
  
  min-width:60px;
  min-height:60px;
  max-width:3%;
  max-height:3%;
  border-radius:10px;
  box-shadow:  10px 10px 20px #bababa,
              -10px -10px 20px #ffffff;
}
#logo-image{
  width:80%;
  height:80%;
  margin-top:12%;
  margin-left:16%;
}

</style>