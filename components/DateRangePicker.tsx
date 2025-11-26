
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from './Button'; // Assuming you have a Button component
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval,
  isSameDay, isWithinInterval, addYears, subYears, startOfDay, subDays, addDays,
  startOfYear, getYear, setYear, setMonth, isThisYear, eachYearOfInterval, isThisMonth,
} from 'date-fns';

interface DateRangePickerProps {
  label?: string;
  fromValue: string; // ISO date string 'YYYY-MM-DD'
  toValue: string;   // ISO date string 'YYYY-MM-DD'
  onChange: (from: string, to: string) => void;
  error?: string;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  fromValue,
  toValue,
  onChange,
  error,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const fromDateObj = fromValue ? new Date(fromValue) : null;
  const toDateObj = toValue ? new Date(toValue) : null;

  const [selectingStartDate, setSelectingStartDate] = useState(true);
  const [currentPanelDate, setCurrentPanelDate] = useState(() => {
    return startOfMonth(fromDateObj || new Date());
  });
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day');

  const formatDateDisplay = (dateStr: string | null) => dateStr ? format(new Date(dateStr), 'dd/MM/yyyy') : 'dd/mm/yyyy';

  // Effect to handle clicking outside the picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If picker closes while only fromDate is selected, clear the partial range
        if (fromDateObj && !toDateObj && !selectingStartDate) {
          onChange('', '');
        }
        setSelectingStartDate(true); // Always reset for new selection next time it opens
        setViewMode('day'); // Reset to day view
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fromDateObj, toDateObj, onChange, selectingStartDate]);

  // Effect to sync currentPanelDate and selectingStartDate/viewMode when picker opens or closes
  useEffect(() => {
    if (isOpen) {
      // Always reset selectingStartDate to true and viewMode to 'day' when picker opens, for a fresh start
      setSelectingStartDate(true);
      setViewMode('day');
      if (fromDateObj) {
        setCurrentPanelDate(startOfMonth(fromDateObj));
      } else {
        setCurrentPanelDate(startOfMonth(new Date()));
      }
    } else {
      // When picker closes, reset selectingStartDate and viewMode for the next open
      setSelectingStartDate(true);
      setViewMode('day');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);


  const handleDayClick = useCallback((day: Date) => {
    const clickedIsoDay = format(day, 'yyyy-MM-dd');

    if (selectingStartDate) {
      // First click: Set only fromValue, clear toValue
      onChange(clickedIsoDay, '');
      setSelectingStartDate(false); // Prepare for second click
      // Do NOT close the picker here, allow user to pick end date
    } else {
      // Second click: fromDateObj should be set by now (from onChange above)
      const currentFromDate = fromValue ? new Date(fromValue) : null;

      if (!currentFromDate) {
        // Fallback: If for some reason fromDate wasn't set, start new
        onChange(clickedIsoDay, clickedIsoDay);
      } else if (day < currentFromDate) {
        // If clicked day is before fromDate, restart range from clicked day
        onChange(clickedIsoDay, clickedIsoDay);
      } else {
        // If clicked day is on or after fromDate, set it as toDate
        onChange(format(currentFromDate, 'yyyy-MM-dd'), clickedIsoDay);
      }
      setSelectingStartDate(true); // Reset for next range selection
      setIsOpen(false); // Close after valid range or single day selected
      setViewMode('day'); // Reset view mode
    }
  }, [selectingStartDate, fromValue, onChange]);

  const handleMonthClick = useCallback((monthNum: number) => {
    setCurrentPanelDate(setMonth(currentPanelDate, monthNum));
    setViewMode('day');
  }, [currentPanelDate]);

  const handleYearClick = useCallback((yearNum: number) => {
    setCurrentPanelDate(setYear(currentPanelDate, yearNum));
    setViewMode('month');
  }, [currentPanelDate]);


  const renderDayPanel = (month: Date) => {
    const monthStart = startOfMonth(month);
    const startDate = startOfDay(subDays(monthStart, monthStart.getDay()));
    const days = eachDayOfInterval({ start: startDate, end: addDays(startDate, 41) }); // Always show 6 full weeks (42 days)

    return (
      <div className="w-1/2 p-2">
        <h4 className="text-lg font-semibold text-center mb-2 text-gray-800">{format(month, 'MMMM yyyy')}</h4>
        <div className="grid grid-cols-7 gap-1 text-sm text-gray-600">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center font-medium">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {days.map((day, index) => {
            const isCurrentMonth = format(day, 'MM') === format(month, 'MM');
            const isSelectedFrom = fromDateObj && isSameDay(day, fromDateObj);
            const isSelectedTo = toDateObj && isSameDay(day, toDateObj);
            const isSingleDaySelection = fromDateObj && toDateObj && isSameDay(fromDateObj, toDateObj) && isSameDay(day, fromDateObj);
            const isInRange = fromDateObj && toDateObj && isWithinInterval(day, { start: fromDateObj, end: toDateObj }) && !isSameDay(day, fromDateObj) && !isSameDay(day, toDateObj);

            // Highlight current day
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDayClick(day)}
                // Removed disabled={!isCurrentMonth} to allow seamless month navigation via clicks
                className={`
                  w-9 h-9 flex items-center justify-center rounded-full transition-all duration-100
                  ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-800'}
                  ${isToday && !isSelectedFrom && !isSelectedTo && !isInRange ? 'border border-blue-500' : ''} /* Highlight today if not selected */
                  
                  ${(isSelectedFrom || isSelectedTo) && !isSingleDaySelection ? 'bg-blue-600 text-white font-bold shadow-sm' : ''}
                  ${isSingleDaySelection ? 'bg-blue-600 text-white font-bold shadow-sm' : ''}
                  ${isInRange ? 'bg-blue-100 text-blue-800' : ''}
                  
                  ${!isSelectedFrom && !isSelectedTo && !isInRange && !isToday ? 'hover:bg-blue-50 hover:text-blue-800' : ''}
                `}
                aria-label={format(day, 'PPP')}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthPanel = () => {
    const months = Array.from({ length: 12 }, (_, i) => setMonth(startOfYear(currentPanelDate), i));
    const currentYear = getYear(currentPanelDate);

    return (
      <div className="grid grid-cols-3 gap-2 p-2">
        {months.map((month, index) => {
          const isSelected = fromDateObj && getYear(fromDateObj) === currentYear && isSameDay(startOfMonth(month), startOfMonth(fromDateObj));
          const isCurrent = isThisMonth(month) && isThisYear(month); // Check if it's the current month of the current year
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleMonthClick(index)}
              className={`
                w-full h-12 flex items-center justify-center rounded-md transition-all duration-100 text-gray-800 font-medium
                ${isSelected ? 'bg-blue-600 text-white shadow-sm' : ''}
                ${isCurrent && !isSelected ? 'border border-blue-500' : ''} /* Highlight current month if not selected */
                ${!isSelected && !isCurrent ? 'hover:bg-blue-50 hover:text-blue-800' : ''}
              `}
              aria-label={format(month, 'MMMM')}
            >
              {format(month, 'MMM')}
            </button>
          );
        })}
      </div>
    );
  };

  const renderYearPanel = () => {
    const startYear = getYear(currentPanelDate) - (getYear(currentPanelDate) % 10); // Start of decade
    const years = eachYearOfInterval({
      start: startOfYear(setYear(new Date(), startYear - 1)), // Show one year before decade start for context
      end: addYears(startOfYear(setYear(new Date(), startYear + 10)), 0) // Show up to one year after decade end for context
    }).map(date => getYear(date));

    return (
      <div className="grid grid-cols-4 gap-2 p-2">
        {years.map((year, index) => {
          const isSelected = fromDateObj && getYear(fromDateObj) === year;
          const isCurrent = isThisYear(setYear(new Date(), year)); // Check if it's the current year
          const isOutsideDecade = year < startYear || year >= (startYear + 10);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleYearClick(year)}
              className={`
                w-full h-12 flex items-center justify-center rounded-md transition-all duration-100 text-gray-800 font-medium
                ${isOutsideDecade ? 'text-gray-400' : 'text-gray-800'}
                ${isSelected ? 'bg-blue-600 text-white shadow-sm' : ''}
                ${isCurrent && !isSelected ? 'border border-blue-500' : ''} /* Highlight current year if not selected */
                ${!isSelected && !isCurrent && !isOutsideDecade ? 'hover:bg-blue-50 hover:text-blue-800' : ''}
              `}
              aria-label={`Select year ${year}`}
            >
              {year}
            </button>
          );
        })}
      </div>
    );
  };

  const handleQuickSelect = useCallback((rangeType: 'today' | 'last7' | 'last30') => {
    const today = startOfDay(new Date());
    let from: Date;
    let to: Date = today;

    if (rangeType === 'today') {
      from = today;
    } else if (rangeType === 'last7') {
      from = subDays(today, 6);
    } else { // 'last30'
      from = subDays(today, 29);
    }
    onChange(format(from, 'yyyy-MM-dd'), format(to, 'yyyy-MM-dd'));
    setIsOpen(false);
    setSelectingStartDate(true); // Reset for new selection
    setViewMode('day'); // Reset view mode
  }, [onChange]);

  const renderNavigationHeader = () => {
    let title = '';
    let navNextFunc: () => void;
    let navPrevFunc: () => void;
    let navTitleClickFunc: () => void;
    let prevYearNavFunc: () => void; // For «
    let nextYearNavFunc: () => void; // For »

    if (viewMode === 'day') {
      title = format(currentPanelDate, 'MMMM yyyy');
      navPrevFunc = () => setCurrentPanelDate(subMonths(currentPanelDate, 1));
      navNextFunc = () => setCurrentPanelDate(addMonths(currentPanelDate, 1));
      navTitleClickFunc = () => setViewMode('month');
      prevYearNavFunc = () => setCurrentPanelDate(subYears(currentPanelDate, 1)); // Single year for day view
      nextYearNavFunc = () => setCurrentPanelDate(addYears(currentPanelDate, 1)); // Single year for day view
    } else if (viewMode === 'month') {
      title = format(currentPanelDate, 'yyyy');
      navPrevFunc = () => setCurrentPanelDate(subYears(currentPanelDate, 1));
      navNextFunc = () => setCurrentPanelDate(addYears(currentPanelDate, 1));
      navTitleClickFunc = () => setViewMode('year');
      prevYearNavFunc = () => setCurrentPanelDate(subYears(currentPanelDate, 10)); // Decade for month view
      nextYearNavFunc = () => setCurrentPanelDate(addYears(currentPanelDate, 10)); // Decade for month view
    } else { // viewMode === 'year'
      const startYear = getYear(currentPanelDate) - (getYear(currentPanelDate) % 10);
      title = `${startYear}-${startYear + 9}`;
      navPrevFunc = () => setCurrentPanelDate(subYears(currentPanelDate, 10));
      navNextFunc = () => setCurrentPanelDate(addYears(currentPanelDate, 10));
      navTitleClickFunc = () => { }; // Cannot go higher than year decade
      prevYearNavFunc = () => setCurrentPanelDate(subYears(currentPanelDate, 100)); // Century for year view
      nextYearNavFunc = () => setCurrentPanelDate(addYears(currentPanelDate, 100)); // Century for year view
    }

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1">
          <Button type="button" size="sm" variant="secondary" onClick={prevYearNavFunc} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3" aria-label={`Previous ${viewMode === 'day' ? 'year' : viewMode === 'month' ? 'decade' : 'century'}`}>«</Button>
          <Button type="button" size="sm" variant="secondary" onClick={navPrevFunc} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3" aria-label={`Previous ${viewMode}`}>&lt;</Button>
        </div>
        <Button type="button" size="sm" variant="secondary" onClick={navTitleClickFunc} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3 px-4" aria-label={`Select ${viewMode === 'day' ? 'month' : viewMode === 'month' ? 'year' : 'decade'}`} data-testid="view-mode-title">
          {title}
        </Button>
        <div className="flex gap-1">
          <Button type="button" size="sm" variant="secondary" onClick={navNextFunc} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3" aria-label={`Next ${viewMode}`}>&gt;</Button>
          <Button type="button" size="sm" variant="secondary" onClick={nextYearNavFunc} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3" aria-label={`Next ${viewMode === 'day' ? 'year' : viewMode === 'month' ? 'decade' : 'century'}`}>»</Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative mb-4 ${className}`} ref={pickerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={`w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 cursor-pointer flex items-center justify-between shadow-sm ${error ? 'border-red-500' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-testid="date-range-display"
      >
        <span>
          <span className="font-medium text-blue-600">{formatDateDisplay(fromValue)}</span>
          {' → '}
          <span className="font-medium text-blue-600">{formatDateDisplay(toValue)}</span>
        </span>
        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error}</p>}

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-[1300] bg-white border border-gray-100 rounded-lg shadow-2xl p-6 w-[600px] text-gray-800" data-testid="date-range-picker-panel">
          {/* Quick Select Buttons */}
          <div className="flex justify-start gap-2 mb-4">
            <Button type="button" size="sm" variant="secondary" onClick={() => handleQuickSelect('today')} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3" data-testid="quick-select-today">Today</Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => handleQuickSelect('last7')} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3" data-testid="quick-select-last7">Last 7 days</Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => handleQuickSelect('last30')} className="!bg-gray-50 hover:!bg-gray-100 text-gray-700 font-medium border border-gray-200 py-1.5 px-3" data-testid="quick-select-last30">Last 30 days</Button>
            <div className="flex-grow"></div> {/* Spacer */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="text-blue-600 font-semibold">{formatDateDisplay(fromValue)}</span>
              <span className="text-gray-600">→</span>
              <span className="text-blue-600 font-semibold">{formatDateDisplay(toValue)}</span>
              {(fromValue || toValue) && (
                <button type="button" onClick={() => onChange('', '')} className="text-gray-600 hover:text-gray-800 ml-1" aria-label="Clear dates">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>

          {/* Hierarchical Navigation Header */}
          {renderNavigationHeader()}

          {/* Render panels based on viewMode */}
          {viewMode === 'year' && renderYearPanel()}
          {viewMode === 'month' && renderMonthPanel()}
          {viewMode === 'day' && (
            <div className="flex justify-between">
              {renderDayPanel(currentPanelDate)}
              {renderDayPanel(addMonths(currentPanelDate, 1))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
