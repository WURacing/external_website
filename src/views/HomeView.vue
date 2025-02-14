<template>
  <UniversalHero
    bgsrc="../assets/hero-bg.jpg"
    announcement-link="https://www.sae.org/attend/student-events/formula-sae-michigan"
    cta-button-link="/gallery"
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
      We are a student-run Formula SAE team that annually designs,
      manufactures, and assembles a formula-style race car.
    </template>

    <template #cta-button>
      View Gallery
    </template>

    <template #cta-link>
      Meet the Team
    </template>
  </UniversalHero>

  <div
    class="relative min-h-fit w-full isolate overflow-hidden border-t-4 border-stone-800"
  >
    <div
      class="mx-auto w-full py-8 sm:py-16 lg:py-24 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 space-y-6 sm:space-y-8 text-center"
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
        Each year, we travel to Michigan International Speedway to
        compete against over 100 other student teams from around the
        world. Judged by industry professionals and track-tested against
        other teams' efforts, our goal is to develop the most
        exhilarating and innovative vehicle we possibly can.
      </p>
    </div>
  </div>

  <div
    class="relative min-h-fit w-full isolate overflow-hidden border-t-4 border-stone-800"
  >
    <img
      src="../assets/machineshop-1.jpg?w=700&format=webp&as=src"
      alt="Working in the machine shop"
      class="absolute inset-0 -z-10 filter opacity-20 scale-[1.5] object-cover object-center w-full h-full"
      data-speed="clamp(auto)"
    >
    <div
      class="mr-auto w-full py-8 sm:py-16 lg:py-24 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 space-y-6 sm:space-y-8 text-left"
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
        From materials science testing on our carbon-fiber suspension
        linkages, to our sand-casted custom oil pan, to our beautifully
        crafted cockpit and driver controls systems, all our designs
        must live up to our most stringent standards.
        <br>
        <br>
        We are judged by industry professionals on our application and
        understanding of engineering design principles at competition,
        so every part is scrutinized before it goes on the car.
      </p>
    </div>
  </div>

  <div
    class="relative min-h-fit w-full isolate overflow-hidden border-t-4 border-stone-800"
  >
    <div
      class="mr-auto w-full py-8 sm:py-16 lg:py-24 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 space-y-6 sm:space-y-8 text-right"
      data-aos="fade-left"
    >
      <h2
        class="text-2xl tracking-tight text-stone-100 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient"
        data-title
      >
        BUILD.
      </h2>

      <p
        class="text-lg leading-8 text-stone-300 sm:text-xl md:text-2xl lg:text-3xl"
      >
        Thanks to our incredible manufacturing team, we have been able
        to consistently increase the quality and consistency of the
        parts we make.
        <br>
        <br>
        With the opening of Jubel Hall and its state-of-the-art machine
        shop, we can use 4-axis CNC machining, CNC lathing,
        waterjetting, casting and many other techniques to make our
        designs come to life.
      </p>
    </div>
  </div>

  <div
    class="relative min-h-fit w-full isolate overflow-hidden border-t-4 border-stone-800"
  >
    <video
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      poster="../assets/driving.jpg"
      class="absolute h-full w-full inset-0 -z-10 filter opacity-20 scale-[1.5] object-cover object-center"
      data-speed="auto"
    >
      <source
        src="../assets/testing-stcharlesfamilyarena.webm"
        type="video/mp4"
      >
    </video>
    <div
      class="ml-auto w-full py-8 sm:py-16 lg:py-24 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 space-y-6 sm:space-y-8 text-left"
      data-aos="fade-right"
    >
      <h2
        class="text-2xl tracking-tight text-stone-100 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient"
        data-title
      >
        TEST.
      </h2>

      <p
        class="text-lg leading-8 text-stone-300 sm:text-xl md:text-2xl lg:text-3xl"
      >
        Ultimately, our designs don't matter unless they work as
        intended. We test and validate our designs using an astounding
        array of sensors, including brake temperature and pressure
        sensors, strain gauges, 3-axis gyroscopes, accelerometers,
        wheel-speed sensors and onboard GPS telemetry.
        <br>
        <br>
        When things don't go as planned, we revamp our designs and keep
        steadfastly pushing to make sure our vehicle is the best it can
        be.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import UniversalHero from "@/components/UniversalHero.vue";

// Time till May 14-18, 2025 | Formula SAE Michigan, Brooklyn, MI
// Dynamically updating countdown timer
const countdown = ref("");
const countDownDate = new Date("May 14, 2025 00:00:00").getTime();
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
        countdown.value = "EXPIRED";
    }
}, 1000);

onMounted(() => {
    // Dynamically update page title
    const titles = document.querySelectorAll("[data-title]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                document.title = document.title ?? "WashU Racing";
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
    background: linear-gradient(to right, #d63030, #942020);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
</style>
