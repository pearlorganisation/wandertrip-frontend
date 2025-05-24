
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, ThumbsUp, ChevronRight, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface PersonalizedTripQuestionsProps {
  destination: string;
  travelStyle?: string;
  onAnswer?: (question: string, answer: string) => void;
  className?: string;
}

type QuestionType = {
  id: string;
  text: string;
  emoji: string;
  options: {
    text: string;
    value: string;
    icon?: React.ReactNode;
  }[];
};

export default function PersonalizedTripQuestions({
  destination,
  travelStyle = 'Adventure',
  onAnswer,
  className
}: PersonalizedTripQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(true);

  // Generate questions based on destination and travel style
  useEffect(() => {
    if (!destination) return;
    
    const destinationLower = destination.toLowerCase();
    const generatedQuestions: QuestionType[] = [];
    
    // Beach destinations
    if (
      destinationLower.includes('bali') || 
      destinationLower.includes('beach') || 
      destinationLower.includes('hawaii') || 
      destinationLower.includes('maldives') ||
      destinationLower.includes('caribbean')
    ) {
      generatedQuestions.push(
        {
          id: 'beach-sunset',
          text: "Would you love to watch the sunset from a quiet beach café?",
          emoji: '🌅',
          options: [
            { text: "Yes, please!", value: "yes", icon: <ThumbsUp size={16} /> },
            { text: "Maybe later", value: "maybe" },
            { text: "Not for me", value: "no" }
          ]
        },
        {
          id: 'water-activity',
          text: "Are you excited to try snorkeling or diving during your trip?",
          emoji: '🐠',
          options: [
            { text: "Can't wait!", value: "yes", icon: <Smile size={16} /> },
            { text: "Sounds scary", value: "no" },
            { text: "Already a pro", value: "pro" }
          ]
        }
      );
    }
    
    // Mountain destinations
    else if (
      destinationLower.includes('mountain') || 
      destinationLower.includes('alps') || 
      destinationLower.includes('himalaya') ||
      destinationLower.includes('rockies')
    ) {
      generatedQuestions.push(
        {
          id: 'sunrise-trek',
          text: "Up for a sunrise trek with breathtaking views?",
          emoji: '⛰️',
          options: [
            { text: "Absolutely!", value: "yes" },
            { text: "Too early...", value: "no" },
            { text: "Weather permitting", value: "maybe" }
          ]
        },
        {
          id: 'cabin-stay',
          text: "How about staying in a cozy cabin with a fireplace?",
          emoji: '🏡',
          options: [
            { text: "Love it!", value: "yes" },
            { text: "Prefer luxury", value: "no" },
            { text: "If it's authentic", value: "authentic" }
          ]
        }
      );
    }
    
    // City destinations
    else if (
      destinationLower.includes('paris') || 
      destinationLower.includes('tokyo') || 
      destinationLower.includes('york') ||
      destinationLower.includes('london') ||
      destinationLower.includes('city')
    ) {
      generatedQuestions.push(
        {
          id: 'street-food',
          text: "Want to explore the hidden street food gems locals swear by?",
          emoji: '🍜',
          options: [
            { text: "Foodie alert!", value: "yes" },
            { text: "Prefer restaurants", value: "no" },
            { text: "Both please", value: "both" }
          ]
        },
        {
          id: 'night-tour',
          text: `Would you like to see ${destination.split(',')[0]} lit up at night?`,
          emoji: '✨',
          options: [
            { text: "Yes please!", value: "yes" },
            { text: "Early sleeper", value: "no" },
            { text: "If it's safe", value: "safe" }
          ]
        }
      );
    }
    
    // Add travel style questions
    if (travelStyle === 'Luxury') {
      generatedQuestions.push({
        id: 'spa-day',
        text: "Shall we reserve a day for complete relaxation at a premium spa?",
        emoji: '💆‍♀️',
        options: [
          { text: "Pure bliss", value: "yes" },
          { text: "Not this time", value: "no" },
          { text: "If time permits", value: "maybe" }
        ]
      });
    } else if (travelStyle === 'Adventure') {
      generatedQuestions.push({
        id: 'surprise-activity',
        text: "How about a surprise adventure activity during your trip?",
        emoji: '🚀',
        options: [
          { text: "Thrill me!", value: "yes" },
          { text: "No surprises", value: "no" },
          { text: "Mild adventures only", value: "mild" }
        ]
      });
    } else if (travelStyle === 'Cultural') {
      generatedQuestions.push({
        id: 'local-festival',
        text: "Want to attend a traditional local festival while you're there?",
        emoji: '🎭',
        options: [
          { text: "Cultural immersion!", value: "yes" },
          { text: "Too crowded", value: "no" },
          { text: "If authentic", value: "authentic" }
        ]
      });
    }
    
    // Add one universal fun question
    generatedQuestions.push({
      id: 'photo-spots',
      text: "Shall we include some Instagram-worthy photo spots in your itinerary?",
      emoji: '📸',
      options: [
        { text: "For memories!", value: "yes" },
        { text: "Not into photos", value: "no" },
        { text: "Just a few", value: "few" }
      ]
    });
    
    // Shuffle and limit questions
    setQuestions(
      generatedQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
    );
    
  }, [destination, travelStyle]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (onAnswer) {
      onAnswer(questionId, answer);
    }
    
    // Show a delightful toast for certain positive answers
    if (answer === 'yes') {
      toast("Great choice! We'll include that in your plan.", {
        icon: <Sparkles size={18} className="text-amber-400" />,
      });
    }
    
    // Move to next question or hide component if done
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  };

  const skipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsVisible(false);
    }
  };

  const skipAll = () => {
    setIsVisible(false);
  };

  // Don't render if there are no questions or destination is empty
  if (!questions.length || !destination || !isVisible) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100/50 rounded-xl p-5 backdrop-blur-lg shadow-lg mb-6",
            className
          )}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <span className="text-xl mr-2" aria-hidden="true">
                {currentQuestion?.emoji}
              </span>
              <h3 className="text-sm font-medium text-blue-800">Personalized Suggestions</h3>
            </div>
            <button 
              onClick={skipAll}
              className="text-blue-400 hover:text-blue-600 p-1 rounded-full"
              aria-label="Dismiss suggestions"
            >
              <X size={16} />
            </button>
          </div>
          
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <p className="text-base font-medium mb-4">{currentQuestion?.text}</p>
            
            <div className="flex flex-wrap gap-2">
              {currentQuestion?.options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/70 hover:bg-white rounded-full border border-blue-100 shadow-sm transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {option.icon && <span>{option.icon}</span>}
                  <span className="text-sm">{option.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <div className="flex items-center justify-between pt-2 border-t border-blue-100/50">
            <div className="flex gap-1">
              {questions.map((q, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${
                    i === currentQuestionIndex ? 'bg-blue-400' : 'bg-blue-100'
                  }`} 
                />
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              onClick={skipQuestion}
            >
              <span>Skip</span>
              <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
