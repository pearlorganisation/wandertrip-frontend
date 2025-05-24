
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, CreditCard, Globe, Lock, UserCircle, Mail, AlertCircle, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SettingsSection = 'notifications' | 'payments' | 'preferences' | 'security';

const Settings = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<SettingsSection>('notifications');
  
  // Example notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailMarketing: true,
    tripReminders: true,
    priceAlerts: true,
    appNotifications: false,
    specialOffers: true
  });
  
  // Example currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  ];
  
  // Example languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese (Simplified)' },
  ];
  
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const handleToggleChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleSave = (section: SettingsSection) => {
    toast({
      title: "Settings Updated",
      description: `Your ${section} settings have been saved successfully.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container px-4 sm:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-primary"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-medium">Account Settings</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-3">
                <div className="glass rounded-xl overflow-hidden">
                  <div 
                    onClick={() => setActiveSection('notifications')}
                    className={`flex items-center px-4 py-3 cursor-pointer ${
                      activeSection === 'notifications' 
                        ? 'bg-primary/10 border-l-4 border-primary' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Bell size={18} className={activeSection === 'notifications' ? 'text-primary mr-3' : 'text-muted-foreground mr-3'} />
                    <span className={activeSection === 'notifications' ? 'font-medium' : ''}>Notifications</span>
                  </div>
                  
                  <div 
                    onClick={() => setActiveSection('payments')}
                    className={`flex items-center px-4 py-3 cursor-pointer ${
                      activeSection === 'payments' 
                        ? 'bg-primary/10 border-l-4 border-primary' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <CreditCard size={18} className={activeSection === 'payments' ? 'text-primary mr-3' : 'text-muted-foreground mr-3'} />
                    <span className={activeSection === 'payments' ? 'font-medium' : ''}>Payment Methods</span>
                  </div>
                  
                  <div 
                    onClick={() => setActiveSection('preferences')}
                    className={`flex items-center px-4 py-3 cursor-pointer ${
                      activeSection === 'preferences' 
                        ? 'bg-primary/10 border-l-4 border-primary' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Globe size={18} className={activeSection === 'preferences' ? 'text-primary mr-3' : 'text-muted-foreground mr-3'} />
                    <span className={activeSection === 'preferences' ? 'font-medium' : ''}>Preferences</span>
                  </div>
                  
                  <div 
                    onClick={() => setActiveSection('security')}
                    className={`flex items-center px-4 py-3 cursor-pointer ${
                      activeSection === 'security' 
                        ? 'bg-primary/10 border-l-4 border-primary' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Lock size={18} className={activeSection === 'security' ? 'text-primary mr-3' : 'text-muted-foreground mr-3'} />
                    <span className={activeSection === 'security' ? 'font-medium' : ''}>Privacy & Security</span>
                  </div>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="lg:col-span-9">
                <div className="glass rounded-xl p-6">
                  {/* Notifications Section */}
                  {activeSection === 'notifications' && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">Notification Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-center justify-between py-3 border-b border-border">
                          <div>
                            <h3 className="font-medium">Email Marketing</h3>
                            <p className="text-sm text-muted-foreground">Receive promotional offers and deals</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.emailMarketing}
                              onChange={() => handleToggleChange('emailMarketing')}
                            />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-b border-border">
                          <div>
                            <h3 className="font-medium">Trip Reminders</h3>
                            <p className="text-sm text-muted-foreground">Get alerts about upcoming trips</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.tripReminders}
                              onChange={() => handleToggleChange('tripReminders')}
                            />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-b border-border">
                          <div>
                            <h3 className="font-medium">Price Alerts</h3>
                            <p className="text-sm text-muted-foreground">Notifications for price drops</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.priceAlerts}
                              onChange={() => handleToggleChange('priceAlerts')}
                            />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-b border-border">
                          <div>
                            <h3 className="font-medium">App Notifications</h3>
                            <p className="text-sm text-muted-foreground">Push notifications on your device</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.appNotifications}
                              onChange={() => handleToggleChange('appNotifications')}
                            />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <h3 className="font-medium">Special Offers</h3>
                            <p className="text-sm text-muted-foreground">Limited-time deals and promotions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer" 
                              checked={notificationSettings.specialOffers}
                              onChange={() => handleToggleChange('specialOffers')}
                            />
                            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button
                          onClick={() => handleSave('notifications')}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Methods Section */}
                  {activeSection === 'payments' && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">Payment Methods</h2>
                      
                      <div className="space-y-4 mb-8">
                        <div className="glass p-4 rounded-lg border border-border relative">
                          <div className="absolute top-3 right-3">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                              Default
                            </span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-10 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                              VISA
                            </div>
                            <div>
                              <h3 className="font-medium">•••• •••• •••• 4321</h3>
                              <p className="text-xs text-muted-foreground mt-1">Expires 05/24</p>
                              <div className="flex items-center mt-3 space-x-3">
                                <button className="text-xs text-primary">Edit</button>
                                <button className="text-xs text-muted-foreground">Remove</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="glass p-4 rounded-lg border border-border">
                          <div className="flex items-start">
                            <div className="w-10 h-6 rounded bg-orange-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                              MC
                            </div>
                            <div>
                              <h3 className="font-medium">•••• •••• •••• 8765</h3>
                              <p className="text-xs text-muted-foreground mt-1">Expires 12/25</p>
                              <div className="flex items-center mt-3 space-x-3">
                                <button className="text-xs text-primary">Edit</button>
                                <button className="text-xs text-muted-foreground">Remove</button>
                                <button className="text-xs text-primary">Set as Default</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="px-4 py-2 border border-primary/25 text-primary rounded-lg text-sm font-medium hover:bg-primary/5 hover:border-primary/40 flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="mr-2"
                        >
                          <line x1="12" x2="12" y1="5" y2="19" />
                          <line x1="5" x2="19" y1="12" y2="12" />
                        </svg>
                        Add Payment Method
                      </button>
                      
                      <div className="mt-8 pt-8 border-t border-border">
                        <h3 className="font-medium mb-4">EMI Options</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Split your travel expenses into easy monthly installments with our EMI partners.
                        </p>
                        
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                            <span className="text-xs font-medium">Affirm</span>
                          </div>
                          <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                            <span className="text-xs font-medium">Klarna</span>
                          </div>
                          <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                            <span className="text-xs font-medium">PayPal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Preferences Section */}
                  {activeSection === 'preferences' && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">App Preferences</h2>
                      
                      <div className="space-y-8">
                        <div>
                          <h3 className="font-medium mb-3">Currency</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Choose the currency for displaying prices across the app.
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-3xl">
                            {currencies.map(currency => (
                              <div 
                                key={currency.code}
                                onClick={() => setSelectedCurrency(currency.code)}
                                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                                  selectedCurrency === currency.code 
                                    ? 'bg-primary/10 border border-primary/30' 
                                    : 'hover:bg-muted'
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="text-lg mr-2">{currency.symbol}</span>
                                  <span className="text-sm">{currency.name}</span>
                                </div>
                                {selectedCurrency === currency.code && (
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="text-primary"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Language</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Select your preferred language for the application interface.
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-3xl">
                            {languages.map(language => (
                              <div 
                                key={language.code}
                                onClick={() => setSelectedLanguage(language.code)}
                                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                                  selectedLanguage === language.code 
                                    ? 'bg-primary/10 border border-primary/30' 
                                    : 'hover:bg-muted'
                                }`}
                              >
                                <span className="text-sm">{language.name}</span>
                                {selectedLanguage === language.code && (
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="text-primary"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Date Format</h3>
                          <div className="space-y-2 max-w-xs">
                            <label className="flex items-center">
                              <input type="radio" name="dateFormat" className="mr-2" defaultChecked />
                              <span className="text-sm">MM/DD/YYYY (US)</span>
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="dateFormat" className="mr-2" />
                              <span className="text-sm">DD/MM/YYYY (UK, EU)</span>
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name="dateFormat" className="mr-2" />
                              <span className="text-sm">YYYY-MM-DD (ISO)</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button
                          onClick={() => handleSave('preferences')}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Security Section */}
                  {activeSection === 'security' && (
                    <div>
                      <h2 className="text-xl font-medium mb-6">Privacy & Security</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Account Security</h3>
                          
                          <div className="glass p-4 rounded-lg mb-4">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <UserCircle size={20} className="text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">Change Password</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Update your password regularly for better security
                                </p>
                                <button className="text-xs text-primary font-medium mt-2">
                                  Update Password
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="glass p-4 rounded-lg mb-4">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <Mail size={20} className="text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">Two-Factor Authentication</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Add an extra layer of security to your account
                                </p>
                                <button className="text-xs text-primary font-medium mt-2">
                                  Enable 2FA
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="glass p-4 rounded-lg">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mr-3">
                                <AlertCircle size={20} className="text-orange-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">Device Management</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Check and manage devices that have access to your account
                                </p>
                                <div className="mt-3 text-xs">
                                  <div className="flex items-center justify-between py-2 border-b border-border">
                                    <div>
                                      <p className="font-medium">MacBook Pro - Chrome</p>
                                      <p className="text-muted-foreground">Current device</p>
                                    </div>
                                    <span className="text-emerald-500">Active now</span>
                                  </div>
                                  <div className="flex items-center justify-between py-2">
                                    <div>
                                      <p className="font-medium">iPhone 13 - Safari</p>
                                      <p className="text-muted-foreground">San Francisco, CA</p>
                                    </div>
                                    <button className="text-primary">Remove</button>
                                  </div>
                                </div>
                                <button className="text-xs text-primary font-medium mt-3 flex items-center">
                                  View All Devices
                                  <ChevronRight size={14} className="ml-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-6 border-t border-border">
                          <h3 className="font-medium mb-3">Privacy Settings</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Profile Visibility</h4>
                                <p className="text-xs text-muted-foreground">Control who can see your profile</p>
                              </div>
                              <select className="text-sm py-1 px-2 border border-border rounded bg-background">
                                <option>Public</option>
                                <option>Friends Only</option>
                                <option>Private</option>
                              </select>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Data Sharing</h4>
                                <p className="text-xs text-muted-foreground">Share usage data to improve services</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Cookies Preferences</h4>
                                <p className="text-xs text-muted-foreground">Manage cookie settings</p>
                              </div>
                              <button className="text-xs text-primary font-medium">
                                Manage
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-6 border-t border-border">
                          <h3 className="font-medium mb-3 text-red-500">Danger Zone</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Download Your Data</h4>
                                <p className="text-xs text-muted-foreground">Get a copy of all your data</p>
                              </div>
                              <button className="text-xs px-3 py-1.5 border border-border rounded hover:bg-muted">
                                Download
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-red-500">Delete Account</h4>
                                <p className="text-xs text-muted-foreground">
                                  This action cannot be undone
                                </p>
                              </div>
                              <button className="text-xs px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-200 rounded hover:bg-red-500/20">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button
                          onClick={() => handleSave('security')}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
