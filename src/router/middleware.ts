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
            next({ name: 'user.login' });
        }
    };
const userAuthenticated: NavigationGuardWithThis<undefined> =
    async (to, from, next) => {
        const userAuthStore = await import("@/stores/userAuth");
        const userAuth = userAuthStore.useUserAuthStore();
        const userLoggedIn = await userAuth.getProfile();

        if (userLoggedIn)
            next({ name: 'user.home' });
        else
            next();
    };

const checkSellerAuth: NavigationGuardWithThis<undefined> =
    async (to, from, next) => {
        const sellerAuthStore = await import("@/stores/sellerAuth");
        const sellerAuth = sellerAuthStore.useSellerAuthStore();
        const sellerLoggedIn = await sellerAuth.getProfile();

        if (sellerLoggedIn) {
            next();
        } else {
            Swal.fire({
                title: 'Mohon maaf!',
                text: 'Anda harus login terlebih dahulu.',
                icon: 'warning'
            });
            next({ name: 'seller.login' });
        }
    };
const sellerAuthenticated: NavigationGuardWithThis<undefined> =
    async (to, from, next) => {
        const sellerAuthStore = await import("@/stores/sellerAuth");
        const sellerAuth = sellerAuthStore.useSellerAuthStore();
        const sellerLoggedIn = await sellerAuth.getProfile();

        if (sellerLoggedIn)
            next({ name: 'seller.home' });
        else
            next();
    };

const checkAdminAuth: NavigationGuardWithThis<undefined> =
    async (to, from, next) => {
        const adminAuthStore = await import("@/stores/adminAuth");
        const adminAuth = adminAuthStore.useAdminAuthStore();
        const adminLoggedIn = await adminAuth.getProfile();

        if (adminLoggedIn)
            next();
        else
            next({ name: 'admin.login' });
    };
const adminAuthenticated: NavigationGuardWithThis<undefined> =
    async (to, from, next) => {
        const adminAuthStore = await import("@/stores/adminAuth");
        const adminAuth = adminAuthStore.useAdminAuthStore();
        const adminLoggedIn = await adminAuth.getProfile();

        if (adminLoggedIn)
            next({ name: 'admin.home' });
        else
            next();
    };

export {
    checkUserAuth,
    userAuthenticated,
    checkSellerAuth,
    sellerAuthenticated,
    checkAdminAuth,
    adminAuthenticated
};
