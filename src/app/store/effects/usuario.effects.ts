import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as userActions from '../actions';

import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
    constructor(private actions$: Actions, private userService: UsuarioService) {}

    cargarUsuario$ = createEffect(() =>
        this.actions$.pipe(
        ofType(userActions.cargarUsuario),
        mergeMap((action) =>this.userService.getUserById( action.id )
                .pipe(
                    map((user) =>
                        userActions.cargarUsuarioSuccess({ usuario: user })
                    ),
                    catchError((err) =>
                        of(userActions.cargarUsuarioError({ payload: err }))
                    )
            )
        )
        )
    );
}
