import type { NavigationGuardWithThis } from "vue-router";
import Swal from "sweetalert2";

const checkUserAuth: NavigationGuardWithThis<undefined> =
    async (to, from, next) => {
        const userAuthStore = await import("@/stores/userAuth");
        const userAuth = userAuthStore.useUserAuthStore();
        const loggedIn = await userAuth.getProfile();

        if (loggedIn) {
            next();
        } else {
            Swal.fire({
                title: 'Mohon maaf!',
                text: 'Anda harus login terlebih dahulu.',
                icon: 'warning'
            });
            next('/login');
        }
    };

export {
    checkUserAuth
};
