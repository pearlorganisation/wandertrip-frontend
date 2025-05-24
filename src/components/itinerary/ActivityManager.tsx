
import React, { useState } from 'react';
import { Edit, Trash2, Plus, Clock, MapPin, Calendar, DollarSign, Check, X, Heart, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Activity {
  id: string;
  title: string;
  time: string;
  description: string;
  location: string;
  price: number | null;
  isPaid: boolean;
  isBooked: boolean;
  icon: JSX.Element;
  cancellationPolicy?: string;
  isFavorite?: boolean;
  isCompleted?: boolean;
  notes?: string[];
  lastUpdated?: string;
}

interface RecommendedActivity {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number | null;
  duration: string;
  rating: number;
  image: string;
}

interface ActivityManagerProps {
  activities: Activity[];
  dayNumber: number;
  destination: string;
  date: string;
}

export const ActivityManager = ({ activities: initialActivities, dayNumber, destination, date }: ActivityManagerProps) => {
  const [activities, setActivities] = useState(initialActivities);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendedActivity | null>(null);
  const [showNotes, setShowNotes] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  
  // Mock recommended activities based on destination
  const recommendedActivities: RecommendedActivity[] = [
    {
      id: 'rec1',
      title: 'Sunset Sailing Tour',
      description: 'Experience a breathtaking sunset from the water with complimentary drinks and snacks.',
      location: 'Marina Bay',
      price: 55,
      duration: '2 hours',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344'
    },
    {
      id: 'rec2',
      title: 'Local Food Walking Tour',
      description: 'Taste authentic local cuisine with a knowledgeable guide explaining cultural significance.',
      location: 'Old Town District',
      price: 45,
      duration: '3 hours',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
    },
    {
      id: 'rec3',
      title: 'Morning Yoga Session',
      description: 'Start your day with a rejuvenating yoga session by the beach.',
      location: 'Sunrise Beach',
      price: 15,
      duration: '1 hour',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
    },
    {
      id: 'rec4',
      title: 'Historical Walking Tour',
      description: 'Explore the rich history and architecture of the old city center.',
      location: 'Heritage District',
      price: 0,
      duration: '2 hours',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b'
    }
  ];
  
  const handleAddActivity = (activity: RecommendedActivity) => {
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      title: activity.title,
      time: '12:00',
      description: activity.description,
      location: activity.location,
      price: activity.price,
      isPaid: activity.price !== null && activity.price > 0,
      isBooked: false,
      icon: <MapPin size={16} className="text-primary" />,
      isFavorite: false,
      isCompleted: false,
      notes: [],
      lastUpdated: new Date().toISOString()
    };
    
    setActivities([...activities, newActivity]);
    setShowRecommendations(false);
    toast.success('Activity added to your itinerary!');
  };
  
  const handleModifyActivity = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    if (activity) {
      setEditingActivity(activity);
    }
  };
  
  const handleSaveActivity = (modifiedActivity: Activity) => {
    const updatedActivities = activities.map(a => 
      a.id === modifiedActivity.id ? {...modifiedActivity, lastUpdated: new Date().toISOString()} : a
    );
    setActivities(updatedActivities);
    setEditingActivity(null);
    toast.success('Activity updated successfully!');
  };
  
  const handleDeleteActivity = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    if (activity?.isPaid && activity?.isBooked) {
      toast('Cancellation request submitted', {
        description: 'Your refund will be processed within 3-5 business days.',
      });
    }
    
    setActivities(activities.filter(a => a.id !== activityId));
    toast.success('Activity removed from your itinerary');
  };
  
  const handleToggleFavorite = (activityId: string) => {
    const updatedActivities = activities.map(a => 
      a.id === activityId ? {...a, isFavorite: !a.isFavorite, lastUpdated: new Date().toISOString()} : a
    );
    setActivities(updatedActivities);
    
    const activity = updatedActivities.find(a => a.id === activityId);
    if (activity?.isFavorite) {
      toast.success('Added to favorites');
    } else {
      toast('Removed from favorites');
    }
  };
  
  const handleToggleCompleted = (activityId: string) => {
    const updatedActivities = activities.map(a => 
      a.id === activityId ? {...a, isCompleted: !a.isCompleted, lastUpdated: new Date().toISOString()} : a
    );
    setActivities(updatedActivities);
    
    const activity = updatedActivities.find(a => a.id === activityId);
    if (activity?.isCompleted) {
      toast.success('Activity marked as completed!');
    } else {
      toast('Activity marked as not completed');
    }
  };
  
  const handleAddNote = (activityId: string) => {
    if (!newNote.trim()) return;
    
    const updatedActivities = activities.map(a => 
      a.id === activityId 
        ? {
            ...a, 
            notes: [...(a.notes || []), newNote],
            lastUpdated: new Date().toISOString()
          } 
        : a
    );
    setActivities(updatedActivities);
    setNewNote("");
    toast.success('Note added!');
  };
  
  const handleRemoveNote = (activityId: string, noteIndex: number) => {
    const activity = activities.find(a => a.id === activityId);
    if (!activity || !activity.notes) return;
    
    const updatedNotes = [...activity.notes];
    updatedNotes.splice(noteIndex, 1);
    
    const updatedActivities = activities.map(a => 
      a.id === activityId 
        ? {
            ...a, 
            notes: updatedNotes,
            lastUpdated: new Date().toISOString()
          } 
        : a
    );
    
    setActivities(updatedActivities);
    toast.success('Note removed');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Day {dayNumber} Activities</h2>
        <Badge variant="outline">{date}</Badge>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <Card key={activity.id} className={`p-4 activity-card ${activity.isFavorite ? 'border-primary/40' : ''} ${activity.isCompleted ? 'bg-primary/5' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  {activity.icon}
                </div>
                
                <div>
                  <div className="flex items-center">
                    <h3 className={`font-medium ${activity.isCompleted ? 'line-through text-muted-foreground' : ''}`}>{activity.title}</h3>
                    {activity.isPaid && (
                      <Badge variant={activity.isBooked ? "paid" : "outline"} className="ml-2">
                        {activity.isBooked ? "Booked" : "Not Booked"}
                      </Badge>
                    )}
                    {!activity.isPaid && (
                      <Badge variant="free" className="ml-2">Free</Badge>
                    )}
                    {activity.isFavorite && (
                      <span className="ml-2 text-amber-500">
                        <Star size={14} fill="currentColor" />
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock size={12} className="mr-1" /> {activity.time}
                    <span className="mx-1.5">•</span>
                    <MapPin size={12} className="mr-1" /> {activity.location}
                    {activity.price !== null && (
                      <>
                        <span className="mx-1.5">•</span>
                        <DollarSign size={12} className="mr-1" /> 
                        {activity.price > 0 ? `$${activity.price}` : 'Free'}
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm mt-2">{activity.description}</p>
                  
                  {activity.isPaid && activity.isBooked && activity.cancellationPolicy && (
                    <p className="text-xs text-muted-foreground mt-2">{activity.cancellationPolicy}</p>
                  )}
                  
                  {activity.notes && activity.notes.length > 0 && (
                    <div className="mt-2">
                      <button 
                        onClick={() => setShowNotes(showNotes === activity.id ? null : activity.id)}
                        className="text-xs text-primary flex items-center"
                      >
                        {showNotes === activity.id ? 'Hide notes' : `Show notes (${activity.notes.length})`}
                      </button>
                      
                      <AnimatePresence>
                        {showNotes === activity.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 space-y-2 overflow-hidden"
                          >
                            {activity.notes.map((note, noteIndex) => (
                              <div key={noteIndex} className="bg-muted/20 p-2 rounded-md text-xs relative pr-6">
                                {note}
                                <button 
                                  className="absolute right-1 top-1 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleRemoveNote(activity.id, noteIndex)}
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                            
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Add a note..."
                                className="text-xs p-1.5 rounded-md border border-input bg-background w-full"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddNote(activity.id)}
                              />
                              <button 
                                className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md"
                                onClick={() => handleAddNote(activity.id)}
                              >
                                Add
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <button
                    className="w-7 h-7 card-action-button bg-primary/10 text-primary"
                    onClick={() => handleToggleFavorite(activity.id)}
                    title={activity.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    {activity.isFavorite ? <Star size={14} fill="currentColor" /> : <Star size={14} />}
                  </button>
                  
                  <button
                    className="w-7 h-7 card-action-button bg-green-100 text-green-700"
                    onClick={() => handleToggleCompleted(activity.id)}
                    title={activity.isCompleted ? "Mark as not completed" : "Mark as completed"}
                  >
                    {activity.isCompleted ? <Check size={14} /> : <Check size={14} />}
                  </button>
                  
                  <button
                    className="w-7 h-7 card-action-button bg-blue-100 text-blue-700"
                    onClick={() => handleModifyActivity(activity.id)}
                    title="Edit activity"
                  >
                    <Edit size={14} />
                  </button>
                </div>
                
                <div className="flex gap-1">
                  <button
                    className="w-7 h-7 card-action-button bg-purple-100 text-purple-700"
                    onClick={() => {
                      // Show add note UI
                      setShowNotes(activity.id);
                      setTimeout(() => {
                        const input = document.querySelector(`input[placeholder="Add a note..."]`) as HTMLInputElement;
                        if (input) input.focus();
                      }, 100);
                    }}
                    title="Add note"
                  >
                    <Plus size={14} />
                  </button>
                  
                  <button
                    className="w-7 h-7 card-action-button bg-amber-100 text-amber-700"
                    onClick={() => {
                      toast.success("Link copied to clipboard!");
                    }}
                    title="Share activity"
                  >
                    <Share2 size={14} />
                  </button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="w-7 h-7 card-action-button bg-red-100 text-red-700"
                        title="Remove activity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Activity?</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        {activity.isPaid && activity.isBooked ? (
                          <p>This will cancel your booking. You can get a full refund if cancelled 24 hours in advance.</p>
                        ) : (
                          <p>Are you sure you want to remove this activity from your itinerary?</p>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => document.body.click()}>Cancel</Button>
                        <Button variant="destructive" onClick={() => handleDeleteActivity(activity.id)}>
                          Remove
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            {activity.lastUpdated && (
              <div className="mt-3 text-xs text-muted-foreground">
                Last updated: {new Date(activity.lastUpdated).toLocaleString()}
              </div>
            )}
          </Card>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center p-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No activities planned for this day yet.</p>
          </div>
        )}
        
        <Button
          className="w-full flex items-center justify-center"
          variant="outline"
          onClick={() => setShowRecommendations(true)}
        >
          <Plus size={16} className="mr-2" />
          Add Activity
        </Button>
      </div>
      
      {/* Recommendations Dialog */}
      <Dialog open={showRecommendations} onOpenChange={setShowRecommendations}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Recommended Activities in {destination}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-h-[60vh] overflow-y-auto py-2">
            {recommendedActivities.map(activity => (
              <Card
                key={activity.id}
                className={cn(
                  "overflow-hidden cursor-pointer transition-all hover:shadow-md",
                  selectedRecommendation?.id === activity.id ? "ring-2 ring-primary" : ""
                )}
                onClick={() => setSelectedRecommendation(activity)}
              >
                <div
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${activity.image})` }}
                />
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm">{activity.title}</h3>
                    <Badge variant={activity.price === 0 ? "free" : "outline"}>
                      {activity.price === 0 ? "Free" : `$${activity.price}`}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock size={12} className="mr-1" /> {activity.duration}
                    <span className="mx-1.5">•</span>
                    <MapPin size={12} className="mr-1" /> {activity.location}
                    <span className="mx-1.5">•</span>
                    <span className="flex items-center">
                      <svg className="w-3 h-3 text-yellow-400 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {activity.rating}
                    </span>
                  </div>
                  <p className="text-xs mt-2 line-clamp-2">{activity.description}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecommendations(false)}>Cancel</Button>
            <Button 
              disabled={!selectedRecommendation}
              onClick={() => selectedRecommendation && handleAddActivity(selectedRecommendation)}
            >
              Add to Itinerary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Activity Dialog */}
      <Dialog open={!!editingActivity} onOpenChange={(open) => !open && setEditingActivity(null)}>
        {editingActivity && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Activity</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium block mb-1">Title</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editingActivity.title}
                  onChange={(e) => setEditingActivity({...editingActivity, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Time</label>
                <input 
                  type="time"
                  className="w-full p-2 border rounded-md"
                  value={editingActivity.time}
                  onChange={(e) => setEditingActivity({...editingActivity, time: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Location</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editingActivity.location}
                  onChange={(e) => setEditingActivity({...editingActivity, location: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Description</label>
                <textarea 
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  value={editingActivity.description}
                  onChange={(e) => setEditingActivity({...editingActivity, description: e.target.value})}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    id="isFavoriteCheck"
                    checked={editingActivity.isFavorite || false}
                    onChange={(e) => setEditingActivity({...editingActivity, isFavorite: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isFavoriteCheck" className="text-sm">Mark as favorite</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    id="isCompletedCheck"
                    checked={editingActivity.isCompleted || false}
                    onChange={(e) => setEditingActivity({...editingActivity, isCompleted: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="isCompletedCheck" className="text-sm">Mark as completed</label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingActivity(null)}>Cancel</Button>
              <Button onClick={() => handleSaveActivity(editingActivity)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ActivityManager;
