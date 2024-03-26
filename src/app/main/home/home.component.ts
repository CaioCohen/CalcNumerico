import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editor: any;

  tinyConfig = {
    height: 600,
    plugins: 'advlist autolink lists link image preview anchor visualblocks code insertdatetime media table code',
    toolbar: 'undo redo | formatselect | bold italic backcolor | image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat |'
  };

  constructor() { }

  ngOnInit(): void {
  }

  teste(){
    console.log(this.editor);
  }

}
