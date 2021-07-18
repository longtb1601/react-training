import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PostPage = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState('');

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(response => {
            setIsLoading(false);
            setPost(response.data);
        })
    }, [id]);

    if (isLoading) return <h1>Loading...</h1>
    
    return (
        <div>
            <p><span>ID: </span> {post.id}</p>
            <p><span>Title:</span> {post.title}</p>
            <p><span>Body:</span> {post.body}</p>
        </div>
    );
}

export default PostPage;