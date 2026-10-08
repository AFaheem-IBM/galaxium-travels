import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { Ticket, Music, Mic, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

/** Home page for Stagepass — the live event ticketing platform. */
export const Home = () => {
  const features = [
    {
      icon: <Music size={32} />,
      title: 'Concerts & Festivals',
      description: 'Front-row access to the world\'s biggest artists and music festivals.',
    },
    {
      icon: <Mic size={32} />,
      title: 'Conferences & Talks',
      description: 'Secure your seat at industry-leading summits and keynote events.',
    },
    {
      icon: <Trophy size={32} />,
      title: 'Sporting Events',
      description: 'Be in the stadium for the games that matter — from local leagues to world championships.',
    },
    {
      icon: <Ticket size={32} />,
      title: 'Instant Booking',
      description: 'Reserve your tickets in seconds and receive instant e-ticket confirmation.',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-cosmic-gradient bg-clip-text text-transparent">
              Your Ticket
            </span>
            <br />
            <span className="text-star-white">To Every Moment</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-star-white/80 mb-8 max-w-2xl mx-auto"
        >
          Stagepass puts you in the room. Browse concerts, conferences, and sporting
          events — then book your seat before it's gone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/flights">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Events
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Learn More
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-star-white"
        >
          Why Choose Stagepass?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cosmic-gradient mb-4">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-star-white mb-2">
                {feature.title}
              </h3>
              <p className="text-star-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card p-12 text-center bg-cosmic-gradient"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Experience Live Events?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of fans who use Stagepass to grab tickets before they sell out.
          Don't miss the next great show.
        </p>
        <Link to="/flights">
          <Button variant="secondary" size="lg">
            Get Tickets Now
          </Button>
        </Link>
      </motion.section>
    </div>
  );
};

// Made with Bob
