import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {firstValueFrom, Observable, take} from "rxjs";
import {FilterObject} from "../../core/store/models/filterObject.model";
import {ChartDataset, ChartEvent, ChartOptions, ChartType} from "chart.js";
import {LocalizationService} from "../../core/services/internationalization/localization.service";
import {DataService} from "../../core/services/data.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../core/store/models/state.model";
import {AddItemAction} from "../../core/store/actions/filter.action";
import {Lesson} from "../../core/models/Lesson";
import {Router} from "@angular/router";

@Component({
  selector: 'app-analysis-fe',
  templateUrl: './analysis-fe.component.html',
  styleUrls: ['./analysis-fe.component.scss']
})
export class AnalysisFeComponent {

  filter$: Observable<FilterObject>;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  data: Lesson[] = [];
  filterForm: FormGroup;
  countries: any[] = [];
  camps: any[] = [];
  schools: Lesson[] = [];
  renderedSchools: Lesson[] = [];
  colorsCodes: string[] = [];
  private schoolGroups: any[] = [];
  public lineChartData: ChartDataset[] = [];
  public lineChartLabels: any[] =
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined, maintainAspectRatio: true, responsive: true
  };
  public lineChartLegend = false;
  public lineChartPlugins = [];
  public lineChartType: ChartType = 'line';

  constructor(private translate: LocalizationService, private dataService: DataService, private formBuilder: FormBuilder,
              private store: Store<AppState>, private router: Router) {
    // getting filterObject from store
    this.loadData().then();
    this.filter$ = this.store.select((store) => store.filter.filter);
    this.filterForm = formBuilder.group({
      country: [],
      camp: [],
      school: []
    });
    this.observeFormChanges();
  }

  async loadData(): Promise<void> {
    await this.dataService.getDate().pipe(take(1)).subscribe({
      next: res => {
        this.data = res.body ?? [];
        this.countries = this.data.map(c => c.country).filter((el, i, a) => i === a.indexOf(el));
        firstValueFrom(this.filter$).then(res => {
          this.setFilterData(res)
        })
      }
    });
  }

  observeFormChanges(): void {
    this.filterForm.controls['country'].valueChanges.subscribe({
      next: value => {
        this.filterForm.controls['camp'].setValue('', {emitEvent: false});
        this.filterForm.controls['school'].setValue('');
        this.camps = this.data.filter(c => c.country === value).map(c => c.camp).filter((el, i, a) => i === a.indexOf(el));
      }
    });
    this.filterForm.controls['camp'].valueChanges.subscribe({
      next: value => {
        this.schools = this.data.filter(c => c.camp === value).filter((el, i, a) => i === a.indexOf(el));
        // this.totalLessons = schools
      }
    });
    this.filterForm.controls['school'].valueChanges.subscribe({
      next: value => {
        this.saveFilterSate(this.getFilterData());
        if (value != 'all') {
          this.renderedSchools = this.data.filter(item =>
            item.country == this.filterForm.controls['country'].value &&
            item.camp == this.filterForm.controls['camp'].value &&
            item.school == value
          );
          this.schoolGroups = [[value, this.renderedSchools]];
          this.lineChartData = [{
            data: this.getSchoolDataOrdered(this.renderedSchools),
            label: value,
            fill: false,
            type: 'line'
          }];
        } else {
          this.renderedSchools = this.data.filter(item =>
            item.country == this.filterForm.controls['country'].value &&
            item.camp == this.filterForm.controls['camp'].value
          );
          const group = this.groupArrayOfObjects(this.renderedSchools, 'school');
          this.schoolGroups = Object.entries(group);
          this.lineChartData = [];
          for (const [key, value] of Object.entries(group)) {
            const color = this.getRandomColor();
            this.lineChartData.push({
              data: this.getSchoolDataOrdered(value), label: key, backgroundColor: color,
              pointBackgroundColor: color, borderColor: color, fill: false, type: 'line',
            });
          }
        }
      }
    });
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  getSchoolDataOrdered(arr: any[]) {
    return [
      this.getMonthData('Jan', arr),
      this.getMonthData('Feb', arr),
      this.getMonthData('Mar', arr),
      this.getMonthData('Apr', arr),
      this.getMonthData('May', arr),
      this.getMonthData('Jun', arr),
      this.getMonthData('Jul', arr),
      this.getMonthData('Aug', arr),
      this.getMonthData('Sep', arr),
      this.getMonthData('Oct', arr),
      this.getMonthData('Nov', arr),
      this.getMonthData('Dec', arr),
    ]

  }

  getMonthData(month: string, data: Lesson[]) {
    return data.filter(i => i.month == month).map(d => {
      return d;
    }).reduce((a, b) => a + b.lessons, 0);
  }

  groupArrayOfObjects(list: any[], key: string): any[] {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  onSelect(index: number) {
    this.lineChartData[index].hidden = !this.lineChartData[index].hidden;
    this.lineChartData = [...this.lineChartData]
  }

  get totalLessons() {
    return this.renderedSchools?.reduce((a, b) => a + b.lessons, 0)
  }

  getTotalSchoolLesson(data: any[]) {
    return data.reduce((a, b) => a + b, 0);
  }

  getFilterData(): FilterObject {
    return {
      country: this.filterForm.controls['country'].value,
      camp: this.filterForm.controls['camp'].value,
      school: this.filterForm.controls['school'].value
    }
  }

  setFilterData(data: FilterObject): void {
    this.filterForm.controls['country'].setValue(data.country);
    this.filterForm.controls['camp'].setValue(data.camp);
    this.filterForm.controls['school'].setValue(data.school);
  }

  saveFilterSate(state: FilterObject) {
    this.store.dispatch(new AddItemAction(state));
  }

  async onClick(e: { event?: ChartEvent; active?: {}[] }) {
    let finalDataSet: Lesson[] = [];
    if (e.active) {
      await e.active.forEach((item: any) => {
        let index = item.index;
        let datasetIndex = item.datasetIndex;
        const dataset: Lesson[] = this.schoolGroups[datasetIndex][1];
        const target = dataset.filter(le => le.month == this.months[index]);
        if (target.length) {
          finalDataSet.push(...target);
        } else {
          finalDataSet.push({
            month: this.months[index], country: dataset[0].country,
            camp: dataset[0].camp, school: dataset[0].school, lessons: 0, id: '0'
          })
        }
      });
      this.router.navigate(['details'], {state: {lessons: finalDataSet}}).then();
    }

  }
}

