<template>
  <pre>{{getProfile}}</pre>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MatchesPage",
  computed: {
    ...mapGetters({
      getProfile: "getProfile",
    }),
  },
  async mounted() {
    await this.fetchUserProfile();
  },
  methods: {
    ...mapActions({
      fetchUserProfile: "fetchUserProfile",

    }),


  },
};
</script>
