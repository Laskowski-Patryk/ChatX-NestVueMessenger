<template>
  <div class="profile">
    <div class="center-form">
      <table>
        <td><strong>Name</strong></td>
        <td><strong>Surname</strong></td>
        <td><strong>Email</strong></td>
        <td><strong>City</strong></td>
        <td><strong>Avatar</strong></td>
        <td><strong>Banned</strong></td>
        <td><strong>Deleted</strong></td>
        <tr
          v-for="user in users.slice(
            pageNumber * onPage - onPage,
            pageNumber * onPage
          )"
          v-bind:key="user"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.city }}</td>
          <td style="max-width:5rem; text-overflow: ellipsis; overflow:hidden;" v-if="user.avatar">{{ user.avatar }}</td>
          <td v-else>none</td>
          <td>
            <input
              :id="user._id + 'banned'"
              type="checkbox"
              @change="update(user._id,'banned')"
              :checked="user.banned"
            />
          </td>
          <td>
            <input
              :id="user._id + 'deleted'"
              type="checkbox"
              @change="update(user._id,'deleted')"
              :checked="user.deleted"
            />
          </td>
        </tr>
      </table>

      <div class="options">
        <div class="option-profile" @click="pgn(1)">Next Page</div>
        Page: {{ pageNumber }} of {{ Math.ceil(users.length / onPage) }}
        <div class="option-profile" @click="pgn(-1)">Previous Page</div>
      </div>
      <div class="options">
        <div class="option-profile" @click="save">Save Changes</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "AdminPanel",
  components: {},
  data() {
    return {
      errors: [],
      success: [],
      users: [],
      onPage: 5,
      pageNumber: 1,
    };
  },
  mounted() {
    axios
      .get("/allUsers")
      .then((response) => {
        response.data.forEach((element) => {
          if(element._id != window.localStorage.getItem("userid"))
          this.users.push(element);
        });
      })
      .catch((error) => {
        this.errors.push(error.message);
      });
  },
  methods: {
    pgn: function(x) {
      if (x == -1 && this.pageNumber == 1) return;
      if (this.pageNumber * this.onPage > this.users.length && x == 1) return;
      else {
        this.pageNumber += x;
      }
    },

    update: function(id,name) {
      let value = 0;
      if(document.getElementById(id + name).checked == true)
      value = 1;
      const usr = {
        id,
        name,
        value
      }
      axios
        .post("/updateUserById", usr)
        .then((response) => {
          if (response.status == 201) this.success.push("Zaktualizowano");
        })
        .catch((error) => {
          console.log(error)
        });
        this.$router.go(0);
    },

  },
  computed: {},
};
</script>
<style scoped>
.center-form {
  /* max-height: 92%; */
  border-radius: 2vh;
  box-shadow: 0.625rem 0.625rem 1.25rem #bababa,
    -0.625rem -0.625rem 1.25rem #ffffff;
  box-sizing: border-box;
  padding: 4.75%;
  overflow: auto;
  padding-top: 2rem !important;
  height: auto;
}

@media screen and (min-width: 1281px) {
  .center-form {
    grid-column: 2/12;
  }
}

@media screen and (max-width: 1280px) {
  .center-form {
    grid-column: 2/12;
  }
}

.profile {
  padding: clamp(2rem, 2%, 5rem);
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: min-content;
  max-height: 20rem;
}
table,
tr {
  border: 1px solid black;
}
table {
  border-collapse: separate;
  border-spacing: 10px;
  width: 50%;
  margin: 0 auto;
}
.option-profile {
  border-collapse: separate;
  border-spacing: 10px;
  margin-top: 2rem;
  width: 20%;
  margin: 0 auto;
}
.options {
  margin-top: 1rem;
}
.page {
  border-collapse: separate;
  border-spacing: 10px;
  margin-top: 2rem;
  width: 3rem;
  margin: 0 auto;
}
</style>
