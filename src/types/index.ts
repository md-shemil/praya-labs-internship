export interface IoTData {
  direction: string;
  signal: string;
  duration: number;
  status: string;
}

export interface IoTState {
  data: IoTData[];
  loading: boolean;
  error: string | null;
}