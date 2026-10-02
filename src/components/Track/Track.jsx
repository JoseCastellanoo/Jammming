import styles from "./Track.module.css";

function Track({ track, onRemove, onAdd, isRemoval }) {

    return (
        <div className={styles.track}>
            <div className={styles.info}>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {isRemoval ? (
                <button type="button" onClick={() => onRemove(track)}>-</button>
            ) : (
                <button type="button" onClick={() => onAdd(track)}>+</button>
            )

            }
        </div>
    )
};

export default Track;
