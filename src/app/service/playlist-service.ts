import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
    private readonly clientId     = 'aeb8024bb19e48a8a38a55c303b616d7';
    private readonly redirectUri  = 'http://127.0.0.1:4200/auth';
    private readonly tokenUrl     = 'https://accounts.spotify.com/api/token';
    private readonly authUrl      = new URL('https://accounts.spotify.com/authorize');
    
    private codeChallenge: string = ' ';
    // private codeVerifier:  string = ' ';

    constructor(private http: HttpClient) {}

    generateRandomString(length: number): any {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    sha256(plain: any): any {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
      return window.crypto.subtle.digest('SHA-256', data)
    }

    base64encode(input: any): any {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }


    getAccessToken(): void{
        const codeVerifier = this.generateRandomString(64);

        localStorage.setItem('code_verifier', codeVerifier);

        this.sha256(codeVerifier)
            .then( (hashed: any) => {
                this.codeChallenge = this.base64encode(hashed);
                console.log(this.codeChallenge);

                // localStorage.setItem('code_verifier', this.codeVerifier);
                
                let headers = new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                });


                let body = new HttpParams()
                    .set('response_type', 'code')
                    .set('client_id', this.clientId)
                    // .set('grant_type', 'authorization_code')
                    .set('scope', 'user-read-private user-read-email')
                    // .set('code', this.codeChallenge)
                    .set('redirect_uri', this.redirectUri)
                    .set('code_challenge_method', 'S256')
                    .set('code_challenge', this.codeChallenge);
                    // .set('code_verifier', this.codeVerifier);


                this.authUrl.search = body.toString();
                window.location.href = this.authUrl.toString();

            })
            .catch( (error: string) => {
                console.log('promise caught error : ', error);
            });

        
        // const hashed = this.sha256(codeVerifier);
        // console.log(hashed);
                    
        // const codeChallenge = this.base64encode(hashed);



        // const body = new HttpParams()
        //     .set('client_id', this.clientId)
        //     .set('grant_type', 'authorization_code')
        //     .set('code',
        // console.log(this.clientId);
        // console.log(this.clientSecret);
        
    }


    getToken(codeVerifier:string, returnedCode: string){
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        const body = new HttpParams()
            .set('client_id',this.clientId)
            .set('grant_type','authorization_code')
            .set('code', returnedCode)
            .set('redirect_uri',this.redirectUri)
            .set('code_verifier', codeVerifier);
            
        return(this.http.post(this.tokenUrl, body.toString(), { headers }));
    }

    // saveToken(){
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const code = urlParams.get('code') ?? '';

    //     console.log('token code: ', code);

    //     this.getToken(code).subscribe( (token) => {
    //         console.log(token);
    //         localStorage.setItem('access_token',JSON.stringify(token));
    //     });

        
    // }
}
