import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DuComponent } from './du/du.component';

const routes: Routes = [
  { path: 'du', component: DuComponent },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
