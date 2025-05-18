import React from 'react';
import { IoTData } from '../types';
import { CheckCircle, XCircle, AlertCircle, Signal } from 'lucide-react';

interface IoTCardProps {
  data: IoTData;
}

const IoTCard: React.FC<IoTCardProps> = ({ data }) => {
  const getStatusIcon = () => {
    switch (data.status.toLowerCase()) {
      case 'on':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      default:
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const getSignalColor = () => {
    switch (data.signal.toLowerCase()) {
      case 'green':
        return 'bg-green-500';
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className={`h-2 ${getSignalColor()}`} />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800 capitalize">{data.direction}</h3>
          {getStatusIcon()}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Signal className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-600">Signal:</span>
            <span className="ml-2 font-semibold capitalize">{data.signal}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600">Duration:</span>
            <span className="ml-2 font-semibold">{data.duration} ms</span>
          </div>
          
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${data.status.toLowerCase() === 'on' ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
            <span className="text-gray-600">Status:</span>
            <span className={`ml-2 font-semibold ${data.status.toLowerCase() === 'on' ? 'text-green-600' : 'text-red-600'}`}>
              {data.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTCard;