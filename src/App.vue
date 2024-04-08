<template>
  <div class="min-h-screen w-full flex flex-col">
    <div class="flex-1 flex flex-col" v-if="getRole == 'admin'">
      <RouterView></RouterView>
    </div>

    <div class="flex-1 flex flex-col" v-else-if="getRole == 'seller'">
      <RouterView></RouterView>
    </div>

    <div class="flex-1 flex flex-col" v-else-if="getRole == 'user'">
      <div v-if="!!!$route.meta.hideNavbar" class="sticky top-0 z-[99999990]">
        <div>
          <UserNavbar></UserNavbar>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <RouterView />
      </div>

      <div v-if="!!!$route.meta.hideFooter" class="flex flex-col">
        <FooterComponent></FooterComponent>
      </div>
    </div>

    <div class="flex-1 flex flex-col" v-else>
      <div class="flex-1 flex flex-col">
        <RouterView />
      </div>
      <div v-if="!!!$route.meta.hideFooter" class="flex flex-col">
        <FooterComponent></FooterComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import UserNavbar from "@/components/user/Navbar.vue";
import FooterComponent from "@/components/user/FooterComponent.vue";

export default {
  components: {
    RouterView,
    UserNavbar,
    FooterComponent
  },
  computed: {
    getRole() {
      const role = this.$route.meta.role;
      if (!!role) {
        return role;
      } else {
        return '';
      }
    }
  },
}
</script>

<style scoped></style>
