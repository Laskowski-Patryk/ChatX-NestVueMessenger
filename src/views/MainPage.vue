<template>
  <div class="grid">
    <div class="btn-logo">
      <img class="logo-image" src="../assets/images/Logo2.png" />
    </div>
    <div class="btn-options" id="btn-options" @click="change()">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
    <div class="options fadein" id="options">
      <div class="option-logout" @click="logout">Logout</div>
    </div>
    
    <div class="main-conversations">
      <div v-for="err in errors" v-bind:key="err" class="errors">{{ err }}</div>
      <div class="main-conversations-holder" v-for="conversation in conversations" v-bind:key="conversation">
      
        <MessageBlob
          v-for="conv in conversation"
          v-bind:key="conv[1]"
          :name="conv[0].name"
          :surname="conv[0].surname"
          :message="conv[1].message"
          :date="conv[1].send_date"
          :seen="conv[1].seen"
          :id="conv[1].id_user"
          :sel="
            conv[1].id_conversation == conversationID ? 'selected' : 'normal'
          "
          @click="changeConv(conv[1].id_conversation)"
          class="msg"
        ></MessageBlob>
     
    </div>
    </div>
    <div class="chat-module">
      <div class="over" id="over" v-on:scroll="handleScroll">
        <div
          v-for="(msg, index) in messages"
          v-bind:key="msg"
          class="message"
          :class="position(msg.id_user)"
        >
          <div
            class="st"
            :title="date(msg.send_date)"
            :id="index === messages.length - 1 ? 'last' : ''"
          >
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
          <div class="btn-send" @click="sendmessage">
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
import moment from "moment";
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
      scrollTop: null,
      conversationsToLoad: 6,
      messagesToLoad: 12,
    };
  },
  methods: {
    date: function (date) {
      let time = Date.parse(date);
      time -= 2 * 60 * 60 * 1000;
      return moment(time).format("DD-MM-YYYY HH:mm:ss");
    },
    sendmessage: function (e) {
      e.preventDefault();

      if (message == "") return;
      let message = {
        msg: this.message,
        user: this.userID,
        user2: this.activeUser,
      };
      this.socket.emit("msgToServer", {
        sender: this.userID,
        room: this.conversationID,
        message: message,
      });
      this.message = "";
    },
    change: function () {
      let x = document.getElementById("btn-options");
      document.getElementById("options").classList.toggle("fadeout");
      document.getElementById("options").classList.toggle("fadein");
      x.classList.toggle("change");
    },
    logout: function () {
      window.localStorage.removeItem("user");
      this.$router.go();
    },
    changeConv: function (id) {
      this.conversationID = id;
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
    receiveChatMessage(msg) {
      if (msg.id_conversation == this.conversationID) {
        this.messages.push(msg);
        setTimeout(() => {
          document.getElementById("last").scrollIntoView();
        }, 0);
        for (let i = 0; i < this.conversations[0].length; i++) {
          if (
            this.conversations[0][i][1].id_conversation == msg.id_conversation
          ) {
            msg.seen = true;
            this.conversations[0][i].splice(1, 0, msg);
            this.conversations[0].sort((a, b) => {
              if (a[1].send_date < b[1].send_date) {
                return 1;
              } else return -1;
            });
            return;
          }
        }
      } else {
        for (let i = 0; i < this.conversations[0].length; i++) {
          if (
            this.conversations[0][i][1].id_conversation == msg.id_conversation
          ) {
            this.conversations[0][i].splice(1, 0, msg);
            this.conversations[0].sort((a, b) => {
              if (a[1].send_date < b[1].send_date) {
                return 1;
              } else return -1;
            });
            return;
          }
        }
      }
    },
    handleScroll: function (event) {
      if (document.getElementById("over").scrollTop == 0) {
        document.getElementById("over").scrollTop = 1;

        const options = {
          conversation: this.conversationID,
          messagesToLoad: this.messagesToLoad,
          alreadyLoaded: this.messages.length,
        };
        axios
          .post("message/scrollLoad", options)
          .then((res) => {
            let index = 0;
            for (let i = 0; i < this.conversations[0].length; i++) {
              if (
                this.conversations[0][i][1].id_conversation ==
                res.data[0].id_conversation
              ) {
                index = i;
                break;
              }
            }
            res.data.forEach((element) => {
              this.messages.unshift(element); // TODO save load to conversation
              this.conversations[0][index].push(element);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  beforeCreate() {},
  created: function () {
    const options = {
      messagesToLoad: this.messagesToLoad,
      conversationsToLoad: this.conversationsToLoad,
      alreadyLoaded: this.messages.length,
    };
    axios
      .post("message/loadAll", options)
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
          this.messages[0].seen = true;
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

    this.socket = io("http://localhost:3001");
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });

    this.socket.on("msgToClient", (msg) => {
      this.receiveChatMessage(msg);
    });

    axios
      .get("conversation/getAll")
      .then((res) => {
        for (const data of res.data) this.socket.emit("joinRoom", data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.fadein{
  opacity:0;
  transition:opacity .5s ease-in;
    -webkit-transition: opacity .5s  ease-in;
       -moz-transition: opacity .5s  ease-in;
         -o-transition: opacity .5s  ease-in;
  visibility: hidden;
}

.fadeout{
  opacity:1;
}

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
.options {
  margin: auto;
  grid-column: 12;

  -webkit-transition: all .3s linear 0s;
  transition: all .3s linear 0s;
}



.option-logout {
  cursor: pointer;
  width: 7rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  border-radius: 2rem;
  box-shadow: 6px 6px 16px #bebebe, -6px -6px 16px #ffffff;
}

.st {
  text-align: left;
  max-width: 60%;
  border-radius: 2vh;
  position: relative;
  padding: 0.7rem;
  margin-top: 1rem;
  box-shadow: 6px 6px 16px #bebebe, -6px -6px 16px #ffffff;
  display: inline-block;
  overflow: hidden;
}
.right {
  text-align: right;
}
.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

.change{
  box-shadow: inset 6px 6px 16px #bebebe, inset -6px -6px 16px #ffffff !important;
}
/* Rotate first bar */
.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

/* Fade out the second bar */
.change .bar2 {
  opacity: 0;
}

/* Rotate last bar */
.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
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
  padding: 0.75rem;
  display: inline-block;
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
.main-conversations-holder{
  width:100%;
  height:100%;
  overflow-y: auto;
  overflow-x: hidden;

}
.main-conversations {
  overflow: auto;
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
  overflow-x: hidden;
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
.btn-logo:active,
.option-logout:active {
  box-shadow: inset 6px 6px 16px #bebebe, inset -6px -6px 16px #ffffff;
}
.option-logout:hover,
.btn-options:hover,
.btn-logo:hover {
  background-color: #e9e9e9;
}
</style>