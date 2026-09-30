import { useState } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';

function App() {
    const [searchResults, setSearchResults] = useState([
        {
        id: 1,
        name: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        uri: "spotify:track:1"
    },
    {
        id: 2,
        name: "Believer",
        artist: "Imagine Dragons",
        album: "Evolve",
        uri: "spotify:track:2"
    },
    {
        id: 3,
        name: "Lose Yourself",
        artist: "Eminem",
        album: "8 Mile",
        uri: "spotify:track:3"
    }
    ]);
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

    function savePlaylist() {
        const trackUris = playlist.map((track) => track.uri);

        console.log("Playlist Name:", playlistName);
        console.log("Track Uris:", trackUris);

        setPlaylist([]);
        setPlaylistName("New Playlist");
    }

    function changePlaylistName(name) {
        setPlaylistName(name);
    }

    return (
        <main className={styles.app}>
            <h1>Jammming</h1>
            <SearchBar />
            <SearchResults tracks={searchResults} onAdd={addTrack} />
            <Playlist 
            tracks={playlist} 
            onRemove={removeTrack} 
            name={playlistName} 
            onNameChange={changePlaylistName} 
            onSave={savePlaylist} />
        </main>
    )
};

export default App;
