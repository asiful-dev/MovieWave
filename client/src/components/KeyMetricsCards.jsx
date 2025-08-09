import React from "react";

const KeyMetricsCards = ({ title, data, IconName, dollarIcon }) => {
  return (
    <div className="rounded-lg  p-6 bg-primary-700/5 border border-primary-700/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-4xl font-bold text-white">
            {dollarIcon && "$"} {data}
          </p>
        </div>
        <div className="p-3 rounded-full border border-primary-500">
          <IconName className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default KeyMetricsCards;
