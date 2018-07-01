import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './+state/cart.effects';
import { cartReducer } from './+state/cart.reducer';
import { initialState as cartInitialState } from './+state/cart.init';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([]),
    NxModule.forRoot(),
    StoreModule.forFeature('cart', cartReducer, {
      initialState: cartInitialState
    }),
    EffectsModule.forFeature([CartEffects])
  ],
  providers: [CartEffects],
  bootstrap: [AppComponent]
})
export class AppModule {}
