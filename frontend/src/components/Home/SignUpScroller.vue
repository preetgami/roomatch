<template>
  <div class="flex overflow-hidden space-x-11 group">
    <div class="flex space-x-16 animate-loop-scroll group-hover:paused">
      <div class="flex space-x-16 bg-coolpink">
        <h1
          v-for="index in 15"
          :key="index"
          class="text-black inline-block animate-slide-up-fade
          bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text
          p-2 text-lg sm:text-lg md:text-lg font-bold tracking-tighter "
        >
          Sign<span class="text-coolpink">_</span>up<span class="text-coolpink"
            >_</span
          >Now
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name:'SignUpScroller'
}
</script>
