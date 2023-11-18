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

    <template #announcement-link> Read More! </template>

    <template #heading> WashU Racing </template>

    <template #description>
      We are a student-run Formula SAE team that annually designs, manufactures,
      and assembles a formula-style race car.
    </template>

    <template #cta-button> Learn More </template>

    <template #cta-link> Meet the Team </template>
  </UniversalHero>

  <div
    class="relative min-h-fit isolate overflow-hidden border-t border-stone-600"
    @scroll="handleScroll"
  >
    <div
      class="mr-auto w-2/3 py-16 sm:py-24 lg:py-28 px-8 sm:px-12 lg:px-16 space-y-6 sm:space-y-8"
    >
      <h2
        class="text-2xl tracking-tight text-stone-100 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
        data-title
      >
        Who We Are
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
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import UniversalHero from '@/components/UniversalHero.vue'

// Time till May 8-11, 2024 | Formula SAE Michigan, Brooklyn, MI
// Dynamically updating countdown timer
const countdown = ref('')
const countDownDate = new Date('May 8, 2024 00:00:00').getTime()
const x = setInterval(() => {
  const now = new Date().getTime()
  const distance = countDownDate - now
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`

  if (distance < 0) {
    clearInterval(x)
    countdown.value = 'EXPIRED'
  }
}, 1000)

const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Dynamically update page title
  const titles = document.querySelectorAll('[data-title]')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        document.title = document.title ?? 'WashU Racing'
      }
    })
  })

  titles.forEach((title) => {
    observer.observe(title)
  })

  // Make each letter of all titles uppercase
  titles.forEach((title) => {
    title.innerHTML = title.innerHTML.toUpperCase()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
