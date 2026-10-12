import TrackList from '../TrackList/TrackList.jsx';
import styles from './Playlist.module.css';

function Playlist({tracks, onRemove, name, onNameChange, onSave, isSaving, saveError}) {
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
                    disabled={!name.trim() || tracks.length === 0 || isSaving}
                >
                    {isSaving ? (
                        <>
                            <span className={styles.spinner} aria-hidden="true"></span>
                            Saving...
                        </>
                    ) : (
                        "Save to Spotify"
                    )}
                </button>

                {saveError && (<p role="alert">{saveError}</p>)}
            </div>
        </section>
    )
}

export default Playlist;
