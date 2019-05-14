import { Component, OnInit } from "@angular/core";
import { CatalogService } from "../catalog.service";
import { Feed } from "../Feed";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"]
})
export class CatalogComponent implements OnInit {
  feed: Feed;

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(`${JSON.stringify(this.route.snapshot.queryParams.path)}`);
    const path = this.route.snapshot.queryParams.path;
    console.log(`Path from route: ${path}`);
    this.route.queryParams.subscribe(async params => {
      this.feed = await this.catalogService.getCatalog(params.path);
    });
  }
}
