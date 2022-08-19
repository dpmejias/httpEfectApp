import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import * as usersActions from "../actions";

import { UsuarioService } from '../../services/usuario.service';


@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions, private userService: UsuarioService) {}

    cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
        ofType(usersActions.cargarUsuarios),
        mergeMap(() =>
        this.userService
            .getUsers()
            .pipe(
                map( users => usersActions.cargarUsuariosSuccess({ usuarios: users })),
                catchError( err => of( usersActions.cargarUsuariosError({ payload: err}) ) )
            )
        )
    )
    );
}