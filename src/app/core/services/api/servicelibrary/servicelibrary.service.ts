import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Service } from 'src/app/shared/model/back/servicelibrary/servicelibrary.model';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../../utils/global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLibraryService {

  /** list of service libraries */
  public serviceList: Array<Service> = null;

  /** observable for the service list */
  public observableServiceList = new BehaviorSubject<Service[]>(this.serviceList);

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  /**
   * refresh the service list
   * @param system (optional) name of a system to filter on
   */
  refreshServiceLibrary(system?: string): void {
    let url = environment.cerberus_api_url + '/ReadAppService';
    // if a system is passed, use it 4 filtering
    if (system) { url += '?system=' + system; }
    this.http.get<Service[]>(url)
      .subscribe(response => {
        if (response) {
          // @ts-ignore
          this.serviceList = response.contentTable;
          this.observableServiceList.next(this.serviceList);
        }
      });
  }

  /**
   * get the list of services from the API
   * @param callback function to use to process the result
  */
  getServices(callback: (services: Service[]) => void, system?: string): void {
    let url = environment.cerberus_api_url + '/ReadAppService';
    if (system) { url += '?system=' + system; }
    this.http.get<Array<Service>>(url)
      .toPromise()
      .then((result: any) => {
        callback(result.contentTable);
      });
  }

  /**
   * create a service
   * @param service the service object to create
   */
   createService(service: Service, callback: (response: any) => void): void {

    // set the url to post
    const url = environment.cerberus_api_url + '/CreateAppService';

    // build the data to post
    let formData = this.globalService.toFormData(service); // TODO
    formData.set("contentList", JSON.stringify(service.contentList));
    formData.set("headerList", JSON.stringify(service.headerList));
    // formData.append("srvRequest", encodeURIComponent(editor.getSession().getDocument().getValue()));
  
    if (service.file && service.file.size > 0) {
        formData.append("file", service.file);
    }

    this.http.post<any>(url, formData).subscribe(response => {
      callback(response);
    });
  }

  /**
   * update the content of a service
   * @param initialtestoldername the initial name of the service
   * @param service the service  object to update
   */
  updateService(initialtestoldername: string, service: Service, callback: (response: any) => void): void {

    // set the url to post
    const url = environment.cerberus_api_url + '/UpdateAppService';

    // build the data to post
    let formData = this.globalService.toQueryString(service, ['service', 'type', 'description']); // TODO
    formData += '&originalTest=' + initialtestoldername;

    this.http.post<any>(url, formData, environment.httpOptions).subscribe(response => {
      callback(response);
    });
  }

  /**
   * remove a service
   * @param servicethe name of the service to remove
   */
  deleteService(service: Service, callback: (response: any) => void): void {

    // set the url to post
    const url = environment.cerberus_api_url + '/DeleteAppService';

    // build the data to post
    const formData = this.globalService.toQueryString(service, ['service']);

    this.http.post<any>(url, formData, environment.httpOptions).subscribe(response => {
      callback(response);
    });
  }

  /**
   * return true if the service is found in the service libraries list
   * @param servicename service  name to search for
   * @param servicelist list of service libraries to search in
   */
  serviceExists(servicename: string, servicelist: Array<Service>): boolean {
    const search = servicelist.find(t => t.service === servicename);
    if (search) { return true; } else { return false; }
  }

}
