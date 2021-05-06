<template>
    <div id="main-conversations">
        <MessageBlob></MessageBlob>

    </div>
</template>



<script>
import MessageBlob from './MessageBlob.vue';

export default {
  name: 'App',
  components:{
    MessageBlob
  }
};
</script>




<style>
#main-conversations{
    margin-top: clamp(40px, 4vh, 100px);
    margin-left: clamp(30px, 3vw, 100px);
    width: clamp(300px, 30vw, 600px);
    height:75vh;
    border-radius: 50px;
    background: #e0e0e0;
    box-shadow: inset 10px 10px 20px #bababa,
                inset -10px -10px 20px #ffffff;
}
</style>