import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeCoreComponent } from './components/tree-core/tree-core.component';
import { NodeDirective } from './directives/node.directive';
import { LoadingDirective } from './directives/loading.directive';
import { ErrorDirective } from './directives/error.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TreeCoreComponent,
    NodeDirective,
    LoadingDirective,
    ErrorDirective
  ],
  exports: [TreeCoreComponent, NodeDirective, LoadingDirective, ErrorDirective]
})
export class NgxTreeCoreModule {}
