import {Component, OnInit} from '@angular/core';
import {LocalizationService} from "./core/services/internationalization/localization.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: LocalizationService) {
  }
  setLang(lang: string) {
    this.translate.useLanguage(lang).then()

  }
}
