<template>
  <span class="inline-block py-1 px-3 text-sm font-semibold rounded-full text-stone-100" :class="tierGradient">
    {{ tier }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SponsorTier } from '../types/sponsors.ts';

const props = defineProps<{ tier: SponsorTier }>();

const tierGradient = computed(() => {
  switch (props.tier) {
    case 'Diamond':
      return 'bg-gradient-to-r from-pink-500 to-purple-600';
    case 'Platinum':
      return 'bg-gradient-to-r from-blue-400 to-indigo-500';
    case 'Gold':
      return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    case 'Silver':
      return 'bg-gradient-to-r from-stone-400 to-stone-500';
    case 'Bronze':
      return 'bg-gradient-to-r from-orange-400 to-red-500';
    default:
      return '';
  }
});
</script>
