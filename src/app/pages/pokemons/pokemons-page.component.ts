import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnDestroy {
  private _pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  public loadOnPageChanged = effect(() => {
    this.loadPokemons(this.currentPage()!);
  });
  // ngOnInit(): void {
  //   this.loadPokemons();
  // }

  public loadPokemons(page: number = 0) {
    this._pokemonsService
      .loadPage(page)
      .pipe(
        // tap(() =>
        //   this.router.navigate([], { queryParams: { page: pageToLoad } })
        // ),
        tap(() => this.title.setTitle(`Pokemons - Page ${page}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  ngOnDestroy(): void {
    console.log('');
  }
}
