import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [skincareData, setSkincareData] = useState([]);
  const [filteredSkincare, setFilteredSkincare] = useState([]);

  useEffect(() => {
    // Fetch skincare data from API
    const fetchData = async () => {
      try {
        const response = await fetch("https://asetvia-oktaaaas-projects.vercel.app/skincare");
        const data = await response.json();
        setSkincareData(data);
      } catch (error) {
        console.error("Error fetching skincare data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    //expiring within five months
    const today = new Date();
    const fiveMonths = new Date();
    fiveMonths.setMonth(today.getMonth() + 5);

    const filtered = skincareData.filter((item) => {
      const expiryDate = new Date(item.expiredYear);
      const stock = item.stock
      return expiryDate >= today && expiryDate <= fiveMonths || stock === 1;
    });

    setFilteredSkincare(filtered);
  }, [skincareData]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Low Stock and Expiring Skincare Products</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkincare.length > 0 ? (
            filteredSkincare.map((item, index) => (
              <tr key={item._id}>
                <td className="border p-2">{index + 1}</td>
               
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{new Date(item.expiredYear).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border p-2 text-center">
                No skincare expiring soon.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
