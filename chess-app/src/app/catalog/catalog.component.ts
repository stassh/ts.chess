import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { OpdsLink } from '../OpdsLinks';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  opdsLinks: OpdsLink[] = [];
  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  async ngOnInit() {
    const path = this.route.snapshot.paramMap.get("path");
    console.log(`Path from route: ${path}`);
    this.opdsLinks = await this.catalogService.getCatalog(path);
  }
}
