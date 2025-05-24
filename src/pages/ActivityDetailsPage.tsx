
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Globe, 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  Heart,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// This would come from an API in a real application
const getActivityBySlug = (slug: string) => {
  // Mock detailed data
  const activities = {
    'mount-batur-sunrise-trek': {
      id: 1,
      title: 'Mount Batur Sunrise Trek',
      description: 'Experience a breathtaking sunrise from the summit of Mount Batur, an active volcano in Bali.',
      fullDescription: `
        <p>Rising early for this pre-dawn hike is well worth it when you're standing at the summit of Mount Batur (1,717m) as the sun breaks over the horizon, illuminating the stunning caldera below and the surrounding mountains.</p>
        
        <p>Your adventure begins with a very early morning pickup from your hotel (typically around 2:00-2:30 AM) before driving to the starting point of the trek. You'll meet your experienced local guide who will lead you safely up the volcanic slopes using flashlights to light the way in the darkness.</p>
        
        <p>The hike takes approximately 2 hours, progressing at a steady pace with stops as needed. The terrain varies from relatively easy paths to more challenging rocky sections near the top. No technical climbing skills are required, but a reasonable level of fitness is recommended.</p>
        
        <p>Upon reaching the summit, your guide will prepare a light breakfast while you find the perfect spot to watch nature's light show unfold. After enjoying the sunrise and taking photos, you'll have time to explore the crater rim and observe the steam rising from the active volcano.</p>
        
        <p>On your descent, you'll get a completely different perspective of the landscape in full daylight. The trek down takes approximately 1.5 hours, and many tours include a stop at coffee plantations on the return journey where you can learn about and sample various coffees including the famous Luwak coffee.</p>
      `,
      image: 'https://images.unsplash.com/photo-1720020552749-a103c0157ff3',
      gallery: [
        'https://images.unsplash.com/photo-1595209045752-b533866909a7',
        'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47',
        'https://images.unsplash.com/photo-1566146089052-608b797ba2f2'
      ],
      location: 'Mount Batur, Kintamani, Bali, Indonesia',
      category: 'Adventure',
      rating: 4.8,
      reviews: 426,
      reviewsDetails: [
        { user: 'Sarah T.', rating: 5, text: "Absolutely worth the early wake-up! Our guide was knowledgeable and patient. The sunrise view was spectacular." },
        { user: 'James L.', rating: 5, text: "One of the highlights of our Bali trip. Moderately challenging but very doable. Bring a light jacket as it gets cool at the top." },
        { user: 'Mia K.', rating: 4, text: "Amazing experience. The only reason for 4 stars instead of 5 is that it was quite crowded at the summit." }
      ],
      price: 'From $45',
      duration: '7 hours',
      difficulty: 'Moderate',
      bestTime: 'Year-round (April to October for driest conditions)',
      included: [
        'Hotel pickup and drop-off',
        'Professional English-speaking guide',
        'Flashlight/headlamp',
        'Breakfast',
        'Bottled water'
      ],
      notIncluded: [
        'Gratuities',
        'Personal expenses',
        'Travel insurance'
      ],
      tags: ['Trekking', 'Volcano', 'Sunrise', 'Nature', 'Hiking', 'Photography'],
      similarActivities: [
        {
          id: 3,
          slug: 'barcelona-gaudi-tour',
          title: 'Gaudí Masterpieces Tour',
          image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
          location: 'Barcelona, Spain',
          price: 'From $65'
        },
        {
          id: 4,
          slug: 'santorini-sunset-cruise',
          title: 'Santorini Caldera Sunset Cruise',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
          location: 'Santorini, Greece',
          price: 'From $85'
        }
      ]
    },
    'kyoto-bamboo-forest-walk': {
      id: 2,
      title: 'Arashiyama Bamboo Grove Walk',
      description: "Stroll through the enchanting bamboo groves of Arashiyama, one of Kyoto's most photographed spots.",
      fullDescription: `
        <p>The Arashiyama Bamboo Grove is one of Kyoto's most iconic and mesmerizing attractions. Walking through this dense forest of towering bamboo stalks creates an almost otherworldly experience as the sunlight filters through the canopy and the bamboo gently sways and creaks in the breeze.</p>
        
        <p>Located in the scenic Arashiyama district in the western outskirts of Kyoto, the bamboo grove path stretches for about 500 meters between Tenryuji Temple and Okochi Sanso Villa. The main pathway is paved and easily accessible for visitors of all mobility levels.</p>
        
        <p>The bamboo forest has cultural and historical significance in Japan, with bamboo symbolizing strength, prosperity, and flexibility in Japanese culture. These particular groves have been carefully tended for centuries and continue to be meticulously maintained today.</p>
        
        <p>For the best experience, visit early in the morning (before 8:00 AM) or in the late afternoon to avoid the crowds that gather during peak hours. The bamboo grove is particularly magical during slightly windy days when you can hear the distinctive sound of bamboo stalks knocking against each other—a natural sound known as "takane" in Japanese.</p>
        
        <p>While the bamboo grove walk itself can be completed in about 30 minutes, the surrounding Arashiyama area offers many additional attractions worth exploring, including Tenryuji Temple (a UNESCO World Heritage site), the scenic Katsura River, and monkey-inhabited Iwatayama Monkey Park.</p>
      `,
      image: 'https://plus.unsplash.com/premium_photo-1720020552749-a103c0157ff3',
      gallery: [
        'https://images.unsplash.com/photo-1503301360699-4e60be128b1a',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
        'https://plus.unsplash.com/premium_photo-1720020552749-a103c0157ff3'
      ],
      location: 'Arashiyama, Kyoto, Japan',
      category: 'Nature',
      rating: 4.7,
      reviews: 352,
      reviewsDetails: [
        { user: 'Emily W.', rating: 5, text: "Absolutely magical experience, especially early in the morning before the crowds arrive." },
        { user: 'David P.', rating: 4, text: "Beautiful and peaceful. Try to go on a weekday as weekends can be very crowded." },
        { user: 'Lisa N.', rating: 5, text: "The sound of the bamboo swaying in the wind is almost as beautiful as the visual experience." }
      ],
      price: 'Free',
      duration: '1-2 hours',
      difficulty: 'Easy',
      bestTime: 'Year-round (particularly beautiful in autumn and spring)',
      included: [
        'Public access to the bamboo grove'
      ],
      notIncluded: [
        'Guided tours (available separately)',
        'Transportation to Arashiyama',
        'Entry fees to nearby attractions'
      ],
      tags: ['Nature', 'Photography', 'Walking', 'Cultural', 'Scenic', 'Free Activity'],
      similarActivities: [
        {
          id: 3,
          slug: 'barcelona-gaudi-tour',
          title: 'Gaudí Masterpieces Tour',
          image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
          location: 'Barcelona, Spain',
          price: 'From $65'
        },
        {
          id: 6,
          slug: 'marrakech-food-tour',
          title: 'Marrakech Food & Market Tour',
          image: 'https://images.unsplash.com/photo-1553522911-21b30aa02631',
          location: 'Marrakech, Morocco',
          price: 'From $55'
        }
      ]
    },
    'barcelona-gaudi-tour': {
      id: 3,
      title: 'Gaudí Masterpieces Tour',
      description: 'Discover the extraordinary works of Antoni Gaudí including Sagrada Familia and Park Güell.',
      fullDescription: `
        <p>Immerse yourself in the fantastical architectural world of Antoni Gaudí, the visionary architect whose distinctive style transformed Barcelona into a modernist wonderland. This comprehensive tour takes you to his most celebrated masterpieces with expert guidance to appreciate the genius behind these UNESCO World Heritage sites.</p>
        
        <p>The highlight of the tour is undoubtedly La Sagrada Familia, Gaudí's unfinished magnum opus that has been under construction since 1882. Your guide will help you understand the complex symbolism and innovative design techniques that make this basilica unlike any other religious building in the world. Explore both the exterior with its intricate facades and the interior with its forest-like columns and spectacular stained glass.</p>
        
        <p>Next, you'll visit Park Güell, a whimsical public park that showcases Gaudí's integration of natural forms and architectural elements. Marvel at the colorful mosaic works, undulating benches, and structures that seem to grow organically from the hillside while enjoying panoramic views of Barcelona.</p>
        
        <p>The tour also includes exterior visits to Casa Batlló and Casa Milà (La Pedrera), two of Gaudí's most famous residential buildings located along the prestigious Passeig de Gràcia. Your guide will explain how these revolutionary designs caused controversy in their time but are now considered masterpieces of modernist architecture.</p>
        
        <p>Throughout the tour, you'll gain insights into Gaudí's life, his innovative techniques, and his profound influence on architecture worldwide. This experience offers not just sightseeing but a deeper understanding of how one man's vision reshaped an entire city's identity.</p>
      `,
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
      gallery: [
        'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4',
        'https://images.unsplash.com/photo-1590936228868-d1a475401e23',
        'https://images.unsplash.com/photo-1574555148918-9e54d1e4bae6'
      ],
      location: 'Barcelona, Spain',
      category: 'Cultural',
      rating: 4.9,
      reviews: 589,
      reviewsDetails: [
        { user: 'Robert J.', rating: 5, text: "Our guide Maria was incredibly knowledgeable about Gaudí and his work. The skip-the-line access to Sagrada Familia was worth every penny!" },
        { user: 'Sofia T.', rating: 5, text: "An absolute must-do in Barcelona. I learned so much and gained a whole new appreciation for Gaudí's genius." },
        { user: 'Michael P.', rating: 4, text: "Excellent tour, though a bit rushed at Park Güell. Would have liked more time to explore there." }
      ],
      price: 'From $65',
      duration: '4 hours',
      difficulty: 'Easy',
      bestTime: 'Year-round (spring and fall for most pleasant temperatures)',
      included: [
        'Professional guide',
        'Skip-the-line entrance to Sagrada Familia',
        'Entrance to Park Güell',
        'Small group experience (max 15 people)',
        'Headsets to hear your guide clearly'
      ],
      notIncluded: [
        'Hotel pickup and drop-off',
        'Gratuities',
        'Food and drinks',
        'Interior access to Casa Batlló and Casa Milà'
      ],
      tags: ['Architecture', 'Art', 'UNESCO', 'Walking', 'Cultural', 'Guided Tour'],
      similarActivities: [
        {
          id: 2,
          slug: 'kyoto-bamboo-forest-walk',
          title: 'Arashiyama Bamboo Grove Walk',
          image: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
          location: 'Kyoto, Japan',
          price: 'Free'
        },
        {
          id: 5,
          slug: 'new-york-broadway-show',
          title: 'Broadway Musical Experience',
          image: 'https://images.unsplash.com/photo-1569116368018-09e631f0b472',
          location: 'New York City, USA',
          price: 'From $99'
        }
      ]
    }
  };
  
  // Return the requested activity or a default activity if not found
  return activities[slug as keyof typeof activities] || {
    id: 1,
    title: 'Mount Batur Sunrise Trek',
    description: 'Experience a breathtaking sunrise from the summit of Mount Batur, an active volcano in Bali.',
    fullDescription: 'This would be a detailed description of the activity...',
    image: 'https://plus.unsplash.com/premium_photo-1720020552749-a103c0157ff3',
    gallery: [],
    location: 'Mount Batur, Kintamani, Bali, Indonesia',
    category: 'Adventure',
    rating: 4.8,
    reviews: 426,
    reviewsDetails: [],
    price: 'From $45',
    duration: '7 hours',
    difficulty: 'Moderate',
    bestTime: 'Year-round',
    included: [],
    notIncluded: [],
    tags: ['Trekking', 'Volcano', 'Sunrise', 'Nature'],
    similarActivities: []
  };
};

const ActivityDetailsPage = () => {
   // Scroll to top on component mount
   useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount
  const { slug } = useParams<{ slug: string }>();
  const activity = getActivityBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState(activity.image);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState(2);

  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }
    
    toast.success("Booking successful!", {
      description: `${activity.title} booked for ${selectedDate} with ${participants} people`
    });
  };

  const handleShare = () => {
    toast.success("Link copied to clipboard!");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${activity.title} | WanderTrip.in Things To Do`}
        description={activity.description}
        keywords={activity.tags.join(', ')}
        image={activity.image}
      />
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left column - Images and details */}
              <div className="w-full md:w-2/3">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={selectedImage} 
                    alt={activity.title} 
                    className="w-full h-96 object-cover"
                  />
                </div>
                
                {activity.gallery && activity.gallery.length > 0 && (
                  <div className="flex overflow-x-auto gap-2 mt-2 pb-2">
                    <div 
                      onClick={() => setSelectedImage(activity.image)} 
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer ${selectedImage === activity.image ? 'ring-2 ring-primary' : ''}`}
                    >
                      <img 
                        src={activity.image} 
                        alt={activity.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {activity.gallery.map((img, index) => (
                      <div 
                        key={index} 
                        onClick={() => setSelectedImage(img)} 
                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer ${selectedImage === img ? 'ring-2 ring-primary' : ''}`}
                      >
                        <img 
                          src={img} 
                          alt={`${activity.title} ${index+1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-medium">{activity.title}</h1>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleToggleFavorite}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-primary/10"
                      >
                        <Heart className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} size={20} />
                      </button>
                      <button 
                        onClick={handleShare}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-primary/10"
                      >
                        <Share2 className="text-muted-foreground" size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm mb-4">
                    <div className="flex items-center mr-4">
                      <MapPin size={16} className="mr-1 text-muted-foreground" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="mr-1 text-yellow-500 fill-yellow-500" />
                      <span>{activity.rating}</span>
                      <span className="text-muted-foreground ml-1">({activity.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-lg flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Duration</div>
                        <div className="text-sm text-muted-foreground">{activity.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Tag size={16} className="mr-2 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Category</div>
                        <div className="text-sm text-muted-foreground">{activity.category}</div>
                      </div>
                    </div>
                    {activity.difficulty && (
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Difficulty</div>
                          <div className="text-sm text-muted-foreground">{activity.difficulty}</div>
                        </div>
                      </div>
                    )}
                    {activity.bestTime && (
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Best Time</div>
                          <div className="text-sm text-muted-foreground">{activity.bestTime}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-medium mb-3">Overview</h2>
                  <p className="text-muted-foreground mb-6">{activity.description}</p>
                  
                  <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: activity.fullDescription }} />
                  
                  {(activity.included && activity.included.length > 0) || (activity.notIncluded && activity.notIncluded.length > 0) ? (
                    <div className="mb-8">
                      <h2 className="text-xl font-medium mb-4">What's Included</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activity.included && activity.included.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium mb-3">Included</h3>
                            <ul className="space-y-2">
                              {activity.included.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle2 size={16} className="mt-1 mr-2 text-green-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {activity.notIncluded && activity.notIncluded.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium mb-3">Not Included</h3>
                            <ul className="space-y-2">
                              {activity.notIncluded.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertCircle size={16} className="mt-1 mr-2 text-muted-foreground" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                  
                  {activity.reviewsDetails && activity.reviewsDetails.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-medium mb-4">Reviews</h2>
                      <div className="space-y-4">
                        {activity.reviewsDetails.map((review, index) => (
                          <div key={index} className="glass p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{review.user}</div>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activity.tags && activity.tags.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-xl font-medium mb-3">Tags</h2>
                      <div className="flex flex-wrap gap-2">
                        {activity.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-muted/50 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right column - Booking and similar activities */}
              <div className="w-full md:w-1/3">
                <div className="glass p-6 rounded-xl border border-border/40 sticky top-28">
                  <div className="mb-4">
                    <div className="text-2xl font-bold">{activity.price}</div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Select Date</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Number of Participants</label>
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 flex items-center justify-center bg-muted rounded-l-lg"
                          onClick={() => setParticipants(Math.max(1, participants - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="w-full h-8 px-3 text-center bg-background border-t border-b border-border"
                          value={participants}
                          onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value) || 1))}
                          min="1"
                        />
                        <button 
                          className="w-8 h-8 flex items-center justify-center bg-muted rounded-r-lg"
                          onClick={() => setParticipants(participants + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                  
                  <div className="text-sm text-muted-foreground text-center mb-4">
                    No payment required to book
                  </div>
                  
                  <div className="border-t border-border/40 pt-4">
                    <div className="flex items-center mb-2">
                      <Globe size={16} className="mr-2 text-primary" />
                      <span className="text-sm font-medium">Free cancellation</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Cancel up to 24 hours before the start time for a full refund
                    </div>
                  </div>
                </div>
                
                {activity.similarActivities && activity.similarActivities.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Similar Activities</h3>
                    <div className="space-y-4">
                      {activity.similarActivities.map((similar) => (
                        <Link 
                          key={similar.id} 
                          to={`/things-to-do/${similar.slug}`}
                          className="glass flex items-start p-4 rounded-lg border border-border/40 hover:border-primary/40 transition-colors"
                        >
                          <img 
                            src={similar.image} 
                            alt={similar.title} 
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <div className="font-medium mb-1">{similar.title}</div>
                            <div className="text-sm text-muted-foreground mb-1">{similar.location}</div>
                            <div className="text-sm font-medium text-primary">{similar.price}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ActivityDetailsPage;
