<template>
  <!-- Footer shaped with Tailwind CSS and animated with AOS and GSAP -->
  <footer
    class="bg-stone-900 border-t-4 border-stone-800 text-stone-200"
    data-aos="fade-up"
    aria-labelledby="footer-heading"
    id="footer"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>

    <!-- Main Content -->
    <div class="mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">

      <!-- Top Section: Logo, Navigation, and Social Links -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-6">
        <!-- Racing Logo -->
        <div class="flex justify-center md:justify-start">
          <RacingIcon />
        </div>

        <!-- Social Links with Icons from FontAwesome -->
        <div class="grid grid-cols-3 gap-4 sm:grid-cols-5 align-middle justify-center md:justify-end">
          <!-- Individual social links with delayed AOS animation -->
          <SocialLink :icon="['fas', 'envelope']" href="mailto:wuracing@gmail.com" label="Email" delay="100" />
          <SocialLink :icon="['fab', 'facebook']" href="https://www.facebook.com/WashURacing/" label="Facebook" delay="200" />
          <SocialLink :icon="['fab', 'instagram']" href="https://www.instagram.com/washuracing/?hl=en" label="Instagram" delay="400" />
          <SocialLink :icon="['fab', 'youtube']" href="https://www.youtube.com/channel/UCDRDocUskdc_wHeQetclQJQ" label="YouTube" delay="300" />
          <SocialLink :icon="['fab', 'linkedin-in']" href="https://www.linkedin.com/company/wash-u-racing/" label="LinkedIn" delay="500" />
        </div>
      </div>

      <!-- Bottom Section: Legal and Additional Info -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm md:text-base">
        <!-- Legal Notice -->
        <span>&copy; {{ new Date().getFullYear() }} WashU Racing - All Rights Reserved</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AOS from 'aos';
import gsap from 'gsap';
import SocialLink from '@/components/SocialLink.vue';
import RacingIcon from '@/components/icons/RacingIcon.vue';

// AOS Initialization
AOS.init();

const animateFooter = () => {
  const footer = document.getElementById('footer');
  gsap.fromTo(footer, {
    y: 50,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'racingBounce',
  });
};

onMounted(() => {
  // Animate footer on page load
  animateFooter();
});
</script>

<style scoped>
/* AOS Base Styles (can be placed in your global styles if required) */
[v-cloak] {
  display: none;
}

aos-init {
  opacity: 0;
}

aos-animate {
  opacity: 1;
}
</style>
