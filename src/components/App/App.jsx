import { useState } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Services/Spotify';
import { getAccessToken } from '../../Services/SpotifyAuth';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("My Playlist");

    function removeTrack(track) {
        setPlaylist(prevPlaylist => prevPlaylist.filter(item => item.id !== track.id));
    }

    function addTrack(track) {
        setPlaylist((prevPlaylist) => {
            const trackExists = prevPlaylist.some((item) => item.id === track.id);
            if (trackExists) {
                return prevPlaylist;
            }
            return [...prevPlaylist, track];
        })
    }

    async function savePlaylist() {
        const normalPlaylist = playlistName.trim();
        if (!normalPlaylist || playlist.length === 0) {
            return;
        }

        const trackUris = playlist.map((track) => track.uri);

        try {
            const accessToken = await getAccessToken();

            if(!accessToken) {
                return;
            }

            await Spotify.savePlaylist(normalPlaylist, trackUris, accessToken);

            setPlaylist([]);
            setPlaylistName("New Playlist");
        } catch (error) {
            console.log("Error saving playlist: ", error);
        }
    }

    function changePlaylistName(name) {
        setPlaylistName(name);
    }

    async function searchSpotify(term) {

        if (!term.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const accessToken = await getAccessToken();

            if (!accessToken) {
                return;
            }

            const results = await Spotify.searchTracks(term, accessToken);
            setSearchResults(results);
        } catch (error) {
            console.log("Error searching Spotify: ", error);
        }
    }

    return (
        <main className={styles.app}>
            <h1>Jammming</h1>
            <SearchBar onSearch={searchSpotify} />
            <div className={styles.workspace}>
                <SearchResults tracks={searchResults} onAdd={addTrack} />
                <Playlist
                    tracks={playlist}
                    onRemove={removeTrack}
                    name={playlistName}
                    onNameChange={changePlaylistName}
                    onSave={savePlaylist} />
            </div>
        </main>
    )
};

export default App;
