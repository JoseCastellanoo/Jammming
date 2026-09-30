import TrackList from '../TrackList/TrackList';
import styles from './SearchResults.module.css';

function SearchResults({tracks, onAdd}) {
    return (
        <section className={styles.searchResults}>
            <h2>Results</h2>
            <TrackList 
                tracks={tracks}
                onAdd={onAdd}
                isRemoval={false} />
        </section>    
    );
}

export default SearchResults;
