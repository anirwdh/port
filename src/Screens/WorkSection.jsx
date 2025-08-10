import React from 'react';
import w1 from '../assets/Images/w1.png';
import w2 from '../assets/Images/w2.png';
import w3 from '../assets/Images/w3.jpg';
import w4 from '../assets/Images/w4.jpg';
import w5 from '../assets/Images/w5.png';
import w6 from '../assets/Images/w6.png';

export default function WorkSection() {
  const projects = [
    {
      id: 1,
      tags: ["UX/UI Design", "Development"],
      title: "Break A Leg",
      description: "Building a vibrant website that connects audiences with live theatre shows—making culture more accessible and engaging.",
      image: w1,
      url: "https://thescenezone.com/"
    },
    {
      id: 2,
      tags: ["UX/UI Design", "Development"],
      title: "Black friday by Intellect",
      description: "Launching a bold campaign that drives engagement and sales—bringing exclusive Black Friday offers to the spotlight.",
      image: w2,
      url: "https://kansalondon.com/"
    },
    {
      id: 3,
      tags: ["UX/UI Design", "Development"],
      title: "Pay Forward Foundation",
      description: "Creating a platform that empowers communities through charitable giving and social impact initiatives.",
      image: w3,
      url: "https://project3.com"
    },
    {
      id: 4,
      tags: ["UX/UI Design", "Development"],
      title: "Digital Innovation Hub",
      description: "Building the future of digital collaboration with cutting-edge tools and seamless user experiences.",
      image: w4,
      url: "https://project4.com"
    },
    {
      id: 5,
      tags: ["UX/UI Design", "Development"],
      title: "Creative Studio",
      description: "A modern creative agency website showcasing innovative design solutions and creative excellence.",
      image: w5,
      url: "https://takearecess.com/"
    },
    {
      id: 6,
      tags: ["UX/UI Design", "Development"],
      title: "Tech Solutions",
      description: "Comprehensive technology solutions for modern businesses with focus on scalability and performance.",
      image: w6,
      url: "https://project6.com"
    }
  ];

  return (
    <section className="work-section" style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#000000',
      padding: '120px 40px 80px',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h1 style={{
            color: '#ffffff',
            fontSize: '64px',
            fontWeight: '700',
            marginBottom: '20px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Work
          </h1>
          <p style={{
            color: '#888888',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            A collection of my latest projects and creative work
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '60px',
          marginTop: '60px'
        }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{
                backgroundColor: '#111111',
                borderRadius: '16px',
                padding: '40px',
                border: '1px solid #222222',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = '#00d4aa';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 170, 0.1)';
                
                // Show the ball-like "View Project" overlay
                const ballOverlay = e.currentTarget.querySelector('div[style*="borderRadius: \'50%\'"]');
                if (ballOverlay) {
                  ballOverlay.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#222222';
                e.currentTarget.style.boxShadow = 'none';
                
                // Hide the ball-like "View Project" overlay
                const ballOverlay = e.currentTarget.querySelector('div[style*="borderRadius: \'50%\'"]');
                if (ballOverlay) {
                  ballOverlay.style.opacity = '0';
                }
              }}
              onClick={() => window.open(project.url, '_blank')}
            >
              {/* Tags */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '24px'
              }}>
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    style={{
                      backgroundColor: '#333333',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Title */}
              <h3 style={{
                color: '#ffffff',
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                {project.title}
              </h3>

              {/* Project Description */}
              <p style={{
                color: '#cccccc',
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '32px',
                maxWidth: '400px'
              }}>
                {project.description}
              </p>

              {/* Project Image */}
              <div style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #333333'
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
                
                {/* Ball-like "View Project" Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none',
                  zIndex: 10
                }}>
                  <span style={{
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    View Project
                  </span>
                </div>
                
                {/* Overlay with Postman tag for specific projects */}
                {project.id === 2 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#333333',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '500',
                    border: '1px solid #444444'
                  }}>
                    Postman
                  </div>
                )}
              </div>

              {/* Hover Effect Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(0, 212, 170, 0.02) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px'
        }}>
          <button style={{
            backgroundColor: 'transparent',
            color: '#00d4aa',
            border: '2px solid #00d4aa',
            padding: '16px 32px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#00d4aa';
            e.target.style.color = '#000000';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#00d4aa';
            e.target.style.transform = 'translateY(0)';
          }}
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
} 