
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="relative h-[400px] flex items-center justify-center bg-sustaina-green">
        <div className="max-w-4xl text-center px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Rooted in Ghana.</h1>
          <p className="text-xl text-stone-300 font-medium">Empowering local farmers and bringing the healthiest organic produce to every home in Ghana.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-stone-900">Our Mission</h2>
            <p className="text-stone-600 leading-relaxed text-lg">
              In a world of global supply chains, we believe the best food is the one grown in your own backyard. Sustaina Ghana was founded to bridge the gap between hard-working smallholder farmers and health-conscious consumers in urban Ghana.
            </p>
            <p className="text-stone-600 leading-relaxed text-lg">
              We focus on traditional heirloom varieties like Pona Yam and stone-free local rice, ensuring that Ghana's rich agricultural heritage is preserved and celebrated.
            </p>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Farmer Stories</h2>
          <p className="text-stone-500">Meet the people who grow your food.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Kofi Owusu",
              region: "Eastern Region",
              crop: "Yam & Cassava",
              story: "Kofi has been farming organically for 20 years, preserving the soil for his grandchildren.",
              img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
            },
            {
              name: "Abena Mansa",
              region: "Volta Region",
              crop: "Tilapia & Rice",
              story: "Abena leads a women's cooperative in Kpando, processing the finest smoked fish.",
              img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800"
            },
            {
              name: "Emmanuel Tetteh",
              region: "Northern Region",
              crop: "Organic Vegetables",
              story: "Emmanuel uses innovative water management to grow fresh tomatoes year-round.",
              img: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800"
            }
          ].map((farmer, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-stone-100 text-center hover:translate-y-[-10px] transition-transform shadow-sm">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-lg">
                <img src={farmer.img} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-1">{farmer.name}</h3>
              <p className="text-sustaina-green font-bold text-xs uppercase mb-4">{farmer.region} • {farmer.crop}</p>
              <p className="text-stone-500 text-sm italic">"{farmer.story}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
