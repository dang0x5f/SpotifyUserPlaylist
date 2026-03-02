import { Routes } from '@angular/router';
import { PlaylistManager } from './component/playlist-manager/playlist-manager';
import { Authorize } from './component/authorize/authorize';

export const routes: Routes = 
[
    {
        path: '',
        component: PlaylistManager,
    }
    ,
    {
        path: 'authorize',
        component: Authorize,
    }
];
