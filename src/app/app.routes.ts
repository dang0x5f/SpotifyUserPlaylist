import { Routes } from '@angular/router';
import { Auth } from './component/auth/auth';
import { PlaylistManager } from './component/playlist-manager/playlist-manager';

export const routes: Routes = 
[
    {
        path: '',
        component: PlaylistManager,
    }
    ,
    {
        path: 'auth',
        component: Auth,
    }
];
