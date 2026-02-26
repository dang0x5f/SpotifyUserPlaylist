import { Component , OnInit } from '@angular/core';
import { PlaylistService } from '../../service/playlist-service';

@Component({
  selector: 'app-playlist-manager',
  imports: [],
  templateUrl: './playlist-manager.html',
  styleUrl: './playlist-manager.css',
})
export class PlaylistManager {
    isAuthorized: boolean = false;

    constructor(private playlistService: PlaylistService){}

    ngOnInit(){
        const auth_obj = localStorage.getItem('auth_object');
        
        if(auth_obj){
            this.isAuthorized = true;
            console.log(auth_obj);
        } 
    }
}
