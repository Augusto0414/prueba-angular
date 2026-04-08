import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardComponent {
  title = input.required<string>();
  value = input.required<number>();
  icon = input<string>();
  backgroundColor = input<string>('#007bff');
}
