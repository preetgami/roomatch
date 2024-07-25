<template>
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
    <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
      <div
        class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img
          class="w-60 h-60 rounded-lg object-cover"
            :src="profile?.pictures?.[1]"
          />
        </a>
        <div class="ml-5">
          <h3
            class="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            <a href="#">{{ profile.name }}</a>
          </h3>
          <span
            class="text-gray-500 dark:text-gray-400"
            >{{ profile.career }}</span
          >
          <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            {{ profile.age }}, {{ profile.location }},
           <ul class="list-disc pl-5 text-gray-600">
          <li v-for="(hobby, index) in profile.hobby" :key="index">
            {{ hobby }}
          </li>
        </ul>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchedList",
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedProfile: null,
    };
  },
  methods: {
    selectProfile(profile) {
      this.selectedProfile = this.selectedProfile === profile ? null : profile;
    }
  }
};
</script>
