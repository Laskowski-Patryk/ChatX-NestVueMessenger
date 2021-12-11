<template>
  <div class="blob">
    <div class="conversation" :class="sel">
      <div class="avatar">
        <img src="../assets/images/simple-avatar.png" />
      </div>
      <div class="name">{{ name1 }} {{ surname1 }}</div>
      <div class="date">{{ date1 }}</div>
      <div class="lastMessage" :class="seen1 == false ? 'bold' : 'normal'">
        {{ message1 }}
      </div>
    </div>
  </div>
</template>



<script>
import moment from "moment";
export default {
  props: ["name", "surname", "message", "seen", "date", "id","sel"],
  data() {
    return {
      name1: "",
      surname1: "",
      message1: "",
      seen1: "",
      date1: "",
    };
  },

  mounted() {
    this.name1 = this.name;
    this.surname1 = this.surname;
    this.message1 = this.message;
    if (window.localStorage.getItem("userid") == this.id) {
      this.seen1 = true;
    } else {
      this.seen1 = this.seen;
    }
    let time = Date.parse(this.date);
    time -= 2 * 60 * 60 * 1000;
    this.date1 = moment(time).format("DD-MM-YYYY HH:mm");
  },
  watch: {
    seen: function () {
      this.seen1 = this.seen;
    },
    message: function () {
      this.message1 = this.message;
    },
    convID: function () {
      this.convID1 = this.convID;
    },
    selectedID: function () {
      this.selectedID1 = this.selectedID;
    },
  },
};
</script>




<style scoped>
.bold {
  font-weight: 800;
  opacity: 1;
}
.date {
  grid-column: 7/8;
  grid-row: 2;
  font-size: 0.7rem;
  margin-right: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.name {
  margin-top: 10px;
  grid-column: 2/6;
  grid-row: 1;
  font-size: 1.1rem;
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
}
.conversation:hover {
  /* box-shadow: inset 10px 10px 20px #bababa, inset -10px -10px 20px #ffffff; */
  cursor: pointer;
}
.selected{
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