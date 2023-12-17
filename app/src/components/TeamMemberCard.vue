<template>
  <div
    class="team-member-card relative rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-2xl bg-gray-800 group"
    data-aos="zoom-in" @mouseenter="animateCard" @mouseleave="resetCardAnimation" @focusin="animateCard"
    @focusout="resetCardAnimation">
    <!-- Placeholder for member image -->
    <div class="bg-cover bg-center h-48 w-full" :style="{ backgroundImage: 'url(' + member.image + ')' }" />

    <!-- Member Info -->
    <div class="p-4 text-center">
      <h3 class="text-xl font-bold text-gray-100 mb-2">{{ member.name }}</h3>
      <p class="text-md text-gray-300">{{ member.role }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import AOS from 'aos';
import { gsap } from 'gsap';

// Define the member prop structure according to your team member model
const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
  });
});

const animateCard = (event) => {
  const card = event.currentTarget as HTMLElement;
  gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
};

const resetCardAnimation = (event) => {
  const card = event.currentTarget as HTMLElement;
  gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
};
</script>
