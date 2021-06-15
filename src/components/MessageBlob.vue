<template>
  <div class="blob">
    
    <div class="conversation">
      <div class="avatar">
      <img src="../assets/images/simple-avatar.png" />
    </div>
      <div class="name">{{name}} {{surname}}</div>
      <div class="lastMessage">{{message}}</div>
    </div>
  </div>
</template>



<script>
export default {
props: ['name','surname','message'],
beforeCreate(){

}
};

</script>




<style scoped>
.name {
  margin-top: 10px;
  grid-column: 2/6;
  grid-row: 1;
  font-size:1.1rem;
}
.lastMessage{
  grid-column: 2/6;
  grid-row: 2;
  opacity: .7;
  margin-top:-.5rem;
}
.avatar {
  width: 80px;
  height: 80px;
  margin-left: -1.6rem;
  border-radius: 50%;
  background: #e0e0e0;
  box-shadow: 10px 10px 20px #bababa, -10px -10px 20px #ffffff;
  grid-column: 1;
  grid-row: 1;
}
.conversation:hover {
  box-shadow: inset 10px 10px 20px #bababa, inset -10px -10px 20px #ffffff;
  cursor: pointer;
}

.conversation {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: black;
  width: 85%;
  height: 80px;
  margin-left: 8%;
  margin-top: 40px;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow: 10px 10px 20px #bababa, -10px -10px 20px #ffffff;
  display: grid;
  grid-template-columns: repeat(2, 80px);
  grid-auto-rows: minmax(2rem, auto);
}
.avatar > img {
  width: 70%;
  height: 70%;

  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -webkit-user-drag: none;
}
.blob {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>