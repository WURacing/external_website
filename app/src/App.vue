<template>
  <div class="bg-stone-900 text-stone-100 flex flex-col min-h-screen" id="smooth-wrapper">
    <div id="smooth-content" :key="$route.fullPath">
      <!-- Universal Header -->
      <UniversalHeader />

      <!-- Main Content -->
      <main class="w-full flex-grow min-h-screen">
        <router-view />
      </main>

      <!-- Universal Footer -->
      <UniversalFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import AOS from 'aos';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';
import { useRouter } from 'vue-router';
import UniversalHeader from '@/components/UniversalHeader.vue';
import UniversalFooter from '@/components/UniversalFooter.vue';

const router = useRouter();
let smoother: ScrollSmoother;

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  gsap.registerPlugin(CustomEase, CustomBounce);
  await nextTick(); // Ensure the DOM is updated

  const initializeSmoother = () => {
    smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.15,
      normalizeScroll: true,
    });
  };

  AOS.init({
    offset: 120,
    delay: 0,
    duration: 700,
    easing: 'ease-in-out',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });

  // Initialize ScrollSmoother
  initializeSmoother();

  // Before each route change
  router.beforeEach((to, from, next) => {
    if (from.name !== null) {
      smoother.kill();
      next();
    } else {
      next();
    }
  });

  // After each route change
  router.afterEach(() => {
    nextTick().then(() => {
      initializeSmoother();
    });
  });

  CustomBounce.create('racingBounce', {
    strength: 0.5,
    endAtStart: false,
    squash: 3,
  });
});

onBeforeUnmount(() => {
  if (smoother) smoother.kill(); // Ensure to kill smoother when component unmounts
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>
