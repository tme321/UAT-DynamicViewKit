import { Component, OnInit, ContentChildren, QueryList, TemplateRef, ViewChildren, AfterViewInit } from '@angular/core';
import { ContentConductorService, ContentDirective, ContentContainerDirective, ContentConductor, ContentContainer } from '@uat/dvk';

@Component({
  selector: 'dex-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  @ContentChildren(ContentDirective,{ read: TemplateRef, descendants: true }) 
  contents: QueryList<TemplateRef<any>>;

  @ViewChildren(ContentContainerDirective)
  containers: QueryList<ContentContainerDirective>;

  conductor: ContentConductor<ContentContainer>;
  containerName = 'one';

  constructor(private ccService: ContentConductorService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.conductor = this.ccService
      .createContentConductor(this.containers, this.contents);

    this.conductor.init(this.containerName);
  }
  
  onToggle() {
    const oldCont = this.containerName;
    if(this.containerName === 'one') { 
      this.containerName = 'two'; 
    } 
    else if(this.containerName === 'two') { 
      this.containerName = 'one'; 
    }
    this.conductor.moveViews(oldCont,this.containerName);
  }
  
}
