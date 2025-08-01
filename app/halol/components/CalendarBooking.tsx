'use client';
import { useState, useEffect } from 'react';

interface CalendarBookingProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
  unavailableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

export default function CalendarBooking({ 
  onDateSelect, 
  selectedDate, 
  unavailableDates = [],
  minDate = new Date(),
  maxDate
}: CalendarBookingProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimeSlots] = useState([
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ]);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      unavailableDate.toDateString() === date.toDateString()
    );
  };

  const isDateDisabled = (date: Date) => {
    if (date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (isDateUnavailable(date)) return true;
    // Disable weekends for maintenance appointments
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(clickedDate)) {
      onDateSelect(clickedDate);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const dateWithTime = new Date(selectedDate);
      dateWithTime.setHours(hours, minutes, 0, 0);
      onDateSelect(dateWithTime);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      const isDisabled = isDateDisabled(date);
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white'
              : isToday
              ? 'bg-blue-100 text-blue-600'
              : isDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <i className="ri-arrow-left-s-line text-gray-600"></i>
            </button>
            <span className="text-lg font-medium text-gray-900 min-w-[140px] text-center">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <i className="ri-arrow-right-s-line text-gray-600"></i>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>• Weekends are not available for appointments</p>
          <p>• Unavailable dates are marked in gray</p>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-3">Available Time Slots</h4>
          <div className="grid grid-cols-3 gap-2">
            {availableTimeSlots.map(time => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}