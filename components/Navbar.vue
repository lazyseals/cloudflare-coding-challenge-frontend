<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold"> Cloudflare </span>
    </div>
    <div class="flex-none">
      <button class="btn btn-primary" @click="$emit('openPostModal')">
        Create Post
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
