
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FetchMetrics() {
  const [metrics, setMetrics] = useState([]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('https://lopifybackend.onrender.com/retrieve');
      const responseJson = await response.json();

      if (response.ok) {
        const data = responseJson.Campaign;

        if (Array.isArray(data)) {
          // Calculate metrics for each campaign
          const campaignMetrics = data.map((campaign) => {
            const ctr = (campaign.clicks / campaign.impressions) * 100;
            const cr = (campaign.conversions / campaign.clicks) * 100;
            const cpc = campaign.spend / campaign.clicks;
            const costPerConversion = campaign.spend / campaign.conversions;

            return { ctr, cr, cpc, costPerConversion };
          });

          setMetrics(campaignMetrics);

          toast.success(responseJson.message || 'You have successfully retrieved all campaigns');
        } else {
          console.error('Received data is not an array:', data);
          toast.error('Error: Data retrieved is not in the expected format');
        }
      } else {
        console.error('API response error:', responseJson);
        toast.error(responseJson.message || 'You have no existing campaign,please create a campaign');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error: Failed to retrieve data');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <button
        className="bg-blue-500 text-white p-2 mt-4 rounded hover-bg-blue-700"
        onClick={fetchMetrics}
      >
        Retrieve & Calculate
      </button>

      {metrics.length > 0 && (
        <div>
          {metrics.map((metric, index) => (
            <div key={index}>
              <p>Metrics for Campaign {index + 1}:</p>
              <p>CTR (Click-Through Rate): {metric.ctr.toFixed(2)}%</p>
              <p>CR (Conversion Rate): {metric.cr.toFixed(2)}%</p>
              <p>CPC (Cost Per Click): ${metric.cpc.toFixed(2)}</p>
              <p>Cost Per Conversion: ${metric.costPerConversion.toFixed(2)}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FetchMetrics;
