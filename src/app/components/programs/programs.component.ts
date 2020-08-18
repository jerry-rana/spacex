import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '@core/services/programs.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
  constructor(private apiService: ProgramsService) {}

  isLoading: boolean = false;
  programs: any;
  emptyResult: boolean = false;
  selectedIndex: number = 2006;
  filterIndex = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  launchIndex = [true, false];
  launchSelectedIndex: boolean = null;
  landIndex = [true, false];
  landSelectedIndex: boolean = null;

  getPrograms(
    launch_year: number, 
    launch_success: any, 
    land_success: any 
    ) {
    this.emptyResult = false;
    this.isLoading = true;
    this.programs = null;
    
    this.apiService.listPrograms(
      launch_year,
      launch_success,
      land_success
      )
      .subscribe((programs: any) => {
      this.isLoading = false;
      this.selectedIndex = launch_year;
      this.launchSelectedIndex = launch_success;
      this.landSelectedIndex = land_success;
      sessionStorage.setItem('FILTER_LIST', JSON.stringify({launch_year, launch_success, land_success}))

      if(programs.length === 0){
        this.emptyResult = true;
        return false;
      }

      const result = programs.map((item: any) => {
        return {
          mission_name: item.mission_name,
          flight_number: item.flight_number,
          mission_patch_small: item.links.mission_patch_small,
          mission_id: item.mission_id,
          launch_year: item.launch_year,
          launch_success: item.launch_success,
          land_success: item.rocket.first_stage.cores[0].land_success,
        };
      });
      
      this.programs = result;
    });
  }


  handleLaunchSuccess(launch_success: boolean){
    const sess = JSON.parse(sessionStorage.getItem('FILTER_LIST'));
    sess !== null
      ? this.getPrograms(
          sess['launch_year'],
          launch_success,
          sess['land_success']
        )
      : console.log('else me hu..');
  }

  handleLandSuccess(land_success: boolean){
    const sess = JSON.parse(sessionStorage.getItem('FILTER_LIST'));
    sess !== null
      ? this.getPrograms(
          sess['launch_year'],
          sess['launch_success'],
          land_success
        )
      : this.getPrograms(2006, '', '');
  }

  ngOnInit(): void {
    const sess = JSON.parse(sessionStorage.getItem('FILTER_LIST'));
    sess !== null
      ? this.getPrograms(
          sess['launch_year'],
          sess['launch_success'],
          sess['land_success']
        )
      : this.getPrograms(2006, '', '');
  }
}
