<template>
  <div>
    <input
      id="create-post-modal"
      ref="createPostModal"
      type="checkbox"
      class="modal-toggle"
    />
    <div class="modal">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-bold truncate mb-0">Create Post</h3>
          <button @click="onClose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="tabs tabs-boxed mb-4">
          <button
            class="tab"
            :class="{ 'tab-active': activeTab === 'Text' }"
            @click="activeTab = 'Text'"
          >
            Text Post
          </button>
          <button
            class="tab"
            :class="{ 'tab-active': activeTab === 'Image' }"
            @click="activeTab = 'Image'"
          >
            Image Post
          </button>
        </div>
        <form role="form" @submit.prevent="!invalid && onPost()">
          <base-input
            v-model="title"
            placeholder="Title"
            type="text"
            name="Title"
            label="Title"
            :rules="[{ required: true }]"
            @invalid="titleInvalid = $event"
          />
          <base-input
            v-model="username"
            placeholder="Username"
            type="text"
            name="Username"
            label="Username"
            :rules="[{ required: true }]"
            @invalid="usernameInvalid = $event"
          />
          <div v-if="activeTab === 'Text'" class="form-control">
            <label class="label">
              <span class="label-text">Content</span>
            </label>
            <textarea
              v-model="content"
              class="textarea h-24 textarea-bordered"
              placeholder="Content"
            ></textarea>
          </div>
          <div v-if="activeTab === 'Image'" class="form-control">
            <label class="label">
              <span class="label-text font-bold">Content</span>
            </label>
          </div>
          <div v-if="activeTab === 'Image'" class="flex flex-row flex-wrap">
            <div v-for="(img, i) of images" :key="img.src" class="w-1/3">
              <figure
                class="mb-1 w-full"
                :class="{
                  'pr-1': i % 3 === 0,
                  'px-1': i % 3 === 1,
                  'pl-1': i % 3 === 2,
                }"
              >
                <img :src="img.src" :alt="img.alt" class="rounded-xl" />
              </figure>
              <input
                type="checkbox"
                :checked="isImgChecked(img)"
                class="checkbox"
                @click="onSelectImg(img)"
              />
            </div>
          </div>
        </form>
        <div v-if="errorMessage" class="alert alert-error mt-6">
          <div class="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <label>{{ errorMessage }}</label>
          </div>
        </div>
        <div class="form-control modal-action">
          <button
            native-type="submit"
            :class="{ loading: isLoading }"
            class="btn btn-primary"
            :disabled="invalid"
            @click="onPost"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "nuxt-property-decorator";
import BaseInput from "~/components/BaseInput.vue";
import { handleError } from "~/utils/errorHandler";
import { Post } from "~/types/post";

@Component({
  components: { BaseInput },
})
export default class CreatePostModal extends Vue {
  isLoading = false;
  title: string | null = null;
  username: string | null = null;
  content: string | null = null;
  titleInvalid = true;
  usernameInvalid = true;
  errorMessage: string | null = null;
  activeTab: "Text" | "Image" = "Text";
  selectedImg: { src: string; alt: string } | null = null;

  @Prop({
    type: Boolean,
    default: false,
  })
  open!: boolean;

  @Watch("open")
  onOpenChange() {
    if (this.open) this.onOpen();
  }

  get invalid() {
    return (
      this.titleInvalid ||
      this.usernameInvalid ||
      (this.activeTab === "Text" &&
        (this.content == null || this.content.length <= 0)) ||
      (this.activeTab === "Image" && this.selectedImg == null)
    );
  }

  get posts() {
    const posts = this.$store.getters.posts;
    return posts;
  }

  get images() {
    const baseUrl =
      process.env.NODE_ENV === "production" ? "TODO" : "http://localhost:3000";
    return [
      { src: `${baseUrl}/images/computer.jpg`, alt: "Computer" },
      { src: `${baseUrl}/images/man.jpg`, alt: "Man" },
      { src: `${baseUrl}/images/monkeys.jpg`, alt: "Monkeys" },
      { src: `${baseUrl}/images/mountains.jpg`, alt: "Mountains" },
      { src: `${baseUrl}/images/think.jpg`, alt: "Think" },
      { src: `${baseUrl}/images/travel.jpg`, alt: "Travel" },
    ];
  }

  onSelectImg(img: { src: string; alt: string }) {
    if (this.isImgChecked(img)) {
      this.selectedImg = null;
    } else {
      this.selectedImg = { ...img };
    }
  }

  isImgChecked(img: { src: string; alt: string }) {
    return this.selectedImg?.src === img.src;
  }

  onOpen() {
    if (
      process.browser &&
      this.$refs &&
      this.$refs.createPostModal &&
      this.open
    ) {
      const createPostModal = this.$refs.createPostModal as HTMLInputElement;
      createPostModal.checked = true;
    }
  }

  onClose() {
    if (
      process.browser &&
      this.$refs &&
      this.$refs.createPostModal &&
      this.open
    ) {
      const createPostModal = this.$refs.createPostModal as HTMLInputElement;
      createPostModal.checked = false;
      this.$emit("close");
    }
  }

  async onPost() {
    if (!this.title || !this.username) return;
    else if (this.activeTab === "Text" && !this.content) return;
    else if (this.activeTab === "Image" && !this.selectedImg) return;

    try {
      this.isLoading = true;
      const post: Partial<Post> = {
        title: this.title,
        username: this.username,
        content: this.content ?? "",
        votes: 0,
        type: this.activeTab,
        image: this.selectedImg != null ? this.selectedImg.src : null,
      };
      await this.$axios.$post(
        "posts",
        {
          post,
        },
        {
          headers: {
            Accept: "application/json",
            Content: "application/json",
          },
        }
      );
      if (this.posts) this.$store.commit("setPosts", [...this.posts, post]);
      this.isLoading = false;
      this.onClose();
    } catch (err) {
      this.isLoading = false;
      this.errorMessage = handleError(err);
    }
  }
}
</script>

<style></style>
