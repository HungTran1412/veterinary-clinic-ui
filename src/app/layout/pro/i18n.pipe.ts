import { Pipe, PipeTransform } from '@angular/core';
import { I18NService } from '@/app/shared-ui/core/i18n/i18n.service';

@Pipe({
  name: 'i18n',
  standalone: true
})
export class I18nPipe implements PipeTransform {
  constructor(private i18n: I18NService) {}

  transform(key: string, args?: any[]): string {
    return this.i18n.fanyi(key, args);
  }
}
