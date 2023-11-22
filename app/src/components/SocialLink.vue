<template>
  <a
    :href="href"
    class="transition-colors duration-300"
    data-aos="zoom-in"
    :data-aos-delay="delay"
    :aria-label="label"
    @mouseenter="animate"
    @mouseleave="resetAnimation"
    @focusin="animate"
    @focusout="resetAnimation"
  >
    <span class="sr-only">{{ label }}</span>
    <font-awesome-icon :icon="icon" size="2x" class="text-stone-200 hover:text-stone-100 align-middle justify-between" />
  </a>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import gsap from 'gsap';

defineProps({
  icon: {
    type: Array,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  delay: {
    type: String,
    required: false,
    default: '0',
  },
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
