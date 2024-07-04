import { systemStore } from "../Redux/store";



export function checkAuth(userType: string) {
    return systemStore.getState().auth.userType === userType;
}




