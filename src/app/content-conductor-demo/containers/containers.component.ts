import { Component, OnInit, ContentChildren, ViewChildren, TemplateRef, QueryList, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ContentDirective, ContentContainerDirective, ContentConductorService, ContentConductor, ContentContainer } from '@uat/dvk';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements AfterViewInit {
  @ContentChildren(ContentDirective,{ read: TemplateRef, descendants: true }) 
  contents: QueryList<TemplateRef<any>>;

  @ViewChildren(ContentContainerDirective)
  containers: QueryList<ContentContainerDirective>;

  cont: 'one' | 'two' = 'one';

  conductor: ContentConductor<ContentContainer>;

  constructor(
    private ccService: ContentConductorService,
    private vcRef: ViewContainerRef) { }

  ngAfterViewInit() {
    this.conductor = this.ccService
      .createContentConductor(this.containers, this.contents);

    this.conductor.init(this.cont);
  }

  onToggle() {
    const oldCont = this.cont;
    if(this.cont === 'one') { 
      this.cont = 'two'; 
    } 
    else if(this.cont === 'two') { 
      this.cont = 'one'; 
    }
    this.conductor.moveViews(oldCont,this.cont);
  }
}
