<template>
  <div class="chat-default">
  </div>
</template>



<script>
export default {
  name: "App",
  components: {},
};
</script>




<style>
.chat-default {
  padding:2rem;
  float: left;
  margin-left: clamp(30px, 3vw, 5vw);
  width: clamp(100px, 60vw, 100vw);
  height: 75vh;
  border-radius: 3.125rem;
  background: #e0e0e0;
  box-shadow: inset 0.625rem 0.625rem 1.25rem #bababa, inset -0.625rem -0.625rem 1.25rem #ffffff;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-auto-rows: minmax(2rem, auto);
}
</style>