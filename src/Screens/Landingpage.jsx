import Spline from '@splinetool/react-spline';
import { useEffect, useState, useRef } from 'react';
import kansaVideo from '../assets/Videos/kansa.mp4';
import nanocartVideo from '../assets/Videos/nanocart.mp4';
import sceneappVideo from '../assets/Videos/sceneapp.mp4';
import recessVideo from '../assets/Videos/recess.mp4';
import scenwebVideo from '../assets/Videos/scenweb.mp4';
import tripnovaVideo from '../assets/Videos/tripnova.mp4';
import WebIcon from '../assets/icons/web';
import UIIcon from '../assets/icons/ui';
import AppIcon from '../assets/icons/app';
import AgentIcon from '../assets/icons/agent';
import ChatbotIcon from '../assets/icons/chatbot';

// CSS animations for form messages
const slideInDown = `
  @keyframes slideInDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// CSS animation for active navigation indicator
const pulse = `
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
`;



export default function LandingPage() {
  const [showServiceSection, setShowServiceSection] = useState(false);
  const [showWorkSection, setShowWorkSection] = useState(false);
  const [serviceScrollPosition, setServiceScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('main');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const workSectionRef = useRef(null);
  const serviceSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  // Typewriter content
  

  const serviceCards = [
    { id: 1, title: "Web Development", description: "Building full-stack websites that blend seamless functionality with stunning design", color: "rgba(147, 51, 234, 0.1)", borderColor: "rgba(147, 51, 234, 0.3)", icon: 'web' },
    { id: 2, title: "UI/UX Design", description: "Intuitive user experiences", color: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.3)", icon: 'ui' },
    { id: 3, title: "Mobile Apps", description: "Cross-platform applications", color: "rgba(147, 51, 234, 0.1)", borderColor: "rgba(147, 51, 234, 0.3)", icon: 'app' },
    { id: 5, title: "AI Agents", description: "Designing AI agents that think, act, and deliver results.", color: "rgba(147, 51, 234, 0.1)", borderColor: "rgba(147, 51, 234, 0.3)", icon: 'agent' },
    { id: 6, title: "Chatbot", description: "Chatbots that work 24/7, so you don't have to.", color: "rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.3)", icon: 'chatbot' }
  ];

  useEffect(() => {
    // Inject CSS animations
    const style = document.createElement('style');
    style.textContent = slideInDown + pulse;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine active section based on scroll position using section IDs
      const workSectionRect = workSectionRef.current ? workSectionRef.current.getBoundingClientRect() : null;
      const serviceSectionRect = serviceSectionRef.current ? serviceSectionRef.current.getBoundingClientRect() : null;
      const aboutSectionRect = aboutSectionRef.current ? aboutSectionRef.current.getBoundingClientRect() : null;
      const contactSectionRect = contactSectionRef.current ? contactSectionRef.current.getBoundingClientRect() : null;
      
      // More responsive section detection using getBoundingClientRect
      if (!workSectionRect || workSectionRect.top > windowHeight * 0.2) {
        setActiveSection('main');
      } else if (workSectionRect.top <= windowHeight * 0.2 && (!serviceSectionRect || serviceSectionRect.top > windowHeight * 0.2)) {
        setActiveSection('work');
      } else if (serviceSectionRect && serviceSectionRect.top <= windowHeight * 0.2 && (!aboutSectionRect || aboutSectionRect.top > windowHeight * 0.2)) {
        setActiveSection('services');
      } else if (aboutSectionRect && aboutSectionRect.top <= windowHeight * 0.2 && (!contactSectionRect || contactSectionRect.top > windowHeight * 0.2)) {
        setActiveSection('about');
      } else if (contactSectionRect && contactSectionRect.top <= windowHeight * 0.2) {
        setActiveSection('contact');
      }
      
      // Debug logging
      console.log('Scroll Debug:', {
        scrollPosition,
        workSectionTop: workSectionRect?.top,
        serviceSectionTop: serviceSectionRect?.top,
        aboutSectionTop: aboutSectionRect?.top,
        contactSectionTop: contactSectionRect?.top,
        windowHeight,
        activeSection: activeSection
      });
      
      // Show work section when user scrolls down 50% of viewport height
      if (scrollPosition > windowHeight * 0.5) {
        setShowWorkSection(true);
      } else {
        setShowWorkSection(false);
      }

      // Show service section when work section is fully visible
      if (scrollPosition > windowHeight * 1.5) {
        setShowServiceSection(true);
      } else {
        setShowServiceSection(false);
      }

      // Calculate scroll progress for work section
      if (workSectionRef.current) {
        const rect = workSectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrollTop = window.pageYOffset;
        const sectionTop = rect.top + scrollTop;
        const progress = Math.max(0, Math.min(1, (scrollTop - sectionTop + windowHeight) / sectionHeight));
        setScrollProgress(progress);
      }

      // Calculate horizontal scroll for service section
      if (serviceSectionRef.current) {
        const rect = serviceSectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / sectionHeight));
        setServiceScrollPosition(scrollProgress);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial call to set correct section on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Trigger typewriter effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWorkSection(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect for title and description
  useEffect(() => {
    if (showWorkSection && !isTyping && !hasTyped) {
      setIsTyping(true);
      setHasTyped(true);
      
      // Type the title first
      let titleIndex = 0;
      const typeTitle = () => {
        if (titleIndex < title.length) {
          setTitleText(title.slice(0, titleIndex + 1));
          titleIndex++;
          setTimeout(typeTitle, 100);
        } else {
          // Start typing description after title is complete
          let descIndex = 0;
          const typeDescription = () => {
            if (descIndex < description.length) {
              setDescriptionText(description.slice(0, descIndex + 1));
              descIndex++;
              setTimeout(typeDescription, 50);
            } else {
              setIsTyping(false);
            }
          };
          setTimeout(typeDescription, 300);
        }
      };
      
      setTimeout(typeTitle, 500);
    }
  }, [showWorkSection, isTyping, hasTyped]);

  // Auto-scroll service cards
  useEffect(() => {
    if (showServiceSection) {
      const interval = setInterval(() => {
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % serviceCards.length);
      }, 6000); // 6 seconds for better performance
      
      setAutoScrollInterval(interval);
      
      return () => {
        clearInterval(interval);
        setAutoScrollInterval(null);
      };
    } else {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        setAutoScrollInterval(null);
      }
    }
  }, [showServiceSection, serviceCards.length]);

  const handleServiceCardClick = (cardIndex) => {
    if (cardIndex === activeCardIndex) return; // Prevent unnecessary updates
    
    setActiveCardIndex(cardIndex);
    // Reset auto-scroll timer
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
    const newInterval = setInterval(() => {
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % serviceCards.length);
    }, 5000);
    setAutoScrollInterval(newInterval);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setTouchEndX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const swipeThreshold = 50; // Minimum distance for a swipe
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe left - next card
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % serviceCards.length);
      } else {
        // Swipe right - previous card
        setActiveCardIndex((prevIndex) => (prevIndex - 1 + serviceCards.length) % serviceCards.length);
      }
      
      // Reset auto-scroll timer after manual interaction
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      const newInterval = setInterval(() => {
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % serviceCards.length);
      }, 5000);
      setAutoScrollInterval(newInterval);
    }
    
    setIsDragging(false);
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setTouchEndX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % serviceCards.length);
      } else {
        setActiveCardIndex((prevIndex) => (prevIndex - 1 + serviceCards.length) % serviceCards.length);
      }
      
      // Reset auto-scroll timer after manual interaction
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      const newInterval = setInterval(() => {
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % serviceCards.length);
      }, 5000);
      setAutoScrollInterval(newInterval);
    }
    
    setIsDragging(false);
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const projectCards = [
    { id: 1, title: "", video: scenwebVideo, rotation: -5, x: 20, y: 50, zIndex: 1, tiltX: -8, tiltY: 5, url: "https://thescenezone.com/" },
    { id: 2, title: "", video: kansaVideo, rotation: 8, x: 280, y: 80, zIndex: 2, tiltX: 6, tiltY: -3, url: "https://kansalondon.com/" },
    { id: 3, title: "", video: sceneappVideo, rotation: -3, x: 60, y: 280, zIndex: 3, tiltX: -4, tiltY: 8, url: "https://project3.com" },
    { id: 4, title: "", video: tripnovaVideo, rotation: 12, x: 320, y: 250, zIndex: 4, tiltX: 10, tiltY: -6, url: "https://project4.com" },
    { id: 5, title: "", video: recessVideo, rotation: -7, x: 100, y: 480, zIndex: 5, tiltX: -5, tiltY: 4, url: "https://takearecess.com/" },
    { id: 6, title: "", video: nanocartVideo, rotation: 4, x: 360, y: 450, zIndex: 6, tiltX: 7, tiltY: -2, url: "https://project6.com" }
  ];

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setTimeout(() => {
      setModalOpen(true);
    }, 50);
  };

  const handleCloseCard = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 300);
  };

  const scrollToWorkSection = () => {
    if (workSectionRef.current) {
      workSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Delay setting active section to account for smooth scroll
      setTimeout(() => setActiveSection('work'), 500);
    }
  };

  const scrollToServiceSection = () => {
    if (serviceSectionRef.current) {
      serviceSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Delay setting active section to account for smooth scroll
      setTimeout(() => setActiveSection('services'), 500);
    }
  };

  const scrollToMainSection = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => setActiveSection('main'), 500);
  };

  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setTimeout(() => setActiveSection('about'), 500);
    }
  };

  const scrollToContactSection = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setTimeout(() => setActiveSection('contact'), 500);
    }
  };

  // Form validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const company = formData.get('company');
    const message = formData.get('message');

    // Reset previous errors
    setFormErrors({});

    // Check if all required fields are filled
    if (!name || !email || !phone || !company || !message) {
      setFormErrors({ general: 'Please fill in all required fields (Name, Email, Phone, Project Name, and Message are required).' });
      alert('Please fill in all required fields (Name, Email, Phone, Project Name, and Message are required).');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setFormErrors({ email: 'Please enter a valid email address.' });
      alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number (10 digits)
    if (!validatePhone(phone)) {
      setFormErrors({ phone: 'Please enter a valid 10-digit phone number.' });
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      // Set loading state
      setIsSubmitting(true);
      
      // Submit to Formspree using fetch
      const response = await fetch('https://formspree.io/f/myzplpwq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          message
        })
      });

      if (response.ok) {
        // Show success message
        setShowSuccessMessage(true);
        
        // Reset form fields
        e.target.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        // Handle submission error
        setFormErrors({ general: 'Failed to send message. Please try again later.' });
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      // Handle network error
      setFormErrors({ general: 'Network error. Please check your connection and try again.' });
      alert('Network error. Please check your connection and try again.');
    } finally {
      // Reset loading state
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (fieldName, value) => {
    // Clear error for this field if it exists
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
    
    // Clear general error if any field is being filled
    if (formErrors.general) {
      setFormErrors(prev => ({ ...prev, general: '' }));
    }
    
    // Real-time validation for email
    if (fieldName === 'email' && value && !validateEmail(value)) {
      setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
    }
    
    // Real-time validation for phone
    if (fieldName === 'phone' && value && !validatePhone(value)) {
      setFormErrors(prev => ({ ...prev, phone: 'Please enter a valid 10-digit phone number.' }));
    }
    
    // Real-time validation for company (project name)
    if (fieldName === 'company' && value && value.trim().length < 2) {
      setFormErrors(prev => ({ ...prev, company: 'Project name must be at least 2 characters long.' }));
    }
  };

  const getCardHighlightIntensity = (cardId) => {
    // Create a wave effect based on scroll progress
    const waveOffset = (cardId - 1) * 0.2;
    const wave = Math.sin((scrollProgress + waveOffset) * Math.PI * 2);
    return Math.max(0, wave * 0.3 + 0.1);
  };

  const typeTitle = () => {
    let index = 0;
    setIsTyping(true);
    const interval = setInterval(() => {
      if (index <= title.length) {
        setTitleText(title.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setHasTyped(true);
        setTimeout(() => {
          typeDescription();
        }, 1000);
      }
    }, 100);
  };

  const typeDescription = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= description.length) {
        setDescriptionText(description.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };





  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'black' }}>
      {/* Header (sticky) */}
      <header style={{ 
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'auto',
        padding: '0 20px'
      }}>
        {/* Modern Floating Navigation Bar */}
        <div style={{
          backgroundColor: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '50px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          minWidth: 'fit-content'
        }}>
          {/* Navigation Items */}
          {['Work', 'Services', 'About', 'Contact'].map((item, index) => {
            const isActive = (activeSection === 'work' && item === 'Work') ||
                           (activeSection === 'services' && item === 'Services') ||
                           (activeSection === 'about' && item === 'About') ||
                           (activeSection === 'contact' && item === 'Contact');
            
            return (
              <div key={item} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                {/* Active Indicator Dot */}
                {isActive && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#00d4aa',
                    marginRight: '8px',
                    transition: 'all 0.3s ease',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
                
                                <button
                  style={{
                    color: isActive ? '#00d4aa' : 'white',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    textTransform: 'capitalize',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  onClick={() => {
                    if (item.toLowerCase() === 'work') {
                      scrollToWorkSection();
                    } else if (item.toLowerCase() === 'services') {
                      scrollToServiceSection();
                    } else if (item.toLowerCase() === 'about') {
                      scrollToAboutSection();
                    } else if (item.toLowerCase() === 'contact') {
                      scrollToContactSection();
                    }
                  }}
                >
                  {item}
                </button>
              </div>
            );
          })}
        </div>
      </header>

      {/* 3D section fills remaining viewport height */}
      <main style={{ width: '100%' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100vh', 
          overflow: 'hidden' 
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <Spline scene="https://prod.spline.design/sSV0076SZkiQzOMM/scene.splinecode" />
          </div>
          
          {/* Typewriter Text Overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 10,
            color: 'white',
            maxWidth: '800px',
            padding: '0 20px'
          }}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '800',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              {titleText}
            </h1>
            <p style={{
              fontSize: '20px',
              lineHeight: '1.6',
              color: '#cccccc',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {descriptionText}
            </p>
          </div>
        </div>
      </main>

      {/* Work Section */}
      <section 
        ref={workSectionRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#000000',
          padding: '120px 40px 80px',
          position: 'relative'
        }}
      >
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
              background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '64px',
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              filter: 'drop-shadow(0 0 20px rgba(0, 212, 170, 0.3))',

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
            {projectCards.map((project, index) => (
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
                  // Play video on card hover
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.play();
                  }
                  // Show fluid ball button
                  const ballButton = e.currentTarget.querySelector('.fluid-ball-button');
                  if (ballButton) {
                    ballButton.style.transform = 'translate(-50%, -50%) scale(1)';
                    ballButton.style.opacity = '1';
                    ballButton.style.pointerEvents = 'auto';
                  }
                }}
                onMouseMove={(e) => {
                  // Move fluid ball button with cursor
                  const ballButton = e.currentTarget.querySelector('.fluid-ball-button');
                  if (ballButton && ballButton.style.opacity === '1') {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    ballButton.style.left = x + 'px';
                    ballButton.style.top = y + 'px';
                    ballButton.style.transform = 'translate(-50%, -50%) scale(1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#222222';
                  e.currentTarget.style.boxShadow = 'none';
                  // Pause video when leaving card
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                  // Hide fluid ball button
                  const ballButton = e.currentTarget.querySelector('[style*="transform: translate(-50%, -50%) scale(1)"]');
                  if (ballButton) {
                    ballButton.style.transform = 'translate(-50%, -50%) scale(0)';
                    ballButton.style.opacity = '0';
                    ballButton.style.pointerEvents = 'none';
                  }
                }}

              >
                {/* Tags */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  {['UX/UI Design', 'Development'].map((tag, tagIndex) => (
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
                  {project.id === 1 ? 'SceneZone ' : 
                   project.id === 2 ? 'Kansa London' :
                   project.id === 3 ? 'SceneZone' :
                   project.id === 4 ? 'Trippnopva' :
                   project.id === 5 ? 'Recess' : 'NanoCart'}
                </h3>

                {/* Project Description */}
                <p style={{
                  color: '#cccccc',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '32px',
                  maxWidth: '400px'
                }}>
                  {project.id === 1 ? 'Built an event & artist booking platform — buy tickets, hire artists, or host events in one place.' : 
                   project.id === 2 ? 'Developed Kansa London — a stylish online boutique offering exclusive handbags, curated collections, seamless shopping, and intuitive UX.' :
                   project.id === 3 ? 'Developed SceneZone mobile app (Android & iOS) — book artists, buy tickets, or host events with ease.' :
                   project.id === 4 ? 'Built Trippnova — a tour booking platform where admins create travel packages and users book their next trip with ease.' :
                   project.id === 5 ? 'Built the Take A Recess e-commerce site—offering relaxation-focused sparkling drinks, mood powders, and zero-proof mocktails with a calm, stylish UX.' : 
                   'Developed NanoCart e-commerce app (Android & iOS) — shop and buy clothes with a smooth, intuitive experience.'}
                </p>

                {/* Project Video */}
                <div style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #333333',
                  maxHeight: '200px'
                }}>
                  <video
                    src={project.video}
                    muted
                    loop
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                      borderRadius: '12px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSelectedCard(project);
                      setModalOpen(true);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                  
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
                      border: '1px solid #444444',
                      zIndex: 2
                    }}>
                      
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

                {/* Fluid Ball View Project Button */}
                <div 
                  className="fluid-ball-button"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(0)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    opacity: 0,
                    pointerEvents: 'none'
                  }}
                >
                  <button
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      //textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '2px',
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                    onClick={() => {
                      setSelectedCard(project);
                      setModalOpen(true);
                    }}
                  >
                    <span style={{ fontSize: '8px', fontWeight: '600' }}>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div style={{
            textAlign: 'center',
            marginTop: '80px'
          }}>
           
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section
        ref={serviceSectionRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          padding: '80px 20px',
          opacity: showServiceSection ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          position: 'relative',
          background: `
            radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.15) 0%, transparent 30%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.12) 0%, transparent 25%),
            radial-gradient(circle at 85% 25%, rgba(147, 51, 234, 0.1) 0%, transparent 20%),
            #0a0a0a
          `
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            opacity: showServiceSection ? 1 : 0,
            transform: showServiceSection ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.2s'
          }}>
            <h2 style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '64px',
              fontWeight: 700,
              marginBottom: '20px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              filter: 'drop-shadow(0 0 20px rgba(0, 212, 170, 0.3))',

            }}>
              Services
            </h2>
            <p style={{
              color: '#888888',
              fontSize: '18px',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Comprehensive solutions for your digital needs
            </p>
          </div>

          {/* Swapper Cards Container */}
          <div style={{
            position: 'relative',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
            perspective: '800px',
            transformStyle: 'preserve-3d',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            willChange: 'transform',
            contain: 'layout style paint'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          >
            {serviceCards.map((card, index) => {
              const isActive = index === activeCardIndex;
              const isLeft = index === (activeCardIndex - 1 + serviceCards.length) % serviceCards.length;
              const isRight = index === (activeCardIndex + 1) % serviceCards.length;
              
              let cardStyle = {
                position: 'absolute',
                width: isActive ? '400px' : '300px',
                height: isActive ? '340px' : '260px',
                backgroundColor: card.color,
                borderRadius: '16px',
                border: `1px solid ${card.borderColor}`,
                padding: isActive ? '40px' : '25px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backdropFilter: 'blur(10px)',
                boxShadow: isActive 
                  ? '0 20px 60px rgba(0, 0, 0, 0.4)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.6s ease-out, opacity 0.4s ease-out',
                cursor: 'pointer',
                overflow: 'hidden',
                zIndex: isActive ? 10 : isLeft || isRight ? 5 : 1,
                opacity: isActive ? 1 : isLeft || isRight ? 0.8 : 0.5,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                contain: 'layout style paint'
              };

              // Smooth dynamic positioning with end swapper effect
              const distance = Math.abs(index - activeCardIndex);
              const isCardLeft = index < activeCardIndex;
              
              if (isActive) {
                cardStyle.transform = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
                cardStyle.opacity = 1;
              } else if (distance === 1) {
                // Immediate neighbors - side by side with opposite tilt
                const offset = isCardLeft ? -320 : 320;
                const rotation = isCardLeft ? 20 : -20;
                cardStyle.transform = `translate3d(${offset}px, 0, 0) scale(0.85) rotateY(${rotation}deg)`;
                cardStyle.opacity = 0.8;
              } else if (distance === 2) {
                // Second level neighbors - further out with opposite tilt
                const offset = isCardLeft ? -600 : 600;
                const rotation = isCardLeft ? 30 : -30;
                cardStyle.transform = `translate3d(${offset}px, 0, 0) scale(0.7) rotateY(${rotation}deg)`;
                cardStyle.opacity = 0.5;
              } else if (distance >= 3) {
                // Far end cards - barely visible with opposite tilt
                const offset = isCardLeft ? -800 : 800;
                const rotation = isCardLeft ? 40 : -40;
                cardStyle.transform = `translate3d(${offset}px, 0, 0) scale(0.5) rotateY(${rotation}deg)`;
                cardStyle.opacity = 0.2;
              }

              return (
                <div
                  key={card.id}
                  style={cardStyle}
                  onClick={() => handleServiceCardClick(index)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.transition = 'transform 0.2s ease-out';
                      const currentTransform = e.target.style.transform;
                      if (currentTransform.includes('scale(0.85)')) {
                        e.target.style.transform = currentTransform.replace('scale(0.85)', 'scale(0.9)');
                      } else if (currentTransform.includes('scale(0.7)')) {
                        e.target.style.transform = currentTransform.replace('scale(0.7)', 'scale(0.75)');
                      } else if (currentTransform.includes('scale(0.5)')) {
                        e.target.style.transform = currentTransform.replace('scale(0.5)', 'scale(0.55)');
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.transition = 'transform 0.2s ease-out';
                      const currentTransform = e.target.style.transform;
                      if (currentTransform.includes('scale(0.9)')) {
                        e.target.style.transform = currentTransform.replace('scale(0.9)', 'scale(0.85)');
                      } else if (currentTransform.includes('scale(0.75)')) {
                        e.target.style.transform = currentTransform.replace('scale(0.75)', 'scale(0.7)');
                      } else if (currentTransform.includes('scale(0.55)')) {
                        e.target.style.transform = currentTransform.replace('scale(0.55)', 'scale(0.5)');
                      }
                    }
                  }}
                >
                  {/* Simplified Background Icon */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    opacity: 0.2,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {card.icon === 'web' && <WebIcon size={'80%'} />}
                    {card.icon === 'ui' && <UIIcon size={'80%'} />}
                    {card.icon === 'app' && <AppIcon size={'80%'} />}
                    {card.icon === 'agent' && <AgentIcon size={'80%'} />}
                    {card.icon === 'chatbot' && <ChatbotIcon size={'80%'} />}
                  </div>

                  {/* Card Content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    
                    <h3 style={{
                      color: '#e0e0e0',
                      fontSize: isActive ? '28px' : '20px',
                      fontWeight: 600,
                      marginBottom: isActive ? '15px' : '10px',
                      letterSpacing: '0.02em'
                    }}>
                      {card.title}
                    </h3>

                    <p style={{
                      color: '#888888',
                      fontSize: isActive ? '18px' : '14px',
                      lineHeight: '1.5',
                      marginBottom: isActive ? '25px' : '15px'
                    }}>
                      {card.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      color: card.borderColor,
                      fontSize: isActive ? '16px' : '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Learn More
                    </span>
                    <div style={{
                      width: isActive ? '40px' : '30px',
                      height: isActive ? '40px' : '30px',
                      borderRadius: '50%',
                      backgroundColor: card.borderColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease'
                    }}>
                      <svg width={isActive ? "20" : "16"} height={isActive ? "20" : "16"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '40px'
          }}>
            {serviceCards.map((_, index) => (
              <button
                key={index}
                onClick={() => handleServiceCardClick(index)}
                                  style={{
                    width: index === activeCardIndex ? '24px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: index === activeCardIndex ? 'rgba(147, 51, 234, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: index === activeCardIndex ? 'scale(1.1)' : 'scale(1)'
                  }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutSectionRef} style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000000',
        padding: '120px 40px 80px',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '64px',
            fontWeight: '700',
            marginBottom: '40px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            filter: 'drop-shadow(0 0 20px rgba(0, 212, 170, 0.3))',

          }}>
            About
          </h2>
          <p style={{
            color: '#cccccc',
            fontSize: '20px',
            lineHeight: '1.8',
            maxWidth: '900px',
            margin: '0 auto 80px',
            textAlign: 'center'
          }}>
            I'm a Full Stack Web and App Developer with 3 years of experience as a Software Engineer in the IT industry, specializing in React Native, the MERN stack, and Flutter. I build high-performance, cross-platform applications for both web and mobile, combining intuitive UI with scalable backend systems.
          </p>
          
          <p style={{
            color: '#cccccc',
            fontSize: '18px',
            lineHeight: '1.7',
            maxWidth: '900px',
            margin: '0 auto 80px',
            textAlign: 'center'
          }}>
            I've worked on projects ranging from dynamic web platforms to AI-integrated mobile apps, including building and integrating AI agents to enhance functionality and user experience. My development approach balances clean architecture, optimized performance, and user-focused design.
          </p>
          
          <p style={{
            color: '#cccccc',
            fontSize: '18px',
            lineHeight: '1.7',
            maxWidth: '900px',
            margin: '0 auto 80px',
            textAlign: 'center'
          }}>
            Beyond coding, I'm driven by innovation — exploring emerging technologies, refining existing solutions, and creating digital products that make an impact.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginTop: '80px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)',
              padding: '48px 36px',
              borderRadius: '24px',
              border: '1px solid rgba(0, 212, 170, 0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '350px',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(0, 212, 170, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: 'linear-gradient(90deg, #00d4aa, #00b894, #00d4aa)',
                borderRadius: '24px 24px 0 0'
              }} />
              <h3 style={{
                color: '#00d4aa',
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '24px',
                letterSpacing: '0.02em'
              }}>
                Experience
              </h3>
              <p style={{
                color: '#cccccc',
                fontSize: '17px',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                3+ years as a Software Engineer in the IT industry
              </p>
              <p style={{
                color: '#888888',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                Building scalable applications and leading development teams
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)',
              padding: '48px 36px',
              borderRadius: '24px',
              border: '1px solid rgba(0, 212, 170, 0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '350px',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(0, 212, 170, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: 'linear-gradient(90deg, #00d4aa, #00b894, #00d4aa)',
                borderRadius: '24px 24px 0 0'
              }} />
              <h3 style={{
                color: '#00d4aa',
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '24px',
                letterSpacing: '0.02em'
              }}>
                Tech Stack
              </h3>
              <p style={{
                color: '#cccccc',
                fontSize: '17px',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                React Native, MERN Stack, Flutter
              </p>
              <p style={{
                color: '#888888',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                Full-stack development with modern technologies
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)',
              padding: '48px 36px',
              borderRadius: '24px',
              border: '1px solid rgba(0, 212, 170, 0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '350px',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(0, 212, 170, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: 'linear-gradient(135deg, #00d4aa, #00b894, #00d4aa)',
                borderRadius: '24px 24px 0 0'
              }} />
              <h3 style={{
                color: '#00d4aa',
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '24px',
                letterSpacing: '0.02em'
              }}>
                Specialization
              </h3>
              <p style={{
                color: '#cccccc',
                fontSize: '17px',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                Cross-platform mobile & web applications
              </p>
              <p style={{
                color: '#888888',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                AI-integrated apps with scalable backend systems
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)',
              padding: '48px 36px',
              borderRadius: '24px',
              border: '1px solid rgba(0, 212, 170, 0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(0, 212, 170, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 170, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: 'linear-gradient(90deg, #00d4aa, #00b894, #00d4aa)',
                borderRadius: '24px 24px 0 0'
              }} />
              <h3 style={{
                color: '#00d4aa',
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '24px',
                letterSpacing: '0.02em'
              }}>
                Approach
              </h3>
              <p style={{
                color: '#cccccc',
                fontSize: '17px',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                Clean architecture & performance optimization
              </p>
              <p style={{
                color: '#888888',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                User-focused design with innovation-driven development
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      {/* Contact Section */}
      <section id="contact" ref={contactSectionRef} style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        padding: '120px 0 80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Green Blur Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 70%)',
          filter: 'blur(35px)',
          zIndex: 0
        }} />
        
        {/* Contact Heading */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '64px',
          fontWeight: '700',
          zIndex: 1,
          letterSpacing: '0.02em',
          textAlign: 'center',
          filter: 'drop-shadow(0 0 20px rgba(0, 212, 170, 0.3))',

        }}>
          Contact
        </div>
        
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Left Column - Contact Information */}
          <div style={{ color: 'white' }}>
            <h2 style={{
              fontSize: '56px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '80px',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(0 0 20px rgba(0, 212, 170, 0.3))'
            }}>
              Let's make magic happen
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '16px',
                  letterSpacing: '0.01em'
                }}>
                  Prefer a call?
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: '#ffffff',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  +91 9027224030
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '16px',
                  letterSpacing: '0.01em'
                }}>
                  Drop me a line at
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: '#ffffff',
                  margin: 0,
                  fontWeight: '400'
                }}>
                aniruddhsingh9397@gmail.com
                </p>
              </div>
              
              
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div style={{ color: 'white' }}>
            <div style={{
              backgroundColor: 'rgba(20, 20, 20, 0.8)',
              borderRadius: '16px',
              padding: '48px 40px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '48px',
                letterSpacing: '0.01em'
              }}>
                Enter your contact details
              </h3>
              
              {showSuccessMessage && (
                <div style={{
                  backgroundColor: 'rgba(0, 212, 170, 0.1)',
                  border: '1px solid rgba(0, 212, 170, 0.3)',
                  borderRadius: '12px',
                  padding: '20px 24px',
                  marginBottom: '32px',
                  color: '#00d4aa',
                  fontSize: '16px',
                  fontWeight: '600',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0, 212, 170, 0.2)',
                  animation: 'slideInDown 0.5s ease-out'
                }}>
                  ✨ Thank you for contacting us! We'll get back to you soon.
                </div>
              )}
              
              {formErrors.general && (
                <div style={{
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 0, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  color: '#ff6b6b',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {formErrors.general}
                </div>
              )}
              
              <form 
                action="https://formspree.io/f/myzplpwq"
                method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                onSubmit={handleFormSubmit}
              >
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '12px',
                    letterSpacing: '0.01em'
                  }}>
                    Your name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: `2px solid ${formErrors.name ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'}`,
                      color: '#ffffff',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontWeight: '400'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor = '#00d4aa';
                      e.target.style.borderBottomWidth = '2px';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor = formErrors.name ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)';
                      e.target.style.borderBottomWidth = '2px';
                    }}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  {formErrors.name && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>{formErrors.name}</p>}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#ffffff',
                      marginBottom: '12px',
                      letterSpacing: '0.01em'
                    }}>
                      Your email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: `2px solid ${formErrors.email ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'}`,
                        color: '#ffffff',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontWeight: '400'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderBottomColor = '#00d4aa';
                        e.target.style.borderBottomWidth = '2px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderBottomColor = formErrors.email ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)';
                        e.target.style.borderBottomWidth = '2px';
                      }}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {formErrors.email && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>{formErrors.email}</p>}
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#ffffff',
                      marginBottom: '12px',
                      letterSpacing: '0.01em'
                    }}>
                      Your phone *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      style={{
                        width: '100%',
                        padding: '16px 0',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: `2px solid ${formErrors.phone ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'}`,
                        color: '#ffffff',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontWeight: '400'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderBottomColor = '#00d4aa';
                        e.target.style.borderBottomWidth = '2px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderBottomColor = formErrors.phone ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)';
                        e.target.style.borderBottomWidth = '2px';
                      }}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    {formErrors.phone && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>{formErrors.phone}</p>}
                  </div>
                </div>
                
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '12px',
                    letterSpacing: '0.01em'
                  }}>
                     project name
                    <span style={{
                      color: '#00d4aa',
                      cursor: 'help',
                      fontSize: '18px',
                      fontWeight: '600',
                      width: '20px',
                      height: '20px',
                     // borderRadius: '50%',
                      //backgroundColor: 'rgba(0, 212, 170, 0.1)',
                      display: 'flex',
                     // alignItems: 'center',
                      justifyContent: 'center',
                    // border: '1px solid rgba(0, 212, 170, 0.3)'
                    }}></span>
                  </label>
                  <input
                    name="company"
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: formErrors.company ? '2px solid #ff6b6b' : '2px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontWeight: '400'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor = '#00d4aa';
                      e.target.style.borderBottomWidth = '2px';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor = formErrors.company ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)';
                      e.target.style.borderBottomWidth = '2px';
                    }}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                  {formErrors.company && (
                    <p style={{ 
                      color: '#ff6b6b', 
                      fontSize: '12px', 
                      marginTop: '4px' 
                    }}>
                      {formErrors.company}
                    </p>
                  )}
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '12px',
                    letterSpacing: '0.01em'
                  }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: `2px solid ${formErrors.message ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'}`,
                      color: '#ffffff',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      fontWeight: '400',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor = '#00d4aa';
                      e.target.style.borderBottomWidth = '2px';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor = formErrors.message ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)';
                      e.target.style.borderBottomWidth = '2px';
                    }}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                  {formErrors.message && <p style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>{formErrors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                   // backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: isSubmitting ? '#888888' : '#ffffff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                   // marginTop: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    position: 'relative',
                    letterSpacing: '0.01em',
                    boxShadow: isSubmitting ? '0 0 0 2px #666666, 0 0 15px rgba(102, 102, 102, 0.4)' : '0 0 0 2px #00d4aa, 0 0 15px rgba(0, 212, 170, 0.4)',
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    // backgroundClip: 'padding-box',
                    width: 'fit-content',
                    minWidth: '120px',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.boxShadow = '0 0 0 2px #00d4aa, 0 0 25px rgba(0, 212, 170, 0.6)';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.boxShadow = '0 0 0 2px #00d4aa, 0 0 15px rgba(0, 212, 170, 0.4)';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send message'}
                  <span style={{ 
                    fontSize: '14px', 
                    transform: 'rotate(-45deg)',
                    fontWeight: 'bold'
                  }}></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {modalOpen && selectedCard && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={() => {
          setModalOpen(false);
          setSelectedCard(null);
        }}
        >
          <div style={{
            position: 'relative',
            width: '400px',
            height: '600px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            backgroundColor: '#000000'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedCard.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover'
              }}
            />
            
            {/* View Project Button */}
            <button
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: '#ffffff',
                border: 'none',
                padding: '16px 24px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                e.target.style.borderTopColor = 'rgba(0, 212, 170, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                e.target.style.borderTopColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onClick={() => {
                window.open(selectedCard.url, '_blank');
              }}
                          >
                <span style={{ fontSize: '16px' }}>→</span>
                View Project
              </button>
            
            {/* Close Button */}
            <button
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => {
                setModalOpen(false);
                setSelectedCard(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
