import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../service/authorize-service';

@Component({
  selector: 'app-playlist-manager',
  imports: [],
  templateUrl: './playlist-manager.html',
  styleUrl: './playlist-manager.css',
})
export class PlaylistManager {
  isAuthorized: boolean = false;

  constructor(private authorizeService: AuthorizeService
    , private router: Router
  ) { }

  ngOnInit() {
    const auth_obj = localStorage.getItem('auth_object');
    console.log(auth_obj);

    if (auth_obj) {
      this.isAuthorized = true;
      console.log(auth_obj);
    } else {
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