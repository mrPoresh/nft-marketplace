import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PinataService {

  constructor(
    public http: HttpClient,
  ) { }

  testAuth() {
    const url = 'https://api.pinata.cloud/data/testAuthentication';
    const options = {
      headers: { 
        'Authorization': 'Bearer ' + environment.pinata.JWT
      }
    };

    this.http.get(url, options).subscribe((res) => console.log('Res', res));
  }

  postImage(mintForm) {
    const data = new FormData();

    data.append('file', mintForm.get('file').value);
    data.append('pinataOptions', '{"cidVersion": 1}');
    data.append('pinataMetadata', JSON.stringify({"name": mintForm.get('fileName').value}));

    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const options = {
      headers: { 
        'Authorization': 'Bearer ' + environment.pinata.JWT,
      },
    };

    return this.http.post(url, data, options);
    
  }

  postFile(img_url: string, mintForm) {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const options = {
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + environment.pinata.JWT,
      },
    };

    const body = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": "asset_metadata.json",
      },
      "pinataContent": {
        "name": mintForm.get('nftname').value,
        "description": mintForm.get('description').value, 
        "image": img_url, 
        "attributes": [],
      }
    });

    return this.http.post(url, body, options);
  }
}
