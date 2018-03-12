import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {User} from "../model/user.model";
import {Observable} from "rxjs/Observable";
import {GeneralStatistic} from "../model/generalStatistic.model";
import {UserStatistic} from "../model/userStatistic.model";
import {EmpProfile} from "../model/empProfile.model";
import {UserService} from "./user.service";


const url = '/api/manager';

@Injectable()
export class ManagerService {

  constructor(private http: HttpClient, private tokenService: TokenService<User>) {
  }

  getEmployees(managerId: number): Observable<EmpProfile[]> {
    console.log('getEmployees()');
    return this.tokenService.get(`${url}/${managerId}`);
  }

  getGeneralCCAgentStatisticByCompany(startDate: string, endDate: string): Observable<GeneralStatistic> {
    console.log('getGeneralStatisticsByCompany()');
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/general/ccagent`, arr);
  }

  getGeneralCCAgentStatisticByManager(managerId: number, startDate: string, endDate: string): Observable<GeneralStatistic> {
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/${managerId}/general/ccagent`, arr);
  }

  getCCAgentStatistic(managerId: number, startDate: string, endDate: string): Observable<UserStatistic[]> {
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/${managerId}/personal/ccagent`, arr);
  }

  getGeneralCourierStatisticByCompany(startDate: string, endDate: string): Observable<GeneralStatistic> {
    console.log('getGeneralStatisticsByCompany()');
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/general/courier`, arr);
  }

  getGeneralCourierStatisticByManager(managerId: number, startDate: string, endDate: string): Observable<GeneralStatistic> {
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/${managerId}/general/courier`, arr);
  }

  getCourierStatistic(managerId: number, startDate: string, endDate: string): Observable<UserStatistic[]> {
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/${managerId}/personal/courier`, arr);
  }

  getGeneralClientStatisticByCompany(startDate: string, endDate: string): Observable<GeneralStatistic> {
    console.log('getGeneralClientStatisticsByCompany()');
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/general/client`, arr);
  }

  getClientStatistic(startDate: string, endDate: string): Observable<UserStatistic[]> {
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/personal/client`, arr);
  }

  getGeneralOfficeStatisticByCompany(startDate: string, endDate: string): Observable<GeneralStatistic> {
    console.log('getGeneralClientStatisticsByCompany()');
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/general/office`, arr);
  }

  getOfficeStatistic(startDate: string, endDate: string): Observable<UserStatistic[]> {
    let arr: Array<[string, string]> = [['startDate', startDate], ['endDate', endDate]];
    return this.tokenService.getWithParams(`${url}/personal/office`, arr);
  }

  getCountOrdersByCCAgentInCurrentMonth(id: number): Observable<number> {
    return this.tokenService.get(`${url}/ccagent/${id}/ccagent/orders`);
  }

  getCountOrdersByCourierInCurrentMonth(id: number): Observable<number> {
    return this.tokenService.get(`${url}/courier/${id}/courier/orders`);
  }

  changeClientStatus(id: number): Observable<User> {
    console.log('id for change status: ', id);
    let user = UserService.getEmptyUser();
    user.id = id;
    return this.tokenService.put(`${url}/status/client`, user);
  }
}