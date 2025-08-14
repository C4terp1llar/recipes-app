<script setup lang="ts">
import {ref} from 'vue'
import {handleNoSpaceInput} from '@/shared/utils/preventSpaces.ts'
import {rules} from "@/shared/lib/validation.ts";
import {useUserStore} from "@/features/auth/store/useUserStore.ts";

const userStore = useUserStore()

const props = defineProps<{ mode: 'login' | 'signup' }>()

const formValid = ref<boolean>(false)

const isPasswordVisible = ref<boolean[]>([false, false]);

const login = ref<string>('')
const password = ref<string>('')
const passwordRepeat = ref<string>('')

const isLoading = ref<boolean>(false)

const onSubmit = async () => {
  if (!formValid.value) return

  isLoading.value = true
  if (props.mode === 'login') {
    await userStore.handleLogin(login.value, password.value)
  } else {
    await userStore.handleSignup(login.value, password.value)
  }
  isLoading.value = false
}
</script>

<template>
  <v-form
      v-model="formValid"
      @submit.prevent="onSubmit"
      class="flex flex-col w-full gap-4 p-4"
      :disabled="isLoading"
  >
    <v-text-field
        v-model.trim="login"
        label="Логин"
        type="text"
        :rules="[rules.required(login), ...(mode === 'signup' ? [rules.login(login)] : [])]"
        @input="handleNoSpaceInput"
        hide-details="auto"
        variant="solo-filled"
        density="comfortable"
        maxlength="50"
        minlength="1"
        id="login"
    />

    <v-text-field
        v-model.trim="password"
        label="Пароль"
        :rules="[rules.required(password), ...(mode === 'signup' ? [rules.passwordCharset(password), rules.minPasswordLength(password)] : [])]"
        @input="handleNoSpaceInput"
        hide-details="auto"
        variant="solo-filled"
        density="comfortable"
        maxlength="50"
        :minlength="mode === 'signup' ? '8' : '1'"
        id="password"
        :append-inner-icon="isPasswordVisible[0] ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible[0] ? 'text' : 'password'"
        @click:append-inner="isPasswordVisible[0] = !isPasswordVisible[0]"
    />

    <v-text-field
        v-if="props.mode === 'signup'"
        v-model.trim="passwordRepeat"
        label="Повторите пароль"
        :rules="[rules.required(password), rules.passwordsMatch(password, passwordRepeat)]"
        @input="handleNoSpaceInput"
        hide-details="auto"
        variant="solo-filled"
        density="comfortable"
        maxlength="50"
        minlength="8"
        id="password-repeat"
        :append-inner-icon="isPasswordVisible[1] ? 'mdi-eye-off' : 'mdi-eye'"
        :type="isPasswordVisible[1] ? 'text' : 'password'"
        @click:append-inner="isPasswordVisible[1] = !isPasswordVisible[1]"
    />

    <v-btn
        class="text-none text-center"
        type="submit"
        base-color="primary"
        :disabled="!formValid || isLoading"
        :loading="isLoading"
    >
      {{ props.mode === 'signup' ? 'Зарегистрироваться' : 'Войти' }}
    </v-btn>
  </v-form>
</template>
