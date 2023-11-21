<template>
  <a
    :href="sponsor.link"
    @mouseenter="animate"
    @mouseleave="resetAnimation"
    @focusin="animate"
    @focusout="resetAnimation"
    class="sponsor-card block rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
    <div class="flex justify-between items-center p-4 bg-gray-800">
      <h3 class="font-bold text-lg text-white">{{ sponsor.name }}</h3>
      <span
        class="inline-block py-1 px-3 text-sm font-semibold rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white">{{
        sponsor.tier }}</span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import {
  Sponsor,
  SponsorTier,
} from '../types/sponsors.ts';

defineProps<{ sponsor: Sponsor }>();

const animate = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  gsap.to(card, {
    scaleY: 1.05,
    transformOrigin: 'bottom center',
    ease: 'power2.out',
  });
};

const resetAnimation = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  gsap.to(card, {
    scaleY: 1,
    transformOrigin: 'bottom center',
    ease: 'power2.out',
  });
};
</script>
