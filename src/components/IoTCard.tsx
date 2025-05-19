import React from "react";
import { IoTData } from "../types";
import { CheckCircle, XCircle, AlertCircle, Signal } from "lucide-react";

interface IoTCardProps {
  data: IoTData;
}

const IoTCard: React.FC<IoTCardProps> = ({ data }) => {
  const getStatusIcon = () => {
    switch (data.status.toLowerCase()) {
      case "on":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const getSignalColor = () => {
    switch (data.signal.toLowerCase()) {
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-100">
      <div className={`h-2 w-full ${getSignalColor()}`} />
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800 capitalize">
            {data.direction}
          </h3>
          {getStatusIcon()}
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Signal className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-gray-600">Signal:</span>
            <span className="ml-2 font-semibold capitalize text-gray-800">
              {data.signal}
            </span>
          </div>

          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-blue-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-600">Duration:</span>
            <span className="ml-2 font-semibold text-gray-800">
              {data.duration} ms
            </span>
          </div>

          <div className="flex items-center">
            <div
              className={`h-3 w-3 rounded-full ${
                data.status.toLowerCase() === "on"
                  ? "bg-green-500"
                  : data.status.toLowerCase() === "warning"
                  ? "bg-yellow-400"
                  : "bg-red-500"
              } mr-2`}
            />
            <span className="text-gray-600">Status:</span>
            <span
              className={`ml-2 font-bold tracking-wide ${
                data.status.toLowerCase() === "on"
                  ? "text-green-600"
                  : data.status.toLowerCase() === "warning"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {data.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTCard;
