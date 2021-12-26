import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeCoreComponent } from './components/tree-core/tree-core.component';
import { NodeDirective } from './directives/node.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TreeCoreComponent, NodeDirective],
  exports: [TreeCoreComponent, NodeDirective]
})
export class NgxTreeCoreModule {}
