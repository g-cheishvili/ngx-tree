import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './components/tree/tree.component';
import { NgxTreeCoreModule } from '../core/core.module';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';

@NgModule({
  declarations: [TreeComponent, TreeNodeComponent],
  imports: [CommonModule, NgxTreeCoreModule],
  exports: [TreeComponent]
})
export class NgtTreeModule {}
