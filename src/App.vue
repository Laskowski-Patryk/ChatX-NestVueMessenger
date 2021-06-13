<template>
  <vue-recaptcha sitekey="Your key here"></vue-recaptcha>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
.grecaptcha-badge { visibility: hidden; }
</style>