const CLIENT_ID =import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const SCOPES = "playlist-modify-private";

function generateCodeVerifier() {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const value = crypto.getRandomValues(new Uint8Array(128));

    return Array.from(value).map((value) => possible[value % possible.length]).join("");
};

async function generateCode(verifier) {
    const data = new TextEncoder().encode(verifier);

    const digest = await crypto.subtle.digest("SHA-256", data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
};

async function login() {
    const verifier = generateCodeVerifier();
    const challenge = await generateCode(verifier);

    sessionStorage.setItem("code_verifier", verifier);

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
        code_challenge_method: "S256",
        code_challenge: challenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};


async function getAccessToken() {
    const savedToken = sessionStorage.getItem("access_token");

    const expiresItem = sessionStorage.getItem("expires_at");

    if (savedToken && expiresItem && new Date().getTime() < parseInt(expiresItem)) {
        return savedToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
        login();
        return null;
    }

    const verifier = sessionStorage.getItem("code_verifier");

    if (!verifier) {
        throw new Error("Code verifier not found");
    }

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    });

    if (!response.ok) {
        throw new Error("Failed to get access token");
    }

    const data = await response.json();

    const accessToken = data.access_token;
    const expiresIn = data.expires_in;

    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("expires_at", (new Date().getTime() + expiresIn * 1000).toString());
    window.history.replaceState({}, document.title, window.location.pathname);

    return accessToken;
};

export {getAccessToken };
