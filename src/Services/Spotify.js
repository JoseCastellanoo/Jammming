const API_BASE_URL = "https://api.spotify.com/v1";

async function spotifyFetch(endpoint, accessToken, options = {}) {
    const url = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!url.ok) {
        const errorData = await url.json().catch(() => null);

        throw new Error(error.data?.error?.message || `Spotify API error: ${url.status}`);
    }

    return url.json();
}

async function searchTracks(term, accessToken) {
    if (!term.trim()) {
        return []; 
    }
    const data = await spotifyFetch(`/search?q=${encodeURIComponent(term)}&type=track`, accessToken);

    return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        uri: track.uri,
    }));
}

async function savePlaylist(name, trackUris, accessToken) {
    if(!name || trackUris.length === 0) {
        return;
    }

    const playlist = await spotifyFetch("/me/playlists", accessToken, {
        method: "POST",
        body: JSON.stringify({name, public: false, description: "Created with Jammming", }),
    })

    await spotifyFetch(`/playlists/${playlist.id}/tracks`, accessToken, {
        method: "POST",
        body: JSON.stringify({uris: trackUris}),
    });

    return playlist;
}

const Spotify = {
    searchTracks,
    savePlaylist,
};

export default Spotify;