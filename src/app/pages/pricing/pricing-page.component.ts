import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.title.setTitle('Pricing Us - Angular Pokemon');
    this.meta.updateTag({
      name: 'description',
      content: 'Esta es la descrición de Pricing',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Esta es la descrición de Pricing',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'about,pokemon,Pricing ',
    });
    // if (!isPlatformServer(this.platform)) {
    //   document.title = 'Prueba Pricing';
    // }
  }
}
