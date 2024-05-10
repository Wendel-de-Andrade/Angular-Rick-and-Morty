import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, Renderer2, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnChanges {
  @Input() character: any;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible']) {
      const change = changes['isVisible'];
      if (change.currentValue) {
        this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      } else {
        this.renderer.setStyle(this.document.body, 'overflow', 'auto');
      }
    }
  }

  closeModal() {
    this.close.emit();
  }
}
