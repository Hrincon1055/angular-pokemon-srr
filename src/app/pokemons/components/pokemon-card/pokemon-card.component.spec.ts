import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonCardComponent } from './pokemon-card.component';
const mockPokemon: SimplePokemon = {
  name: 'bulbasaur',
  id: '1',
};
describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the PokemonCardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have the Simplepokemomn signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const image = compiled.querySelector('img') as HTMLImageElement;
    const imageUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
    expect(image.src).toBe(imageUrl);
    expect(compiled.textContent?.trim()).toContain(mockPokemon.name);
  });

  it('should  have the proper  ng-reflect-router-lin', () => {
    const divWithLink = compiled.querySelector('div') as HTMLDivElement;
    expect(
      divWithLink.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemon,${mockPokemon.name}`);
  });
});
