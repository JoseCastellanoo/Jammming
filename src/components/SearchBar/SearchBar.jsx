import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({onSearch }) {

    const [term, setTerm] = useState('');

    function handleSearch(event){
        event.preventDefault();
        onSearch(term);
    }

    return (
        <form className={styles.searchBar} onSubmit={handleSearch}>
            <input type="text"
                   placeholder="Enter a Song, Album, or Artist"
                   value={term}
                   onChange={(e) => setTerm(e.target.value)}

            />

            <button type="submit">Search here</button>
        </form>
    );
};

export default SearchBar;
