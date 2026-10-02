import TrackList from '../TrackList/TrackList.jsx';
import styles from './Playlist.module.css';

function Playlist({tracks, onRemove, name, onNameChange, onSave}) {
    return (
        <section className={styles.playlist}>
            <TrackList 
                tracks={tracks}
                onRemove={onRemove}
                isRemoval={true} 
            />

            <div className={styles.playlistControls}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    aria-label="Playlist name"
                />
                <button
                    type="button"
                    onClick={onSave}
                    disabled={!name.trim() || tracks.length === 0}
                >
                    Save to Spotify
                </button>
            </div>
        </section>
    )
}

export default Playlist;
