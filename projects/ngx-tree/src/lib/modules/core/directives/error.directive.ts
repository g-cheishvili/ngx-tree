import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngtError]'
})
export class ErrorDirective<T extends Error> {
  constructor(readonly templateRef: TemplateRef<{ $implicit: T }>) {}
}
