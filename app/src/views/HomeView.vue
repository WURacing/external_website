<template>
  <UniversalHero
    bgsrc="../assets/hero-bg.jpg"
    announcement-link="https://www.sae.org/attend/student-events/formula-sae-michigan"
    cta-button-link="/about"
    cta-link="/team"
  >
    <template #announcement>
      <b>{{ countdown }}</b> until Formula SAE Michigan 2024!
    </template>

    <template #announcement-link>
      Read More!
    </template>

    <template #heading>
      WASHU RACING
    </template>

    <template #description>
      We are a student-run Formula SAE team that annually designs, manufactures,
      and assembles a formula-style race car.
    </template>

    <template #cta-button>
      Learn More
    </template>

    <template #cta-link>
      Meet the Team
    </template>
  </UniversalHero>

  <div
    class="relative min-h-fit isolate overflow-hidden border-t border-stone-600"
  >
    <div
      class="mr-auto w-full py-16 sm:py-24 lg:py-28 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 space-y-6 sm:space-y-8 text-center"
      data-aos="fade-up"
    >
      <h2
        class="text-2xl tracking-tight text-stone-100 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient"
        data-title
      >
        WHAT WE DO
      </h2>

      <p
        class="text-lg leading-8 text-stone-300 sm:text-xl md:text-2xl lg:text-3xl"
      >
        Each year, we travel to Michigan International Speedway to compete
        against over 100 other student teams from around the world. Judged by
        industry professionals and track-tested against other teams' efforts,
        our goal is to develop the most exhilarating and innovative vehicle we
        possibly can.
      </p>
    </div>
  </div>

  <div
    class="relative min-h-fit w-auto isolate overflow-hidden border-t border-stone-600"
  >
    <img
      :src="src"
      class="absolute -z-10 object-cover object-top filter opacity-20 h-full w-full"
      alt="Working in the computer lab"
      data-speed="auto"
    >
    <div
      class="ml-auto w-full py-16 sm:py-24 lg:py-28 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 space-y-6 sm:space-y-8 text-left"
      data-aos="fade-right"
    >
      <h2
        class="text-2xl tracking-tight text-stone-100 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient"
        data-title
      >
        DESIGN.
      </h2>

      <p
        class="text-lg leading-8 text-stone-300 sm:text-xl md:text-2xl lg:text-3xl"
      >
        From materials science testing on our carbon-fiber suspension linkages, to our sand-casted
        custom oil pan, to our beautifully crafted cockpit and driver controls systems, all
        our designs must live up to our most stringent standards.
        <br />
        <br />
        We are judged by industry professionals on our application and understanding of engineering
        design principles at competition, so every part is scrutinized before it goes on the car.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount, onUnmounted, ref, onMounted,
} from 'vue';
import { gsap } from 'gsap';
import UniversalHero from '@/components/UniversalHero.vue';
import {
  designWidth, designHeight, designFormat, src,
} from '../assets/comp-lab-1.jpg?w=700&format=webp&as=metadata';

// Time till May 8-11, 2024 | Formula SAE Michigan, Brooklyn, MI
// Dynamically updating countdown timer
const countdown = ref('');
const countDownDate = new Date('May 8, 2024 00:00:00').getTime();
const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    countdown.value = 'EXPIRED';
  }
}, 1000);

onMounted(() => {
  // Dynamically update page title
  const titles = document.querySelectorAll('[data-title]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        document.title = document.title ?? 'WashU Racing';
      }
    });
  });

  titles.forEach((title) => {
    observer.observe(title);
  });

  // Make each letter of all titles uppercase
  titles.forEach((title) => {
    // eslint-disable-next-line no-param-reassign
    title.innerHTML = title.innerHTML.toUpperCase();
  });
});
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #d63030, #430c0c);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
