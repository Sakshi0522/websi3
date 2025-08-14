import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, XCircle, Loader2, Upload, X, ChevronDown, ChevronUp } from 'lucide-react';
import thumbnailMap from '../assets/thumbnail_map.jpg';

const Contact = () => {
  // State to hold form data including the file and token
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    document: null as File | null
  });

  // State for the session token and form submission status
  const [sessionToken, setSessionToken] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'token_loading'>('idle');
  
  // State for the business hours dropdown
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  // Business hours data
  const businessHours: { [key: string]: string } = {
    'Mon': '9:00 AM - 8:00 PM',
    'Tue': '9:00 AM - 8:00 PM',
    'Wed': '9:00 AM - 8:00 PM',
    'Thu': '9:00 AM - 8:00 PM',
    'Fri': '9:00 AM - 8:00 PM',
    'Sat': '9:00 AM - 8:00 PM',
    'Sun': '9:00 AM - 8:00 PM'
  };

  // Get today's business hours
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  const todayHours = businessHours[today] || 'Closed';
  
  // Fetch the session token from the backend when the component mounts
  useEffect(() => {
    const fetchToken = async () => {
      setStatus('token_loading');
      try {
        const response = await fetch('http://localhost:3001/api/token');
        const data = await response.json();
        setSessionToken(data.token);
        setStatus('idle');
      } catch (error) {
        console.error('Error fetching token:', error);
        setStatus('error');
      }
    };
    fetchToken();
  }, []);

  // Handles input changes for all form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (e.target.type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files) {
        setFormData({
          ...formData,
          document: fileInput.files[0]
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Ensure we have a token before submitting
    if (!sessionToken) {
      setStatus('token_loading');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('company', formData.company);
    data.append('phone', formData.phone);
    data.append('message', formData.message);
    data.append('token', sessionToken); // Append the session token
    if (formData.document) {
      data.append('document', formData.document);
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        body: data,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setStatus('success');
      
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        document: null
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  // Contact information array
  const contactInfo = [
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: 'Visit Our Office',
      details: ['EN-9, Salt Lake, Sec-5, Kolkata-700091'],
      action: 'Get Directions',
      href: 'https://www.google.com/maps/place/EN+BLOCK,+EN+-+9,+EN+Block,+Sector+V,+Bidhannagar,+Kolkata,+West+Bengal+700091/@22.5736107,88.4298151,17z/data=!3m1!4b1!4m6!3m5!1s0x3a0275afb2dd949b:0xcaff4cf09f3240cf!8m2!3d22.5736058!4d88.43239!16s%2Fg%2F11rkm75qlp?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: 'Call Us',
      links: [
        { href: 'tel:+917908735132', text: '+91 7908735132' },
        { href: 'tel:+919830640814', text: '+91 9830640814' }
      ]
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: 'Email Us',
      details: ['info@digitalindian.co.in'],
      action: 'Send Email',
      href: 'mailto:info@digitalindian.co.in'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Business Hours',
    }
  ];

  // Function to render the submit button or status message
  const renderSubmitState = () => {
    switch (status) {
      case 'token_loading':
        return (
          <button
            type="submit"
            disabled
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center"
          >
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading Form...
          </button>
        );
      case 'submitting':
        return (
          <button
            type="submit"
            disabled
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center"
          >
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </button>
        );
      case 'success':
        return (
          <div className="text-center py-4 text-green-600 font-semibold flex items-center justify-center">
            <CheckCircle className="mr-2 h-5 w-5" />
            Message Sent Successfully!
          </div>
        );
      case 'error':
        return (
          <div className="text-center py-4 text-red-600 font-semibold flex items-center justify-center">
            <XCircle className="mr-2 h-5 w-5" />
            Error sending message. Please try again.
          </div>
        );
      case 'idle':
      default:
        return (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group"
          >
            Send Message
            <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to transform your business with our technology solutions?
              Let's discuss your project requirements and explore how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Send Us a Message
                </h2>
                
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Thank You!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                          placeholder="+91 0123456789"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="document" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Attach Document
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label
                              htmlFor="document"
                              className="relative cursor-pointer bg-white dark:bg-gray-900 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="document"
                                name="document"
                                type="file"
                                onChange={handleChange}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          {formData.document && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              File selected: {formData.document.name}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        placeholder="Tell us about your project requirements..."
                      ></textarea>
                    </div>

                    {renderSubmitState()}
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {info.title}
                      </h3>
                      
                      {/* Special handling for Business Hours */}
                      {info.title === 'Business Hours' ? (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-600 dark:text-gray-300">
                              Today: <span className="font-medium text-blue-600">{todayHours}</span>
                            </p>
                            <button
                              onClick={() => setIsHoursOpen(!isHoursOpen)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {isHoursOpen ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          
                          {isHoursOpen && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="space-y-2">
                                {Object.entries(businessHours).map(([day, hours]) => (
                                  <div key={day} className="flex justify-between text-sm">
                                    <span className={`font-medium ${
                                      day === today 
                                        ? 'text-blue-600' 
                                        : 'text-gray-600 dark:text-gray-300'
                                    }`}>
                                      {day === 'Mon' ? 'Monday' :
                                       day === 'Tue' ? 'Tuesday' :
                                       day === 'Wed' ? 'Wednesday' :
                                       day === 'Thu' ? 'Thursday' :
                                       day === 'Fri' ? 'Friday' :
                                       day === 'Sat' ? 'Saturday' : 'Sunday'}
                                    </span>
                                    <span className={`${
                                      day === today 
                                        ? 'text-blue-600 font-medium' 
                                        : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                      {hours}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Regular contact info rendering */
                        <div className="space-y-1">
                          {info.details && info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 dark:text-gray-300">
                              {detail}
                            </p>
                          ))}
                          {info.links && info.links.map((link, linkIndex) => (
                            <a key={linkIndex} href={link.href} className="block text-gray-600 dark:text-gray-300 hover:text-blue-600">
                              {link.text}
                            </a>
                          ))}
                        </div>
                      )}
                      
                      {info.action && info.href && info.title !== 'Business Hours' ? (
                        <a 
                          href={info.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="mt-3 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                        >
                          {info.action}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Find Our Office
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Visit us at our headquarters for in-person consultations and meetings.
            </p>
          </div>
          
          {/* Map Link */}
          <a
            href="https://www.google.com/maps/place/EN+BLOCK,+EN+-+9,+EN+Block,+Sector+V,+Bidhannagar,+Kolkata,+West+Bengal+700091/@22.5735222,88.4332776,18.65z/data=!4m6!3m5!1s0x3a0275afb2dd949b:0xcaff4cf09f3240cf!8m2!3d22.5736058!4d88.43239!16s%2Fg%2G%2F11rkm75qlp?entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative h-96 rounded-lg overflow-hidden shadow-md">
              <img
                src={thumbnailMap}
                alt="Office Location Thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-40 transition-opacity opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-center p-4">
                <span className="text-white text-base max-w-sm">EN-9, Salt Lake, Sec-5, Kolkata-700091</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How long does a typical project take?',
                answer: 'Project duration varies based on scope and complexity. Most projects range from 2-12 months with clear milestones and deliverables.'
              },
              {
                question: 'Do you provide ongoing support?',
                answer: 'Yes, we offer comprehensive maintenance and support services to ensure optimal performance of all implemented solutions.'
              },
              {
                question: 'What industries do you specialize in?',
                answer: 'We primarily serve telecom operators, ISPs, government projects, and enterprises requiring GIS solutions and infrastructure development.'
              },
              {
                question: 'How do you ensure project quality?',
                answer: 'We follow industry best practices, conduct regular quality audits, and provide detailed documentation throughout the project lifecycle.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;