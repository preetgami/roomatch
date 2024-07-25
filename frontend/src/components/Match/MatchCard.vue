<template>
  <div class="w-full flex flex-col items-center justify-center">
    <div
      class="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
    >
      <div
        :style="{ backgroundImage: 'url(' + profile?.pictures?.[1] + ')' }"
        class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
      >
        <div
          class="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50"
        ></div>
      </div>

      <div class="relative p-6 px-6 py-14 md:px-12">
        <h2
          class="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased"
        ></h2>
        <h5
          class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400"
        >
          {{ profile.name }}, {{ profile.age }}
        </h5>
        <h5
          class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400"
        >
          {{ profile.career }}, {{ profile.location }}
        </h5>

        <img
          :src="profile?.pictures?.[0]"
          :alt="profile.name"
          class="relative inline-block h-[74px] w-[74px] !rounded-full border-2 border-white object-cover object-center"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MatchCard",
  props: {
    profile: Object,
  },
};
</script>
