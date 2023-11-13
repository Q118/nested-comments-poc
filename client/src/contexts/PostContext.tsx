/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/posts";


export type Comment = {
    id: string;
    parentId?: string;
    message: string;
    user: { id: string; name: string; };
    likeCount: number;
    createdAt: string;
    likedByMe: boolean;
};

export type Post = {
    id: string;
    title?: string;
    content?: string;
    likeCount?: number;
    likedByMe?: boolean;
    comments?: Comment[];
    body?: string;
};


type PostContextType = {
    post: Post;
    rootComments: Comment[];
    getReplies: (parentId: string) => any[];
    createLocalComment: (comment: Partial<Comment>) => any;
    updateLocalComment: (id: string, message: string) => any;
    deleteLocalComment: (id: string) => void;
    toggleLocalCommentLike: (id: string, addLike: boolean) => any;
};

const Context = React.createContext({} as PostContextType);

export function usePost() {
    return useContext(Context);
}

export function PostProvider({ children }) {
    const { id = 'fake-id-i-hate-typescript' } = useParams();
    const { loading, error, value: post } = useAsync<Post>(() => getPost(id || '0'), [ id ]);
    const [ comments, setComments ] = useState<Comment[]>([]);

    const commentsByParentId = useMemo(() => {
        const group = {};
        comments.forEach(comment => {
            // @ts-ignore
            group[ comment.parentId ] ||= [];
            // @ts-ignore
            group[ comment.parentId ].push(comment);
        });
        return group;
    }, [ comments ]);


    useEffect(() => {
        if (post?.comments == null) return;
        setComments(post.comments);
    }, [ post?.comments ]);

    function getReplies(parentId: string | number) {
        return commentsByParentId[ parentId ];
    }

    function createLocalComment(comment: any) {
        setComments((prevComments: any) => {
            return [ comment, ...prevComments ];
        });
    }

    function updateLocalComment(id: string, message: any) {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (comment.id === id) {
                    return { ...comment, message };
                } else {
                    return comment;
                }
            });
        });
    }

    function deleteLocalComment(id: string) {
        setComments(prevComments => {
            return prevComments.filter(comment => comment.id !== id);
        });
    }

    function toggleLocalCommentLike(id: string, addLike: any) {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (id === comment.id) {
                    if (addLike) {
                        return {
                            ...comment,
                            likeCount: comment.likeCount + 1,
                            likedByMe: true,
                        };
                    } else {
                        return {
                            ...comment,
                            likeCount: comment.likeCount - 1,
                            likedByMe: false,
                        };
                    }
                } else {
                    return comment;
                }
            });
        });
    }

    return (
        <Context.Provider
            value={{
                post: { id, ...post },
                // @ts-ignore
                rootComments: commentsByParentId[ null ],
                getReplies,
                createLocalComment,
                updateLocalComment,
                deleteLocalComment,
                toggleLocalCommentLike,
            }}
        >
            {loading ? (
                <h1>Loading</h1>
            ) : error ? (
                <h1 className="error-msg">{error}</h1>
            ) : (
                children
            )}
        </Context.Provider>
    );
}