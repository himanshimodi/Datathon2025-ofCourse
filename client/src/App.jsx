import React, { useState } from 'react';
import { PlusCircle, Building2, Users, FileText } from 'lucide-react';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechCorp Inc",
      type: "Technology",
      foundedYear: "1995",
      info: "Leading provider of cloud computing solutions"
    },
    {
      id: 2,
      name: "GreenEnergy Co",
      type: "Renewable Energy",
      foundedYear: "2010",
      info: "Pioneering sustainable energy solutions"
    }
  ]);

  const [newCompany, setNewCompany] = useState({
    name: "",
    type: "",
    foundedYear: "",
    info: ""
  });

  const handleAddCompany = () => {
    setCompanies([...companies, { ...newCompany, id: companies.length + 1 }]);
    setNewCompany({ name: "", type: "", foundedYear: "", info: "" });
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">MarketSage</h1>
        </div>
        <nav className="mt-6">
          <div 
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
            onClick={() => setIsAdmin(false)}
          >
            <Building2 className="mr-3" />
            <span>Companies</span>
          </div>
          <div 
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
            onClick={() => setIsAdmin(true)}
          >
            <Users className="mr-3" />
            <span>Admin Panel</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {isAdmin ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Company
              </button>
            </div>
            
            {/* Add Company Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4">Add New Company</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full p-2 border rounded"
                      value={newCompany.name}
                      onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Company Type"
                      className="w-full p-2 border rounded"
                      value={newCompany.type}
                      onChange={(e) => setNewCompany({...newCompany, type: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Founded Year"
                      className="w-full p-2 border rounded"
                      value={newCompany.foundedYear}
                      onChange={(e) => setNewCompany({...newCompany, foundedYear: e.target.value})}
                    />
                    <textarea
                      placeholder="Company Information"
                      className="w-full p-2 border rounded"
                      value={newCompany.info}
                      onChange={(e) => setNewCompany({...newCompany, info: e.target.value})}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddCompany}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Add Company
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">{company.name}</h3>
                  <div className="space-y-2">
                    <p><strong>Type:</strong> {company.type}</p>
                    <p><strong>Founded:</strong> {company.foundedYear}</p>
                    <p><strong>Info:</strong> {company.info}</p>
                  </div>
                  <button
                    className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete Company
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">Company Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4">{company.name}</h3>
                  <div className="space-y-2">
                    <p><strong>Type:</strong> {company.type}</p>
                    <p><strong>Founded:</strong> {company.foundedYear}</p>
                    <div className="relative group">
                      <button
                        className="w-full px-4 py-2 border rounded hover:bg-gray-50 mb-2"
                      >
                        Company Info
                      </button>
                      <div className="hidden group-hover:block absolute z-10 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                        {company.info}
                      </div>
                    </div>
                    <button
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;