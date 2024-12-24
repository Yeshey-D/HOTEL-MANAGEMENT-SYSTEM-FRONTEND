import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpResponse } from '@angular/common/http';

interface Rooms {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-view-room',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.css'
})
export class ViewRoomComponent {

  rooms: Rooms[] = [];
  error: string | null = null;

  constructor(
    private apiService : ApiService,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.fetchRooms();
  }

  private fetchRooms():void {
    
    this.error = null;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    };

    this.apiService.get<Rooms[]>('/rooms', { headers, observe: 'response' }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const response = event as HttpResponse<Rooms[]>;
          if (response.body) {
            this.rooms = response.body;
          }
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.message || 'Failed to fetch theatres';
        this.toastr.error('Failed to fetch theatres details');
      },
      complete: () => {
      }
    });
  }
}
