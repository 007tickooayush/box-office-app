import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { apiGet } from '../misc/config';

function Show() {

    // destructuring and fetching only the 'id' param
    const {id} = useParams();
    const [show,setShow] = useState(null);
    // console.log('params',params);
    useEffect(() =>{
        
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then( results =>{
            setShow(results);
        })

    },[id]);

    console.log('show', show);

    return <div>Show page</div>;
}

export default Show;
