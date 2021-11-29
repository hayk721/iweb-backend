import { I18N_PARSER_OPTIONS, I18nJsonParserOptions, I18nParser, I18nTranslation } from 'nestjs-i18n';
import { Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import en from '../en';
import ar from '../ar';
import { LANG } from '@enums/user-lang.enum';

export class I18nObjectParser extends I18nParser {
  constructor(
    @Inject(I18N_PARSER_OPTIONS)
    private readonly options: I18nJsonParserOptions,
  ) {
    super();
  }

  async languages(): Promise<string[] | Observable<string[]>> {
    return Object.values<string>(LANG);
  }

  async parse(): Promise<I18nTranslation | Observable<I18nTranslation>> {
    return {
      ar,
      en,
    };
  }
}
