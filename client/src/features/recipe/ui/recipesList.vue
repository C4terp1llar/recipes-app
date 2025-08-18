<script setup lang="ts">
import type {CategoryType, IRecipe, IRecipesOptions} from "@/features/recipe/types";
import {onMounted, ref} from "vue";
import {useRecipeStore} from "@/features/recipe/store/useRecipeStore.ts";
import RecipesItem from "@/features/recipe/ui/recipesItem.vue";
import RecipesActionsBar from "@/features/recipe/ui/recipesActionsBar.vue";
import {useRouter} from "vue-router";

const recipesStore = useRecipeStore();
const router = useRouter();

const initOptionsState: IRecipesOptions = {
  q: '',
  sort: 'desc',
  mode: 'all',
  category: ''
}

const options = ref<IRecipesOptions>({...initOptionsState})

const recipes = ref<IRecipe[]>([]);
const isLoading = ref(false);
const isLoadingMore = ref(false);
const LIMIT = 10;
const page = ref(1);
const hasMore = ref(false);
const recipesExists = ref(false);

const fetchRecipes = async (reset = false) => {
  if (reset) {
    page.value = 1;
    recipes.value = [];
    hasMore.value = false;
  }

  const loading = reset ? isLoading : isLoadingMore;
  loading.value = true;

  try {
    const data = await recipesStore.handleGetManyRecipes(options.value, page.value, LIMIT);

    if (data && data.recipes) {
      if (reset) recipes.value = data.recipes;
      else recipes.value.push(...data.recipes);

      hasMore.value = data.pagination.hasMore;

      if (data.recipes.length) page.value += 1;
    }
  } finally {
    loading.value = false;
  }
};

const onUpdateOptions = async (newOptions: IRecipesOptions) => {
  options.value = { ...newOptions };
  await fetchRecipes(true);
};

const deleteRecipeId = ref<string>('');

const handleDelete = async (id: string) => {
  try {
    deleteRecipeId.value = id;
    await recipesStore.handleDeleteRecipe(id);
    recipes.value = recipes.value.filter((i) => i.id !== id);
  } finally {
    deleteRecipeId.value = '';
  }
}

const resetOptions = async () => {
  options.value = {...initOptionsState}
  await fetchRecipes(true);
}

onMounted(async () => {
  await fetchRecipes(true)
  recipesExists.value = !!recipes.value.length;
});
</script>

<template>
  <section class="flex w-full h-full flex-col gap-2">

    <recipes-actions-bar
        v-if="recipesExists"
        class="max-w-5xl w-full mx-auto"
        :options="options"
        @update-options="onUpdateOptions"
        :disabled="isLoading || recipes.length"
    />

    <div class="w-full h-full flex justify-center items-center" v-if="isLoading">
      <v-progress-circular color="primary" indeterminate/>
    </div>

    <template v-if="!isLoading">

      <template v-if="recipes.length">
        <recipes-item @delete="id => handleDelete(id)" :delete-recipe-id="deleteRecipeId" v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
        <v-btn
            @click="fetchRecipes()"
            v-if="hasMore"
            :loading="isLoadingMore"
            :disabled="isLoadingMore"
            class="text-none"
            color="primary"
        >
          Еще
        </v-btn>
      </template>

      <div v-else class="text-center text-gray-700">
        <h1 class="text-3xl">Рецептов не найдено</h1>
        <h2 class="text-lg">{{recipesExists ? 'Рецептов не нашлось, попробуйте изменить поисковые фильтры!' : 'Рецептов пока нет, попробуйте создать свой!'}}</h2>
        <v-btn class="text-none mt-2" density="comfortable" rounded color="primary" @click="recipesExists ? resetOptions() : router.push('/add-recipe')">
          {{recipesExists ? 'Сбросить фильтры' : 'Создать рецепт'}}
        </v-btn>
      </div>
    </template>
  </section>
</template>
