import { Routes, Route } from "react-router-dom";
import { Post } from "./components/Post";
import { PostList } from "./components/PostList";
import { PostProvider } from "./contexts/PostContext";

export default function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<PostList />} />
                {/* <Route path="/" element={<>Post List.</>} /> */}
                <Route
                    path="/posts/:id"
                    element={
                        <PostProvider>
                            <Post />
                        </PostProvider>
                    }
                // element={<>Hello one post</>}
                />
            </Routes>
        </div>
    );
}

