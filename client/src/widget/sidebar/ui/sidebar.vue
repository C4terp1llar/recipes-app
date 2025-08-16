<script setup lang="ts">
import Logo from "@/features/logo/ui/logo.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isActive = (path: string) =>
    computed(() => route.path === path);
</script>

<template>
  <aside class="h-[calc(100vh-16px)] w-fit sticky top-2 flex-1-0 pa-4 rounded-xl border-2 border-gray-400 flex flex-col items-center gap-5">
    <div class="w-15 relative">
      <logo />
      <router-link class="absolute inset-0" to="/my-recipes" />
    </div>
    <nav>
      <ul class="flex flex-col gap-2 text-blue-400 text-lg font-medium">
        <li :class="[{'text-blue-600': isActive('/my-recipes').value},'flex gap-2 items-center']">
          <v-icon>mdi-chef-hat</v-icon>
          <router-link to="/my-recipes" class="hover:text-blue-600 hover:underline">Мои рецепты</router-link>
        </li>
        <li :class="[{'text-blue-600': isActive('/add-recipe').value},'flex gap-2 items-center']">
          <v-icon>mdi-plus-box-outline</v-icon>
          <router-link to="/add-recipe" class="hover:text-blue-600 hover:underline">Добавить рецепт</router-link>
        </li>
        <li :class="[{'text-blue-600': isActive('/recipes').value},'flex gap-2 items-center']">
          <v-icon>mdi-list-box-outline</v-icon>
          <router-link to="/recipes" class="hover:text-blue-600 hover:underline">Список рецептов</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
