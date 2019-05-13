import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { OpdsLink } from '../OpdsLinks';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  opdsLinks: OpdsLink[] = [];
  constructor(private catalogService: CatalogService) {

  }

  async ngOnInit() {
    this.opdsLinks = await this.catalogService.getCatalog();
    // this.opdsLinks = [ "link 1", "link 2"];

  }

}
