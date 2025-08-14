import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Zap, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import keyboardImage from '../assets/keyboard.jpg';
import gisImage from '../assets/GIS.jpg';
import skillImage from '../assets/skill.jpg';
import consImage from '../assets/cons.jpg';

const Services = () => {
  const services = [
    {
      id: 'telecom',
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: 'Telecom Infrastructure',
      description: 'Comprehensive telecommunications infrastructure solutions for modern connectivity needs.',
      image: keyboardImage,
      features: [
        'Fiber Optic Network Design & Deployment',
        'Wireless Network Planning & Optimization',
        '5G Infrastructure Development',
        'Network Security & Monitoring',
        'Infrastructure Maintenance & Support',
        'Site Survey & RF Planning'
      ],
      benefits: [
        'Enhanced network performance and reliability',
        'Scalable infrastructure for future growth',
        'Reduced operational costs and downtime',
        '24/7 monitoring and support services'
      ]
    },
    {
      id: 'gis',
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: 'Geospatial & GIS Solutions',
      description: 'Advanced geospatial analytics and mapping solutions for data-driven decision making.',
      image: gisImage,
      features: [
        'Utility & Asset Mapping',
        'Remote Sensing & Satellite Imagery',
        'Spatial Data Analytics & Visualization',
        'GPS Survey & Land Management',
        'Environmental Monitoring Solutions',
        'Custom GIS Application Development'
      ],
      benefits: [
        'Improved asset management and planning',
        'Enhanced operational efficiency',
        'Better resource allocation decisions',
        'Comprehensive spatial analysis capabilities'
      ]
    },
    {
      id: 'training',
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: 'Skill Development',
      description: 'Professional training programs to enhance technical capabilities and career growth.',
      image: skillImage,
      features: [
        'Telecom Technology Training',
        'GIS & Geospatial Analytics Courses',
        'Project Management Certification',
        'Corporate Training Programs',
        'Online Learning Platforms',
        'Hands-on Workshop Sessions'
      ],
      benefits: [
        'Industry-recognized certifications',
        'Practical, hands-on learning experience',
        'Career advancement opportunities',
        'Customized training programs available'
      ]
    },
    {
      id: 'consultancy',
      icon: <Award className="h-12 w-12 text-blue-600" />,
      title: 'Consultancy & Business Incubation',
      description: 'Strategic consulting services to accelerate business growth and innovation.',
      image: consImage,
      features: [
        'Startup Mentorship & Guidance',
        'Business Plan Development',
        'Technology Roadmap Planning',
        'Seed Funding Assistance',
        'Regulatory Compliance Support',
        'Market Analysis & Strategy'
      ],
      benefits: [
        'Accelerated time-to-market',
        'Risk mitigation and strategic planning',
        'Access to funding opportunities',
        'Expert guidance throughout the process'
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to transform your business 
              operations and drive sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          id={service.id}
          className={`py-16 ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} transition-colors duration-500`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-6">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  {service.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg shadow-xl"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-16 bg-blue-600 text-white dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-blue-100 dark:text-blue-200">
              A proven methodology that ensures project success and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your requirements and challenges' },
              { step: '02', title: 'Planning', description: 'Developing comprehensive project roadmap' },
              { step: '03', title: 'Implementation', description: 'Executing solutions with precision and expertise' },
              { step: '04', title: 'Support', description: 'Ongoing maintenance and optimization services' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100 dark:text-blue-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project requirements and discover how our 
            services can help you achieve your business objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Request Consultation
            </Link>
            <Link
              to="/industries"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Industries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;