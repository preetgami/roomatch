<template>
  <section v-if="getMatches?.length!==0" class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h2
        class="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white"
      >
        Your Matches
      </h2>
    </div>
    <div class="w-full max-w-5xl grid grid-cols-2 gap-4 ">
      <div v-for="(profile, index) in getMatches" :key="index" class="mb-4">
        <MatchedList class="w-[800px]" :profile="profile" />
      </div>
    </div>
  </section>
  <div v-else class="flex flex-col items-center">
    <h1
      class="text-darkblue inline-block animate-slide-up-fade bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl sm:text-6xl md:text-7xl dark:from-gray-50 dark:to-gray-300 font-bold tracking-tighter text-transparent"
    >
      : ( No matches <br />
    </h1>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import MatchedList from "./MatchedList.vue";
export default {
  name: "MatchedPage",
  components:{
    MatchedList
  },
  computed: {
    ...mapGetters({
      getMatches: "getMatches",
    }),
  },
  async mounted() {
    await this.fetchMatches();
  },

  methods: {
    ...mapActions({
      fetchMatches: "fetchMatches",
    }),
  },
};
</script>
