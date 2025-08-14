import {authApi} from "@/shared/api/authApi.ts";

export const checkAuth = async () => {
  try{
    await authApi.get('/users/sync')
    return true
  }catch(err){
    console.error(err)
    return false
  }
}