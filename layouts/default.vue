<template>
  <div class="default-layout">
    <Navbar @openPostModal="openCreatePostModal = true" />
    <create-post-modal
      :open="openCreatePostModal"
      @close="openCreatePostModal = !openCreatePostModal"
    />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import CreatePostModal from "~/components/CreatePostModal.vue";

export default {
  components: {
    Navbar,
    CreatePostModal,
  },
  data() {
    return { openCreatePostModal: false };
  },
};
</script>

<style></style>
