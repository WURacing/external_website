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
            OUR HISTORY
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-stone-300">
            An overview of our competition history.
        </p>
      </div>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import AOS from "aos";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

const headerHeight = ref(0);

interface GalleryItem {
  id: string;
  media_type: string;
  media_url: string;
  permalink: string;
  thumbnail_url: string;
  timestamp: string;
  username: string;
  caption: string;
}

// GET /me/media?fields={fields}&access_token={access-token}
const gallery = ref<GalleryItem[]>([]);

onMounted(async () => {
  const response = await axios.get("https://graph.facebook.com/me/media", {
    params: {
      fields:
        "id,media_type,media_url,permalink,thumbnail_url,timestamp,username,caption",
      access_token: import.meta.env.VITE_APP_INSTAGRAM_ACCESS_TOKEN,
    },
  });
  gallery.value = response.data.data;
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  AOS.init();

  // Calculate the header's height and observe changes
  const header = document.querySelector("header"); // Update selector if needed
  if (header) {
    const updateHeaderHeight = () => {
      headerHeight.value = header.offsetHeight;
    };

    updateHeaderHeight();
    new ResizeObserver(updateHeaderHeight).observe(header);
  }
});
</script>
