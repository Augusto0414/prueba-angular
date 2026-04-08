import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Category } from '../../../features/categories/models/category.model';
import { StatsCardComponent } from '../stats-card/stats-card.component';

@Component({
  selector: 'app-stats-container',
  standalone: true,
  imports: [CommonModule, StatsCardComponent],
  templateUrl: './stats-container.component.html',
  styleUrl: './stats-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsContainerComponent {
  categories = input<Category[]>([]);

  totalCategories() {
    return this.categories().length;
  }

  activeCategories() {
    return this.categories().filter(cat => cat.isActive).length;
  }

  inactiveCategories() {
    return this.categories().filter(cat => !cat.isActive).length;
  }

  // Nombres de iconos como strings
  featherArchive = 'featherArchive';
  featherCheck = 'featherCheck';
  featherAlertCircle = 'featherAlertCircle';
}
