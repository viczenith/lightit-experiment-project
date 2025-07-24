import React from 'react';

export default function ExperimentCard({ experiment }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{experiment.title}</h3>
      {experiment.description && (
        <p className="mt-1 text-sm text-gray-600">{experiment.description}</p>
      )}
      <div className="mt-2 text-xs text-gray-500">
        Status:{' '}
        <span
          className={
            experiment.status === 'visible'
              ? 'text-green-600'
              : 'text-yellow-600'
          }
        >
          {experiment.status}
        </span>
      </div>
    </div>
  );
}
