<template>
  <div class="min-h-screen">
    <Navbar />

    <RouterView />
    <div class="sticky top-[100vh]">
      <Footerbar />
    </div>
  </div>
</template>
<script>
import { RouterView } from "vue-router";
import Navbar from "./views/Navbar.vue";
import { mapActions } from "vuex";
import Footerbar from "./views/Footerbar.vue";
export default {
  components: {
    Navbar,
    Footerbar,
  },
  data() {
    return {
      auth: null,
      isloggedIn: false,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    ...mapActions({
      fetchUser: "fetchUser",
    }),
  },
};
</script>
