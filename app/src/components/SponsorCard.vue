<template>
  <a
    data-aos="fade-up"
    :href="sponsor.link"
    class="sponsor-card block rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-2xl focus:outline-none"
    @mouseenter="animate"
    @mouseleave="resetAnimation"
    @focusin="animate"
    @focusout="resetAnimation">
    <div class="flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900">
      <div class="flex items-center">
        <SponsorIcon :tier="sponsor.tier" class="h-8 w-8 text-white mr-2" />
        <h3 class="font-bold text-lg text-white">{{ sponsor.name }}</h3>
      </div>

      <TierBadge :tier="sponsor.tier" />
    </div>
    <!-- Optional content -->
    <div class="aspect-w-16 aspect-h-9 bg-gray-200">
      <!-- Here could be a image or something related to sponsor -->
    </div>
  </a>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import AOS from 'aos';
import { Sponsor, SponsorTier } from '../types/sponsors';
import TierBadge from './TierBadge.vue';

defineProps<{ sponsor: Sponsor }>();

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
  });
});

const animate = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  gsap.to(card, {
    scale: 1.05,
    borderRadius: '1rem',
    transformOrigin: 'bottom center',
    ease: 'power2.out',
  });
};

const resetAnimation = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  gsap.to(card, {
    scale: 1,
    borderRadius: '0.5rem',
    transformOrigin: 'bottom center',
    ease: 'power2.out',
  });
};
</script>

<style>
/* Additional styles can be here */
</style>
