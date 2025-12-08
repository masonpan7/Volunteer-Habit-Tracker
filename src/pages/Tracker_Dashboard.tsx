import {useState, useEffect} from 'react';
import './Tracker_Dashboard.css';

interface VolunteerEvent {
    _id: string;
    hours: number;
    type: string;
    organization: string;
    date: string;
    points?: number;
}

interface FormData {
    hours: number;
    type: string;
    organization: string;
    date: string;
}

export default function Tracker_Dashboard() {
    const [events, setEvents] = useState<VolunteerEvent[]>([]);    
    const [totalHours, setTotalHours] = useState<number>(0);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editEvent, setEditEvent] = useState<VolunteerEvent|null>(null);
    const [formData, setFormData] = useState<FormData>({
        hours: 0,
        type: '',
        organization: '',
        date: ''
    });

    const volunteerTypes = [
        'Healthcare',
        'Education',
        'Environment',
        'Community Service',
        'Animal Welfare',
        'Youth Development',
        'Other'
    ];

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/volunteering/events');
            const data = await response.json();
            
            setEvents(data.events || []);
            setTotalHours(data.totalHours || 0);
            setTotalPoints(data.totalPoints || 0);
        } catch (error) {
            console.error('Error fetching events:', error);
            
            // Fake testing data
            setEvents([
                { _id: '1', hours: 5, type: 'Healthcare', organization: 'Local Hospital', date: '2024-11-15', points: 10 },
                { _id: '2', hours: 3, type: 'Education', organization: 'Library', date: '2024-11-20', points: 6 }
            ]);
            setTotalHours(8);
            setTotalPoints(16);
        }
    };

    useEffect(() => {
        (async () => {
        await fetchEvents();
        })();
    }, []);

    

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = async () => {
        try {
            const url = editEvent 
                ? `/api/volunteering/events/${editEvent._id}`
                : '/api/volunteering/events';
            
            const method = editEvent ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
        });

            if (response.ok) {
                fetchEvents();
                closeModal();
            }
        } catch (error) {
        console.error('Error saving event:', error);
        alert('Error saving event. Please try again.');
        }
    };

    const handleDelete = async (eventId: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
        const response = await fetch(`/api/volunteering/events/${eventId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            fetchEvents();
        }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event. Please try again.');
        }
    };

    const openModal = (event: VolunteerEvent | null = null) => {
        if (event) {
            setEditEvent(event);
            setFormData({
                hours: event.hours,
                type: event.type,
                organization: event.organization,
                date: event.date
            });
        } else {
            setEditEvent(null);
            setFormData({
                hours: 0,
                type: '',
                organization: '',
                date: ''
         });
        }
        setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditEvent(null);
    setFormData({
        hours: 0,
        type: '',
        organization: '',
        date: ''
    });
  };

return (
    <div className="tracker-container">
      <div className="tracker-content">
        
        {/* ===== HEADER: Shows total hours and points ===== */}
        <div className="tracker-header">
          <h1 className="tracker-title">Volunteering Tracker</h1>
          
          {/* Two-column grid for stats */}
          <div className="stats-grid">
            {/* Total Hours Card */}
            <div className="stat-card hours">
              <p className="stat-label">Total Hours</p>
              <p className="stat-value hours">{totalHours}</p>
            </div>
            
            {/* Total Points Card */}
            <div className="stat-card points">
              <p className="stat-label">Total Points</p>
              <p className="stat-value points">{totalPoints}</p>
            </div>
          </div>
        </div>

        {/* ===== ADD EVENT BUTTON ===== */}
        <div className="add-button-container">
          <button
            onClick={() => openModal()} // Opens modal in "add" mode (no event passed)
            className="add-button"
          >
            Add Volunteering Event
          </button>
        </div>

        {/* ===== EVENTS LIST ===== */}
        <div className="events-container">
          <div className="events-header">
            <h2 className="events-title">Your Volunteering Events</h2>
          </div>
          
          <div className="events-list">
            {/* Show message if no events exist */}
            {events.length === 0 ? (
              <div className="empty-state">
                No volunteering events yet. Add your first event!
              </div>
            ) : (
              // Map through all events and display each one
              events.map(event => (
                <div key={event._id} className="event-item">
                  <div className="event-content">
                    
                    {/* Event Details */}
                    <div className="event-details">
                      <h3 className="event-organization">{event.organization}</h3>
                      <div className="event-info">
                        <p>Type: {event.type}</p>
                        <p>Hours: {event.hours}</p>
                        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                        {/* Calculate points: if not provided, use hours * 2 */}
                        <p className="event-points">
                          Points: {event.points || event.hours * 2}
                        </p>
                      </div>
                    </div>
                    
                    {/* Edit and Delete Buttons */}
                    <div className="event-actions">
                      <button
                        onClick={() => openModal(event)} // Opens modal in "edit" mode
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ===== MODAL POPUP FOR ADD/EDIT ===== */}
        {showModal && (
          // Dark overlay that covers entire screen
          <div className="modal-overlay">
            {/* Modal content box */}
            <div className="modal-content">
              <h2 className="modal-title">
                {editEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              
              {/* Input fields */}
              <div className="form-container">
                
                {/* Hours Input */}
                <div className="form-group">
                  <label className="form-label">Hours</label>
                  <input
                    type="number"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.5" // Allow half hours (0.5, 1.0, 1.5, etc.)
                    className="form-input"
                  />
                </div>

                {/* Type Dropdown */}
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Type</option>
                    {/* Loop through volunteerTypes array to create dropdown options */}
                    {volunteerTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Organization Input */}
                <div className="form-group">
                  <label className="form-label">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                {/* Date Input */}
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="modal-actions">
                  <button
                    onClick={handleSubmit}
                    className="submit-button"
                  >
                    {editEvent ? 'Update' : 'Add'} Event
                  </button>
                  <button
                    onClick={closeModal}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}