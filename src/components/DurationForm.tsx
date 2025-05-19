import React, { useState } from 'react';

interface DurationFormProps {
  onUpdateDuration: (newDuration: number) => void;
}

const DurationForm: React.FC<DurationFormProps> = ({ onUpdateDuration }) => {
  const [duration, setDuration] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDuration(value);
    
    // Clear error if field is empty or valid
    if (!value || (Number(value) >= 0 && /^\d+$/.test(value))) {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!duration) {
      setError('Please enter a duration value');
      return;
    }
    
    const durationNum = Number(duration);
    
    if (isNaN(durationNum)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (durationNum < 0) {
      setError('Duration cannot be negative');
      return;
    }
    
    // Call update function with valid duration
    onUpdateDuration(durationNum);
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Update Duration</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            New Duration (s)
          </label>
          <input
            type="number"
            id="duration"
            min="0"
            value={duration}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            placeholder="Enter new duration value"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors duration-200"
          >
            Update All Directions
          </button>
        </div>
      </div>
    </form>
  );
};

export default DurationForm;