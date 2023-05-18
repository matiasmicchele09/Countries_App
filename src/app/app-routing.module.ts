import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

//Definición de cada una de mis rutas
const routes: Routes =[
  {
    path:'home', component: HomePageComponent
  },
  {
    path:'about', component: AboutPageComponent
  },
  {
    path:'contact', component: ContactPageComponent
  },
  {
    //El import es una promesa. Importamos el modulo principal de countries ya que ese ya tiene el countriesRoutingModule
    // "m" representa "modulo"
    path:'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  { //Cualquier otra ruta que no este definida en mi routing module quiero que redirija a home
    path:'**', redirectTo: 'countries'
  }
];

@NgModule({
  imports:[
    /* Si es el router principal de la aplicacion le ponemos el forRoot. Es decir, el modulo de rutas que
    maneja toda la aplicación */
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class AppRoutingModule { }
