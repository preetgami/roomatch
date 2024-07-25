<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Update profile
        {{ updated ? "✅" : "" }}
      </h2>
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <div class="sm:col-span-2">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name</label
          >
          <input
            type="text"
            v-model="profile.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type your name"
            required=""
          />
        </div>
        <div class="w-full">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Age</label
          >
          <input
            type="number"
            v-model="profile.age"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Age"
          />
        </div>
        <div class="w-full">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Location</label
          >
          <input
            type="text"
            v-model="profile.location"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Location"
          />
        </div>
        <div class="w-full">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Career</label
          >
          <input
            type="text"
            v-model="profile.career"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Career"
          />
        </div>
        <div class="w-full">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Hobby</label
          >
          <input
            type="text"
            v-model="newHobby"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Add Hobby"
            @keyup.enter="addHobby"
          />
        </div>
        <div v-if="profile.hobby.length > 0">
          <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Hobbies:
          </h3>
          <ul
            class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
          >
            <li
              v-for="(hobby, index) in profile.hobby"
              :key="index"
              @click="deleteHobby(index)"
              class="cursor-pointer group relative py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <span>{{ hobby }}</span>
              <span
                class="hidden group-hover:block absolute top-0 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded-lg mt-2"
              >
                Delete
              </span>
            </li>
          </ul>
          <p class="text-red-500" v-if="diasbleAdding">No more allowed</p>
        </div>
        <form id="imageForm">
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            @change="checkFile"
          />
        </form>
      </div>
      <h2 class="text-lg font-semibold mb-2">Pictures:</h2>

      <div class="flex flex-wrap gap-4 pb-4">
        <div v-for="(url, index) in profile.pictures" :key="index" class="w-48">
          <img
            :src="url"
            alt="Picture"
            class="rounded-lg shadow-md object-cover w-full h-48"
          />
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <button
          @click="update"
          class="text-white text-black bg-coolpink focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Update Profile
        </button>
        <button
          :disabled="!imageSelected"
          class="disabled:bg-gray-400 disabled:pointer-events-none text-white bg-coolpink focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          @click="submit"
        >
          Upload Image
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProfilePage",
  data() {
    return {
      profile: {
        name: "",
        age: "",
        location: "",
        career: "",
        hobby: [],
      },
      updated: false,
      diasbleAdding: false,
      diasbleAddingPics: false,
      newHobby: "",
      imageSelected: false,
    };
  },
  computed: {
    ...mapGetters({
      getProfile: "getProfile",
    }),
  },
  async mounted() {
    await this.fetchUserProfile();
    if (this.getProfile?.user.length >= 1) {
      this.profile = this.getProfile.user[0];
    }
  },
  methods: {
    ...mapActions({
      createUser: "createUser",
      updateUser: "updateUser",
      fetchUserProfile: "fetchUserProfile",
      uplaod: "uploadImage",
    }),
    checkFile(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.imageSelected = true;
      } else {
        this.imageSelected = false;
      }
    },
    addHobby() {
      if (this.profile.hobby.length >= 6) {
        this.diasbleAdding = true;
        return;
      }
      if (this.newHobby.trim() !== "") {
        this.profile.hobby.push(this.newHobby);
        this.newHobby = "";
      }
    },
    deleteHobby(i) {
      this.profile.hobby.splice(i, 1);
    },
    async submit() {
      if (this.imageSelected) {
        event.preventDefault();
        const file = imageInput.files[0];
        if (this.profile.pictures.length >= 5) {
          this.diasbleAddingPics = true;
          return;
        }
        await this.uplaod({ file });
        await this.fetchUserProfile();
      }
    },
    async update() {
      await this.updateUser(this.profile);
      this.updated = true;
      await this.fetchUserProfile();
    },
  },
};
</script>
