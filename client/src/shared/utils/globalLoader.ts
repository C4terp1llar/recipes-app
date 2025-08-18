import {ref} from "vue";

const isGlobalLoading = ref<boolean>(false)

const setGlobalLoading = (value: boolean) => {
  isGlobalLoading.value = value
}

export {
  isGlobalLoading,
  setGlobalLoading,
}