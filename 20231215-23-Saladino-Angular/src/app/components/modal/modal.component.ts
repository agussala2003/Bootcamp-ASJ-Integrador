import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  aviso:string = '';
  listado: string[] = [];

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    },1000)
  }
}
