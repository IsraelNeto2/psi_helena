import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Video, MapPin, CheckCircle, AtSign } from 'lucide-react';
import heroBg from './assets/hero_bg.jpg';
import psychologist from './assets/psychologist.png';

gsap.registerPlugin(ScrollTrigger);

// A. NAVBAR
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -10%',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
        onUpdate: (self) => {
          if (self.isActive) {
            navRef.current.classList.add('bg-cream/70', 'backdrop-blur-xl', 'border-moss/10', 'text-moss');
            navRef.current.classList.remove('text-cream', 'border-transparent');
          } else {
            navRef.current.classList.remove('bg-cream/70', 'backdrop-blur-xl', 'border-moss/10', 'text-moss');
            navRef.current.classList.add('text-cream', 'border-transparent');
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed left-1/2 -translate-x-1/2 top-6 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-5xl rounded-[3rem] border border-transparent text-cream transition-all duration-300"
    >
      <div className="font-outfit font-bold text-xl tracking-tight text-white nav-logo">Helena Cristina.</div>
      <div className="hidden md:flex gap-8 items-center text-sm font-jakarta font-medium">
        <a href="#about" className="hover-lift">Abordagem</a>
        <a href="#features" className="hover-lift">Especialidades</a>
        <a href="#protocol" className="hover-lift">Acompanhamento</a>
      </div>
      <a
        href="https://wa.me/5517997435917?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta."
        target="_blank"
        rel="noopener noreferrer"
        className="magnetic-btn bg-clay text-cream px-5 py-2 rounded-full text-sm font-jakarta font-medium shadow-lg hidden md:block"
      >
        Agendar Consulta
      </a>
    </nav>
  );
};

// B. HERO SECTION
const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-text-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.2 });
      gsap.from('.hero-text-2', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15, delay: 0.6 });
      gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.2 });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full h-[100dvh] flex flex-col justify-end p-8 md:p-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${heroBg})`, backgroundPosition: 'center 10%' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-moss via-moss/80 to-transparent"></div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl text-cream font-jakarta font-bold mb-4">
          <span className="hero-text-1 block opacity-0">A jornada interior é a</span>
          <span className="hero-text-2 block font-drama text-5xl md:text-8xl mt-2 text-clay opacity-0 italic">transformação autêntica.</span>
        </h1>
        <p className="hero-cta text-cream/80 font-jakarta max-w-xl text-lg mt-6 mb-8 opacity-0">
          Psicóloga Helena Cristina • CRP 06/199771 <br />Atendimento clínico e atuação guiada pela consciência plena e acolhimento humano.
        </p>
        <button className="hero-cta magnetic-btn flex items-center gap-3 bg-clay text-cream px-8 py-4 rounded-full text-lg font-jakarta font-semibold shadow-xl opacity-0">
          Iniciar Acompanhamento <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

// C. FEATURES (Diagnostic Shuffler, Telemetry Typewriter, Cursor Protocol Scheduler)
const DiagnosticShuffler = () => {
  const [index, setIndex] = useState(0);
  const labels = ['Reconhecer a dor.', 'Acolher a emoção.', 'Transformar o ser.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % labels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [labels.length]);

  return (
    <div className="card-solid p-8 rounded-[2rem] h-[300px] flex flex-col justify-between relative overflow-hidden group">
      <div>
        <h3 className="text-xl font-bold font-jakarta text-moss mb-2">Autoconsciência</h3>
        <p className="text-sm text-moss/70 font-jakarta">O caminho para o autoconhecimento profundo.</p>
      </div>
      <div className="relative h-24 mt-8">
        {labels.map((label, i) => {
          const isActive = i === index;
          const isPrev = i === (index - 1 + labels.length) % labels.length;
          return (
            <div
              key={i}
              className={`absolute w-full p-4 rounded-xl bg-moss text-cream font-data text-sm flex items-center transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1)`}
              style={{
                top: isActive ? '0' : isPrev ? '-40px' : '40px',
                opacity: isActive ? 1 : 0,
                transform: `scale(${isActive ? 1 : 0.95})`,
                zIndex: isActive ? 10 : 0
              }}
            >
              <CheckCircle size={16} className="mr-3 text-clay" /> {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "Foco clínico nos desafios e transições ao longo do amadurecimento humano.";

  useEffect(() => {
    let current = '';
    let i = 0;
    const interval = setInterval(() => {
      current += fullText[i];
      setText(current);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 60); // typewriter speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-solid p-8 rounded-[2rem] h-[300px] flex flex-col relative overflow-hidden group">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold font-jakarta text-moss">Público Jovem & Adulto</h3>
        <span className="flex items-center text-xs font-data text-clay bg-clay/10 px-2 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-clay animate-pulse mr-2"></span>Live Feed
        </span>
      </div>
      <p className="text-sm text-moss/70 font-jakarta mb-6">Apoio nas fases críticas de transição.</p>
      <div className="mt-auto bg-moss/5 rounded-xl p-4 font-data text-sm h-32 text-moss/90 leading-relaxed border border-moss/10">
        &gt; {text}<span className="inline-block w-2 bg-clay ml-1 animate-pulse h-4 align-middle"></span>
      </div>
    </div>
  );
};

const CursorProtocolScheduler = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.to('.cursor-svg', { x: 120, y: 30, duration: 1, ease: 'power2.inOut' })
        .to('.cursor-svg', { scale: 0.9, duration: 0.1 })
        .to('.day-cell', { backgroundColor: 'var(--clay)', color: 'var(--cream)', duration: 0.1 }, '<')
        .to('.cursor-svg', { scale: 1, duration: 0.1 })
        .to('.cursor-svg', { x: 220, y: 120, duration: 1, ease: 'power2.inOut', delay: 0.3 })
        .to('.cursor-svg', { opacity: 0, duration: 0.3 })
        .to('.day-cell', { backgroundColor: 'transparent', color: 'var(--moss)', duration: 0.3, delay: 0.5 })
        .set('.cursor-svg', { x: 0, y: 0, opacity: 1 });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="card-solid p-8 rounded-[2rem] h-[300px] flex flex-col justify-between relative overflow-hidden group">
      <div>
        <h3 className="text-xl font-bold font-jakarta text-moss mb-2">Múltiplos Formatos</h3>
        <p className="text-sm text-moss/70 font-jakarta">Presencial na clínica, ou onde você estiver.</p>
      </div>
      <div className="relative mt-4 flex-1 outline outline-1 outline-moss/10 rounded-xl p-2 bg-cream" ref={svgRef}>
        <div className="grid grid-cols-5 gap-1 mb-2 text-center text-xs font-data text-moss/40 pb-2 border-b border-moss/10">
          <span>Se</span><span>Te</span><span>Qu</span><span>Qu</span><span>Se</span>
        </div>
        <div className="grid grid-cols-5 gap-1 text-center font-data text-xs flex-1">
          <div className="py-2 rounded-lg text-moss">10</div>
          <div className="py-2 rounded-lg text-moss">11</div>
          <div className="py-2 rounded-lg day-cell border border-moss/10 transition-colors">12</div>
          <div className="py-2 rounded-lg text-moss">13</div>
          <div className="py-2 rounded-lg text-moss">14</div>
        </div>

        {/* Animated Format Buttons */}
        <div className="flex gap-2 justify-center mt-2">
          <span className="flex items-center text-xs px-2 py-1 bg-moss/5 text-moss rounded">
            <Video size={12} className="mr-1" /> Online
          </span>
          <span className="flex items-center text-xs px-2 py-1 bg-moss/5 text-moss rounded">
            <MapPin size={12} className="mr-1" /> Presencial
          </span>
        </div>

        <svg className="cursor-svg absolute top-10 left-5 w-5 h-5 z-20 pointer-events-none drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--charcoal)' }}>
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="currentColor" />
          <path d="m13 13 6 6" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => (
  <section id="features" className="py-32 px-6 md:px-24 bg-cream">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-outfit text-moss font-semibold mb-4">Artefatos de Cuidado</h2>
        <p className="text-moss/60 font-jakarta max-w-2xl text-lg">A estrutura do processo psicoterápico é adaptável à sua realidade mental e logística.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <CursorProtocolScheduler />
      </div>
    </div>
  </section>
);

// D. PHILOSOPHY
const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.manifesto-word');
      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        rotation: 3,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-40 px-6 md:px-24 bg-charcoal text-cream overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-10">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center"></div>

      <div className="relative max-w-5xl mx-auto z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-clay/30 group">
            <img src={psychologist} alt="Helena Cristina" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 -scale-x-100" />
            <div className="absolute inset-0 border-2 border-clay/0 group-hover:border-clay/20 transition-all duration-500 m-2 rounded-xl"></div>
          </div>
        </div>
        <div className="md:w-2/3">
          <p className="font-data text-clay mb-8 text-sm uppercase tracking-widest border-s-2 border-clay pl-4">A Perspectiva</p>
          <p className="text-lg md:text-2xl font-jakarta text-cream/50 mb-6 max-w-2xl leading-relaxed">
            O modelo padrão foca na patologização das vivências e em enquadramentos rígidos que limitam a compreensão do humano.
          </p>
          <h2 className="text-4xl md:text-7xl font-drama font-medium leading-[1.1]">
            Nós focamos em nutrir a <span className="text-moss">singularidade</span> da sua história de forma integrativa.
          </h2>
        </div>
      </div>
    </section>
  );
};

// E. PROTOCOL (Sticky Stacking)
const ProtocolCard = ({ step, title, desc1, desc2, index }) => {
  return (
    <div className="protocol-card h-[100vh] w-full flex items-center justify-center sticky top-0" style={{ zIndex: index }}>
      <div className="w-[90%] max-w-5xl h-[70vh] bg-cream rounded-[3rem] shadow-2xl border border-moss/10 flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-moss/10 bg-moss/5 relative">
          <div className="absolute w-64 h-64 border border-moss/20 rounded-full animate-[spin_60s_linear_infinite] top-0 right-0 -m-20"></div>
          <div className="absolute w-48 h-48 border border-moss/10 rounded-full animate-[spin_40s_linear_infinite_reverse] top-10 right-10 -m-20"></div>
          <span className="font-data text-clay text-6xl md:text-9xl font-light opacity-50 mb-6 relative z-10">{step}</span>
        </div>
        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-cream z-10">
          <h3 className="text-4xl font-outfit text-moss font-bold mb-6">{title}</h3>
          <p className="font-jakarta text-moss/70 text-lg mb-4">{desc1}</p>
          <p className="font-jakarta text-moss/70 text-lg">{desc2}</p>
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          animation: gsap.to(card.children[0], { scale: 0.9, opacity: 0.5, filter: 'blur(10px)', y: -20, ease: 'none' }),
          scrub: true
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="protocol" className="bg-cream relative pb-32">
      <div className="max-w-5xl mx-auto pt-32 px-6">
        <p className="font-data text-clay text-sm uppercase tracking-widest text-center mb-4">O Processo Terapêutico</p>
      </div>
      <ProtocolCard
        index={1} step="01" title="Acolhimento Lógico"
        desc1="Um espaço livre de julgamentos para esvaziar a pressão dos pensamentos e mapear o terreno da sua mente."
        desc2="Compreendemos as demandas atuais (sociais, profissionais, intrapessoais)."
      />
      <ProtocolCard
        index={2} step="02" title="Desconstrução Consciente"
        desc1="Investigação dos padrões repetitivos através da lente psicológica, com foco no público juvenil/adulto."
        desc2="Reestruturação de crenças enraizadas e fomento da autoconsciência."
      />
      <ProtocolCard
        index={3} step="03" title="Reposicionamento"
        desc1="Integração de novas formas de lidar com a realidade clínica e externa."
        desc2="Você ganha autonomia para continuar construindo sua história com mais saúde mental."
      />
    </section>
  );
};

// F & G. MEMBERSHIP / FOOTER
const CTAAndFooter = () => {
  return (
    <footer className="bg-charcoal pt-32 rounded-t-[4rem] relative z-20 mt-[-4rem] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-moss/40 to-transparent"></div>
      <div className="max-w-3xl mx-auto px-6 mb-32 text-center">
        <h2 className="text-4xl md:text-6xl text-cream mb-8 font-drama">Inicie o cuidado que você precisa.</h2>
        <p className="text-cream/50 max-w-xl mx-auto mb-10 font-jakarta">Valores das sessões e protocolos são passados de forma ética e individualizada no primeiro contato. O atendimento social pode ter condições adaptadas (sujeito a triagem).</p>
        <a
          href="https://wa.me/5517997435917?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta."
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn bg-moss text-cream px-10 py-5 rounded-[2rem] text-xl font-outfit shadow-2xl hover:bg-moss/80 transition-colors inline-block"
        >
          Entrar em Contato Agora
        </a>
      </div>

      <div className="border-t border-moss/20 py-12 px-6 md:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-cream/70 font-jakarta text-sm">
          <div className="md:col-span-2">
            <h4 className="text-3xl font-outfit text-white font-bold mb-4">Helena Cristina.</h4>
            <p className="mb-6 max-w-xs">Psicóloga Clínica e Social dedicada ao desenvolvimento juvenil e adulto através da autoconsciência.</p>
            <div className="flex items-center font-data text-xs border border-moss/30 rounded-full px-4 py-2 w-max bg-moss/10 text-moss">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
              Agenda Operacional
            </div>
          </div>
          <div>
            <h5 className="text-cream font-bold mb-4">Navegação</h5>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-clay transition-colors">Início</a></li>
              <li><a href="#about" className="hover:text-clay transition-colors">Abordagem</a></li>
              <li><a href="#features" className="hover:text-clay transition-colors">Especialidades</a></li>
              <li><a href="#protocol" className="hover:text-clay transition-colors">Processo</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-cream font-bold mb-4">Contato Oficial</h5>
            <ul className="space-y-3 flex flex-col">
              <a href="https://wa.me/5517997435917?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer" className="hover:text-clay transition-colors">(17) 99743-5917</a>
              <span>Online e Presencial</span>
              <a href="mailto:contato@helenacristina.com" className="hover:text-clay transition-colors">contato@helenacristina.com</a>
            </ul>
          </div>
        </div>
        <div className="mt-16 text-center text-xs font-data text-cream/30">
          © 2026. Psicóloga Helena Cristina. Interface por Antigravity Systems.
        </div>
      </div>
    </footer>
  );
};

// INITIALIZATION
const App = () => {
  return (
    <div className="bg-cream min-h-screen text-charcoal">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CTAAndFooter />
    </div>
  );
}

export default App;
