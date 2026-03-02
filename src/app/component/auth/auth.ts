import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../../service/playlist-service';
import { HttpClient , HttpHeaders , HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
    // private readonly clientId     = 'aeb8024bb19e48a8a38a55c303b616d7';
    // private readonly redirectUri  = 'http://127.0.0.1:4200/playlist-manager';
    // private readonly authUrl      = new URL('https://accounts.spotify.com/authorize');
    // private codeChallenge: string = '';
    
    constructor(private playlistService: PlaylistService, private router: Router) {}

    ngOnInit(){
        // const urlParams = new URLSearchParams(window.location.search);
        // const returnedCode = urlParams.get('code');
        console.log('AUTH')
        const returnedCode = new URLSearchParams(window.location.search).get('code');
        const codeVerifier = localStorage.getItem('code_verifier');


        
        // console.log( codeVerifier , '\n' , returnedCode );

        // if( codeVerifier && returnedCode ){
        //     this.playlistService
        //         .getToken(codeVerifier, returnedCode)
        //         .subscribe({
        //             next: (token) => {
        //                 console.log('token : ', token);
        //                 localStorage.setItem('auth_object', JSON.stringify(token));
        //             }
        //             ,
        //             complete: () => {
        //                 console.log('done');
        //                 this.router.navigate(['']);
        //             }
        //         });
        // }else{
        //     this.router.navigate(['']);
        // }
    }

    // login(){
    //     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     const values = crypto.getRandomValues(new Uint8Array(64));
    //     const codeVerifier = values.reduce((acc, x) => acc + possible[x % possible.length], "");

    //     this.playlistService.sha256(codeVerifier)
    //         .then( (hashed: string) => {
    //             this.codeChallenge = hashed
    //                 .replace(/=/g, '')
    //                 .replace(/\+/g, '-')
    //                 .replace(/\//g, '_');
    //         });
                
    //     localStorage.setItem('code_verifier', codeVerifier);

    //     let body = new HttpParams()
    //         .set('response_type', 'code')
    //         .set('client_id', this.clientId)
    //         .set('scope', 'user-read-private user-read-email')
    //         .set('redirect_uri', this.redirectUri)
    //         .set('code_challenge', this.codeChallenge)
    //         .set('code_challenge_method', 'S256');

    //     this.authUrl.search = body.toString();
    //     window.location.href = this.authUrl.toString();
    // }
}
