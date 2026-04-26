import React, { useState } from 'react';
import { useShayri } from '../../hooks/useShayri';
import Loading from '../ui/Loading';
import Button from '../ui/Button';

const ShayriPage = () => {
  const [filters, setFilters] = useState({});
  const { data: shayris, isLoading, error, refetch } = useShayri(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (isLoading) {
    return <Loading text="Loading shayris..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">Error loading shayris</div>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shayri Collection</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange({ category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Ishq">Ishq</option>
            <option value="Dard">Dard</option>
            <option value="Zindagi">Zindagi</option>
            <option value="Khushi">Khushi</option>
            <option value="Judai">Judai</option>
          </select>
          
          <input
            type="text"
            placeholder="Search by author..."
            value={filters.author || ''}
            onChange={(e) => handleFilterChange({ author: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          
          <Button onClick={() => setFilters({})}>Clear Filters</Button>
        </div>
      </div>

      {/* Shayri Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shayris?.map((shayri) => (
          <div key={shayri.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{shayri.category}</h3>
              <p className="text-gray-700 whitespace-pre-line">{shayri.text}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By: {shayri.author}</span>
              <span>{shayri.date}</span>
            </div>
            
            {shayri.metadata && (
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span>👁️ {shayri.metadata.views}</span>
                <span>🔄 {shayri.metadata.shares}</span>
                {shayri.metadata.featured && <span className="text-yellow-500">⭐ Featured</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {shayris?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl mb-4">No shayris found</div>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ShayriPage;
