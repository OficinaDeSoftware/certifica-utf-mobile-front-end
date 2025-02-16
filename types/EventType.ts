export type Event = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  workload: number;
  description: string;
  location: EventLocation;
  dates: Array<EventDate>;
  backgroundUrl: string;
  participants: number | undefined;	
}

export type EventLocation = {
  address: string;
  complement: number;
  capacity: number;
  coordinates: Coordinates;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type EventDate = {
  id: number | undefined;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}