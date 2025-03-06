export async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}

export async function fetchPostById(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return await response.json();
}
