import { useState, useMemo, useCallback } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
  priority: number;
}

export interface FilterConfig {
  [key: string]: {
    type: 'text' | 'select' | 'date' | 'number' | 'boolean';
    value: any;
    operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'between';
  };
}

export interface UseTableSortProps<T> {
  data: T[];
  initialSort?: SortConfig[];
  initialFilters?: FilterConfig;
}

export function useTableSort<T extends Record<string, any>>({
  data,
  initialSort = [],
  initialFilters = {}
}: UseTableSortProps<T>) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>(initialSort);
  const [filters, setFilters] = useState<FilterConfig>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction de tri multi-colonnes
  const sortData = useCallback((data: T[], configs: SortConfig[]): T[] => {
    if (configs.length === 0) return data;

    return [...data].sort((a, b) => {
      for (const config of configs.sort((x, y) => x.priority - y.priority)) {
        if (config.direction === null) continue;

        const aValue = getNestedValue(a, config.key);
        const bValue = getNestedValue(b, config.key);

        let comparison = 0;

        // Gestion des différents types de données
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        if (comparison !== 0) {
          return config.direction === 'asc' ? comparison : -comparison;
        }
      }
      return 0;
    });
  }, []);

  // Fonction de filtrage
  const filterData = useCallback((data: T[], filters: FilterConfig, searchQuery: string): T[] => {
    let filteredData = data;

    // Appliquer les filtres par colonne
    Object.entries(filters).forEach(([key, filter]) => {
      if (!filter.value && filter.value !== 0 && filter.value !== false) return;

      filteredData = filteredData.filter(item => {
        const itemValue = getNestedValue(item, key);
        
        switch (filter.type) {
          case 'text':
            const textValue = String(itemValue).toLowerCase();
            const filterValue = String(filter.value).toLowerCase();
            
            switch (filter.operator) {
              case 'contains':
                return textValue.includes(filterValue);
              case 'startsWith':
                return textValue.startsWith(filterValue);
              case 'endsWith':
                return textValue.endsWith(filterValue);
              case 'equals':
              default:
                return textValue === filterValue;
            }

          case 'select':
            return itemValue === filter.value;

          case 'date':
            const itemDate = new Date(itemValue);
            const filterDate = new Date(filter.value);
            
            switch (filter.operator) {
              case 'gt':
                return itemDate > filterDate;
              case 'lt':
                return itemDate < filterDate;
              case 'gte':
                return itemDate >= filterDate;
              case 'lte':
                return itemDate <= filterDate;
              case 'equals':
              default:
                return itemDate.toDateString() === filterDate.toDateString();
            }

          case 'number':
            const numValue = Number(itemValue);
            const numFilter = Number(filter.value);
            
            switch (filter.operator) {
              case 'gt':
                return numValue > numFilter;
              case 'lt':
                return numValue < numFilter;
              case 'gte':
                return numValue >= numFilter;
              case 'lte':
                return numValue <= numFilter;
              case 'equals':
              default:
                return numValue === numFilter;
            }

          case 'boolean':
            return Boolean(itemValue) === Boolean(filter.value);

          default:
            return true;
        }
      });
    });

    // Appliquer la recherche globale
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(query)
        )
      );
    }

    return filteredData;
  }, []);

  // Données triées et filtrées
  const processedData = useMemo(() => {
    const filtered = filterData(data, filters, searchQuery);
    return sortData(filtered, sortConfigs);
  }, [data, filters, searchQuery, sortConfigs, filterData, sortData]);

  // Gestion du tri
  const handleSort = useCallback((key: string, forceDirection?: SortDirection) => {
    setSortConfigs(prev => {
      const existingIndex = prev.findIndex(config => config.key === key);
      const newConfigs = [...prev];

      if (existingIndex >= 0) {
        const existing = newConfigs[existingIndex];
        
        if (forceDirection) {
          newConfigs[existingIndex] = { ...existing, direction: forceDirection };
        } else {
          // Cycle: asc -> desc -> null
          const nextDirection = 
            existing.direction === 'asc' ? 'desc' :
            existing.direction === 'desc' ? null : 'asc';
          
          if (nextDirection === null) {
            newConfigs.splice(existingIndex, 1);
          } else {
            newConfigs[existingIndex] = { ...existing, direction: nextDirection };
          }
        }
      } else {
        // Nouveau tri
        const direction = forceDirection || 'asc';
        newConfigs.push({
          key,
          direction,
          priority: Math.max(...newConfigs.map(c => c.priority), 0) + 1
        });
      }

      return newConfigs;
    });
  }, []);

  // Gestion des filtres
  const handleFilter = useCallback((key: string, filterConfig: Partial<FilterConfig[string]>) => {
    setFilters(prev => ({
      ...prev,
      [key]: { ...prev[key], ...filterConfig }
    }));
  }, []);

  // Réinitialisation
  const resetSort = useCallback(() => setSortConfigs([]), []);
  const resetFilters = useCallback(() => setFilters({}), []);
  const resetAll = useCallback(() => {
    resetSort();
    resetFilters();
    setSearchQuery('');
  }, [resetSort, resetFilters]);

  // Utilitaires
  const getSortConfig = useCallback((key: string) => {
    return sortConfigs.find(config => config.key === key);
  }, [sortConfigs]);

  const getFilterConfig = useCallback((key: string) => {
    return filters[key];
  }, [filters]);

  return {
    // Données
    data: processedData,
    originalData: data,
    
    // État
    sortConfigs,
    filters,
    searchQuery,
    
    // Actions
    handleSort,
    handleFilter,
    setSearchQuery,
    resetSort,
    resetFilters,
    resetAll,
    
    // Utilitaires
    getSortConfig,
    getFilterConfig,
    
    // Statistiques
    totalItems: data.length,
    filteredItems: processedData.length,
    isFiltered: Object.keys(filters).length > 0 || searchQuery.trim() !== '',
    isSorted: sortConfigs.length > 0
  };
}

// Fonction utilitaire pour accéder aux propriétés imbriquées
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}