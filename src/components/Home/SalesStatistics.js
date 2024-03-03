import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SalesStatistics = ({ products }) => {
  // Calculate sales data from products
  const salesData = products.reduce((data, product) => {
    const year = new Date(product.createdAt).getFullYear().toString(); // Extract the year from createdAt
    if (!data[year]) {
      data[year] = 0;
    }
    data[year] += product.sold * product.price; // Increment sales amount for the year
    return data;
  }, {});

  // Convert sales data to array of objects
  const salesChartData = Object.keys(salesData).map(year => ({
    year,
    salesAmount: salesData[year],
  }));

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sales Statistics</h5>
          <BarChart width={500} height={300} data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salesAmount" fill="#8884d8" />
          </BarChart>
        </article>
      </div>
    </div>
  );
};

export default SalesStatistics;
