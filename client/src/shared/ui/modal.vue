<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {lockScroll, unlockScroll} from "@/shared/utils/scroll.ts";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

const modalContentRef = ref<HTMLElement | null>(null);

const handleClick = (e: MouseEvent) => {
  if (modalContentRef.value && !modalContentRef.value.contains(e.target as Node)) {
    close();
  }
};

onMounted(() => {
  lockScroll();
  document.addEventListener("mousedown", handleClick);
});

onUnmounted(() => {
  unlockScroll();
  document.removeEventListener("mousedown", handleClick);
});
</script>

<template>
  <Teleport to="body">
    <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] grid place-items-center backdrop-blur-md p-4"
    >
      <div
          ref="modalContentRef"
          class="bg-white rounded-xl shadow-xl pa-4 mx-2 relative overflow-hidden"
      >
        <v-btn @click="close" class="absolute! top-2 right-2" icon density="compact" variant="text" size="small"><v-icon>mdi-close</v-icon></v-btn>
        <slot :close="close" />
      </div>
    </div>
  </Teleport>
</template>
