<template>
  <div
    v-for="(service, index) in services"
    :key="index"
    class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform duration-10 ease-in-out"
  >
    <h5
      class="mb-2 text-2xl font-semibold tracking-tight text-darkblue dark:text-darkblue opacity-80"
    >
      <v-icon class="mb-3">{{ service.icon }}</v-icon
      >&emsp;{{ service.title }}
    </h5>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400 ">
      {{ service.description }}
    </p>
  </div>
</template>
<script>
export default{
  data() {
  return {
    services: [
      {
        icon: 'mdi-gesture-swipe',
        title: 'Infinite Swipes',
        description: 'Swipe through potential roommates endlessly without limits.'
      },
      {
        icon: 'mdi-map-marker',
        title: 'Location Restriction',
        description: 'Specify preferred locations to find roommates nearby or in specific areas.'
      },
      {
        icon: 'mdi-calendar',
        title: 'Expected Move-In Date Customization',
        description: 'Set your desired move-in date to find roommates who align with your schedule.'
      },{
        icon: 'mdi-account-group',
        title: 'Compatibility Matching',
        description: 'Find roommates who share similar habits, interests, and lifestyles.'
      },
      {
        icon: 'mdi-email',
        title: 'Messaging',
        description: 'Stay connected with potential roommates via messaging and receive updates.'
      },
       {
        icon: 'mdi-lock',
        title: 'Secure Connections',
        description: 'Ensure your interactions and personal information are kept private and secure.'
      }
    ]
  };
}
}
</script>
