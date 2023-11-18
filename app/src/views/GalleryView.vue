<template>
  <div
    class="relative min-h-fit isolate overflow-hidden border-t border-stone-600"
    @scroll="handleScroll"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
