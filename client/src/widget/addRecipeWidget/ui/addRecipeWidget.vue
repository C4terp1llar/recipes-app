<script setup lang="ts">
import AddRecipeForm from "@/features/recipe/ui/addRecipeForm.vue";
</script>

<template>
  <section class="w-full h-full flex flex-col items-center justify-start gap-6 p-6">
    <article class="text-center flex gap-2 flex-col">
      <h1 class="text-3xl font-bold text-gray-800">
        Добавьте свой рецепт 🍳
      </h1>
      <p class="text-gray-600 text-lg leading-relaxed">
        Поделитесь любимыми блюдами с другими пользователями.
        Укажите название, ингредиенты и категорию — и ваш рецепт попадёт в список.
        <br>
        Чем подробнее описание, тем проще будет повторить ваш шедевр!
      </p>
    </article>

    <add-recipe-form class="max-w-5xl w-full"/>
  </section>
</template>

<style scoped>
</style>
