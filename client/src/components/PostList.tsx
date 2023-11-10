import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../services/posts";

import { Post } from "../contexts/PostContext";

export function PostList() {
    const { loading, error, value: posts } = useAsync<Post[]>(getPosts);

    if (loading) return <h1>Loading</h1>;
    if (error) return <h1 className="error-msg">{error}</h1>;
    if (!posts) return <h1 className="error-msg">Unknown error loading posts. Please try again.</h1>;

    return posts.map(post => {
        return (
            <h1 key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h1>
        );
    });
}