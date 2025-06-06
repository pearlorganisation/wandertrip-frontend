import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define Pagination type (ensure consistency with your redux slice)
interface PaginationProps {
  pagination: {
    total: number;
    current_page: number;
    limit: number;
    next: number | null;
    prev: number | null;
    pages: number[];
  } | null;
  handlePageChange: (page: number | null) => void;
  startResult: number;
  endResult: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  handlePageChange,
  startResult,
  endResult,
}) => {
  if (!pagination) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing {startResult} to {endResult} of {pagination.total} results
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(pagination.prev)}
          disabled={!pagination.prev}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pagination.pages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 rounded-md text-sm ${
              pageNum === pagination.current_page
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(pagination.next)}
          disabled={!pagination.next}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
