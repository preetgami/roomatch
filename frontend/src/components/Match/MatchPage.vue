<template>
  <div v-if="profile" class="flex flex-row items-center justify-between">
    <button
      class="w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-transparent hover:bg-babypink hover:text-babypink hover:from-babypink hover:to-coolpink"
      @click="rejectUser"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 50 50"
      >
        <path
          d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"
        ></path>
      </svg>

      <span> Reject</span>
    </button>
    <MatchCard v-if="renderComponent" class="w-full" :profile="profile" />
    <button
      class="w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-transparent hover:bg-babypink hover:text-babypink hover:from-coolyellow hover:to-coolyellow"
      @click="acceptUser"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 50 50"
      >
        <path
          d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z"
        ></path>
      </svg>
      <span>Accept</span>
    </button>
  </div>
  <div v-else class="flex flex-col items-center">
    <h1
      class="text-darkblue inline-block animate-slide-up-fade bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl sm:text-6xl md:text-7xl dark:from-gray-50 dark:to-gray-300 font-bold tracking-tighter text-transparent"
    >
      No recommendations <br />
    </h1>
  </div>
</template>
<script>
import MatchCard from "./MatchCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MatchPage",
  components: { MatchCard },
  data() {
    return {
     renderComponent: true,
      profile: {},
    };
  },
  computed: {
    ...mapGetters({
      getRecommendation: "getRecommendation",
    }),
  },
  async mounted() {
    await this.fetchRecommendation();
    this.profiles();
  },
  methods: {
    ...mapActions({
      fetchRecommendation: "fetchRecommendation",
      likeUser: "likeUser",
      rejectUsers: "rejectUser",
    }),
    async forceRerender() {
      this.renderComponent = false;
      await this.$nextTick();
      this.renderComponent = true;
    },
    async acceptUser() {
      try {
        await this.likeUser(this.profile.uid);
        await this.fetchRecommendation();
        this.profiles();
        await this.forceRerender()

      } catch (e) {}
    },
    profiles() {
      if (this.getRecommendation) {
        this.profile = this.getRecommendation?.recommendations?.[0];
      }
    },
    async rejectUser() {
      try {
        await this.rejectUsers(this.profile.uid);
        await this.fetchRecommendation();
        this.profiles();
        await this.forceRerender()

      } catch (e) {}
    },
  },
};
</script>
