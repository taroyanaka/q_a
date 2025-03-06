export const app_data = {
    data() {
        return {
            posts: [],
            specificPost: {},
            selectedPostId: null
        };
    },
    async created() {
        this.posts = await fetchPosts();
        if (this.posts.length > 0) {
            this.selectedPostId = this.posts[0].id;
            this.fetchSpecificPost();
        }
    },
    methods: {
        async fetchSpecificPost() {
            this.specificPost = await fetchPostById(this.selectedPostId);
        }
    }
};