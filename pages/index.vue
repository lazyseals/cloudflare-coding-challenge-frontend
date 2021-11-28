<template>
  <div class="mx-auto max-w-7xl p-6">
    <template v-if="posts && posts.length > 0">
      <div
        v-for="(post, i) in posts"
        :key="post.title + i"
        class="card bordered mx-auto max-w-xl mb-4"
      >
        <div class="card-body">
          <h2 class="card-title mb-0">{{ post.title }}</h2>
          <figure v-if="post.image" class="w-full py-4">
            <img :src="post.image" alt="Post Image" class="rounded-xl" />
          </figure>
          <p v-else class="py-4">{{ post.content }}.</p>
          <div class="flex justify-between content-center">
            <div class="flex content-center">
              <button
                class="btn btn-xs btn-square btn-ghost"
                @click="onVote(post.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-heart"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
              </button>
              <span class="ml-1 font-bold">+{{ post.votes }}</span>
            </div>
            <small class="text-right"
              >Created-by: <b>{{ post.username }}</b></small
            >
          </div>
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
import { Post } from "~/types/post";
import { handleError } from "~/utils/errorHandler";

@Component
export default class LandingPage extends Vue {
  get posts() {
    const posts = this.$store.getters.posts as Post[] | null;
    return posts;
  }

  get error() {
    const error = this.$store.getters.error;
    return error;
  }

  async onVote(id: string) {
    try {
      await this.$axios.$post(
        `/posts/${id}/vote`,
        {},
        {
          headers: {
            Accept: "application/json",
            Content: "application/json",
          },
        }
      );
      if (this.posts) {
        this.$store.commit("votePost", id);
      }
    } catch (err) {
      handleError(err);
    }
  }
}
</script>
