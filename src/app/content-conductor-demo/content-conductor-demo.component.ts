import { Component, OnInit, ContentChildren, QueryList, ViewContainerRef, TemplateRef, ViewChildren } from '@angular/core';
import { ContentDirective, ContentConductorService, ContentContainerDirective, ContentConductor, ContentContainer } from '@uat/dvk';

/**
 * Used just for tesitng the content conductor functionality.
 */
@Component({
  selector: '[content-conductor-demo]',
  templateUrl: './content-conductor-demo.component.html',
  styleUrls: ['./content-conductor-demo.component.css']
})
export class ContentConductorDemoComponent implements OnInit {
  @ContentChildren(ContentDirective,{ read: TemplateRef, descendants: true }) 
  contents: QueryList<TemplateRef<any>>;

  @ViewChildren(ContentContainerDirective) // BBContentContainerDirective) 
  containers: QueryList<ContentContainerDirective>;

  cont: 'one' | 'two' = 'one';

  conductor: ContentConductor<ContentContainer>;

  constructor(
    private ccService: ContentConductorService,
    private vcRef: ViewContainerRef) { }

  ngOnInit() {
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

  ngAfterContentInit() {

  }

  ngAfterViewInit() {
    this.conductor = this.ccService
      .createContentConductor(this.containers, this.contents);

    this.conductor.init(this.cont);
  }

  ngAfterViewChecked() {
  }
}
