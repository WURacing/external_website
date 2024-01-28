<template>
  <div
    class="relative min-h-screen isolate overflow-hidden flex flex-col items-center bg-stone-900 text-stone-100"
    :style="{ paddingTop: headerHeight + 'px' }"
  >
    <div class="flex flex-col items-center w-full px-8 pb-8 max-w-7xl">
      <!-- Title Section -->
      <div
        class="p-8 w-full max-w-7xl text-center"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient mb-4"
        >
          THE GALLERY
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-stone-300">
          A collection of our favorite photos and videos.
        </p>
      </div>

      <!-- SnapWidget -->
      <div class="mt-8 w-full h-fit max-w-7xl">
        <iframe
          src="https://snapwidget.com/embed/1029559"
          class="snapwidget-widget border-none w-full h-full visible"
          allowtransparency="true"
          frameborder="0"
          scrolling="no"
          title="Instagram Widget"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AOS from "aos";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const headerHeight = ref(0);

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    AOS.init();

    // Calculate the header's height and observe changes
    const header = document.querySelector("header");
    if (header) {
        const updateHeaderHeight = () => {
            headerHeight.value = header.offsetHeight;
        };

        updateHeaderHeight();
        new ResizeObserver(updateHeaderHeight).observe(header);
    }
});
</script>
