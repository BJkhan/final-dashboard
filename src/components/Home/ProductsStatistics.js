import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const ProductStatistics = ({ products }) => {
  // Calculate product statistics by year
  const productStats = products.reduce((stats, product) => {
    const year = new Date(product.createdAt).getFullYear();
    if (!stats[year]) {
      stats[year] = 1;
    } else {
      stats[year] += 1;
    }
    return stats;
  }, {});

  // Convert product statistics to an array of objects
  const productData = Object.entries(productStats).map(([year, count]) => ({
    year,
    count,
    percentage: ((count / products.length) * 100).toFixed(2),
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Add more colors if needed

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Product Statistics</h5>
          <PieChart width={500} height={300}>
            <Pie
              data={productData}
              dataKey="count"
              nameKey="year"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {productData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </article>
      </div>
    </div>
  );
};

export default ProductStatistics;
