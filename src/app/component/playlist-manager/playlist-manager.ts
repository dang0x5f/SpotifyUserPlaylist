import { Component , OnInit } from '@angular/core';
import { PlaylistService } from '../../service/playlist-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-manager',
  imports: [],
  templateUrl: './playlist-manager.html',
  styleUrl: './playlist-manager.css',
})
export class PlaylistManager {
    isAuthorized: boolean = false;

    constructor(private playlistService: PlaylistService
               ,private router: Router
    ){}

    ngOnInit(){
        const auth_obj = localStorage.getItem('auth_object');
        console.log(auth_obj);
        
        if(auth_obj){
            this.isAuthorized = true;
            console.log(auth_obj);

            // this.playlistService.getUserData()
            //     .subscribe( (data) => {
            //         console.log(data);

            //     });

            // this.playlistService.getUserTracks()
            //     .subscribe( (data) => {
            //         console.log(data.next)
            //         let page: tracksPage = data;
            //         while( page.next ){
            //             this.playlistService.getNextTracksPage(page.next)
            //                 .subscribe( (page) => {
            //                     let p = page;
            //                     console.log(p.next);
            //                 })
            //         }
            //     })                
        }else{
            this.router.navigate(['authorize']);
        }
    }
}

interface tracksPage {
    href: string
    items: any
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}