import { Injectable } from '@angular/core';
import { GLOBAL } from './global'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public url: string
  constructor() {
    this.url = GLOBAL.url
  }

  makeFileRequest(url: string, params: string, files: Array<File> = [], token: string, name: string) {
    return new Promise((resolve, reject) => {
      let formData: any = new FormData()
      let xhr = new XMLHttpRequest()

      Array.from(files).map(file => {
        formData.append(name, file, file.name)
      })

      formData.append('text', params)

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', token)
      xhr.send(formData)
    })
  }
}
