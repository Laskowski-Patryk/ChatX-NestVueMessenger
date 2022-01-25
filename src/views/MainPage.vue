<template>
  <div class="grid">
    <div
      @click="
        search = 0;
        searchSelect = '';
      "
      class="btn-logo"
    >
      <img class="logo-image" src="../assets/images/Logo2.png" />
    </div>
    <div @click="search = !search" class="btn-search">
      <img class="search-image" src="../assets/images/search-image.png" />
    </div>
    <div class="btn-options" id="btn-options" @click="change()">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
    <div class="options fadein" id="options">
      <div class="option-logout" @click="logout">Logout</div>
      <div class="option-profile" @click="profile">Your profile</div>
    </div>
    <div class="main-conversations">
      <div v-for="err in errors" v-bind:key="err" class="errors">{{ err }}</div>
      <div v-if="!search" class="search-toggle">
        <div
          class="main-conversations-holder"
          v-for="conversation in conversations"
          v-bind:key="conversation"
        >
          <MessageBlob
            v-for="conv in conversation"
            v-bind:key="conv[1]"
            :name="conv[0].name"
            :surname="conv[0].surname"
            :avatar="conv[0].avatar"
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
      <div v-if="search" class="search">
        <div style="margin-left:5%;margin-right:5%;margin-top:5%;">
          <input
            type="text"
            class="textBar form-control"
            id="searchBar"
            placeholder="Looking for someone?"
            @keyup="findPeople()"
            v-model="searchArea"
          />
        </div>
        <PersonBlob
          v-for="person in searchResult"
          v-bind:key="person.id"
          :name="person.name"
          :surname="person.surname"
          :city="person.city"
          :avatar="person.avatar"
          :sel="person.id == searchSelect ? 'selected' : 'normal'"
          @click="firstMessage(person.id)"
          class="msg"
        ></PersonBlob>
      </div>
    </div>
    <div class="chat-module">
      <div
        v-if="!searchSelect"
        class="over"
        id="over"
        v-on:scroll="messagesScroll"
      >
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
import MessageBlob from "../components/MessageBlob.vue";
import PersonBlob from "../components/PersonBlob.vue";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment";
import $ from "jquery";
export default {
  name: "App",
  components: {
    MessageBlob,
    PersonBlob,
  },
  data() {
    return {
      search: 0,
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
      searchArea: "",
      searchResult: [],
      searchSelect: 0,
    };
  },
  methods: {
    firstMessage: function(personID) {
      this.searchSelect = personID;
      this.activeUser = personID;
    },
    date: function(date) {
      let time = Date.parse(date);
      time -= 2 * 60 * 60 * 1000;
      return moment(time).format("DD-MM-YYYY HH:mm:ss");
    },
    sendmessage: function(e) {
      e.preventDefault();

      if (this.message == "") return;
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
      if (this.searchSelect) {
        this.socket.emit("msgToServer", {
          sender: this.userID,
          room: "global",
          message: this.searchSelect,
        });
        this.$router.go(0);
      }
    },
    change: function() {
      let x = document.getElementById("btn-options");

      document.getElementById("options").classList.toggle("fadeout");
      document.getElementById("options").classList.toggle("fadein");
      x.classList.toggle("change");
    },
    logout: function() {
      window.localStorage.removeItem("user");
      this.$router.go(0);
    },
    profile: function() {
      this.$router.push("/profile");
    },
    buttonPress: function(el) {
      var timeout = null;

      $("#searchBar").keyup(function() {
        clearTimeout(timeout);

        timeout = setTimeout(function() {}, 500);
      });
    },
    changeConv: function(id) {
      this.conversationID = id;
      this.searchSelect = "";
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
        document.getElementById("over").scrollTop = 999999;
      }, 0);
    },
    position: function(id) {
      if (id == this.userID) return "right";
      return "left";
    },
    findPeople: function() {
      if (this.searchArea != "" && this.searchArea.match(/\S/g).length > 2) {
        axios
          .post("/getProfile", { text: this.searchArea })
          .then((res) => {
            this.searchResult = [];
            if(this.conversations.length > 0){
            res.data.forEach((el) => {
              let add = 1;
              for (let i = 0; i < this.conversations[0].length; i++) {
                if (this.conversations[0][i][0].id == el.id) add = 0;
                console.log(this.conversations[0][i][0].id, el.id);
              }
              if (el.id != this.userID && add == 1) this.searchResult.push(el);
            });
            }else{
              this.searchResult = res.data;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        this.searchResult = [];
      }
    },
    receiveChatMessage(msg) {
      if(msg == this.userID){
        this.$router.go(0);
      }
      
      if (msg.id_conversation && msg.id_conversation == this.conversationID) {
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
    messagesScroll: function(event) {
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

  created: function() {
    function expmod(base, exp, mod) {
      if (exp == 0) return 1;
      if (exp % 2 == 0) {
        return Math.pow(expmod(base, exp / 2, mod), 2) % mod;
      } else {
        return (base * expmod(base, exp - 1, mod)) % mod;
      }
    }
    let g = 4;
    let mod = 12;
    let n = 3;

    this.messagesToLoad = Math.floor(window.innerHeight / 60);
    const options = {
      messagesToLoad: this.messagesToLoad,
      conversationsToLoad: this.conversationsToLoad,
      alreadyLoaded: this.conversations.length,
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
        // this.errors.push(error.response.data.message);
      });

    this.socket = io("http://localhost:3001");

    this.socket.on("msgToClient", (msg) => {
      this.receiveChatMessage(msg);
    });

    this.socket.emit("joinRoom", "global");

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
@import "../assets/css/mainpage.css";
.textBar {
  grid-column: 2/39;
  grid-row: 1;
  margin-top: 1rem;
  height: 3rem !important;
  padding-left: 45px;
  font-size: 18px;
  outline: 0;
  border: 0;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 0.625rem #fff;
}

.textBar:focus {
  outline: 0;
  border: 0;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 0.625rem #fff;
}
</style>
