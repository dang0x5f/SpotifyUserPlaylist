import { Routes } from '@angular/router';
import { PlaylistManager } from './component/playlist-manager/playlist-manager';
import { Authorize } from './component/authorize/authorize';
import { authorizeGuard } from './service/authorize-guard';

export const routes: Routes = 
[
    {
        path: '',
        component: PlaylistManager,
        canActivate: [authorizeGuard]
    }
    ,
    {
        path: 'authorize',
        component: Authorize,
    }
];
