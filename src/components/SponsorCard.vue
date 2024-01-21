<template>
  <a
    :href="sponsor.link"
    class="sponsor-card block transform transition duration-500 ease-in-out hover:scale-105 rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-stone-800 to-stone-900">
    <div class="flex justify-between items-center p-6 h-full space-x-6">
      <div class="flex flex-row items-center justify-center">
        <img
          :src="sponsor.imagePath || 'https://placehold.co/600x400'"
          :class="logoSizeClass(sponsor.tier)"
          :alt="sponsor.name + ' Logo'"
          class="rounded-full mr-6 border-2 border-white">
        <div>
          <h3 class="font-bold text-lg text-stone-100 hover:text-stone-200 transition-colors duration-200">{{ sponsor.name }}</h3>
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
import { type Sponsor, type SponsorTier } from '../types/Sponsors';
import TierBadge from './TierBadge.vue';

defineProps<{ sponsor: Sponsor }>();

const logoSizeClass = (tier: SponsorTier) => {
  switch (tier) {
    case 'Bronze':
      return 'w-12 h-12';
    case 'Silver':
      return 'w-16 h-16';
    case 'Gold':
    case 'Platinum':
    case 'Diamond':
      return 'w-20 h-20';
    default:
      return 'w-12 h-12';
  }
};

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
.sponsor-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
../types/Sponsors