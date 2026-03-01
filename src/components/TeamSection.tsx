"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const team = [
    { 
      name: "Steve Vernelen", 
      role: "CEO",
      image: "/team/Steve-Vernelen.png",
      bio: [
        "Steve Vernelen has been doing business globally for the last 20 years, as CEO of Benito Urban in Spain (manhole covers and grates, urban equipment) and as CEO of Fondatel (foundry of manhole covers) in Belgium.",
        "He holds an MBA from Kellogg School of Management , started his business career at McKinsey & Cie to then move on to turning around troubled private equity held companies."
      ],
      contact: {
        email: "steve@vyanzo.be",
        phones: [
          { label: "Belgium", number: "+32475264752" },
          { label: "India", number: "+919560742436" }
        ]
      }
    },
    { 
      name: "Roxane Sabatier", 
      role: "Office Manager",
      image: "/team/Roxane-Sabatier.png",
      bio: [
        "Roxane Sabatier runs our Mumbai office. She is fluent in English, French, Hindi, Italian and Spanish. A journalist by education, she has the tenacity to achieve her goals.",
        "Roxane and Steve have worked together for over a decade in various companies. Roxane joined Vyanzo in 2022."
      ],
      contact: {
        email: "roxane@vyanzo.be",
        phones: [
          { label: "India", number: "+919930353363" }
        ]
      }
    },
    { 
      name: "Annick D'Hont", 
      role: "Legal and Contracts",
      image: "/team/Annick-DHont.png",
      bio: [
        "Annick D'Hont is a seasoned lawyer and specializes in corporate contract law and logistics, leaving no loose ends. She has been an integral part of Vyanzo since its inception."
      ],
      contact: {
        email: "annick@vyanzo.be",
        phones: []
      }
    },
    { 
      name: "Naba Kumar Gayen", 
      role: "Head of Quality",
      image: "/team/Naba-Kumar-Gayen.png",
      bio: [
        "Naba Kumar Gayen is our Head of Quality, based in Kolkata. He inspects production and product development locally at the foundries in India making sure any issues are detected before products get shipped. He is an engineer and has 15+ years of experience in the casting industry. He joined Vyanzo in 2019."
      ],
      contact: {
        email: "naba@vyanzo.be", // Assuming format based on others
        phones: []
      }
    }
  ];

  // Helper to safely close the modal when clicking outside
  const closeModal = () => setSelectedMember(null);

  // Stop propagation for the modal content clicks so they don't trigger the background overlay close
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-t border-brand-ash/10 relative">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bg-dark mb-6">Leadership Team</h2>
          <p className="text-xl text-text-light-bg/60 max-w-2xl mx-auto">
            Guided by a leadership team with decades of combined experience in global manufacturing, supply chain, and quality assurance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((leader, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => setSelectedMember(i)}
            >
              <div className="w-full h-full bg-[#f8f9fc] rounded-4xl border border-brand-ash/20 mb-6 flex items-center justify-center transition-all duration-300 shadow-sm relative overflow-hidden group-hover:border-brand-primary">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold font-sans text-bg-dark mb-1 group-hover:text-brand-primary transition-colors">{leader.name}</h3>
              <p className="text-bg-dark/60 font-medium tracking-wider text-sm uppercase">{leader.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popover Modal using Framer Motion */}
      <AnimatePresence>
        {selectedMember !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 bg-bg-dark/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-brand-primary w-full max-w-5xl rounded-4xl md:rounded-[3.5rem] relative overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
              onClick={handleModalClick}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 bg-bg-dark text-white rounded-full flex items-center justify-center hover:bg-bg-dark/90 transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content Layout */}
              
              {/* Left Side: Image */}
              <div className="w-full md:w-[40%] h-[300px] md:h-auto shrink-0 p-4 md:p-8">
                 <div className="w-full h-full rounded-3xl md:rounded-4xl overflow-hidden bg-white/20">
                    <img 
                      src={team[selectedMember].image} 
                      alt={team[selectedMember].name} 
                      className="w-full h-full object-cover"
                    />
                 </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-[60%] p-8 md:p-12 md:pl-4 flex flex-col justify-center text-left text-bg-dark pb-12 md:pb-12">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                  <h3 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                    {team[selectedMember].name}
                  </h3>
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-bg-dark/30 text-bg-dark text-sm font-semibold tracking-wider uppercase whitespace-nowrap self-start md:self-auto">
                    {team[selectedMember].role}
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6 mb-10 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                  {team[selectedMember].bio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex flex-col gap-2 text-base md:text-lg font-semibold">
                  {team[selectedMember].contact.email && (
                    <div className="flex flex-col md:flex-row md:gap-2">
                      <span className="text-bg-dark/70">Contact:</span>
                      <a href={`mailto:${team[selectedMember].contact.email}`} className="hover:underline text-bg-dark">
                        {team[selectedMember].contact.email}
                      </a>
                    </div>
                  )}
                  {team[selectedMember].contact.phones.map((phone, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:gap-2">
                       <span className="text-bg-dark/70">Tel. {phone.label}:</span>
                       <span className="text-bg-dark">{phone.number}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
