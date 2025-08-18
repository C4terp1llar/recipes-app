<script setup lang="ts">
import type { IRecipesOptions } from "@/features/recipe/types";
import { ref } from "vue";

const props = defineProps<{ options: IRecipesOptions }>();
const emit = defineEmits<{ (e: 'update-options', value: IRecipesOptions): void }>();

const sortItems = [
  { label: 'Сначала новые', value: 'desc' },
  { label: 'Сначала старые', value: 'asc' }
];

const modeItems = [
  { label: 'Все', value: 'all' },
  { label: 'Мои', value: 'me' }
];

const categoryItems = [
  { label: 'Все', value: '' },
  { label: 'Завтрак', value: 'breakfast' },
  { label: 'Обед', value: 'lunch' },
  { label: 'Ужин', value: 'dinner' },
  { label: 'Перекус', value: 'snack' },
];

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const onInputDebounced = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    updateOptions();
  }, 500);
};

const updateOptions = () => {
  emit('update-options', { ...props.options });
};
</script>

<template>
  <div class="w-full grid grid-cols-3 gap-4 mb-4">
    <v-text-field
        v-model="options.q"
        label="Поиск"
        @input="onInputDebounced"
        class="col-span-3"
        variant="solo-filled"
        density="comfortable"
        hide-details="auto"
        id="search"
    />

    <v-select
        v-model="options.sort"
        :items="sortItems"
        label="Сортировка"
        @update:model-value="updateOptions"
        class="max-md:col-span-2"
        item-title="label"
        item-value="value"
        variant="solo-filled"
        density="comfortable"
        hide-details="auto"
    />

    <v-select
        v-model="options.mode"
        :items="modeItems"
        label="Режим"
        @update:model-value="updateOptions"
        class=""
        item-title="label"
        item-value="value"
        variant="solo-filled"
        density="comfortable"
        hide-details="auto"
    />

    <v-select
        v-model="options.category"
        :items="categoryItems"
        label="Категория"
        @update:model-value="updateOptions"
        class="max-md:col-span-3"
        item-title="label"
        item-value="value"
        variant="solo-filled"
        density="comfortable"
        hide-details="auto"
    />

  </div>
</template>


