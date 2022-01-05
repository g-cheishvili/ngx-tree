import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTreeCoreModule } from '../../../ngx-tree/src/lib/modules/core/core.module';
import { NgtTreeModule } from '../../../ngx-tree/src/lib/modules/tree/ngt-tree.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTreeCoreModule, NgtTreeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
