<template>
  <a
    :href="sponsor.link"
    class="sponsor-card block transform transition duration-500 ease-in-out hover:scale-105 rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-stone-800 to-stone-900">
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
  gsap.fromTo(
    '.sponsor-card',
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power4.out',
    },
  );

  AOS.init({
    once: true,
  });

  AOS.refresh();
});
</script>

<style>
/* Additional styles can be here */
</style>