import TrackList from '../TrackList/TrackList.jsx';
import styles from './Playlist.module.css';

function Playlist({tracks, onRemove, name, onNameChange, onSave}) {
    return (
        <section className={styles.playlist}>
            <input type="text" value={name} onChange={(e) => onNameChange(e.target.value)} />

            <TrackList 
                tracks={tracks}
                onRemove={onRemove}
                isRemoval={true} 
            />

            <button type="button" onClick={onSave}>Save to Spotify</button>
        </section>
    )
}

export default Playlist;
