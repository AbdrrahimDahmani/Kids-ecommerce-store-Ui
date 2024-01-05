import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoriePageComponent } from './categorie-page/categorie-page.component';
import { PanierComponent } from './panier/panier.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'categorie/:categorie',
    component: CategoriePageComponent,
  },
  {
    path: 'panier',
    component: PanierComponent,
  },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
