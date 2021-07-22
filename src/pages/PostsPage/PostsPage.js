import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form} from "react-bootstrap";
import axios from 'axios';

const PostsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            setIsLoading(false);
            setPosts(response.data);
        })
    }, []);

    const postFiltered = posts.filter(post => post.title.includes(searchText));

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div>
            <Form.Group controlId="validationFormik102" className="mb-3">
                <input className="form-control" type="text" placeholder="Search by title" value={searchText} onChange={evt => setSearchText(evt.target.value)} />
            </Form.Group>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Title</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {postFiltered.map(
                        post => (
                            <tr key={post.id}>
                                <td className="text-center">{post.id}</td>
                                <td>{post.title}</td>
                                <td className="text-center">
                                    <Link to={`/post/${post.id}`} key={post.id}>View detail</Link>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PostsPage;