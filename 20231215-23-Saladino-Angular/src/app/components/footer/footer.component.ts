import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  contact = [
    {
      Red: 'Linkedin',
      Url: 'https://www.linkedin.com/in/agustin-saladino/'
    },
    {
      Red: 'Github',
      Url: 'https://github.com/agussala2003/'
    },
    {
      Red: 'Portfolio',
      Url: 'https://agussala2003.github.io/portfolio/'
    }
  ]
}
