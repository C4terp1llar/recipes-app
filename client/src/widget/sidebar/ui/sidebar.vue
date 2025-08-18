<script setup lang="ts">
import Logo from "@/features/logo/ui/logo.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import {useUserStore} from "@/features/auth/store/useUserStore.ts";

const userStore = useUserStore();
const route = useRoute();

const isActive = (path: string) => computed(() => route.path === path);
</script>

<template>
  <aside class="h-[calc(100vh-16px)] max-md:w-full max-md:h-fit max-md:flex-row max-md:z-10 bg-white w-fit sticky top-2 flex-1-0 pa-4 rounded-xl border-2 border-gray-400 flex flex-col items-center gap-5">
    <div class="w-15 relative">
      <logo />
      <router-link class="absolute inset-0" to="/my-recipes" />
    </div>
    <nav class="max-md:w-full">
      <ul class="flex flex-col max-md:flex-row max-md:justify-around gap-2 text-blue-400 text-lg font-medium">
        <li :class="[{'text-blue-600': isActive('/my-recipes').value}]">
          <router-link to="/my-recipes" class="hover:text-blue-600 flex gap-2 items-center">
            <v-icon >mdi-chef-hat</v-icon>
            <span class="max-md:hidden">Мои рецепты</span>
          </router-link>
        </li>
        <li :class="[{'text-blue-600': isActive('/add-recipe').value}]">
          <router-link to="/add-recipe" class="hover:text-blue-600 flex gap-2 items-center">
            <v-icon >mdi-plus-box-outline</v-icon>
            <span class="max-md:hidden">Добавить рецепт</span>
          </router-link>
        </li>
        <li :class="[{'text-blue-600': isActive('/recipes').value}]">
          <router-link to="/recipes" class="hover:text-blue-600 flex gap-2 items-center">
            <v-icon >mdi-list-box-outline</v-icon>
            <span class="max-md:hidden">Список рецептов</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <v-btn @click="userStore.logout" class="w-full mt-auto text-none flex gap-2 max-md:v-btn--icon! max-md:w-fit max-md:mt-0!" color="error" rounded variant="tonal" >
      <v-icon>mdi-logout</v-icon>
      <span class="ml-2 max-md:hidden">Выйти</span>
    </v-btn>
  </aside>
</template>
