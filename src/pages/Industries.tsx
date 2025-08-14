import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Wifi, Globe, MapPin, Users, ArrowRight } from 'lucide-react';
import TelecomOperatorsImage from '../assets/TelecomOperators.jpg';
import internetserviceImage from '../assets/internetservice.jpg';
import GovernmentProjectsImage from '../assets/GovernmentProjects.jpg';
import UtilitiesImage from '../assets/Utilities.jpg';
import CorporateImage from '../assets/Corporate.jpg';

const Industries = () => {
  const industries = [
    {
      icon: <Wifi className="h-12 w-12 text-blue-600" />,
      title: 'Telecom Operators',
      description: 'Major telecommunications companies requiring infrastructure development and optimization.',
      examples: ['BSNL', 'Bharti Airtel', 'Vodafone Idea', 'Reliance Jio'],
      services: [
        'Network Infrastructure Development',
        '5G Deployment Solutions',
        'Fiber Optic Network Installation',
        'Network Optimization & Maintenance'
      ],
      image: TelecomOperatorsImage
    },
    {
      icon: <Globe className="h-12 w-12 text-blue-600" />,
      title: 'Internet Service Providers',
      description: 'ISPs seeking to expand their network reach and improve service quality.',
      examples: ['Local ISPs', 'Regional Broadband Providers', 'Wireless Internet Companies'],
      services: [
        'Broadband Network Expansion',
        'Wireless Infrastructure Solutions',
        'Network Security Implementation',
        'Customer Service Optimization'
      ],
      image: internetserviceImage
    },
    {
      icon: <Building className="h-12 w-12 text-blue-600" />,
      title: 'Government Projects',
      description: 'Public sector initiatives focused on digital infrastructure and smart city development.',
      examples: ['Smart City Projects', 'Digital India Initiatives', 'E-Governance Solutions'],
      services: [
        'Smart City Infrastructure',
        'Digital Governance Solutions',
        'Public WiFi Implementation',
        'GIS-based Urban Planning'
      ],
      image: GovernmentProjectsImage
    },
    {
      icon: <MapPin className="h-12 w-12 text-blue-600" />,
      title: 'Utilities & Infrastructure',
      description: 'Utility companies requiring geospatial solutions and asset management systems.',
      examples: ['Power Distribution Companies', 'Water Management Authorities', 'Transportation Agencies'],
      services: [
        'Asset Mapping & Management',
        'Utility Network Planning',
        'Remote Monitoring Solutions',
        'Predictive Maintenance Systems'
      ],
      image: UtilitiesImage
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: 'Corporate Enterprises',
      description: 'Large enterprises requiring technology consultation and skill development programs.',
      examples: ['Manufacturing Companies', 'Financial Institutions', 'Healthcare Organizations'],
      services: [
        'Enterprise Network Solutions',
        'Employee Skill Development',
        'Technology Consulting',
        'Digital Transformation Support'
      ],
      image: CorporateImage
    }
  ];

  const clientTypes = [
    {
      category: 'Telecommunications',
      clients: ['National Telecom Operators', 'Regional Service Providers', 'Tower Companies', 'Equipment Manufacturers']
    },
    {
      category: 'Government & Public Sector',
      clients: ['Municipal Corporations', 'State Governments', 'Central Government Agencies', 'Public Utilities']
    },
    {
      category: 'Private Enterprises',
      clients: ['IT Companies', 'Manufacturing Industries', 'Educational Institutions', 'Healthcare Organizations']
    },
    {
      category: 'Infrastructure & Utilities',
      clients: ['Power Companies', 'Water Authorities', 'Transportation Agencies', 'Real Estate Developers']
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Delivering specialized technology solutions across diverse industries 
              to drive digital transformation and operational excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Overview */}
      <section className="py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our Focus Industries
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We specialize in serving key industry sectors with tailored solutions 
              that address specific challenges and opportunities.
            </p>
          </div>

          <div className="space-y-16">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="mb-6">
                    {industry.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {industry.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    {industry.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Key Clients Include:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.examples.map((example, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Our Services:
                    </h4>
                    <ul className="space-y-2">
                      {industry.services.map((service, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <ArrowRight className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Client Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We work with diverse client types across multiple sectors, 
              providing customized solutions for each unique business environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientTypes.map((type, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {type.category}
                </h3>
                <ul className="space-y-2">
                  {type.clients.map((client, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-400 text-center">
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-blue-600 text-white dark:bg-blue-700">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-blue-100 dark:text-blue-200">
              Proven success across industries with measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Delivered', description: 'Across all industries' },
              { number: '200+', label: 'Satisfied Clients', description: 'Long-term partnerships' },
              { number: '15+', label: 'Years Experience', description: 'Industry expertise' },
              { number: '99%', label: 'Success Rate', description: 'Project completion' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-blue-100 dark:text-blue-200 text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white dark:bg-gray-800">
        <div className="max-w-[1440px] mx-auto px-[1.5cm] text-center">
          <h2 className="text-3xl font-bold mb-6">
            Your Industry, Our Expertise
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Don't see your industry listed? We adapt our solutions to meet the unique 
            requirements of any sector. Contact us to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;