
import React from 'react';
import { ShieldCheck, Trophy, Users, Zap, ArrowRight, Share2 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-black text-2xl">P</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">PlayChale</span>
        </div>
        <button 
          onClick={onGetStarted}
          className="bg-white/10 hover:bg-white/20 transition-all text-sm font-bold px-6 py-2.5 rounded-full border border-white/10"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/20 blur-[120px] rounded-full -z-10"></div>
        
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Zap className="w-3 h-3" /> Now Live in Accra
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.05]">
          Your Sports Identity,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">
            Authenticated.
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Stop arguing about who's the GOAT in your circle. Build a verified sports profile, 
          record your wins, and let the data speak for itself. Professional stats for the regular athlete.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onGetStarted}
            className="group relative w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-black text-lg px-10 py-5 rounded-2xl shadow-2xl shadow-orange-600/20 transition-all flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Build Your Profile</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
          
          <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-10 py-5 rounded-2xl border border-white/5 transition-all">
            See Rankings
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            {
              icon: ShieldCheck,
              title: "Verified by Peers",
              desc: "Every win you record is vouched for by opponents and teammates, building your Trust Score."
            },
            {
              icon: Share2,
              title: "Social Sports Cards",
              desc: "Share your professional-grade sports card on Instagram or WhatsApp. Show off your 99 Rating."
            },
            {
              icon: Trophy,
              title: "Tournament Ready",
              desc: "Organizers can instantly see your authenticated skill level to seed you fairly in local games."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[32px] text-left hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-orange-600/20 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white/5 border-y border-white/10 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-10">Trusted by Communities in</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-black">ACCRA BASKETBALL</span>
            <span className="text-2xl font-black">OSU CHESS CLUB</span>
            <span className="text-2xl font-black">GHANA E-SPORTS</span>
            <span className="text-2xl font-black">KOTOBABI FC</span>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-black mb-6">Don't just play. Play Authentically.</h2>
        <p className="text-slate-400 mb-10">Join 2,000+ local athletes building the future of amateur sports recognition.</p>
        <button 
          onClick={onGetStarted}
          className="bg-white text-slate-950 font-black px-12 py-4 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-xl"
        >
          Get My Card Now
        </button>
        <div className="mt-20 text-slate-600 text-sm">
          &copy; 2024 PlayChale. Built with ❤️ for the community.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
