import React, { useEffect } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

export default function Product() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5*1000);
    }, []);

    return (
        <div>
            <h2>Product #{params.id}</h2>
            <Link to={'/shop'}>Back to Shop</Link>
            <button onClick={()=> navigate('/')}> Go Home</button>
        </div>
    );
}