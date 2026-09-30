import styles from './SearchBar.module.css';

function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <input placeholder="Enter a Song, Album, or Artist" />

            <button type="button">Search here</button>
        </div>
    );
};

export default SearchBar;
