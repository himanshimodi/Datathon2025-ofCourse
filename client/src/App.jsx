import React, { useState } from 'react';
import { PlusCircle, Building2, Users, FileText, Heart, ArrowLeft, Search, Star } from 'lucide-react';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TechCorp Inc",
      type: "Technology",
      foundedYear: "1995",
      info: {
        marketCap: "$50B",
        stockPE: "25.4",
        currentValue: "$150.75",
        roe: "18.5%"
      }
    },
    {
      id: 2,
      name: "GreenEnergy Co",
      type: "Renewable Energy",
      foundedYear: "2010",
      info: {
        marketCap: "$2.5B",
        stockPE: "30.2",
        currentValue: "$45.60",
        roe: "12.8%"
      }
    }
  ]);

  const [newCompany, setNewCompany] = useState({
    name: "",
    type: "",
    foundedYear: "",
    info: {
      marketCap: "",
      stockPE: "",
      currentValue: "",
      roe: ""
    }
  });

  const handleAddCompany = () => {
    setCompanies([...companies, { ...newCompany, id: companies.length + 1 }]);
    setNewCompany({
      name: "",
      type: "",
      foundedYear: "",
      info: {
        marketCap: "",
        stockPE: "",
        currentValue: "",
        roe: ""
      }
    });
    setShowModal(false);
  };

  const handleDeleteCompany = (companyId) => {
    setCompanies(companies.filter(company => company.id !== companyId));
  };

  const toggleFavorite = (companyId) => {
    if (favorites.includes(companyId)) {
      setFavorites(favorites.filter(id => id !== companyId));
    } else {
      setFavorites([...favorites, companyId]);
    }
  };

  const filterCompanies = (companies) => {
    if (!searchQuery) return companies;
    return companies.filter(company => 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const favoriteCompanies = filterCompanies(companies.filter(company => favorites.includes(company.id)));
  const filteredCompanies = filterCompanies(companies);

  const SearchBar = () => (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search companies by name or type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const CompanyCard = ({ company, showAdmin = false }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
      <button
        onClick={() => toggleFavorite(company.id)}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
      >
        <Heart
          className={`h-6 w-6 ${
            favorites.includes(company.id)
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400'
          }`}
        />
      </button>
      <h3 className="text-xl font-bold mb-4">{company.name}</h3>
      <div className="space-y-2">
        <p><strong>Type:</strong> {company.type}</p>
        <p><strong>Founded:</strong> {company.foundedYear}</p>
        <div className="relative group">
          <button className="w-full px-4 py-2 border rounded hover:bg-gray-50 mb-2">
            Company Info
          </button>
          <div className="hidden group-hover:block absolute z-10 w-64 p-4 bg-gray-800 text-white text-sm rounded shadow-lg">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Market Cap:</span>
                <span className="font-semibold">{company.info.marketCap}</span>
              </p>
              <p className="flex justify-between">
                <span>Stock P/E:</span>
                <span className="font-semibold">{company.info.stockPE}</span>
              </p>
              <p className="flex justify-between">
                <span>Current Value:</span>
                <span className="font-semibold">{company.info.currentValue}</span>
              </p>
              <p className="flex justify-between">
                <span>ROE:</span>
                <span className="font-semibold">{company.info.roe}</span>
              </p>
            </div>
          </div>
        </div>
        {!showAdmin && (
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center">
            <FileText className="mr-2 h-4 w-4" />
            Download Report
          </button>
        )}
        {showAdmin && (
          <button
            onClick={() => handleDeleteCompany(company.id)}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Company
          </button>
        )}
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-12">
        <h1 className="text-5xl font-bold text-blue-600">Welcome to MarketSage</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive platform for managing and analyzing company information
        </p>
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => {
              setCurrentView('user');
              setIsAdmin(false);
            }}
            className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Users className="h-6 w-6" />
            Enter as User
          </button>
          <button
            onClick={() => {
              setCurrentView('admin');
              setIsAdmin(true);
            }}
            className="px-8 py-4 bg-gray-800 text-white text-lg rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <Building2 className="h-6 w-6" />
            Enter as Admin
          </button>
        </div>
      </div>
    </div>
  );

  const UserNavigation = () => (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">MarketSage</h1>
      </div>
      <nav className="mt-6 space-y-2">
        <div 
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
          onClick={() => setCurrentView('home')}
        >
          <ArrowLeft className="mr-3" />
          <span>Back to Home</span>
        </div>
        <div 
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
          onClick={() => setCurrentView('user')}
        >
          <Users className="mr-3" />
          <span>User Panel</span>
        </div>
        <div 
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
          onClick={() => setCurrentView('favorites')}
        >
          <Star className="mr-3" />
          <span>Favorites</span>
        </div>
        <div 
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
          onClick={() => setCurrentView('companies')}
        >
          <Building2 className="mr-3" />
          <span>Companies</span>
        </div>
      </nav>
    </div>
  );

  const AdminNavigation = () => (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">MarketSage</h1>
      </div>
      <nav className="mt-6 space-y-2">
        <div 
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
          onClick={() => setCurrentView('home')}
        >
          <ArrowLeft className="mr-3" />
          <span>Back to Home</span>
        </div>
        <div 
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50"
          onClick={() => setCurrentView('admin')}
        >
          <Building2 className="mr-3" />
          <span>Admin Panel</span>
        </div>
      </nav>
    </div>
  );

  const MainLayout = ({ children }) => (
    <div className="flex h-screen bg-gray-100">
      {isAdmin ? <AdminNavigation /> : <UserNavigation />}
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'admin':
        return (
          <MainLayout>
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
              
              <SearchBar />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} showAdmin={true} />
                ))}
              </div>
            </div>
          </MainLayout>
        );
      case 'user':
        return (
          <MainLayout>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
              <SearchBar />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          </MainLayout>
        );
      case 'favorites':
        return (
          <MainLayout>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Favorite Companies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          </MainLayout>
        );
      case 'companies':
        return (
          <MainLayout>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">All Companies</h2>
              <SearchBar />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          </MainLayout>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      {renderContent()}
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
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Market Cap"
                  className="w-full p-2 border rounded"
                  value={newCompany.info.marketCap}
                  onChange={(e) => setNewCompany({
                    ...newCompany,
                    info: { ...newCompany.info, marketCap: e.target.value }
                  })}
                />
                <input
                  type="text"
                  placeholder="Stock P/E"
                  className="w-full p-2 border rounded"
                  value={newCompany.info.stockPE}
                  onChange={(e) => setNewCompany({
                    ...newCompany,
                    info: { ...newCompany.info, stockPE: e.target.value }
                  })}
                />
                <input
                  type="text"
                  placeholder="Current Value"
                  className="w-full p-2 border rounded"
                  value={newCompany.info.currentValue}
                  onChange={(e) => setNewCompany({
                    ...newCompany,
                    info: { ...newCompany.info, currentValue: e.target.value }
                  })}
                />
                <input
                  type="text"
                  placeholder="ROE"
                  className="w-full p-2 border rounded"
                  value={newCompany.info.roe}
                  onChange={(e) => setNewCompany({
                    ...newCompany,
                    info: { ...newCompany.info, roe: e.target.value }
                  })}
                />
              </div>
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
    </div>
  );
};

export default App;