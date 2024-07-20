import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from 'axios'
import { firstValueFrom } from "rxjs";

@Injectable()
export class RequestService {
  constructor (private readonly httpService: HttpService) {}

  private async request<T>(
    method: string,
    url: string,
    options: AxiosRequestConfig
  ):Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.request<T>({
          method,
          url,
          ...options
        })
      )
      return response.data
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'An error occurred',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async get<T>(url: string, options?: AxiosRequestConfig):Promise<T> {
    return this.request<T>('GET', url, options)
  }
  async post<T>(url: string, data?: any, options?:AxiosRequestConfig):Promise<T> {
    return this.request<T>('POST', url, { ...options, data })
  }
  async delete<T>(url: string, options?:AxiosRequestConfig):Promise<T> {
    return this.request<T>('DELETE', url, options)
  }
  async put<T>(url: string, data?:any, options?:AxiosRequestConfig):Promise<T> {
    return this.request<T>('PUT', url, { data, ...options })
  }
}