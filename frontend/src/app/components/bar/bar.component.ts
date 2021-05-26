import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { AppState, selectStatistics } from 'src/app/ngrx/reducers';
import { getStatistics } from '../../ngrx/actions/todo.actions';
import { Statistic } from '../../models/statistic';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  statistics$: Observable<Statistic[]> = new Observable();

  private svg?:any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(
    private store: Store<AppState>,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.statistics$ = this.store.pipe(select((selectStatistics)));
    this.createSvg();
    this.statistics$.subscribe((data: any) => {
      console.log("data", data);
      this.drawBars(data);
    });
    this.store.dispatch(getStatistics());
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    const maxHeight = (Math.ceil(Math.max(...data.map(d => d.count)) * 2 / 10) * 10) as number;
    console.log("maxHeight", maxHeight);
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.status))
    .padding(0.5);

    this.svg.selectAll('*').remove();
    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, maxHeight])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d:any) => x(d.status))
    .attr("y", (d:any) => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", (d:any) => this.height - y(d.count))
    .attr("fill", "#d04a35");
  }

}
