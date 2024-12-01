
export type Event = {
  id: string;
  name: string;
  initialDate: string;
  finalDate: string;
  workload: number;
  description: string;
  location: EventLocation;
  eventDates: Array<EventDate>;
  image: string;
  participants: number;	
}

export type EventLocation = {
  description: string;
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type EventDate = {
  initialDate: string;
  finalDate: string;
}