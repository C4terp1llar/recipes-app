<script setup lang="ts">
import { ref } from "vue";
import type {IRecipe, IRecipesOptions} from "@/features/recipe/types";
import { getCategoryName } from "@/shared/utils/mapRecipeCategory.ts";
import Modal from "@/shared/ui/modal.vue";

const emit = defineEmits<{ (e: 'delete', id: string): void }>();
const props = defineProps<{ recipe: IRecipe, deleteRecipeId: string }>();

const showAllIngredients = ref<boolean>(false);
const showFullComment = ref<boolean>(false);

const isOpen = ref<boolean>(false);
</script>

<template>
  <article class="pa-2 border-1 border-gray-400 rounded-2xl w-full">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-800">
        {{ recipe.title }}
      </h2>
      <span class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
        {{ getCategoryName(recipe.category) }}
      </span>
    </div>

    <div class="mb-2">
      <h3 class="text-sm font-medium text-gray-700 mb-1">Ингредиенты:</h3>
      <ul class="list-disc list-inside text-gray-600 text-sm">
        <li
            v-for="(item, index) in showAllIngredients ? recipe.ingredients : recipe.ingredients.slice(0, 2)"
            :key="index"
        >
          {{ item }}
        </li>
      </ul>
      <v-btn v-if="recipe.ingredients.length > 2" @click="showAllIngredients = !showAllIngredients" class="p-0! text-none" color="primary" variant="text" size="small" density="compact">{{showAllIngredients ? "Скрыть" : "Показать все"}}</v-btn>
    </div>

    <div v-if="recipe.comment" class="mb-2">
      <h3 class="text-sm font-medium text-gray-700 mb-1">Комментарий:</h3>
      <span class="text-gray-600 inline text-sm break-words break-all">
        <span :class="{'line-clamp-3': !showFullComment, 'block': showFullComment}">{{ recipe.comment }} </span>
        <v-btn v-if="recipe.comment.length > 100" @click="showFullComment = !showFullComment" class="text-none p-0!" color="primary" variant="text" size="small" density="compact">{{ showFullComment ? "Свернуть" : "Развернуть" }}</v-btn>
      </span>
    </div>


    <hr class="border-gray-400 w-full my-2" />

    <div class="flex items-center gap-2">
      <v-btn :disabled="!!deleteRecipeId.length" :loading="deleteRecipeId === recipe.id" v-if="recipe.self" @click="isOpen = !isOpen" variant="text" density="comfortable" size="small" color="error" icon>
        <v-icon size="24">mdi-trash-can-outline</v-icon>
      </v-btn>

      <span class="flex justify-between text-gray-700 text-sm w-full">
      Автор: {{ recipe.self ? "Вы" : recipe.author }}
      <span>{{ new Date(recipe.createdAt).toLocaleDateString() }}</span>
    </span>
    </div>
  </article>

  <modal v-if="isOpen" v-model="isOpen">
    <template #default="{ close }">
      <div class="max-w-lg w-full flex flex-col gap-2">
        <h2 class="text-xl font-semibold mb-2 text-center">Подтверждение</h2>
        <span>Вы уверены, что хотите удалить рецепт <span class="text-blue-400 break-all text-wrap">{{recipe.title}}</span> ?</span>
        <div class="flex gap-2 justify-end">
          <v-btn @click="emit('delete', recipe.id); close()" class="text-none flex-1" variant="tonal" color="error">Удалить</v-btn>
          <v-btn @click="close" class="text-none flex-1" variant="tonal" color="primary">Отмена</v-btn>
        </div>
      </div>
    </template>
  </modal>
</template>

<style scoped>
/* line-clamp работает через Tailwind >= 3.0, если нет плагина, можно подключить через CSS */

</style>
