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
          :date="conv[1].send_date"
          :seen="conv[1].seen"
          :id="conv[1].id_user"
          @click="changeConv(conv[1].id_conversation)"
          class="msg"
        ></MessageBlob>
      </div>
    </div>
    <div class="chat-module">
      <div class="over">
        <div
          v-for="(msg, index) in messages"
          v-bind:key="index"
          class="message"
          :class="position(msg.id_user)"
        >
          <div class="st" :id="index === messages.length - 1 ? 'last' : ''">
            {{ msg.message }}
          </div>
        </div>
      </div>
      <form>
        <div class="bottomBar">
          <input
            type="text"
            class="textBar form-control"
            placeholder="Type your message here..."
            v-model="message"
          />
          <div class="btn-send">
            <img src="../assets/images/Logo2.png" />
          </div>
        </div>
        <input
          type="submit"
          value=""
          @click="sendmessage"
          style="display: none"
        />
      </form>
    </div>
  </div>
</template>
 
<script>
import MessageBlob from "../components/MessageBlob";
import axios from "axios";
import io from "socket.io-client";
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
      message: "",
      conversationID: null,
      activeUser: null,
      socket: null,
    };
  },
  methods: {
    sendmessage: function (e) {
      e.preventDefault();

      if (message == "") return;
      let message = { msg: this.message, user2: this.activeUser };
      axios
        .post("message/send", message)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    },
    logout: function () {
      window.localStorage.removeItem("user");
      this.$router.go();
    },
    changeConv: function (id) {
      this.conversationID = id;
      this.socket.emit("msgToServer", id);
      this.messages = [];
      for (let i = 0; i < this.conversations[0].length; i++) {
        for (let j = 1; j < this.conversations[0][i].length; j++) {
          if (this.conversations[0][i][j].id_conversation == id) {
            this.messages.push(this.conversations[0][i][j]);
            this.activeUser = this.conversations[0][i][0].id;
          }
        }
      }
      if (
        this.messages[0].seen == false &&
        this.messages[0].id_user != this.userID
      ) {
        this.messages[0].seen = true;
        let oo = { msgID: this.messages[0]._id };
        axios
          .post("message/makeasseen", oo)
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      }
      this.messages.reverse();

      setTimeout(() => {
        document.getElementById("last").scrollIntoView();
      }, 0);
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
        res.data.sort((a, b) => {
          if (a[1].send_date > b[1].send_date) {
            return 1;
          } else return -1;
        });

        this.conversations.push(res.data.reverse());
        res.data[0].forEach((element) => {
          if (i == 0) this.activeUser = element.id;
          if (i != 0) this.messages.push(element);
          i++;
        });
        this.conversationID = res.data[0][1].id_conversation;
        if (
          this.messages[0].seen == false &&
          this.messages[0].id_user != this.userID
        ) {
          let oo = { msgID: this.messages[0]._id };
          axios
            .post("message/makeasseen", oo)
            .then((res) => {})
            .catch((error) => {
              console.log(error);
            });
          this.messages[0].seen = true;
        }
        this.messages.reverse();
        setTimeout(() => {
          document.getElementById("last").scrollIntoView();
        }, 0);
      })
      .catch((error) => {
        this.errors.push(error.response.data.message);
      });
  },
  created: function () {

    this.socket = io("http://localhost:3001");
    for(const )
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  },
};
</script>

<style scoped>
.bottomBar {
  display: grid;
  grid-template-columns: repeat(40, 1fr);
  margin-bottom: 1.3rem;
}
.btn-send > img {
  max-width: 2rem;
  max-height: 2rem;
  margin-top: 0.5rem;
  margin-left: 0.75rem;
}
.btn-send {
  cursor: pointer;
  grid-column: 39;
  grid-row: 1;
  margin-top: 1rem;
  margin-left: 0.3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow: 10px 10px 20px #aaaaaa, -10px -10px 20px #ffffff;
}
.textBar {
  grid-column: 2/39;
  grid-row: 1;
  margin-top: 1rem;
  height: 3rem !important;
  padding-left: 45px;
  font-size: 18px;
  outline: none;
  border: none;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 0.625rem #ffffff;
}
.textBar:focus {
  outline: none;
  border: none;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 0.625rem #ffffff;
}

.st {
  max-width: 60%;
  border-radius: 2vh;
  position: relative;
  padding: 0.7rem;
  margin-top: 1rem;
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
}
.over {
  overflow-y: auto;
  padding: 2rem;
  padding-bottom: 1rem;
}
.chat-module {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow: auto;
  grid-column: 5/14;
  grid-row: 2/13;

  border-radius: 3.125rem;
  background: #e0e0e0;
  box-shadow: inset 0.625rem 0.625rem 1.25rem #bababa,
    inset -0.625rem -0.625rem 1.25rem #ffffff;
}
.btn-options:active,
.btn-send:active,
.btn-logo:active {
  box-shadow: inset 6px 6px 16px #bebebe, inset -6px -6px 16px #ffffff;
}
</style>