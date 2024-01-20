<template>
  <a data-aos="fade-up" :href="sponsor.link"
    class="sponsor-card block rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-2xl focus:outline-none bg-gradient-to-r from-stone-800 to-stone-900">
    <div class="flex justify-between items-center p-4 h-full space-x-4">
      <div class="flex flex-row items-center justify-center">
        <img :src="sponsor.imagePath" alt="Sponsor Logo" class="w-16 h-16 rounded-full mr-4">
        <div>
          <h3 class="font-bold text-lg text-stone-100">{{ sponsor.name }}</h3>
          <TierBadge :tier="sponsor.tier" />
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import AOS from 'aos';
import { type Sponsor, type SponsorTier } from '../types/sponsors';
import TierBadge from './TierBadge.vue';

defineProps<{ sponsor: Sponsor }>();

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
  });
});
</script>

<style>
/* Additional styles can be here */
</style>