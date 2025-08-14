import React from 'react';
import { Users, Target, Eye, Award, MapPin, Phone, Mail } from 'lucide-react';
import drivingSinceImage from '../assets/drivingsince.jpg';

const About = () => {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Excellence',
      description: 'We strive for excellence in every project, delivering superior quality solutions that exceed expectations.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Collaboration',
      description: 'We believe in working closely with our clients, fostering partnerships built on trust and mutual success.'
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.'
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      title: 'Transparency',
      description: 'We maintain open communication and transparency in all our business relationships and processes.'
    }
  ];

  const team = [
    {
      name: 'John Richardson',
      role: 'Chief Executive Officer',
      experience: '20+ years in Technology Leadership',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      experience: '15+ years in Telecom Infrastructure',
      image: 'https://images.pexels.com/photos/3727511/pexels-photo-3727511.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Michael Rodriguez',
      role: 'GIS Solutions Director',
      experience: '12+ years in Geospatial Analytics',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emily Watson',
      role: 'Training & Development Head',
      experience: '10+ years in Corporate Training',
      image: 'https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About Digital Indian
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Leading the way in technology innovation with over 15 years of experience 
              in delivering exceptional solutions across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Driving Innovation Since 2010
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Founded with a vision to bridge the gap between traditional business operations 
                and modern technology solutions, TechSolutions has grown to become a trusted 
                partner for organizations seeking digital transformation.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Our expertise spans across telecom infrastructure, geospatial solutions, 
                skill development, and business consultancy. We've successfully delivered 
                over 500 projects, helping businesses optimize their operations and achieve 
                sustainable growth.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600 dark:text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">200+</div>
                  <div className="text-gray-600 dark:text-gray-400">Satisfied Clients</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={drivingSinceImage}
                alt="Team working on technology solutions"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To empower businesses with innovative technology solutions that enhance 
                connectivity, improve efficiency, and drive sustainable growth through 
                expert consultation and cutting-edge infrastructure.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To be the leading technology solutions provider globally, recognized for 
                our innovation, expertise, and commitment to transforming businesses 
                through advanced technology integration.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We are committed to delivering exceptional quality, maintaining the highest 
                standards of professionalism, and building long-term partnerships based 
                on trust, reliability, and mutual success.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These fundamental values guide our decisions and shape our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <div className="max-w-[1440px] mx-auto px-[1.5cm]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet the experienced professionals who drive our company's vision and ensure 
              exceptional service delivery for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white dark:from-blue-700 dark:to-blue-900">
        <div className="max-w-[1440px] mx-auto px-[1.5cm] text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            Let's discuss how our expertise and commitment to excellence can help 
            transform your business objectives into successful outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex items-center justify-center space-x-2 group">
              <Phone className="h-5 w-5 text-orange-400 transition-transform duration-300 group-hover:scale-110" />
              <a href="tel:+917908735132" className="hover:underline">+91 7908735132</a>
            </div>
            <div className="flex items-center justify-center space-x-2 group">
              <Mail className="h-5 w-5 text-orange-400 transition-transform duration-300 group-hover:scale-110" />
              <a href="mailto:info@digitalindian.co.in" className="hover:underline">info@digitalindian.co.in</a>
            </div>
            <div className="flex items-center justify-center space-x-2 group">
              <MapPin className="h-5 w-5 text-orange-400 transition-transform duration-300 group-hover:scale-110" />
              <a 
                href="https://www.google.com/maps/place/EN+BLOCK,+EN+-+9,+EN+Block,+Sector+V,+Bidhannagar,+Kolkata,+West+Bengal+700091/@22.5735222,88.4332776,18.65z/data=!4m6!3m5!1s0x3a0275afb2dd949b:0xcaff4cf09f3240cf!8m2!3d22.5736058!4d88.43239!16s%2Fg%2F11rkm75qlp?entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                EN-9, Salt Lake, Sec-5, Kolkata-700091
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;