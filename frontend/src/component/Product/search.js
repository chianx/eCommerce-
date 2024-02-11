import React, { Fragment, useState, useEffect } from 'react'
import "./search.css"
import {useNavigate} from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate("/products/" + keyword);
        }else {
            navigate("/products");
        }
    }
    useEffect(() => {

    })
  return (
    <Fragment>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input type="text" placeholder='Search a product...'
            onChange={(e) => setKeyword(e.target.value)} />
            <input type="submit" value="Search" />
        </form>
    </Fragment>
  )
}

export default Search
