import React from "react";
import "./About.css";

const data = [
  {
    title: "Our Mission",
    items: [
      {
        icon: "💪",
        title: "Transform Lives",
        desc: "We help people build strength, confidence and a healthy lifestyle."
      },
      {
        icon: "⭐",
        title: "Excellence",
        desc: "Top-class equipment, certified trainers and premium facilities."
      },
      {
        icon: "👥",
        title: "Community",
        desc: "A motivating environment where everyone grows together."
      }
    ]
  },
  {
    title: "Our Values",
    items: [
      {
        icon: "🎯",
        title: "Dedication",
        desc: "Your goals are our responsibility."
      },
      {
        icon: "👔",
        title: "Professionalism",
        desc: "High standards in training, hygiene and discipline."
      },
      {
        icon: "🧘",
        title: "Wellness",
        desc: "Fitness, nutrition and mental well-being combined."
      }
    ]
  },
  {
    title: "Our Services",
    items: [
      {
        icon: "🏋️",
        title: "Personal Training",
        desc: "One-on-one coaching with certified professionals."
      },
      {
        icon: "🔥",
        title: "Group Classes",
        desc: "HIIT, Yoga, Strength & Cardio sessions."
      },
      {
        icon: "📊",
        title: "Fitness Assessment",
        desc: "Track your progress with body analysis reports."
      }
    ]
  }
];

const About = () => {
  return (
    <section className="about-page">
      {/* HERO */}
      <div className="about-hero">
        <h1>About Our Fitness Club</h1>
        <p>Train Hard • Stay Strong • Live Better</p>
      </div>

      {/* CONTENT */}
      <div className="about-wrapper">
        {data.map((section, i) => (
          <div className="about-section" key={i}>
            <h2>{section.title}</h2>

            <div className="about-cards">
              {section.items.map((item, index) => (
                <div className="about-card" key={index}>
                  <span className="icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
