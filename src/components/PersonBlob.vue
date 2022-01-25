<template>
  <div class="blob">
    <div class="conversation" :class="sel">
      
      <div class="avatar">
        <img v-if="!avatar" class= "default-picture" src="../assets/images/simple-avatar.png" />
        <img v-if="avatar" :src="avatar" class="profile-picture"/>
      </div>
      <div class="name">{{ name }} {{ surname }}</div>
      <div class="city">{{ city }}</div>
      <div class="lastMessage" :class="seen1 == false ? 'bold' : 'normal'">
        {{ message1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "surname", "city","avatar","sel"],
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.bold {
  font-weight: 800;
  opacity: 1;
}
.city {
  grid-column: 2/5;
  grid-row: 2;
  font-size: 1rem;
  margin-right: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.name {
  margin-top: 10px;
  grid-column: 2/6;
  grid-row: 1;
  font-size: 1.3rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.lastMessage {
  grid-column: 2/7;
  grid-row: 2;
  opacity: 0.7;
  margin-top: -0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 80%;
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
  overflow: hidden;
}
.conversation:hover {
  /* box-shadow: inset 10px 10px 20px #bababa, inset -10px -10px 20px #ffffff; */
  cursor: pointer;
}
.selected {
  box-shadow: inset 10px 10px 20px #bababa, inset -10px -10px 20px #ffffff !important;
}
.conversation {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
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
.default-picture {
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

.profile-picture {
  width: 100%;
  height: 100%;

  display: block;
  margin-left: auto;
  margin-right: auto;
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
