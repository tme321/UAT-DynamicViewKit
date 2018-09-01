import { Component, ContentChildren, ViewChildren, TemplateRef, QueryList, AfterViewInit } from '@angular/core';
import { ContentDirective, ContentContainerDirective, ContentConductorService, ContentConductor, ContentContainer } from '@uat/dvk';
import { OneContentDirective } from '../one-content/one-content.directive';
import { TwoContentDirective } from '../two-content/two-content.directive';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements AfterViewInit {
  @ContentChildren(ContentDirective,{ descendants: true }) 
  contents: QueryList<ContentDirective>;

  @ContentChildren(OneContentDirective,{ descendants: true }) 
  oneContents: QueryList<OneContentDirective>;

  @ContentChildren(TwoContentDirective,{ descendants: true }) 
  twoContents: QueryList<TwoContentDirective>;


  @ViewChildren(ContentContainerDirective)
  containers: QueryList<ContentContainerDirective>;

  cont: 'one' | 'two' = 'one';

  conductor: ContentConductor<ContentContainer>;

  constructor(
    private ccService: ContentConductorService) { }

  ngAfterViewInit() {
    this.conductor = this.ccService
      .createContentConductor(this.containers, [this.contents,this.oneContents,this.twoContents]);

    this.conductor.init();
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
