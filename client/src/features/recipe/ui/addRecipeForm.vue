<script setup lang="ts">
import { ref } from "vue"
import { rules } from "@/shared/lib/validation.ts"
import { handleNoSpaceInput } from "@/shared/utils/preventSpaces.ts"
import {useRecipeStore} from "@/features/recipe/store/useRecipeStore.ts";

const recipeStore = useRecipeStore()

const formRef = ref<HTMLFormElement | null>(null)

const formValid = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const title = ref<string>("")
const category = ref<"breakfast" | "lunch" | "dinner" | "snack">("breakfast")
const comment = ref<string>("")

const ingredients = ref<string[]>([""])

const categoryItems = [
  { label: "Завтрак", value: "breakfast" },
  { label: "Обед", value: "lunch" },
  { label: "Ужин", value: "dinner" },
  { label: "Перекус", value: "snack" },
]

const addIngredient = () => {
  if (ingredients.value[ingredients.value.length - 1].trim()) {
    ingredients.value.push("")
  }
}

const removeIngredient = (index: number) => {
  if (ingredients.value.length > 1) {
    ingredients.value.splice(index, 1)
  }
}

const resetForm = () => {
  if (formRef.value) formRef.value.reset()

  title.value = ""
  category.value = "breakfast"
  comment.value = ""
  ingredients.value = [""]
}

const onSubmit = async () => {
  if (!formValid.value) return
  try{
    isLoading.value = true
    await recipeStore.handleCreateRecipe({
      title: title.value,
      category: category.value,
      comment: comment.value,
      ingredients: ingredients.value
    })
    resetForm()
  }finally{
    isLoading.value = false
  }
}
</script>

<template>
  <v-form
      ref="formRef"
      v-model="formValid"
      @submit.prevent="onSubmit"
      class="flex flex-col gap-4 p-4"
      :disabled="isLoading"
  >
    <v-text-field
        v-model.trim="title"
        label="Название рецепта"
        :rules="[rules.required(title)]"
        hide-details="auto"
        variant="solo-filled"
        density="comfortable"
        maxlength="100"
        required
        id="title"
    />

    <v-select
        v-model="category"
        :items="categoryItems"
        item-title="label"
        item-value="value"
        label="Категория"
        :rules="[rules.required(category)]"
        hide-details="auto"
        variant="solo-filled"
        density="comfortable"
        id="category"
        required
    />

    <div class="flex flex-col gap-2">
      <div
          v-for="(ingredient, index) in ingredients"
          :key="index"
          class="flex gap-2 items-center"
      >
        <v-text-field
            v-model.trim="ingredients[index]"
            label="Ингредиент"
            placeholder="Например: 2 яйца"
            hide-details="auto"
            variant="solo-filled"
            density="comfortable"
            maxlength="50"
            :rules="[rules.required(ingredients[index])]"
            required
        />
        <v-btn
            icon="mdi-minus"
            variant="tonal"
            color="red"
            @click="removeIngredient(index)"
            v-if="ingredients.length > 1"
        />
        <v-btn
            icon="mdi-plus"
            variant="tonal"
            color="green"
            @click="addIngredient"
            v-if="index === ingredients.length - 1 && ingredient.trim()"
        />
      </div>
    </div>

    <v-textarea
        v-model.trim="comment"
        label="Комментарий (необязательно)"
        hide-details="auto"
        variant="solo-filled"
        density="comfortable"
        auto-grow
        rows="2"
        id="comment"
        maxlength="500"
    />

    <v-btn
        class="text-none text-center"
        type="submit"
        base-color="primary"
        :disabled="!formValid || isLoading"
        :loading="isLoading"
    >
      Добавить рецепт
    </v-btn>
  </v-form>
</template>
