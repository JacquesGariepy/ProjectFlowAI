import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Trash2, 
  X, 
  Save,
  Search,
  ChevronDown
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { CalendarEvent } from '../types';
import { formatDate, formatDateTime } from '../utils/dateUtils';

type ViewMode = 'month' | 'week' | 'day';

const Calendar: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { t, language } = useLanguage();
  const { calendarEvents, users, currentUser } = state;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [clickedHour, setClickedHour] = useState<number | null>(null);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const yearSelectorRef = useRef<HTMLDivElement>(null);

  // Helper function to get locale for date formatting
  const getLocale = () => language === 'fr' ? 'fr-FR' : 'en-US';

  // Close year selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearSelectorRef.current && !yearSelectorRef.current.contains(event.target as Node)) {
        setShowYearSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fonction utilitaire pour normaliser les dates (enlever l'heure)
  const normalizeDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Fonction utilitaire pour vérifier si deux dates sont identiques
  const isSameDate = (date1: string | Date, date2: string | Date): boolean => {
    const d1 = typeof date1 === 'string' ? date1 : normalizeDate(date1);
    const d2 = typeof date2 === 'string' ? date2 : normalizeDate(date2);
    return d1 === d2;
  };

  // Initialize new event
  const initializeNewEvent = (date?: Date, hour?: number): CalendarEvent => {
    const eventDate = date || clickedDate || selectedDate || new Date();
    const startHour = hour ?? clickedHour ?? 9;
    
    return {
      id: '',
      title: '',
      description: '',
      startTime: `${startHour.toString().padStart(2, '0')}:00`,
      endTime: `${(startHour + 1).toString().padStart(2, '0')}:00`,
      date: normalizeDate(eventDate),
      type: 'meeting',
      attendees: [currentUser?.id || 'unknown-user'],
      location: '',
      isRecurring: false,
      reminderMinutes: 15
    };
  };

  // Fonction centralisée pour filtrer les événements
  const filterEvents = (events: CalendarEvent[]): CalendarEvent[] => {
    return events.filter(event => {
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || event.type === filterType;
      
      return matchesSearch && matchesFilter;
    });
  };


  // Get events for a specific date (used in day view and individual day cells)
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateString = normalizeDate(date);
    const filteredEvents = filterEvents(calendarEvents);
    
    return filteredEvents.filter(event => isSameDate(event.date, dateString));
  };

  // Get events for a specific date and hour
  const getEventsForDateAndHour = (date: Date, hour: number): CalendarEvent[] => {
    const eventsForDate = getEventsForDate(date);
    
    return eventsForDate.filter(event => {
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return eventHour === hour;
    });
  };

  const getViewStartDate = () => {
    const date = new Date(currentDate);
    switch (viewMode) {
      case 'month':
        date.setDate(1);
        date.setDate(date.getDate() - date.getDay());
        return date;
      case 'week':
        date.setDate(date.getDate() - date.getDay());
        return date;
      case 'day':
        return date;
      default:
        return date;
    }
  };

  const getViewEndDate = () => {
    const date = new Date(currentDate);
    switch (viewMode) {
      case 'month':
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        date.setDate(date.getDate() + (6 - date.getDay()));
        return date;
      case 'week':
        date.setDate(date.getDate() - date.getDay() + 6);
        return date;
      case 'day':
        return date;
      default:
        return date;
    }
  };

  // Navigation functions
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  // Year navigation
  const navigateToYear = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearSelector(false);
  };

  // Generate year options (current year ± 10 years)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  // Event handlers
  const handleDateClick = (date: Date, hour?: number) => {
    setClickedDate(date);
    setClickedHour(hour || null);
    setSelectedDate(date);
  };

  const handleAddEvent = (date?: Date, hour?: number) => {
    const newEvent = initializeNewEvent(date, hour);
    setSelectedEvent(newEvent);
    setIsCreating(true);
    setShowEventModal(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsCreating(false);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      dispatch({ type: 'DELETE_CALENDAR_EVENT', payload: eventToDelete });
      setShowDeleteModal(false);
      setEventToDelete(null);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: t.calendar.eventDeleted,
          message: t.messages.actionSuccessful,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const saveEvent = () => {
    if (selectedEvent) {
      if (isCreating) {
        const newEvent: CalendarEvent = {
          ...selectedEvent,
          id: Date.now().toString()
        };
        dispatch({ type: 'ADD_CALENDAR_EVENT', payload: newEvent });
      } else {
        dispatch({ type: 'UPDATE_CALENDAR_EVENT', payload: selectedEvent });
      }
      
      setShowEventModal(false);
      setSelectedEvent(null);
      setIsCreating(false);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: isCreating ? t.calendar.eventCreated : t.calendar.eventUpdated,
          message: `"${selectedEvent.title}" ${isCreating ? t.calendar.eventCreatedMessage : t.calendar.eventUpdatedMessage}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, event: CalendarEvent) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetDate: Date, targetHour?: number) => {
    e.preventDefault();
    
    if (draggedEvent) {
      const updatedEvent: CalendarEvent = {
        ...draggedEvent,
        date: normalizeDate(targetDate)
      };
      
      if (targetHour !== undefined) {
        const endHour = parseInt(draggedEvent.endTime.split(':')[0]) - parseInt(draggedEvent.startTime.split(':')[0]);
        updatedEvent.startTime = `${targetHour.toString().padStart(2, '0')}:00`;
        updatedEvent.endTime = `${(targetHour + endHour).toString().padStart(2, '0')}:00`;
      }
      
      dispatch({ type: 'UPDATE_CALENDAR_EVENT', payload: updatedEvent });
      setDraggedEvent(null);
    }
  };

  // Render functions
  const renderMonthView = () => {
    const startDate = getViewStartDate();
    const days: Date[] = [];
    
    // Generate calendar days
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Utiliser getEventsForDate pour une cohérence parfaite
      const dayEvents = getEventsForDate(date);
      
      const isCurrentMonth = date.getMonth() === currentDate.getMonth();
      const isToday = isSameDate(date, new Date());
      const isSelected = selectedDate && isSameDate(date, selectedDate);
      
      days.push(
        <div
          key={i}
          className={`min-h-[120px] border border-slate-200 p-2 cursor-pointer transition-colors relative group ${
            !isCurrentMonth ? 'bg-slate-50 text-slate-400' : 'bg-white hover:bg-slate-50'
          } ${isToday ? 'bg-blue-50 border-blue-300' : ''} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => handleDateClick(date)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, date)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
              {date.getDate()}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddEvent(date);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all"
            >
              <Plus className="w-3 h-3 text-slate-500" />
            </button>
          </div>
          
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                draggable
                onDragStart={(e) => handleDragStart(e, event)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditEvent(event);
                }}
                className={`text-xs p-1 rounded cursor-pointer truncate ${
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                  event.type === 'deadline' ? 'bg-red-100 text-red-700' :
                  event.type === 'presentation' ? 'bg-purple-100 text-purple-700' :
                  event.type === 'review' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}
              >
                {event.startTime} {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-slate-500">
                +{dayEvents.length - 3} {t.calendar.moreEvents}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-0 border border-slate-200 rounded-lg overflow-hidden">
        {[t.calendar.sun, t.calendar.mon, t.calendar.tue, t.calendar.wed, t.calendar.thu, t.calendar.fri, t.calendar.sat].map((day) => (
          <div key={day} className="bg-slate-100 p-3 text-center font-medium text-slate-700 border-b border-slate-200">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const startDate = getViewStartDate();
    const days: Date[] = [];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    return (
      <div className="flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-8 border border-slate-200 rounded-t-lg overflow-hidden">
          <div className="bg-slate-100 p-3 border-r border-slate-200"></div>
          {days.map((date, index) => {
            const isToday = isSameDate(date, new Date());
            return (
              <div key={index} className={`bg-slate-100 p-3 text-center border-r border-slate-200 ${isToday ? 'bg-blue-100' : ''}`}>
                <div className="font-medium text-slate-700">
                  {date.toLocaleDateString(getLocale(), { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-slate-900'}`}>
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Time slots */}
        <div className="grid grid-cols-8 border-l border-r border-b border-slate-200 rounded-b-lg overflow-hidden max-h-96 overflow-y-auto">
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="bg-slate-50 p-2 text-xs text-slate-600 border-r border-b border-slate-200 text-center">
                {hour.toString().padStart(2, '0')}:00
              </div>
              {days.map((date, dayIndex) => {
                // Utiliser getEventsForDateAndHour pour une cohérence parfaite
                const hourEvents = getEventsForDateAndHour(date, hour);
                
                return (
                  <div
                    key={`${hour}-${dayIndex}`}
                    className="min-h-[60px] border-r border-b border-slate-200 p-1 cursor-pointer hover:bg-slate-50 relative group"
                    onClick={() => handleDateClick(date, hour)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, date, hour)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddEvent(date, hour);
                      }}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all"
                    >
                      <Plus className="w-3 h-3 text-slate-500" />
                    </button>
                    
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, event)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(event);
                        }}
                        className={`text-xs p-1 rounded cursor-pointer mb-1 ${
                          event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                          event.type === 'deadline' ? 'bg-red-100 text-red-700' :
                          event.type === 'presentation' ? 'bg-purple-100 text-purple-700' :
                          event.type === 'review' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-xs opacity-75">{event.startTime}-{event.endTime}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const isToday = isSameDate(currentDate, new Date());
    
    return (
      <div className="flex flex-col">
        {/* Header */}
        <div className={`bg-slate-100 p-4 text-center border border-slate-200 rounded-t-lg ${isToday ? 'bg-blue-100' : ''}`}>
          <div className="font-medium text-slate-700">
            {currentDate.toLocaleDateString(getLocale(), { weekday: 'long' })}
          </div>
          <div className={`text-2xl font-bold ${isToday ? 'text-blue-600' : 'text-slate-900'}`}>
            {currentDate.getDate()} {currentDate.toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' })}
          </div>
        </div>
        
        {/* Time slots */}
        <div className="border-l border-r border-b border-slate-200 rounded-b-lg overflow-hidden max-h-96 overflow-y-auto">
          {hours.map((hour) => {
            // Utiliser getEventsForDateAndHour pour une cohérence parfaite
            const hourEvents = getEventsForDateAndHour(currentDate, hour);
            
            return (
              <div
                key={hour}
                className="flex border-b border-slate-200 min-h-[80px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, currentDate, hour)}
              >
                <div className="w-20 bg-slate-50 p-3 text-sm text-slate-600 border-r border-slate-200 text-center">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                <div 
                  className="flex-1 p-3 cursor-pointer hover:bg-slate-50 relative group"
                  onClick={() => handleDateClick(currentDate, hour)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddEvent(currentDate, hour);
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-all"
                  >
                    <Plus className="w-4 h-4 text-slate-500" />
                  </button>
                  
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEvent(event);
                      }}
                      className={`p-3 rounded-lg cursor-pointer mb-2 shadow-sm ${
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' :
                        event.type === 'deadline' ? 'bg-red-100 text-red-700 border-l-4 border-red-500' :
                        event.type === 'presentation' ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500' :
                        event.type === 'review' ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500' :
                        'bg-green-100 text-green-700 border-l-4 border-green-500'
                      }`}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm opacity-75 mt-1">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.location && (
                        <div className="text-sm opacity-75 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getViewTitle = () => {
    switch (viewMode) {
      case 'month':
        return currentDate.toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' });
      case 'week':
        const startWeek = getViewStartDate();
        const endWeek = getViewEndDate();
        return `${startWeek.getDate()} - ${endWeek.getDate()} ${currentDate.toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' })}`;
      case 'day':
        return currentDate.toLocaleDateString(getLocale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      default:
        return '';
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
            <span>{t.calendar.title}</span>
          </h1>
          <p className="text-slate-600 mt-1">{t.calendar.subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleAddEvent()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t.calendar.newEvent}</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-4">
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={navigatePrevious}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={navigateToday}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
{t.calendar.today}
            </button>
            <button
              onClick={navigateNext}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-xl font-semibold text-slate-900">
              {getViewTitle()}
            </div>
            
            {/* Year Selector */}
            <div className="relative" ref={yearSelectorRef}>
              <button
                onClick={() => setShowYearSelector(!showYearSelector)}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span>{currentDate.getFullYear()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showYearSelector && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 max-h-64 overflow-y-auto">
                  {generateYearOptions().map((year) => (
                    <button
                      key={year}
                      onClick={() => navigateToYear(year)}
                      className={`w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors ${
                        year === currentDate.getFullYear() ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t.calendar.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">{t.calendar.allTypes}</option>
            <option value="meeting">{t.calendar.meetings}</option>
            <option value="deadline">{t.calendar.deadlines}</option>
            <option value="presentation">{t.calendar.presentations}</option>
            <option value="review">{t.calendar.reviews}</option>
            <option value="personal">{t.calendar.personalEvents}</option>
          </select>

          {/* View Mode */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  viewMode === mode
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode === 'month' ? t.calendar.monthView : mode === 'week' ? t.calendar.weekView : t.calendar.dayView}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div ref={calendarRef} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </div>

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                {isCreating ? t.calendar.newEventModal : t.calendar.editEventModal}
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.eventTitle}</label>
                <input
                  type="text"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.calendar.eventTitlePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.eventDescription}</label>
                <textarea
                  value={selectedEvent.description}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.calendar.eventDescriptionPlaceholder}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.eventDate}</label>
                  <input
                    type="date"
                    value={selectedEvent.date}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.eventType}</label>
                  <select
                    value={selectedEvent.type}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="meeting">{t.calendar.meeting}</option>
                    <option value="deadline">{t.calendar.deadline}</option>
                    <option value="presentation">{t.calendar.presentation}</option>
                    <option value="review">{t.calendar.review}</option>
                    <option value="personal">{t.calendar.personal}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.startTime}</label>
                  <input
                    type="time"
                    value={selectedEvent.startTime}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.endTime}</label>
                  <input
                    type="time"
                    value={selectedEvent.endTime}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.location}</label>
                <input
                  type="text"
                  value={selectedEvent.location || ''}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.calendar.eventLocationPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.attendees}</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {users.map((user) => (
                    <label key={user.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedEvent.attendees.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEvent({
                              ...selectedEvent,
                              attendees: [...selectedEvent.attendees, user.id]
                            });
                          } else {
                            setSelectedEvent({
                              ...selectedEvent,
                              attendees: selectedEvent.attendees.filter(id => id !== user.id)
                            });
                          }
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-sm text-slate-700">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.calendar.reminderMinutes}</label>
                  <select
                    value={selectedEvent.reminderMinutes}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, reminderMinutes: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={0}>{t.calendar.noReminder}</option>
                    <option value={5}>{t.calendar.fiveMinutes}</option>
                    <option value={15}>{t.calendar.fifteenMinutes}</option>
                    <option value={30}>{t.calendar.thirtyMinutes}</option>
                    <option value={60}>{t.calendar.oneHour}</option>
                    <option value={1440}>{t.calendar.oneDay}</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={selectedEvent.isRecurring}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, isRecurring: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="recurring" className="text-sm text-slate-700">{t.calendar.recurringEvent}</label>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEventModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.common.cancel}
              </button>
              {!isCreating && (
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    handleDeleteEvent(selectedEvent.id);
                  }}
                  className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  {t.common.delete}
                </button>
              )}
              <button
                onClick={saveEvent}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? t.calendar.createEvent : t.calendar.saveEvent}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{t.calendar.deleteEventModal}</h3>
                <p className="text-sm text-slate-600">{t.calendar.deleteConfirmation}</p>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              {t.calendar.deleteWarning}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={confirmDeleteEvent}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;