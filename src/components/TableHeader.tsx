import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Filter, 
  X, 
  Search,
  Calendar,
  Hash,
  Type,
  Check,
  MoreHorizontal
} from 'lucide-react';
import { SortDirection, SortConfig, FilterConfig } from '../hooks/useTableSort';

interface TableHeaderProps {
  title: string;
  sortKey: string;
  sortConfig?: SortConfig;
  filterConfig?: FilterConfig[string];
  filterOptions?: {
    type: 'text' | 'select' | 'date' | 'number' | 'boolean';
    options?: { value: any; label: string }[];
    placeholder?: string;
  };
  onSort: (key: string, direction?: SortDirection) => void;
  onFilter: (key: string, config: Partial<FilterConfig[string]>) => void;
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  sortKey,
  sortConfig,
  filterConfig,
  filterOptions,
  onSort,
  onFilter,
  className = ''
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [tempFilterValue, setTempFilterValue] = useState(filterConfig?.value || '');
  const [tempOperator, setTempOperator] = useState(filterConfig?.operator || 'contains');
  
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortClick = () => {
    onSort(sortKey);
  };

  const handleFilterApply = () => {
    if (filterOptions) {
      onFilter(sortKey, {
        type: filterOptions.type,
        value: tempFilterValue,
        operator: tempOperator
      });
    }
    setShowFilter(false);
  };

  const handleFilterClear = () => {
    setTempFilterValue('');
    onFilter(sortKey, { type: filterOptions?.type || 'text', value: '' });
    setShowFilter(false);
  };

  const getSortIcon = () => {
    if (!sortConfig || sortConfig.direction === null) {
      return <MoreHorizontal className="w-4 h-4 text-slate-400" />;
    }
    
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const getFilterIcon = () => {
    const hasFilter = filterConfig?.value !== undefined && filterConfig?.value !== '';
    return (
      <Filter className={`w-4 h-4 ${hasFilter ? 'text-blue-600' : 'text-slate-400'}`} />
    );
  };

  const getOperatorOptions = () => {
    switch (filterOptions?.type) {
      case 'text':
        return [
          { value: 'contains', label: 'Contient' },
          { value: 'equals', label: 'Égal à' },
          { value: 'startsWith', label: 'Commence par' },
          { value: 'endsWith', label: 'Finit par' }
        ];
      case 'number':
      case 'date':
        return [
          { value: 'equals', label: 'Égal à' },
          { value: 'gt', label: 'Supérieur à' },
          { value: 'lt', label: 'Inférieur à' },
          { value: 'gte', label: 'Supérieur ou égal' },
          { value: 'lte', label: 'Inférieur ou égal' }
        ];
      default:
        return [{ value: 'equals', label: 'Égal à' }];
    }
  };

  const renderFilterInput = () => {
    switch (filterOptions?.type) {
      case 'select':
        return (
          <select
            value={tempFilterValue}
            onChange={(e) => setTempFilterValue(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Tous</option>
            {filterOptions.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            type="date"
            value={tempFilterValue}
            onChange={(e) => setTempFilterValue(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={tempFilterValue}
            onChange={(e) => setTempFilterValue(e.target.value)}
            placeholder={filterOptions.placeholder || 'Entrer un nombre'}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        );

      case 'boolean':
        return (
          <select
            value={tempFilterValue}
            onChange={(e) => setTempFilterValue(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Tous</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        );

      default:
        return (
          <input
            type="text"
            value={tempFilterValue}
            onChange={(e) => setTempFilterValue(e.target.value)}
            placeholder={filterOptions?.placeholder || 'Rechercher...'}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        );
    }
  };

  const getTypeIcon = () => {
    switch (filterOptions?.type) {
      case 'text': return <Type className="w-4 h-4 text-slate-500" />;
      case 'number': return <Hash className="w-4 h-4 text-slate-500" />;
      case 'date': return <Calendar className="w-4 h-4 text-slate-500" />;
      case 'boolean': return <Check className="w-4 h-4 text-slate-500" />;
      default: return <Search className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <th className={`text-left py-4 px-6 font-medium text-slate-900 relative group ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>{title}</span>
          {sortConfig && sortConfig.priority > 0 && (
            <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
              {sortConfig.priority}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleSortClick}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
            title="Trier"
          >
            {getSortIcon()}
          </button>
          
          {filterOptions && (
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
                title="Filtrer"
              >
                {getFilterIcon()}
              </button>
              
              {showFilter && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon()}
                      <h4 className="font-medium text-slate-900">Filtrer {title}</h4>
                    </div>
                    <button
                      onClick={() => setShowFilter(false)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {filterOptions.type !== 'select' && filterOptions.type !== 'boolean' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Condition
                        </label>
                        <select
                          value={tempOperator}
                          onChange={(e) => setTempOperator(e.target.value as FilterConfig[string]['operator'])}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          {getOperatorOptions().map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Valeur
                      </label>
                      {renderFilterInput()}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleFilterClear}
                      className="flex-1 px-3 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                    >
                      Effacer
                    </button>
                    <button
                      onClick={handleFilterApply}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </th>
  );
};

export default TableHeader;