
import {Injectable, Optional, Renderer2, RendererFactory2, SkipSelf} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationConfigService } from './localization-config.service';
import {firstValueFrom} from "rxjs";

/**
 * Class representing the translation service.
 */
@Injectable()
export class LocalizationService {
  private _localeId: string = 'en-US'; // default
  private renderer: Renderer2;

  /**
   * @constructor
   * @param {LocalizationService} singleton - the localization service
   * @param {LocalizationConfigService} config - the localization config
   * @param {TranslateService} translateService - the translate service
   */
  constructor(
    @Optional() @SkipSelf() private singleton: LocalizationService,
    private config: LocalizationConfigService,
    private translateService: TranslateService,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (this.singleton) {
      throw new Error(
        'LocalizationService is already provided by the root module'
      );
    }
    this._localeId = this.config.locale_id;
  }

  /**
   * Initialize the service.
   * @returns {Promise<void>}
   */
  public initService(): Promise<void> {
    // language code same as file name.
    this._localeId = localStorage.getItem('language') || 'en-US';
    return this.useLanguage(this._localeId);
  }

  /**
   * change the selected language
   * @returns {Promise<void>}
   */
  public useLanguage(lang: string): Promise<void> {
    this.translateService.setDefaultLang(lang);
    this.changeRtlLayout(lang);
    return firstValueFrom(this.translateService
      .use(lang))
      .catch(() => {
        throw new Error('LocalizationService.init failed');
      });
  }
  public changeRtlLayout(lang: string): void {
    this.renderer.removeClass(document.body, 'ltr');
    this.renderer.removeClass(document.body, 'rtl');
    this.renderer.addClass(document.body, lang === 'ar' ? 'rtl' : 'ltr');
    this.renderer.setAttribute(document.documentElement, 'dir', lang === 'ar' ? 'rtl' : 'ltr');
  }

  /**
   * Gets the instant translated value of a key (or an array of keys).
   * @param key
   * @param interpolateParams
   * @returns {string|any}
   */
  public translate(key: string | string[], interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }
}
