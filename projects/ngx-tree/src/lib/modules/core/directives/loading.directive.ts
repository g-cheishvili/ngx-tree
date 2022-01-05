import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngtLoading]'
})
export class LoadingDirective {
  constructor(readonly templateRef: TemplateRef<void>) {
  }
}
