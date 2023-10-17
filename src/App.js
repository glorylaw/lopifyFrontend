import React from 'react';
import CampaignForm from './components/CampaignForm';
import Fetchmetrics from './components/FetchMetrics';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className=" mx-auto p-4 max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ad Campaign Metrics Calculator</h1>
      <CampaignForm />
      <Fetchmetrics />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar closeOnClick draggable pauseOnHover />
    </div>
  );
}

export default App;


