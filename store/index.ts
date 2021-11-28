// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from "vuex";
import { Post } from "~/types/post";
import { $axios } from "~/utils/accessors/axios";
import { handleError } from "~/utils/errorHandler";

export const state = () =>
  ({
    posts: null,
    error: null,
  } as {
    posts: Post[] | null;
    error: string | null;
  });

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  posts: (state) => {
    return state.posts;
  },

  error: (state) => {
    return state.error;
  },
};

export const mutations: MutationTree<RootState> = {
  setPosts(state, posts: Post[] | null) {
    state.posts = posts;
    state.error = null;
  },

  votePost(state, id: string) {
    if (state.posts == null) return;
    const post = state.posts.find((post) => post.id === id);
    if (post) post.votes += 1;
  },

  setError(state, error: string | null) {
    state.error = error;
    state.posts = null;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit:
    process.server && !process.static
      ? async function ({ dispatch }) {
          await dispatch("fetchPosts");
        }
      : () => {},

  async fetchPosts({ commit }) {
    try {
      const response: { data: { posts: Post[] } } = await $axios.get("/posts");
      commit("setPosts", response.data.posts);
    } catch (err) {
      commit("setError", handleError(err));
    }
  },
};
