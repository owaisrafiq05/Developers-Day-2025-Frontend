"use client"
import { useEffect, useRef } from "react"
import Cards from "@/components/TeamComponents/Cards"
import Squares from "@/components/Squares/Squares"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TeamHero from "@/components/TeamComponents/TeamHero"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Team() {
  const sectionRef = useRef(null)
  const excomRef = useRef(null)
  const devRef = useRef(null)

  // Define team members
  const excomTeamMembers = [
    {
      name: "John Doe",
      designation: "Chief Executive Officer",
      image: "/images/team/team1.jpg",
    },
    {
      name: "Jane Smith",
      designation: "Chief Technology Officer",
      image: "/images/team/person.avif",
    },
    {
      name: "Alice Johnson",
      designation: "Chief Marketing Officer",
      image: "/images/team/person.avif",
    },
  ]

  const devTeamMembers = [
    {
      name: "Bob Williams",
      designation: "Front-end Developer",
      image: "/images/team/person.avif",
    },
    {
      name: "Sarah Miller",
      designation: "Full-stack Developer",
      image: "/images/team/person.avif",
    },
    {
      name: "Mike Chen",
      designation: "UI/UX Designer",
      image: "/images/team/person.avif",
    },
  ]

  useEffect(() => {
    // Only run animations on the client side
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Heading Animation
      gsap.from(".team-heading", {
        scrollTrigger: {
          trigger: ".team-heading",
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
        scale: 2,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".team-description", {
        scrollTrigger: {
          trigger: ".team-description",
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
        opacity: 0,
        y: 20,
        duration: 1,
      });

      // ExCom section animations
      gsap.from(".excom-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: excomRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".excom-description", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: excomRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Dev team section animations
      gsap.from(".dev-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: devRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".dev-description", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: devRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
    <TeamHero />
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
    <Squares
          squareSize={40}
          borderColor="#000"
        />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero content */}
        <div className="text-center mb-16">
          <h1 className="team-heading text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
          <p className="team-description text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented individuals behind our success. Our team combines expertise, 
            creativity, and passion to deliver exceptional results.
          </p>
        </div>
        
        {/* ExCom Team Section */}
        <div ref={excomRef} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="excom-heading text-3xl font-bold mb-4">Executive Committee</h2>
            <p className="excom-description text-lg text-gray-600 max-w-2xl mx-auto">
              Our leadership team brings years of experience and strategic vision to guide our company.
            </p>
          </div>
          
          <Cards teamMembers={excomTeamMembers} />
        </div>
        
        {/* Developer Team Section */}
        <div ref={devRef}>
          <div className="text-center mb-12">
            <h2 className="dev-heading text-3xl font-bold mb-4">Development Team</h2>
            <p className="dev-description text-lg text-gray-600 max-w-2xl mx-auto">
              The talented developers who built and maintain our website and digital presence.
            </p>
          </div>
          
          <Cards teamMembers={devTeamMembers} />
        </div>
      </div>
    </section>
    </div>
  )
}