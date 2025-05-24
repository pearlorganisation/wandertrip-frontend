
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface FilterOptions {
  search: string;
  location: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  sortBy: "date" | "likes" | "location";
  onlyLiked: boolean;
}

interface MemoryFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export const MemoryFilter = ({ onFilterChange }: MemoryFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    location: '',
    dateRange: {
      from: undefined,
      to: undefined
    },
    sortBy: "date",
    onlyLiked: false
  });

  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "date" | "likes" | "location";
    setFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  const handleDateChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDate(range);
    setFilters(prev => ({
      ...prev,
      dateRange: range
    }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      location: '',
      dateRange: {
        from: undefined,
        to: undefined
      },
      sortBy: "date",
      onlyLiked: false
    });
    setDate({
      from: undefined,
      to: undefined,
    });
    onFilterChange({
      search: '',
      location: '',
      dateRange: {
        from: undefined,
        to: undefined
      },
      sortBy: "date",
      onlyLiked: false
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="bg-background border border-border/40 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Find Memories</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5"
          >
            <Filter size={16} />
            {isExpanded ? "Less Filters" : "More Filters"}
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            type="text"
            placeholder="Search memories..."
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            className="pl-9"
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Filter by location"
                    name="location"
                    value={filters.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label htmlFor="sortBy" className="text-sm font-medium">
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    <option value="date">Date (Newest First)</option>
                    <option value="likes">Most Liked</option>
                    <option value="location">Location (A-Z)</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="onlyLiked"
                      checked={filters.onlyLiked}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25"
                    />
                    <span className="text-sm">Show only favorite memories</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <X size={16} className="mr-1.5" /> Reset
          </Button>
          <Button size="sm" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryFilter;
