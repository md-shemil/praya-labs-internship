import React, { useState, useEffect } from 'react';
import IoTCard from './components/IoTCard';
import DurationForm from './components/DurationForm';
import { fetchIoTData, updateAllDurations } from './services/iotService';
import { IoTData, IoTState } from './types';
import { WifiIcon, AlertCircle } from 'lucide-react';

function App() {
  const [state, setState] = useState<IoTState>({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const getIoTData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await fetchIoTData();
        setState({
          data,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      }
    };

    getIoTData();
  }, []);

  const handleUpdateDuration = (newDuration: number) => {
    const updatedData = updateAllDurations(state.data, newDuration);
    setState((prev) => ({ ...prev, data: updatedData }));
  };

  const refreshData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await fetchIoTData();
      setState({
        data,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        data: state.data,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };

  const renderContent = () => {
    if (state.loading) {
      return (
        <div className="w-full flex justify-center items-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-500 font-medium">Loading IoT data...</p>
          </div>
        </div>
      );
    }

    if (state.error) {
      return (
        <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 my-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">Error: {state.error}</p>
          </div>
        </div>
      );
    }

    const mainDirections = state.data.filter(item => 
      ['east', 'west', 'north', 'south'].includes(item.direction.toLowerCase())
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mainDirections.map((item, index) => (
          <IoTCard key={`${item.direction}-${index}`} data={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
            <div className="flex items-center">
              <WifiIcon className="h-8 w-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">IoT Signal Monitor</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Signal Data</h2>
              <button
                onClick={refreshData}
                className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
              >
                <svg 
                  className="w-4 h-4 mr-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                Refresh
              </button>
            </div>
            {renderContent()}
            <DurationForm onUpdateDuration={handleUpdateDuration} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;