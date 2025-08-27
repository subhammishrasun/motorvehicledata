// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import FileUpload from './components/FileUpload';
import DataSummary from './components/DataSummary';
import EVMakeDistribution from './components/EvMakerDistribution';
import EVModelYear from './components/EvModelYear';
import EVRangeAnalysis from './components/EvRangeAnalysis';
import EVTypeDistribution from './components/EvTypeDistribution';
import CountyDistribution from './components/CountryDistribution';

function App() {
  const [evData, setEvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize callback functions to prevent unnecessary re-renders
  const handleDataLoaded = useCallback((data) => {
    setEvData(data);
    setLoading(false);
    setError(null);
  }, []);

  const handleLoading = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const handleError = useCallback((errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  }, []);

  // Initialize data loading when component mounts
  useEffect(() => {
    // Set a timeout to show loading state for a minimum time
    const timer = setTimeout(() => {
      if (loading && !error && !evData) {
        setError("Data loading is taking longer than expected. Please check the CSV file.");
      }
    }, 10000); // 10 seconds timeout
    
    return () => clearTimeout(timer);
  }, [loading, error, evData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Electric Vehicle Population Dashboard</h1>
          <p className="text-green-100">Visualize and analyze EV population data</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <FileUpload 
          onDataLoaded={handleDataLoaded} 
          onLoading={handleLoading} 
          onError={handleError} 
        />
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="ml-4 text-gray-600">Loading EV population data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {evData && (
          <div className="space-y-8">
            <DataSummary data={evData} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EVMakeDistribution data={evData} />
              <EVTypeDistribution data={evData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EVModelYear data={evData} />
              <EVRangeAnalysis data={evData} />
            </div>
            <CountyDistribution data={evData} />
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Electric Vehicle Population Dashboard © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;







