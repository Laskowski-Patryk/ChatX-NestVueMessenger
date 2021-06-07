<template>
  <div class="chat-default"></div>
</template>



<script>
export default {
  name: "App",
  components: {},
};
</script>




<style>
.chat-default {
  float: left;
  margin-left: clamp(30px, 3vw, 5vw);
  width: clamp(100px, 60vw, 100vw);
  height: 75vh;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: inset 10px 10px 20px #bababa, inset -10px -10px 20px #ffffff;
}
</style>