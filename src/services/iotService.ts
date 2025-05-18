import { IoTData } from '../types';

const API_URL = 'https://prayalabs.com/rest/api/iot';
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

export const fetchIoTData = async (): Promise<IoTData[]> => {
  try {
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(API_URL)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch IoT data: ${response.status} ${response.statusText}`);
    }
    
    const responseData = await response.json();
    
    // Transform object response into array format
    const data = Object.entries(responseData).map(([direction, value]: [string, any]) => ({
      direction: direction.toLowerCase(),
      signal: value.signal,
      duration: parseInt(value.duration, 10),
      status: value.status // Keep original status from API
    }));
    
    // Filter out duplicate directions (case-insensitive)
    const uniqueData = data.reduce((acc: IoTData[], current) => {
      const exists = acc.some(item => item.direction.toLowerCase() === current.direction.toLowerCase());
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);
    
    // Ensure we have all required directions
    const requiredDirections = ['east', 'west', 'north', 'south'];
    const existingDirections = uniqueData.map(item => item.direction.toLowerCase());
    
    // Create default entries for any missing directions
    const missingDirections = requiredDirections.filter(
      dir => !existingDirections.includes(dir)
    );
    
    const defaultEntries = missingDirections.map(direction => ({
      direction,
      signal: '0',
      duration: 1000,
      status: 'off'
    }));
    
    // Combine existing data with default entries
    return [...uniqueData, ...defaultEntries];
  } catch (error) {
    console.error('Error fetching IoT data:', error);
    // Return default entries when there's an error
    const defaultData: IoTData[] = ['east', 'west', 'north', 'south'].map(direction => ({
      direction,
      signal: '0',
      duration: 1000,
      status: 'off'
    }));
    return defaultData;
  }
};

export const updateAllDurations = (data: IoTData[], newDuration: number): IoTData[] => {
  return data.map((item) => ({
    ...item,
    duration: newDuration
  }));
};