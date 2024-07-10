<template>
  <!-- HTML -->

  <div
    class="mt-32 flex flex-col items-center justify-center text-center sm:mt-40"
  >
    <TopHomePage />
    <br /><br />
    <SignupScroller />
    <br /><br /><br />
    <div class="grid grid-cols-2 gap-4">
      <OurServices />
    </div>
    <br /><br /><br /><br /><br />
  </div>
</template>
<script>
import OurServices from "./OurServices.vue";
import TopHomePage from "./TopHomePage.vue";
import SignupScroller from "./SignUpScroller.vue";

export default {
  name: "HomePage",
  components: {
    OurServices,
    SignupScroller,
    TopHomePage,
  },
};
</script>
