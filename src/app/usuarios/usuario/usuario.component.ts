import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario | null;
  loading: boolean = false;
  error: any;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('usuario').subscribe(({ user, loading, error }) => {
      this.usuario = user;
      this.loading = loading;
      this.error = error;
    });

    this.router.params.subscribe(({ id }) => {
      this.store.dispatch(cargarUsuario({ id }));
    });
  }
}
