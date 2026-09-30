import Track from "../Track/Track";
import styles from "./TrackList.module.css";

function TrackList({ tracks, onRemove, onAdd, isRemoval }) {
    return (
        <div className={styles.trackList}>
            {tracks.map((track) => (
                <Track key={track.id}
                 track={track}
                 onRemove={onRemove}
                 onAdd={onAdd}
                 isRemoval={isRemoval}
                />
            ))}

        </div>
    )
}

export default TrackList;
