<template>
  <div
    class="mt-32 flex flex-col items-center justify-center text-center sm:mt-40"
  >
    <h1
      class="
    text-darkblue inline-block animate-slide-up-fade 
      bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text 
      p-2 text-2xl 
      sm:text-3xl md:text-3xl dark:from-gray-50 dark:to-gray-300 font-bold tracking-tighter text-transparent "
    >
      Oops... We didn't find anything with that result
    </h1>
    <br />
    <RouterLink to="/">
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Go back home :(
      </button>
    </RouterLink>
  </div>
</template>
<script>
export default{
  name:'NotFoundPage'
}
</script>
