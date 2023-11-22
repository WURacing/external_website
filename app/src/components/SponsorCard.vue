<template>
  <a
    data-aos="fade-up"
    :href="sponsor.link"
    class="sponsor-card block rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-2xl focus:outline-none bg-gradient-to-r from-stone-800 to-stone-900"
    @mouseenter="animate"
    @mouseleave="resetAnimation"
    @focusin="animate"
    @focusout="resetAnimation">
    <div class="flex justify-between items-center p-4 h-full space-x-4">
      <div class="flex flex-row items-center justify-center">
        <h3 class="font-bold text-lg text-stone-100">{{ sponsor.name }}</h3>
      </div>

      <TierBadge :tier="sponsor.tier" />
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
    scale: 1.1,
    transformOrigin: 'bottom center',
    ease: 'racingBounce',
    duration: 0.2,
  });
};

const resetAnimation = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  gsap.to(card, {
    scale: 1,
    transformOrigin: 'bottom center',
    ease: 'racingBounce',
    duration: 0.2,
  });
};
</script>

<style>
/* Additional styles can be here */
</style>
