import { Injectable } from '@angular/core';
import {sqlite3} from 'sqlite3';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { 
    
  }

  createDb(){
    let dbFilePath = '/assets/roles.db'
    let db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }
}
