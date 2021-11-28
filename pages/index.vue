<template>
  <div class="mx-auto max-w-7xl p-6">
    <template v-if="posts && posts.length > 0">
      <div
        v-for="post in posts"
        :key="post.title"
        class="card bordered mx-auto max-w-xl mb-4"
      >
        <div class="card-body">
          <h2 class="card-title mb-0">{{ post.title }}</h2>
          <p class="py-4">{{ post.content }}.</p>
          <small class="text-right"
            >Created-by: <b>{{ post.username }}</b></small
          >
        </div>
      </div>
    </template>
    <p v-else-if="posts && posts.length <= 0">No posts found...</p>
    <p v-else>{{ error }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "nuxt-property-decorator";

@Component
export default class LandingPage extends Vue {
  get posts() {
    const posts = this.$store.getters.posts;
    return posts;
  }

  get error() {
    const error = this.$store.getters.error;
    return error;
  }
}
</script>
