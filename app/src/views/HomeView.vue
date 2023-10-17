<template>
  <UniversalHero 
    bgsrc="../assets/hero-bg.jpg"
    announcement-link="https://www.sae.org/attend/student-events/formula-sae-michigan"
    cta-button-link="/about"
    cta-link="/about"
  >
    <template #announcement>
      <b>{{ countdown }}</b> until Formula SAE Michigan 2024!
    </template>

    <template #announcement-link>
      Read More!
    </template>

    <template #heading>
      WashU Racing
    </template>

    <template #description>
      We are a student-run Formula SAE team that annually designs, manufactures, and assembles a formula-style race car.
      <br />
      <br />
      Each year, we travel to Michigan International Speedway to compete against over 100 other student teams from around the world. Judged by industry professionals and track-tested against other teams' efforts, our goal is to develop the most exhilirating and innovative vehicle we possibly can.
    </template>

    <template #cta-button>
      Learn More
    </template>

    <template #cta-link>
      Meet the Team
    </template>
  </UniversalHero>
</template>

<script setup lang="ts">
import UniversalHero from '@/components/UniversalHero.vue';
import { ref } from 'vue';

// time till May 8-11, 2024 | Formula SAE Michigan, Brooklyn, MI
// Dynamically updating countdown timer
const countdown = ref('');
const countDownDate = new Date('May 8, 2024 00:00:00').getTime();
const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    countdown.value = 'EXPIRED';
  }
}, 1000);
</script>