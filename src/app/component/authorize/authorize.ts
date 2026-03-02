import { Component } from '@angular/core';
import { PlaylistService } from '../../service/playlist-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorize',
  imports: [],
  templateUrl: './authorize.html',
  styleUrl: './authorize.css',
})
export class Authorize {
  private readonly clientId     = 'f52991f223b242d385949eb2a569c5da';
  private readonly redirectUri  = 'http://127.0.0.1:4200';

  private codeChallenge: string = '';
  
  constructor(private playlistService: PlaylistService
             ,private router: Router
  ) {}

  ngOnInit(){
    // checking to see if code has already been received from server
    const urlParams = new URLSearchParams(window.location.search);
    const returnedCode = urlParams.get('code');

    // if yes, exchange code for token
    if(returnedCode){
      const codeVerifier = localStorage.getItem('code_verifier');

      // get token using client-side code verifier + server-side token code
      if( codeVerifier && returnedCode ){
        this.playlistService
          .getToken(codeVerifier, returnedCode)
          .subscribe({
              next: (token) => {
                localStorage.setItem('auth_object', JSON.stringify(token));
              }
              ,
              complete: () => {
                this.router.navigate(['']);
              }
          });
      }
      
    }        
  }

  login(){
    // generate code verifier
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(64));
    const codeVerifier = values.reduce((acc, x) => acc + possible[x % possible.length], "");

    // generate code challenge and request server for token code
    this.playlistService.sha256(codeVerifier)
      .then( (hashed) => {
        console.log(hashed);    

        this.codeChallenge = this.playlistService.base64encode(hashed);
        localStorage.setItem('code_verifier', codeVerifier);
        console.log(this.codeChallenge);
        console.log(codeVerifier);

        const authUrl = new URL('https://accounts.spotify.com/authorize');
        const params = {
          'response_type':'code',
          'client_id': this.clientId,
          // 'scope': 'user-library-read user-read-private user-read-email playlist-read-private playlist-read-collaborative',
          'scope': 'user-library-read user-read-private user-read-email',                    
          'redirect_uri': this.redirectUri,
          'code_challenge': this.codeChallenge,
          'code_challenge_method': 'S256',
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
      });
  }  
}
