
import React from 'react';
import Button from './Button';

interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pageSize?: number;
  initialSortBy?: keyof T | string;
  initialSortDirection?: 'asc' | 'desc';
  caption?: string;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  pageSize = 5,
  initialSortBy,
  initialSortDirection = 'asc',
  caption,
}: TableProps<T>): React.ReactElement => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<keyof T | string | undefined>(initialSortBy);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(initialSortDirection);

  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortBy as keyof T];
      const bValue = b[sortBy as keyof T];

      if (aValue === bValue) return 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortBy, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: keyof T | string, sortable: boolean | undefined) => {
    if (!sortable) return;
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderSortIcon = (key: keyof T | string) => {
    if (sortBy === key) {
      return sortDirection === 'asc' ? (
        <svg className="h-4 w-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg className="h-4 w-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        {caption && <caption className="p-4 text-left text-lg font-semibold text-gray-700">{caption}</caption>}
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={typeof column.key === 'string' ? column.key : index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''}`}
                onClick={() => handleSort(column.key, column.sortable)}
              >
                {column.header}
                {renderSortIcon(column.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            paginatedData.map((item, rowIndex) => (
              <tr key={item.id || rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((column, colIndex) => (
                  <td key={typeof column.key === 'string' ? `${item.id}-${column.key}` : colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(item) : item[column.key as keyof T]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <nav className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button variant="secondary" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} size="sm">
              Previous
            </Button>
            <Button variant="secondary" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} size="sm">
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, sortedData.length)}</span> of{' '}
                <span className="font-medium">{sortedData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-l-md"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => goToPage(i + 1)}
                    className={`${currentPage === i + 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-r-md"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
              </nav>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Table;
