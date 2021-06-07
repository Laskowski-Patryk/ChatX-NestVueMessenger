<template>
  <div>
    <div class= "btn-logo" >
      <img class="logo-image"  src="./assets/images/Logo2.png">
    </div>
    <div class= "btn-options">
    </div>
    <div class="main-conversations">
        <MessageBlob></MessageBlob> 
    </div>
    <div class="chat-module">
        <ChatModule></ChatModule> 
    </div>
  </div>
</template>

<script>

import MessageBlob from './components/MessageBlob'
import ChatModule from './components/ChatModule'
export default {
  name: 'App',
  components:{
    MessageBlob,
    ChatModule
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
  border-radius: 5vh;
  background: #e0e0e0;
  box-shadow: inset 10px 10px 21px #5a5a5a,
              inset -10px -10px 21px #ffffff;
}
.btn-logo{
  float:left;
  cursor:pointer;
  background-color:#e0e0e0;
  margin-top: clamp(30px, 4vh, 100px);
  margin-left: clamp(30px, 3vw, 100px);
  
  min-width:60px;
  min-height:60px;
  max-width:3%;
  max-height:3%;
  border-radius:2vh;
  box-shadow:  10px 10px 20px #bababa,
             -10px -10px 20px #ffffff;
}
.btn-options{
  cursor:pointer;
  background-color:#e0e0e0;
  margin-top: clamp(30px, 4vh, 100px);
  margin-right: clamp(30px, 3vw, 100px);
  margin-bottom: 40px;
  min-width:60px;
  min-height:60px;
  max-width:3%;
  max-height:3%;
  border-radius:2vh;
box-shadow:  6px 6px 16px #bebebe,
             -6px -6px 16px #ffffff;
  float:right;
}
.logo-image{
  width:80%;
  height:80%;
  margin-top:12%;
  margin-left:16%;
      -webkit-user-drag: none;
    -khtml-user-drag: none;
     -moz-user-drag: none;
    -o-user-drag: none;
   -webkit-user-drag: none;
}
.main-conversations{
    clear:both;
    float:left;
    margin-left: clamp(30px, 3vw, 100px);
    width: clamp(500px, 30vw, 400vw);
    height:75vh;
    border-radius: 50px;
    background: #e0e0e0;
    box-shadow: inset 10px 10px 20px #bababa,
                inset -10px -10px 20px #ffffff;
    
}
.btn-options:active , .btn-logo:active{
box-shadow:  inset 6px 6px 16px #bebebe,
             inset -6px -6px 16px #ffffff;
}
</style>