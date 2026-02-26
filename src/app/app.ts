import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaylistService } from './service/playlist-service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SpotifyUserPlaylist');

    private readonly clientId     = 'aeb8024bb19e48a8a38a55c303b616d7';
    private readonly redirectUri  = 'http://127.0.0.1:4200/auth';
    private readonly authUrl      = new URL('https://accounts.spotify.com/authorize');
    private codeChallenge: string = '';
    
    constructor(private playlistService: PlaylistService) {}

    login(){
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(64));
        const codeVerifier = values.reduce((acc, x) => acc + possible[x % possible.length], "");

        this.playlistService.sha256(codeVerifier)
            .then( (hashed: string) => {
                this.codeChallenge = hashed
                    .replace(/=/g, '')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_');
            });
                
        localStorage.setItem('code_verifier', codeVerifier);

        let body = new HttpParams()
            .set('response_type', 'code')
            .set('client_id', this.clientId)
            .set('scope', 'user-read-private user-read-email')
            .set('redirect_uri', this.redirectUri)
            .set('code_challenge', this.codeChallenge)
            .set('code_challenge_method', 'S256');

        this.authUrl.search = body.toString();
        window.location.href = this.authUrl.toString();
    }  
}
