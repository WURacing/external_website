<template>
  <!-- 
    Header
  -->
  <header class="absolute inset-x-0 top-0 z-50">

    <!-- 
      Desktop Header
    -->
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">
            WashU Racing
          </span>
          <RacingIcon />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-400" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <RouterLink v-for="item in navigation" :key="item.name" :to="item.to" class="text-sm font-semibold leading-6 text-stone-100">{{ item.name }}</RouterLink>
      </div>
    </nav>

    <!-- 
      Mobile menu, show/hide based on mobile menu state.
    -->
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-stone-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-stone-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">
              WashU Racing
            </span>
            <RacingIcon />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-stone-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-stone-500/10">
            <div class="space-y-2 py-6">
              <Popover class="relative">
                <PopoverButton class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-stone-900">
                  <span>Learn More</span>
                  <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                </PopoverButton>

                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                  <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                    <div class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-stone-900 shadow-lg ring-1 ring-stone-900/5">
                      <a v-for="item in learnMore" :key="item.name" :href="item.href" class="block p-2 hover:text-red-600">{{ item.name }}</a>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>              
              <RouterLink v-for="item in navigation" :key="item.name" :to="item.to" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-stone-100 hover:bg-stone-50">{{ item.name }}</RouterLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>

  </header>
</template>

<script setup lang="ts">
import RacingIcon from './icons/RacingIcon.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { 
  Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel,
  Popover, PopoverButton, PopoverPanel 
} from '@headlessui/vue'
import { Bars3Icon, MinusSmallIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute();
const current = computed(() =>route.path);

const navigation = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'About',
    to: '/about',
  },
  {
    name: 'Gallery',
    to: '/gallery',
  },
  {
    name: 'History',
    to: '/history',
  },
  {
    name: 'Team',
    to: '/team',
  },
  {
    name: 'Sponsors',
    to: '/sponsors',
  },
  {
    name: 'Contact',
    to: '/contact',
  },
]

let mobileMenuOpen = false;
</script>