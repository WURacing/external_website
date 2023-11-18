<template>
  <div class="relative min-h-screen isolate overflow-hidden pt-14" @scroll="handleScroll">
    <!-- 
      Background image
    -->
    <img src="../assets/herobg.jpg" alt="WashU FSAE Car"
      class="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-40 filter" :style="{
        transform: `translateY(${scrollY / 10}px) scale(${1 + scrollY / 10000})`,
        filter: `blur(${scrollY / 100}px) brightness(${0.5 + scrollY / 10000})`,
      }" />

    <!--
      Background gradient
    -->
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-500 to-red-800 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>

    <!--
      Content
    -->
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 px-4 sm:px-6 lg:px-8">
      <!-- 
        Announcement
      -->
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          class="relative rounded-full px-3 py-1 text-sm leading-6 text-stone-400 ring-1 ring-stone-100/10 hover:ring-stone-100/20">
          <slot name="announcement" />
          <a :href="$props.announcementLink" class="font-semibold text-stone-100">
            <span class="absolute inset-0" aria-hidden="true" />
            <slot name="announcement-link" />
            <span aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      <!-- 
        Heading
      -->
      <div class="text-center">
        <!--
          Heading text
        -->
        <h1 class="text-4xl font-bold tracking-tight text-stone-100 sm:text-6xl">
          <slot name="heading" />
        </h1>

        <!--
          Description text
        -->
        <!-- Responsive text sizing -->
        <p class="mt-6 text-sm leading-8 text-stone-300 sm:text-base md:text-lg lg:text-xl">
          <slot name="description" />
        </p>

        <!--
          CTA
        -->
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a :href="$props.ctaButtonLink"
            class="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-stone-100 shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400">
            <slot name="cta-button" />
          </a>

          <a :href="$props.ctaLink" class="text-sm font-semibold leading-6 text-stone-100">
            <slot name="cta-link" />
            <span aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </div>

    <!--
      Background gradient
    -->
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true">
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-red-500 to-red-800 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

defineProps({
  bgsrc: {
    type: String,
    required: true,
  },
  announcementLink: {
    type: String,
    default: '#',
  },
  ctaButtonLink: {
    type: String,
    default: '#',
  },
  ctaLink: {
    type: String,
    default: '#',
  },
});

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>