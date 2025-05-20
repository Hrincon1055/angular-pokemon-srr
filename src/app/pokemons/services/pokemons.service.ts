import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private _http = inject(HttpClient);
  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    return this._http
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map((poke) => ({
            id: poke.url.split('/').at(-2) ?? '',
            name: poke.name,
          }));
          return simplePokemons;
        })
      );
  }

  public loadPokemon(id: string): Observable<Pokemon> {
    return this._http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
