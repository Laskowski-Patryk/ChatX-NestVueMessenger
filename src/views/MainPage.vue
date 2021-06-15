<template>
  <div class="grid">
    <div class="btn-logo">
      <img class="logo-image" src="../assets/images/Logo2.png" />
    </div>
    <div class="btn-options" @click="logout"></div>
    <div class="main-conversations">
      <div v-for="err in errors" v-bind:key="err" class="errors">{{ err }}</div>
      <div v-for="conversation in conversations" v-bind:key="conversation">
        <MessageBlob
          v-for="conv in conversation"
          v-bind:key="conv"
          :name="conv[0].name"
          :surname="conv[0].surname"
          :message="conv[1].message"
          @click="changeConv(conv[1].id_conversation)"
          class="msg"
        ></MessageBlob>
      </div>
    </div>
    <div class="chat-module">
      
      <div
        v-for="msg in messages"
        v-bind:key="msg"
        class = "message"
        :class="position(msg.id_user)"
      >
      <div class="st">
        {{ msg.message }}
        </div>
      </div>
      <input type = "text" class="textBar form-control">
    </div>
  </div>
</template>
 
<script>
import MessageBlob from "../components/MessageBlob";
import axios from "axios";

export default {
  name: "App",
  components: {
    MessageBlob,
  },
  data() {
    return {
      errors: [],
      userID: window.localStorage.getItem("userid"),
      conversations: [],
      messages: [],
      conversationID: null,
    };
  },
  methods: {
    logout: function () {
      window.localStorage.removeItem("user");
      this.$router.go();
    },
    changeConv: function (id) {
      this.conversationID = id;
      this.messages = [];
      console.log(this.conversations[0][0]);
      for (let i = 0; i < this.conversations[0].length; i++) {
        for (let j = 1; j < this.conversations[0][i].length; j++) {
          if (this.conversations[0][i][j].id_conversation == id)
            this.messages.push(this.conversations[0][i][j]);
        }
      }
      this.messages.reverse();
    },
    position: function (id) {
      if (id == this.userID) return "right";
      return "left";
    },
  },
  beforeCreate() {
    axios
      .get("message/loadAll")
      .then((res) => {
        let i = 0;
        this.conversations.push(res.data);
        res.data[0].forEach((element) => {
          if (i != 0) this.messages.push(element);
          i++;
        });
        this.conversationID = res.data[0][1].id_conversation;
        this.messages.reverse();
      })
      .catch((error) => {
        this.errors.push(error.response.data.message);
      });
  },
  computed: {},
};
</script>

<style scoped>
.textBar{
  margin-top:1rem;
  height: 3rem !important;
  height: 100%;
  width: 100%;
  padding-left: 45px;
  font-size: 18px;
  outline: none;
  border: none;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 0.625rem #ffffff;

}
.textBar:focus{
  border: 0px solid red;
  box-shadow: 0 0 0px red;
}
.st{
  border-radius: 2vh;
  position:relative;
  padding:.7rem;
  margin-top:1rem;
  box-shadow: 6px 6px 16px #bebebe, -6px -6px 16px #ffffff;
  display: inline-block;
}
.right {
  text-align: right;
}
.grid {
  height: 100%;
  padding: 2.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 2rem;
  grid-template-rows: repeat(12, 1fr);
  row-gap: 2rem;
}
.btn-logo {
  grid-column: 1;
  grid-row: 1;
  cursor: pointer;
  background-color: #e0e0e0;

  min-width: 60px;
  min-height: 60px;
  max-width: 2rem;
  max-height: 2rem;
  border-radius: 2vh;
  box-shadow: 0.625rem 0.625rem 1.25rem #bababa,
    -0.625rem -0.625rem 1.25rem #ffffff;
}
.btn-options {
  grid-column: 13;
  grid-row: 1;
  cursor: pointer;
  background-color: #e0e0e0;
  min-width: 60px;
  min-height: 60px;
  max-width: 3%;
  max-height: 3%;
  border-radius: 2vh;
  box-shadow: 6px 6px 16px #bebebe, -6px -6px 16px #ffffff;
}

.logo-image {
  width: 80%;
  height: 80%;
  margin-top: 12%;
  margin-left: 16%;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -webkit-user-drag: none;
}
.msg {
  margin-left: 1rem;
}
.main-conversations {
  padding: 0.5rem;
  grid-column: 1/5;
  grid-row: 2/13;
  border-radius: 3.125rem;
  background: #e0e0e0;
  box-shadow: inset 0.625rem 0.625rem 1.25rem #bababa,
    inset -0.625rem -0.625rem 1.25rem #ffffff;
  /* overflow: auto; */
}
.chat-module {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow: auto;
  grid-column: 5/14;
  grid-row: 2/13;
  padding: 2rem;
  border-radius: 3.125rem;
  background: #e0e0e0;
  box-shadow: inset 0.625rem 0.625rem 1.25rem #bababa,
    inset -0.625rem -0.625rem 1.25rem #ffffff;
}
.btn-options:active,
.btn-logo:active {
  box-shadow: inset 6px 6px 16px #bebebe, inset -6px -6px 16px #ffffff;
}
</style>