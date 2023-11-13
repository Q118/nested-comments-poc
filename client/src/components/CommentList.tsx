import { Comment } from "./Comment";
import { Comment as CommentType } from "../contexts/PostContext";


export function CommentList({ comments }: { comments: CommentType[]; }) {
    return comments.map((comment: CommentType) => (
        <div key={comment.id} className="comment-stack">
            <Comment {...comment} />
        </div>
    ));
}