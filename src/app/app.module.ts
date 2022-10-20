import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './Router/app-routing.module';
import { AppComponent } from './AppComponent/app.component';
import { NavigatePathComponent } from './NavigatorPageProjectComponent/navigatorPageProject.component';
import { NotFoundComponent } from './NotFoundComponent/NotFound.component';

@NgModule({
    declarations: [AppComponent, NavigatePathComponent, NotFoundComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [NavigatePathComponent],
})
export class AppModule {}
