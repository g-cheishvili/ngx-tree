import { Directive, TemplateRef } from '@angular/core';
import { CoreTreeNodeContext } from '../core-tree.types';

@Directive({
  selector: '[ngtNode]'
})
export class NodeDirective<T = any> {
  constructor(readonly templateRef: TemplateRef<CoreTreeNodeContext<T>>) {}
}
