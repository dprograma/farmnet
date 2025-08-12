'use client';
import { motion } from 'framer-motion';
import { 
  FiTarget, 
  FiHeart, 
  FiTrendingUp, 
  FiUsers, 
  FiAward,
  FiMapPin,
  FiLinkedin,
  FiMail
} from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function About() {
  const values = [
    {
      icon: FiTarget,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology to solve traditional agricultural challenges and create new opportunities for growth.'
    },
    {
      icon: FiHeart,
      title: 'Empowerment',
      description: 'We believe in empowering smallholder farmers with the tools, knowledge, and resources they need to succeed.'
    },
    {
      icon: FiTrendingUp,
      title: 'Sustainability',
      description: 'Our solutions promote sustainable agricultural practices that benefit farmers, communities, and the environment.'
    },
    {
      icon: FiUsers,
      title: 'Collaboration',
      description: 'We build strong partnerships with farmers, buyers, NGOs, and other stakeholders to create a thriving ecosystem.'
    }
  ];

  const stats = [
    { number: '2020', label: 'Founded' },
    { number: '10,000+', label: 'Farmers Served' },
    { number: '500+', label: 'Buyers Connected' },
    { number: '25+', label: 'States Covered' }
  ];

  const team = [
    {
      name: 'Adebayo Johnson',
      role: 'Chief Executive Officer',
      bio: 'Agricultural engineer with 15+ years of experience in agtech and financial services.',
      image: '/images/team/ceo.jpg',
      linkedin: '#'
    },
    {
      name: 'Chioma Okafor',
      role: 'Chief Technology Officer',
      bio: 'Former fintech executive specializing in digital payment systems and agricultural technology.',
      image: '/images/team/cto.jpg',
      linkedin: '#'
    },
    {
      name: 'Ibrahim Mohammed',
      role: 'Head of Operations',
      bio: 'Supply chain expert with deep knowledge of agricultural logistics and quality control.',
      image: '/images/team/operations.jpg',
      linkedin: '#'
    },
    {
      name: 'Funmi Adebisi',
      role: 'Head of Partnerships',
      bio: 'Relationship builder connecting farmers, buyers, and development organizations.',
      image: '/images/team/partnerships.jpg',
      linkedin: '#'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Farmnet Founded',
      description: 'Started with a vision to transform agricultural value chains in Nigeria.'
    },
    {
      year: '2021',
      title: 'First 1,000 Farmers',
      description: 'Reached our first milestone of connecting 1,000 smallholder farmers to markets.'
    },
    {
      year: '2022',
      title: 'Logistics Network',
      description: 'Launched comprehensive logistics and storage solutions across 10 states.'
    },
    {
      year: '2023',
      title: 'Digital Expansion',
      description: 'Introduced mobile app and advanced data analytics platform.'
    },
    {
      year: '2024',
      title: 'Partnership Growth',
      description: 'Established partnerships with major NGOs and development finance institutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="primary" size="lg" className="mb-6">
                About Farmnet
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold font-bold text-gray-900 mb-6"
            >
              Transforming Agriculture Through{' '}
              <span className="text-green-600">Innovation</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 leading-relaxed"
            >
              We are an Agricultural FinTech company dedicated to helping smallholder farmers break the debt cycle by providing comprehensive access to inputs, markets, and financial services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-bold text-gray-900 mb-6">
                Empowering Agricultural Communities
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our mission is to create sustainable wealth for smallholder farmers by providing access to quality inputs, reliable markets, and innovative financial services that break traditional debt cycles.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that technology can bridge the gap between agricultural production and market access, creating opportunities for farmers to thrive while meeting the growing demand for quality produce.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">Our Vision</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-bold text-gray-900 mb-6">
                A Prosperous Agricultural Future
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We envision an agricultural ecosystem where every farmer has access to the resources, markets, and financial services they need to build sustainable prosperity.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through innovative technology and strategic partnerships, we aim to transform the agricultural value chain, creating value for all stakeholders while promoting food security and economic growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-bold text-gray-900 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do, from product development to customer relationships.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-bold text-gray-900 mb-6">
              Key Milestones
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a bold vision to a thriving platform serving thousands of farmers across Nigeria.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index}
                className="flex items-center mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-20 h-20 bg-green-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
                  {milestone.year}
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-bold text-gray-900 mb-6">
              Meet the Visionaries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines deep agricultural knowledge with cutting-edge technology expertise.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center group hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-green-600 mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center space-x-3">
                      <a 
                        href={member.linkedin}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors"
                      >
                        <FiLinkedin className="w-4 h-4" />
                      </a>
                      <a 
                        href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@farmnet.ng`}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors"
                      >
                        <FiMail className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4">Our Location</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-bold text-gray-900 mb-6">
                Based in Lagos, Serving Nigeria
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Headquarters</p>
                    <p className="text-gray-600">
                      NO 8, Watchtower Road, Off Ifatedo Elemoro Street,<br />
                      Opposite Assembly Hall, Bogije Ibeju-Lekki, Lagos, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FiUsers className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Coverage Area</p>
                    <p className="text-gray-600">
                      Operating across 25+ states in Nigeria with plans for West African expansion
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-gray-200 rounded-2xl h-64 lg:h-80 flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500">Interactive Map Coming Soon</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}