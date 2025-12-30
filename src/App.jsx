import React, { useState, useEffect } from 'react';
import { 
  MapPin, Users, Calendar, Clock, ChevronRight, Plus, Check, Vote, Navigation, 
  DollarSign, Utensils, ArrowLeft, Send, Star, ThumbsUp, Home, Bell, Settings,
  Search, Filter, X, Heart, Share2, Phone, Globe, ChevronDown, Edit3, Camera,
  LogOut, Moon, HelpCircle, Shield, MessageCircle, Image, Smile, Crown,
  Zap, Target, TrendingUp, Award, Coffee, Pizza, Wine, Beef, Fish, Salad,
  Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Map
} from 'lucide-react';

// ============ MOCK DATA ============
const mockGroups = [
  { id: 1, name: 'Sexta dos Amigos', emoji: '🍻', members: 6, lastEvent: 'Há 3 dias', color: '#FF6B35', hasActiveEvent: true },
  { id: 2, name: 'Casal + Friends', emoji: '💑', members: 4, lastEvent: 'Há 1 semana', color: '#7B2CBF', hasActiveEvent: false },
  { id: 3, name: 'Galera do Trampo', emoji: '💼', members: 8, lastEvent: 'Há 2 semanas', color: '#00B4D8', hasActiveEvent: true },
  { id: 4, name: 'Família Unida', emoji: '👨‍👩‍👧‍👦', members: 12, lastEvent: 'Há 1 mês', color: '#10B981', hasActiveEvent: false },
];

const mockRestaurants = [
  { id: 1, name: 'Madero Container', cuisine: 'Hamburgueria', price: '$$', rating: 4.5, distance: '1.2km', votes: 3, image: '🍔', avgPrice: 'R$ 65/pessoa', address: 'Av. Brasil, 1500', phone: '(47) 3333-1234', hours: '11h - 23h', description: 'Hambúrgueres artesanais premium com ingredientes selecionados.' },
  { id: 2, name: 'Outback Steakhouse', cuisine: 'Americana', price: '$$$', rating: 4.3, distance: '2.1km', votes: 2, image: '🥩', avgPrice: 'R$ 95/pessoa', address: 'Shopping Mueller, Piso L3', phone: '(47) 3333-5678', hours: '11h30 - 23h', description: 'Steakhouse australiano com cortes especiais e ambiente descontraído.' },
  { id: 3, name: 'Coco Bambu', cuisine: 'Frutos do Mar', price: '$$$', rating: 4.7, distance: '3.4km', votes: 1, image: '🦐', avgPrice: 'R$ 120/pessoa', address: 'Av. Atlântica, 500', phone: '(47) 3333-9012', hours: '12h - 00h', description: 'Especialidades em frutos do mar com vista para o mar.' },
  { id: 4, name: 'Piazza Italia', cuisine: 'Italiana', price: '$$', rating: 4.4, distance: '1.8km', votes: 0, image: '🍝', avgPrice: 'R$ 75/pessoa', address: 'Rua das Flores, 200', phone: '(47) 3333-3456', hours: '18h - 23h', description: 'Massas artesanais e pizzas no forno a lenha.' },
  { id: 5, name: 'Tanuki Sushi', cuisine: 'Japonesa', price: '$$$', rating: 4.6, distance: '2.5km', votes: 0, image: '🍣', avgPrice: 'R$ 110/pessoa', address: 'Rua Japão, 88', phone: '(47) 3333-7890', hours: '19h - 23h30', description: 'Culinária japonesa autêntica com sushiman premiado.' },
];

const mockMembers = [
  { id: 1, name: 'Você', fullName: 'Tauâna Garcia', username: 'tauanagarcia', avatar: '👩‍🦰', confirmed: true, isAdmin: true, isFriend: true, location: 'Centro', distance: '0km' },
  { id: 2, name: 'João', fullName: 'João Pedro', username: 'joaopedro', avatar: '🧔', confirmed: true, isAdmin: false, isFriend: true, location: 'Itajaí', distance: '12km' },
  { id: 3, name: 'Maria', fullName: 'Maria Clara', username: 'mariaclara', avatar: '👩', confirmed: true, isAdmin: false, isFriend: true, location: 'Navegantes', distance: '8km' },
  { id: 4, name: 'Pedro', fullName: 'Pedro Henrique', username: 'pedrohenrique', avatar: '🧑', confirmed: false, isAdmin: false, isFriend: true, location: 'Balneário', distance: '15km' },
  { id: 5, name: 'Ana', fullName: 'Ana Beatriz', username: 'anabeatriz', avatar: '👱‍♀️', confirmed: false, isAdmin: false, isFriend: true, location: 'Penha', distance: '20km' },
  { id: 6, name: 'Lucas', fullName: 'Lucas Oliveira', username: 'lucas.oliveira', avatar: '👨‍🦱', confirmed: false, isAdmin: false, isFriend: true, location: 'Piçarras', distance: '18km' },
];

const mockSearchUsers = [
  { id: 7, fullName: 'Carolina Santos', username: 'carolsantos', avatar: '👩‍🦱', mutualFriends: 5, isFriend: false, requestSent: false },
  { id: 8, fullName: 'Rafael Costa', username: 'rafaelcosta', avatar: '🧑‍🦲', mutualFriends: 3, isFriend: false, requestSent: false },
  { id: 9, fullName: 'Juliana Lima', username: 'ju.lima', avatar: '👩‍🔬', mutualFriends: 8, isFriend: false, requestSent: true },
  { id: 10, fullName: 'Bruno Almeida', username: 'brunoalmeida', avatar: '🧔‍♂️', mutualFriends: 2, isFriend: false, requestSent: false },
  { id: 11, fullName: 'Fernanda Souza', username: 'fesouza', avatar: '👱‍♀️', mutualFriends: 12, isFriend: false, requestSent: false },
];

const mockFriendRequests = [
  { id: 12, fullName: 'Gustavo Martins', username: 'gumartins', avatar: '🧑‍💼', mutualFriends: 4 },
  { id: 13, fullName: 'Isabela Ferreira', username: 'isaferreira', avatar: '👩‍🎤', mutualFriends: 7 },
];

const mockNotifications = [
  { id: 1, type: 'event', title: 'Novo evento criado', message: 'João criou "Happy Hour Sexta" no grupo Sexta dos Amigos', time: '5 min', read: false },
  { id: 2, type: 'vote', title: 'Votação encerrada', message: 'Madero Container foi escolhido para o encontro de amanhã!', time: '1h', read: false },
  { id: 3, type: 'confirm', title: 'Maria confirmou presença', message: 'Agora são 4 confirmados para o Happy Hour', time: '2h', read: true },
  { id: 4, type: 'reminder', title: 'Lembrete', message: 'O encontro "Almoço de Domingo" é amanhã às 12h', time: '1 dia', read: true },
];

const mockMessages = [
  { id: 1, user: 'João', avatar: '🧔', message: 'E aí galera, bora confirmar pra sexta?', time: '14:30', isMe: false },
  { id: 2, user: 'Maria', avatar: '👩', message: 'Bora! To dentro 🙌', time: '14:32', isMe: false },
  { id: 3, user: 'Você', avatar: '👩‍🦰', message: 'Fechado! Já votei no Madero', time: '14:35', isMe: true },
  { id: 4, user: 'Pedro', avatar: '🧑', message: 'Deixa eu ver se consigo sair mais cedo do trampo', time: '14:40', isMe: false },
  { id: 5, user: 'Ana', avatar: '👱‍♀️', message: 'Vou tentar ir também!', time: '15:02', isMe: false },
];

const cuisineTypes = [
  { id: 1, name: 'Todos', icon: Utensils, color: '#FF6B35' },
  { id: 2, name: 'Hambúrguer', icon: Coffee, color: '#F59E0B' },
  { id: 3, name: 'Pizza', icon: Pizza, color: '#EF4444' },
  { id: 4, name: 'Japonesa', icon: Fish, color: '#EC4899' },
  { id: 5, name: 'Carnes', icon: Beef, color: '#8B5CF6' },
  { id: 6, name: 'Saudável', icon: Salad, color: '#10B981' },
];

// ============ MAIN APP ============
export default function FerinoApp() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [votes, setVotes] = useState({});
  const [members, setMembers] = useState(mockMembers);
  const [favorites, setFavorites] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(mockNotifications);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(1);
  const [searchUsers, setSearchUsers] = useState(mockSearchUsers);
  const [friendRequests, setFriendRequests] = useState(mockFriendRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Splash screen auto-advance
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('onboarding'), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleVote = (restaurantId) => {
    setVotes(prev => ({ ...prev, [restaurantId]: !prev[restaurantId] }));
  };

  const toggleConfirm = (memberId) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, confirmed: !m.confirmed } : m));
  };

  const toggleFavorite = (restaurantId) => {
    setFavorites(prev => ({ ...prev, [restaurantId]: !prev[restaurantId] }));
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        user: 'Você',
        avatar: '👩‍🦰',
        message: newMessage,
        time: 'Agora',
        isMe: true
      }]);
      setNewMessage('');
    }
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const sendFriendRequest = (userId) => {
    setSearchUsers(prev => prev.map(u => u.id === userId ? { ...u, requestSent: true } : u));
  };

  const acceptFriendRequest = (userId) => {
    setFriendRequests(prev => prev.filter(r => r.id !== userId));
    // Add to members/friends list
  };

  const declineFriendRequest = (userId) => {
    setFriendRequests(prev => prev.filter(r => r.id !== userId));
  };

  // ============ PHONE FRAME ============
  const PhoneFrame = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 480);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobile: fullscreen, sem frame
    if (isMobile) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, #0F0F1A 0%, #16162A 100%)',
          overflow: 'hidden',
        }}>
          {children}
        </div>
      );
    }

    // Desktop: com frame de celular
    return (
      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '780px',
        margin: '0 auto',
        background: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A2E 100%)',
        borderRadius: '44px',
        padding: '12px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '130px',
          height: '32px',
          background: '#000',
          borderRadius: '20px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a1a2e' }} />
          <div style={{ width: '50px', height: '4px', borderRadius: '2px', background: '#1a1a2e' }} />
        </div>
        
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #0F0F1A 0%, #16162A 100%)',
          borderRadius: '36px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {children}
        </div>
      </div>
    );
  };

  // ============ SPLASH SCREEN ============
  const SplashScreen = () => (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 30%, rgba(255,107,53,0.15) 0%, transparent 50%)',
    }}>
      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '32px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: '0 20px 60px rgba(255,107,53,0.4)',
        animation: 'pulse 2s infinite'
      }}>
        <Zap size={56} color="#fff" />
      </div>
      <h1 style={{
        color: '#fff',
        fontSize: '48px',
        fontWeight: '900',
        margin: 0,
        letterSpacing: '-2px',
        fontFamily: 'system-ui'
      }}>FERINO</h1>
      <p style={{
        color: 'rgba(255,255,255,0.5)',
        fontSize: '14px',
        margin: '8px 0 0',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        fontFamily: 'system-ui'
      }}>Junta, escolhe e vai!</p>
      
      <div style={{ marginTop: '60px' }}>
        <div style={{
          width: '40px',
          height: '4px',
          background: 'rgba(255,107,53,0.3)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '50%',
            height: '100%',
            background: '#FF6B35',
            borderRadius: '2px',
            animation: 'loading 1.5s infinite'
          }} />
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );

  // ============ ONBOARDING SCREEN ============
  const OnboardingScreen = () => {
    const [step, setStep] = useState(0);
    const steps = [
      { icon: Users, title: 'Crie seus grupos', desc: 'Organize seus amigos em grupos personalizados para cada ocasião', color: '#FF6B35' },
      { icon: Vote, title: 'Vote no local', desc: 'Escolham juntos onde ir com votação simples e rápida', color: '#7B2CBF' },
      { icon: Navigation, title: 'Encontre-se!', desc: 'Confirme presença e siga direto para o ponto de encontro', color: '#00B4D8' },
    ];

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '60px 32px 40px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '70px',
            background: `linear-gradient(135deg, ${steps[step].color}30 0%, ${steps[step].color}10 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            border: `2px solid ${steps[step].color}40`
          }}>
            {React.createElement(steps[step].icon, { size: 64, color: steps[step].color })}
          </div>
          
          <h2 style={{
            color: '#fff',
            fontSize: '28px',
            fontWeight: '700',
            margin: 0,
            textAlign: 'center',
            fontFamily: 'system-ui'
          }}>{steps[step].title}</h2>
          
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '16px',
            margin: '16px 0 0',
            textAlign: 'center',
            lineHeight: '1.5',
            fontFamily: 'system-ui'
          }}>{steps[step].desc}</p>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === step ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === step ? '#FF6B35' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={() => step < 2 ? setStep(step + 1) : setCurrentScreen('login')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            border: 'none',
            borderRadius: '16px',
            padding: '18px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'system-ui',
            boxShadow: '0 8px 32px rgba(255,107,53,0.3)',
            marginBottom: '12px'
          }}
        >
          {step < 2 ? 'Próximo' : 'Começar'}
        </button>
        
        {step < 2 && (
          <button
            onClick={() => setCurrentScreen('login')}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              padding: '14px',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'system-ui'
            }}
          >
            Pular
          </button>
        )}
      </div>
    );
  };

  // ============ LOGIN SCREEN ============
  const LoginScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '60px 28px 32px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#FF6B35', fontSize: '36px', fontWeight: '900', margin: 0, fontFamily: 'system-ui' }}>FERINO</h1>
        <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: '8px 0 0', fontFamily: 'system-ui' }}>Bem-vindo de volta!</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '8px 0 0', fontFamily: 'system-ui' }}>Entre para continuar</p>
      </div>

      <div style={{ flex: 1 }}>
        {/* Email Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Email</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0 16px'
          }}>
            <Mail size={20} color="rgba(255,255,255,0.4)" />
            <input
              type="email"
              placeholder="seu@email.com"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '16px 12px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'system-ui'
              }}
            />
          </div>
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Senha</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0 16px'
          }}>
            <Lock size={20} color="rgba(255,255,255,0.4)" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '16px 12px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'system-ui'
              }}
            />
            <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              {showPassword ? <EyeOff size={20} color="rgba(255,255,255,0.4)" /> : <Eye size={20} color="rgba(255,255,255,0.4)" />}
            </button>
          </div>
        </div>

        <button style={{
          background: 'transparent',
          border: 'none',
          color: '#FF6B35',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          padding: 0,
          marginBottom: '32px',
          fontFamily: 'system-ui'
        }}>
          Esqueceu a senha?
        </button>

        {/* Login Button */}
        <button
          onClick={() => { setCurrentScreen('home'); setActiveTab('home'); }}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            border: 'none',
            borderRadius: '16px',
            padding: '18px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'system-ui',
            boxShadow: '0 8px 32px rgba(255,107,53,0.3)',
            marginBottom: '16px'
          }}
        >
          Entrar
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', padding: '0 16px', fontFamily: 'system-ui' }}>ou continue com</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Social Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Google', 'Apple'].map((provider) => (
            <button key={provider} style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '14px',
              padding: '14px',
              color: '#fff',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'system-ui'
            }}>
              {provider}
            </button>
          ))}
        </div>
      </div>

      {/* Register Link */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontFamily: 'system-ui' }}>Não tem conta? </span>
        <button 
          onClick={() => setCurrentScreen('register')}
          style={{ background: 'none', border: 'none', color: '#FF6B35', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'system-ui' }}
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );

  // ============ REGISTER SCREEN ============
  const RegisterScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '60px 28px 32px' }}>
      <button onClick={() => setCurrentScreen('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '24px', alignSelf: 'flex-start' }}>
        <ArrowLeft size={24} color="#fff" />
      </button>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Criar conta</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '8px 0 0', fontFamily: 'system-ui' }}>Junte-se ao Ferino!</p>
      </div>

      <div style={{ flex: 1 }}>
        {/* Name Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Nome completo</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0 16px'
          }}>
            <User size={20} color="rgba(255,255,255,0.4)" />
            <input
              type="text"
              placeholder="Seu nome"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '16px 12px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'system-ui'
              }}
            />
          </div>
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Email</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0 16px'
          }}>
            <Mail size={20} color="rgba(255,255,255,0.4)" />
            <input
              type="email"
              placeholder="seu@email.com"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '16px 12px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'system-ui'
              }}
            />
          </div>
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Senha</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0 16px'
          }}>
            <Lock size={20} color="rgba(255,255,255,0.4)" />
            <input
              type="password"
              placeholder="Min. 8 caracteres"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '16px 12px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'system-ui'
              }}
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={() => { setCurrentScreen('home'); setActiveTab('home'); }}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            border: 'none',
            borderRadius: '16px',
            padding: '18px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'system-ui',
            boxShadow: '0 8px 32px rgba(255,107,53,0.3)'
          }}
        >
          Criar conta
        </button>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textAlign: 'center', margin: '16px 0 0', lineHeight: '1.5', fontFamily: 'system-ui' }}>
          Ao criar conta, você concorda com nossos<br />
          <span style={{ color: '#FF6B35' }}>Termos de Uso</span> e <span style={{ color: '#FF6B35' }}>Política de Privacidade</span>
        </p>
      </div>
    </div>
  );

  // ============ HOME SCREEN ============
  const HomeScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '54px 24px 20px', background: 'linear-gradient(180deg, rgba(255,107,53,0.12) 0%, transparent 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0, fontFamily: 'system-ui' }}>Olá, Tauâna 👋</p>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: '4px 0 0', fontFamily: 'system-ui', letterSpacing: '-0.5px' }}>
              Seus Grupos
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => setCurrentScreen('notifications')}
              style={{
                width: '44px', height: '44px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.08)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={22} color="#fff" />
              {notifications.some(n => !n.read) && (
                <div style={{ position: 'absolute', top: '8px', right: '8px', width: '10px', height: '10px', background: '#FF6B35', borderRadius: '50%', border: '2px solid #16162A' }} />
              )}
            </button>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', boxShadow: '0 4px 16px rgba(255,107,53,0.3)'
            }}>
              👩‍🦰
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ padding: '0 24px', display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[
          { value: '12', label: 'Encontros', color: '#FF6B35' },
          { value: '4', label: 'Grupos', color: '#7B2CBF' },
          { value: '18', label: 'Amigos', color: '#00B4D8' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '14px',
            padding: '14px 12px', border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <p style={{ color: stat.color, fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>{stat.value}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Groups List */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ color: '#fff', fontSize: '17px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>Meus Grupos</h2>
          <button style={{ background: 'transparent', border: 'none', color: '#FF6B35', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'system-ui' }}>Ver todos</button>
        </div>

        {mockGroups.map((group) => (
          <div
            key={group.id}
            onClick={() => { setSelectedGroup(group); setCurrentScreen('group'); }}
            style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '18px', padding: '18px',
              marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px',
            }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: `linear-gradient(135deg, ${group.color}25 0%, ${group.color}10 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', border: `1px solid ${group.color}30`
            }}>
              {group.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{group.name}</h3>
                {group.hasActiveEvent && (
                  <span style={{ background: '#FF6B35', width: '8px', height: '8px', borderRadius: '50%' }} />
                )}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '4px 0 0', fontFamily: 'system-ui' }}>
                {group.members} membros • {group.lastEvent}
              </p>
            </div>
            <ChevronRight size={18} color="rgba(255,255,255,0.25)" />
          </div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ position: 'absolute', bottom: '100px', right: '24px' }}>
        <button 
          onClick={() => setCurrentScreen('createGroup')}
          style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 28px rgba(255,107,53,0.4)',
          }}
        >
          <Plus size={26} color="#fff" strokeWidth={2.5} />
        </button>
      </div>

      <BottomNav />
    </div>
  );

  // ============ BOTTOM NAVIGATION ============
  const BottomNav = () => (
    <div style={{
      padding: '12px 20px 26px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)',
      display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      {[
        { icon: Home, label: 'Home', tab: 'home', screen: 'home' },
        { icon: Calendar, label: 'Eventos', tab: 'events', screen: 'events' },
        { icon: Map, label: 'Explorar', tab: 'explore', screen: 'explore' },
        { icon: User, label: 'Perfil', tab: 'profile', screen: 'profile' },
      ].map((item) => (
        <button 
          key={item.tab}
          onClick={() => { setActiveTab(item.tab); setCurrentScreen(item.screen); }}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 12px'
          }}
        >
          <item.icon size={22} color={activeTab === item.tab ? '#FF6B35' : 'rgba(255,255,255,0.4)'} />
          <span style={{ fontSize: '10px', color: activeTab === item.tab ? '#FF6B35' : 'rgba(255,255,255,0.4)', fontFamily: 'system-ui', fontWeight: activeTab === item.tab ? '600' : '400' }}>{item.label}</span>
        </button>
      ))}
    </div>
  );

  // ============ CREATE GROUP SCREEN ============
  const CreateGroupScreen = () => {
    const emojis = ['🍻', '💼', '💑', '👨‍👩‍👧‍👦', '🎮', '⚽', '🎵', '📚', '✈️', '🍕'];
    const [selectedEmoji, setSelectedEmoji] = useState('🍻');
    
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '54px 24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setCurrentScreen('home')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
              <ArrowLeft size={20} color="#fff" />
            </button>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Novo Grupo</h1>
          </div>
        </div>

        <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
          {/* Group Icon */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.05) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '48px', margin: '0 auto 16px', border: '2px dashed rgba(255,107,53,0.3)'
            }}>
              {selectedEmoji}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: selectedEmoji === emoji ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.05)',
                    border: selectedEmoji === emoji ? '1px solid #FF6B35' : '1px solid transparent',
                    fontSize: '20px', cursor: 'pointer'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Group Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Nome do grupo</label>
            <input
              type="text"
              placeholder="Ex: Sexta dos Amigos"
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.1)', padding: '16px',
                color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'system-ui', boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Descrição (opcional)</label>
            <textarea
              placeholder="Para que serve esse grupo?"
              rows={3}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.1)', padding: '16px',
                color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'system-ui',
                resize: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Add Members */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '12px', display: 'block', fontFamily: 'system-ui' }}>Adicionar membros</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {mockMembers.slice(1, 4).map((member) => (
                <div key={member.id} style={{
                  background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span style={{ fontSize: '18px' }}>{member.avatar}</span>
                  <span style={{ color: '#fff', fontSize: '13px', fontFamily: 'system-ui' }}>{member.name}</span>
                  <X size={14} color="rgba(255,255,255,0.4)" style={{ cursor: 'pointer' }} />
                </div>
              ))}
              <button style={{
                background: 'rgba(255,107,53,0.1)', borderRadius: '12px', padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: '6px', border: '1px dashed rgba(255,107,53,0.3)', cursor: 'pointer'
              }}>
                <Plus size={16} color="#FF6B35" />
                <span style={{ color: '#FF6B35', fontSize: '13px', fontFamily: 'system-ui' }}>Adicionar</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 24px 32px' }}>
          <button
            onClick={() => setCurrentScreen('home')}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              border: 'none', borderRadius: '16px', padding: '18px',
              color: '#fff', fontWeight: '700', fontSize: '16px', cursor: 'pointer',
              fontFamily: 'system-ui', boxShadow: '0 8px 32px rgba(255,107,53,0.3)'
            }}
          >
            Criar Grupo
          </button>
        </div>
      </div>
    );
  };

  // ============ GROUP DETAIL SCREEN ============
  const GroupScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 20px', background: `linear-gradient(180deg, ${selectedGroup?.color}20 0%, transparent 100%)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <button onClick={() => { setCurrentScreen('home'); setActiveTab('home'); }} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>{selectedGroup?.emoji} {selectedGroup?.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{selectedGroup?.members} membros</p>
          </div>
          <button 
            onClick={() => setCurrentScreen('chat')}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}
          >
            <MessageCircle size={20} color="#fff" />
          </button>
        </div>

        {/* Members Row */}
        <div style={{ display: 'flex', gap: '-8px' }}>
          {mockMembers.slice(0, 5).map((member, i) => (
            <div key={member.id} style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: '2px solid #16162A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', marginLeft: i > 0 ? '-10px' : '0', zIndex: 10 - i
            }}>
              {member.avatar}
            </div>
          ))}
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,107,53,0.2)', border: '2px solid #16162A',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-10px', zIndex: 5
          }}>
            <Plus size={14} color="#FF6B35" />
          </div>
        </div>
      </div>

      {/* Active Event Card */}
      {selectedGroup?.hasActiveEvent && (
        <div style={{ padding: '0 24px', marginBottom: '16px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,53,0.12) 0%, rgba(247,147,30,0.04) 100%)',
            borderRadius: '20px', padding: '18px', border: '1px solid rgba(255,107,53,0.15)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <span style={{ background: '#FF6B35', color: '#fff', fontSize: '9px', fontWeight: '700', padding: '4px 8px', borderRadius: '20px', fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Evento Ativo</span>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: '10px 0 0', fontFamily: 'system-ui' }}>Happy Hour Sexta 🍻</h3>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={13} color="rgba(255,255,255,0.5)" />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontFamily: 'system-ui' }}>Sex, 03 Jan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={13} color="rgba(255,255,255,0.5)" />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontFamily: 'system-ui' }}>19:00</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setCurrentScreen('voting')} style={{ flex: 1, background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)', border: 'none', borderRadius: '12px', padding: '12px', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Vote size={16} /> Votar Local
              </button>
              <button onClick={() => setCurrentScreen('confirm')} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Check size={16} /> Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Past Events */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <h2 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: '0 0 12px', fontFamily: 'system-ui' }}>Últimos Encontros</h2>
        
        {[
          { name: 'Rodízio de Pizza', date: '20 Dez', local: 'Pizza Hut', emoji: '🍕' },
          { name: 'Almoço de Domingo', date: '15 Dez', local: 'Outback', emoji: '🥩' },
          { name: 'Happy Hour', date: '08 Dez', local: 'Bar do Zé', emoji: '🍺' },
        ].map((event, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '14px',
            marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
              {event.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{event.name}</h4>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{event.date} • {event.local}</p>
            </div>
            <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 24px 28px' }}>
        <button 
          onClick={() => setCurrentScreen('createEvent')}
          style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '2px dashed rgba(255,255,255,0.12)', borderRadius: '14px', padding: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Plus size={18} /> Criar Novo Evento
        </button>
      </div>
    </div>
  );

  // ============ CREATE EVENT SCREEN ============
  const CreateEventScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setCurrentScreen('group')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Novo Evento ✨</h1>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {/* Event Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Nome do evento</label>
          <input type="text" placeholder="Ex: Happy Hour de Sexta" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'system-ui', boxSizing: 'border-box' }} />
        </div>

        {/* Date & Time */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Data</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', gap: '10px' }}>
              <Calendar size={18} color="rgba(255,255,255,0.4)" />
              <span style={{ color: '#fff', fontSize: '14px', fontFamily: 'system-ui' }}>03/01/2025</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Horário</label>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', gap: '10px' }}>
              <Clock size={18} color="rgba(255,255,255,0.4)" />
              <span style={{ color: '#fff', fontSize: '14px', fontFamily: 'system-ui' }}>19:00</span>
            </div>
          </div>
        </div>

        {/* Voting Options */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px', display: 'block', fontFamily: 'system-ui' }}>Votação de local</label>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#fff', fontSize: '14px', fontFamily: 'system-ui' }}>Ativar votação</span>
              <div style={{ width: '48px', height: '28px', borderRadius: '14px', background: '#FF6B35', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0, fontFamily: 'system-ui' }}>Membros poderão votar entre restaurantes sugeridos</p>
          </div>
        </div>

        {/* Quick Suggestions */}
        <div>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '12px', display: 'block', fontFamily: 'system-ui' }}>Sugestões rápidas</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['🍻 Happy Hour', '🍕 Pizza Night', '🥩 Churrasco', '🍣 Japonês', '☕ Café'].map((sug) => (
              <button key={sug} style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '8px 14px',
                border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px',
                cursor: 'pointer', fontFamily: 'system-ui'
              }}>
                {sug}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 24px 32px' }}>
        <button onClick={() => setCurrentScreen('group')} style={{ width: '100%', background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)', border: 'none', borderRadius: '16px', padding: '18px', color: '#fff', fontWeight: '700', fontSize: '16px', cursor: 'pointer', fontFamily: 'system-ui', boxShadow: '0 8px 32px rgba(255,107,53,0.3)' }}>
          Criar Evento
        </button>
      </div>
    </div>
  );

  // ============ VOTING SCREEN ============
  const VotingScreen = () => {
    const [showParticipantsDistance, setShowParticipantsDistance] = useState(false);
    const confirmedMembers = members.filter(m => m.confirmed);
    
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '54px 24px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '6px' }}>
            <button onClick={() => setCurrentScreen('group')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
              <ArrowLeft size={20} color="#fff" />
            </button>
            <div>
              <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Vote no Local 🗳️</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>Baseado nas preferências do grupo</p>
            </div>
          </div>
        </div>

        {/* Participants Distance Card */}
        <div style={{ padding: '0 24px 12px' }}>
          <button 
            onClick={() => setShowParticipantsDistance(!showParticipantsDistance)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(0,180,216,0.12) 0%, rgba(0,180,216,0.04) 100%)',
              borderRadius: '14px',
              padding: '14px 16px',
              border: '1px solid rgba(0,180,216,0.2)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,180,216,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={20} color="#00B4D8" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>Distância dos participantes</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>
                {confirmedMembers.length} confirmados • Ponto ideal: Centro
              </p>
            </div>
            <ChevronDown size={20} color="rgba(255,255,255,0.5)" style={{ transform: showParticipantsDistance ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
          </button>
          
          {/* Expanded participants list */}
          {showParticipantsDistance && (
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '0 0 14px 14px', 
              padding: '12px 16px',
              marginTop: '-8px',
              paddingTop: '20px',
              border: '1px solid rgba(255,255,255,0.05)',
              borderTop: 'none'
            }}>
              {/* Mini map visualization */}
              <div style={{ 
                height: '80px', 
                background: 'linear-gradient(135deg, rgba(0,180,216,0.1) 0%, rgba(0,180,216,0.02) 100%)', 
                borderRadius: '10px', 
                marginBottom: '12px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Grid effect */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 12.5}%`, height: '1px', background: '#fff' }} />
                  ))}
                </div>
                
                {/* Participant dots */}
                {confirmedMembers.map((member, i) => (
                  <div key={member.id} style={{
                    position: 'absolute',
                    left: `${20 + i * 25}%`,
                    top: `${30 + (i % 2) * 30}%`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: member.id === 1 ? '#FF6B35' : 'rgba(0,180,216,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      border: '2px solid #16162A'
                    }}>
                      {member.avatar}
                    </div>
                  </div>
                ))}
                
                {/* Center point */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,107,53,0.3)',
                  border: '2px dashed #FF6B35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Target size={16} color="#FF6B35" />
                </div>
              </div>
              
              {/* Participants list with distances */}
              {confirmedMembers.map((member) => (
                <div key={member.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                    {member.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#fff', fontSize: '13px', fontWeight: '500', margin: 0, fontFamily: 'system-ui' }}>
                      {member.name} {member.id === 1 && '(você)'}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '1px 0 0', fontFamily: 'system-ui' }}>
                      📍 {member.location}
                    </p>
                  </div>
                  <span style={{ 
                    color: member.id === 1 ? '#4CAF50' : '#00B4D8', 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    fontFamily: 'system-ui',
                    background: member.id === 1 ? 'rgba(76,175,80,0.15)' : 'rgba(0,180,216,0.15)',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    {member.distance}
                  </span>
                </div>
              ))}
              
              {/* Ideal location suggestion */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginTop: '12px',
                padding: '10px 12px',
                background: 'rgba(255,107,53,0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(255,107,53,0.2)'
              }}>
                <Target size={16} color="#FF6B35" />
                <p style={{ color: '#fff', fontSize: '12px', margin: 0, fontFamily: 'system-ui' }}>
                  <span style={{ fontWeight: '600' }}>Ponto ideal:</span> Centro (média de 8km para todos)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cuisine Filter */}
        <div style={{ padding: '0 24px 12px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {cuisineTypes.map((cuisine) => (
            <button
              key={cuisine.id}
              onClick={() => setSelectedCuisine(cuisine.id)}
              style={{
                background: selectedCuisine === cuisine.id ? cuisine.color : 'rgba(255,255,255,0.06)',
                border: 'none', borderRadius: '20px', padding: '8px 14px',
                color: '#fff', fontSize: '12px', fontWeight: '500', cursor: 'pointer',
                fontFamily: 'system-ui', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <cuisine.icon size={14} />
              {cuisine.name}
            </button>
          ))}
        </div>

        {/* Restaurant Cards */}
        <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
          {mockRestaurants.map((restaurant) => (
            <div key={restaurant.id} style={{
              background: votes[restaurant.id] ? 'linear-gradient(135deg, rgba(255,107,53,0.12) 0%, rgba(255,107,53,0.04) 100%)' : 'rgba(255,255,255,0.03)',
              borderRadius: '18px', padding: '16px', marginBottom: '10px',
              border: votes[restaurant.id] ? '1px solid rgba(255,107,53,0.3)' : '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div 
                  onClick={() => { setSelectedRestaurant(restaurant); setCurrentScreen('restaurantDetail'); }}
                  style={{ width: '64px', height: '64px', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', cursor: 'pointer' }}
                >
                  {restaurant.image}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 
                        onClick={() => { setSelectedRestaurant(restaurant); setCurrentScreen('restaurantDetail'); }}
                        style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'system-ui', cursor: 'pointer' }}
                      >
                        {restaurant.name}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0', fontFamily: 'system-ui' }}>{restaurant.cuisine}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,199,0,0.12)', padding: '3px 7px', borderRadius: '6px' }}>
                      <Star size={11} color="#FFC700" fill="#FFC700" />
                      <span style={{ color: '#FFC700', fontSize: '11px', fontWeight: '600', fontFamily: 'system-ui' }}>{restaurant.rating}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={11} color="rgba(255,255,255,0.4)" />
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'system-ui' }}>{restaurant.distance}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <DollarSign size={11} color="rgba(255,255,255,0.4)" />
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'system-ui' }}>{restaurant.avgPrice}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Target size={11} color="#00B4D8" />
                      <span style={{ color: '#00B4D8', fontSize: '11px', fontFamily: 'system-ui' }}>Ideal p/ todos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ display: 'flex' }}>
                    {[...Array(Math.min(restaurant.votes + (votes[restaurant.id] ? 1 : 0), 4))].map((_, j) => (
                      <div key={j} style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,107,53,0.25)', border: '2px solid #16162A', marginLeft: j > 0 ? '-6px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>
                        {mockMembers[j]?.avatar}
                      </div>
                    ))}
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'system-ui' }}>{restaurant.votes + (votes[restaurant.id] ? 1 : 0)} votos</span>
                </div>
                
                <button onClick={() => handleVote(restaurant.id)} style={{
                  background: votes[restaurant.id] ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' : 'rgba(255,255,255,0.08)',
                  border: votes[restaurant.id] ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px', padding: '8px 16px', color: '#fff', fontWeight: '600', fontSize: '12px',
                  cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', gap: '5px'
                }}>
                  {votes[restaurant.id] ? <Check size={14} /> : <ThumbsUp size={14} />}
                  {votes[restaurant.id] ? 'Votado' : 'Votar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 24px 28px' }}>
          <button onClick={() => setCurrentScreen('map')} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px', color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Navigation size={18} /> Ver no Mapa
          </button>
        </div>
      </div>
    );
  };

  // ============ RESTAURANT DETAIL SCREEN ============
  const RestaurantDetailScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Image */}
      <div style={{ height: '200px', background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontSize: '80px' }}>{selectedRestaurant?.image}</span>
        <button onClick={() => setCurrentScreen('voting')} style={{ position: 'absolute', top: '54px', left: '24px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={20} color="#fff" />
        </button>
        <button onClick={() => toggleFavorite(selectedRestaurant?.id)} style={{ position: 'absolute', top: '54px', right: '24px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
          <Heart size={20} color={favorites[selectedRestaurant?.id] ? '#FF6B35' : '#fff'} fill={favorites[selectedRestaurant?.id] ? '#FF6B35' : 'none'} />
        </button>
      </div>

      <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', marginTop: '-20px', background: 'linear-gradient(180deg, #16162A 0%, #0F0F1A 100%)', borderRadius: '24px 24px 0 0' }}>
        {/* Title & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>{selectedRestaurant?.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '4px 0 0', fontFamily: 'system-ui' }}>{selectedRestaurant?.cuisine}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,199,0,0.15)', padding: '6px 12px', borderRadius: '10px' }}>
            <Star size={16} color="#FFC700" fill="#FFC700" />
            <span style={{ color: '#FFC700', fontSize: '16px', fontWeight: '700', fontFamily: 'system-ui' }}>{selectedRestaurant?.rating}</span>
          </div>
        </div>

        {/* Quick Info */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          {[
            { icon: MapPin, value: selectedRestaurant?.distance },
            { icon: DollarSign, value: selectedRestaurant?.avgPrice },
            { icon: Clock, value: selectedRestaurant?.hours },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
              <item.icon size={18} color="#FF6B35" style={{ margin: '0 auto 6px' }} />
              <p style={{ color: '#fff', fontSize: '12px', fontWeight: '500', margin: 0, fontFamily: 'system-ui' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: '0 0 8px', fontFamily: 'system-ui' }}>Sobre</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.5', margin: 0, fontFamily: 'system-ui' }}>{selectedRestaurant?.description}</p>
        </div>

        {/* Contact Info */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: '0 0 12px', fontFamily: 'system-ui' }}>Contato</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px' }}>
              <MapPin size={18} color="rgba(255,255,255,0.5)" />
              <span style={{ color: '#fff', fontSize: '14px', fontFamily: 'system-ui' }}>{selectedRestaurant?.address}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px' }}>
              <Phone size={18} color="rgba(255,255,255,0.5)" />
              <span style={{ color: '#fff', fontSize: '14px', fontFamily: 'system-ui' }}>{selectedRestaurant?.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 24px 28px', display: 'flex', gap: '12px' }}>
        <button onClick={() => handleVote(selectedRestaurant?.id)} style={{
          flex: 1, background: votes[selectedRestaurant?.id] ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          border: 'none', borderRadius: '14px', padding: '16px', color: '#fff', fontWeight: '700', fontSize: '15px',
          cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}>
          {votes[selectedRestaurant?.id] ? <><Check size={18} /> Votado</> : <><ThumbsUp size={18} /> Votar Aqui</>}
        </button>
        <button style={{ width: '56px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Navigation size={20} color="#fff" />
        </button>
      </div>
    </div>
  );

  // ============ CONFIRMATION SCREEN ============
  const ConfirmScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setCurrentScreen('group')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <div>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Confirmar Presença ✋</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>Happy Hour Sexta • 03 Jan</p>
          </div>
        </div>
      </div>

      {/* Event Summary */}
      <div style={{ padding: '0 24px 16px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.12) 0%, rgba(0,180,216,0.04) 100%)', borderRadius: '18px', padding: '16px', border: '1px solid rgba(0,180,216,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>🍔</div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0, fontFamily: 'system-ui' }}>Local mais votado</p>
              <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: '2px 0 0', fontFamily: 'system-ui' }}>Madero Container</h3>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { icon: Calendar, value: 'Sex, 03 Jan', label: 'Data' },
              { icon: Clock, value: '19:00', label: 'Horário' },
              { icon: DollarSign, value: '~R$65', label: 'Por pessoa' },
            ].map((item, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <item.icon size={16} color="#00B4D8" style={{ margin: '0 auto 4px' }} />
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{item.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Members List */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <h2 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: '0 0 12px', fontFamily: 'system-ui' }}>
          Quem vai? ({members.filter(m => m.confirmed).length}/{members.length})
        </h2>

        {members.map((member) => (
          <div key={member.id} onClick={() => member.id === 1 && toggleConfirm(1)} style={{
            background: member.confirmed ? 'rgba(76,175,80,0.08)' : 'rgba(255,255,255,0.03)',
            borderRadius: '14px', padding: '14px', marginBottom: '8px',
            border: member.confirmed ? '1px solid rgba(76,175,80,0.2)' : '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', gap: '12px',
            cursor: member.id === 1 ? 'pointer' : 'default'
          }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{member.avatar}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{member.name} {member.id === 1 && '(você)'}</h4>
              <p style={{ color: member.confirmed ? '#4CAF50' : 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{member.confirmed ? '✓ Confirmado' : 'Aguardando'}</p>
            </div>
            {member.confirmed && <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={16} color="#fff" /></div>}
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 24px 28px' }}>
        <button onClick={() => toggleConfirm(1)} style={{
          width: '100%', background: members[0].confirmed ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          border: members[0].confirmed ? '1px solid rgba(255,255,255,0.15)' : 'none',
          borderRadius: '14px', padding: '16px', color: '#fff', fontWeight: '700', fontSize: '15px',
          cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: members[0].confirmed ? 'none' : '0 8px 28px rgba(76,175,80,0.25)', marginBottom: '10px'
        }}>
          {members[0].confirmed ? 'Cancelar Presença' : <><Check size={18} /> Confirmar Presença</>}
        </button>
        <button style={{ width: '100%', background: 'transparent', border: 'none', padding: '12px', color: '#FF6B35', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Send size={16} /> Compartilhar Evento
        </button>
      </div>
    </div>
  );

  // ============ MAP SCREEN ============
  const MapScreen = () => {
    const confirmedMembers = members.filter(m => m.confirmed);
    
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '54px 24px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setCurrentScreen('voting')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
              <ArrowLeft size={20} color="#fff" />
            </button>
            <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Mapa 📍</h1>
          </div>
        </div>

        {/* Legend */}
        <div style={{ padding: '0 24px 12px', display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00B4D8' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'system-ui' }}>Participantes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF6B35' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'system-ui' }}>Restaurantes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px dashed #4CAF50', background: 'transparent' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'system-ui' }}>Ponto ideal</span>
          </div>
        </div>

        {/* Mock Map */}
        <div style={{ flex: 1, margin: '0 24px', borderRadius: '20px', background: 'linear-gradient(135deg, #1a2a3a 0%, #0d1a2a 100%)', position: 'relative', overflow: 'hidden' }}>
          {/* Grid lines for map effect */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
            {[...Array(10)].map((_, i) => (
              <div key={`h-${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 10}%`, height: '1px', background: '#fff' }} />
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={`v-${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 10}%`, width: '1px', background: '#fff' }} />
            ))}
          </div>

          {/* Participant Markers */}
          {confirmedMembers.map((member, i) => (
            <div key={`member-${member.id}`} style={{
              position: 'absolute',
              top: `${15 + i * 22}%`,
              left: `${10 + i * 18}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: member.id === 1 ? '#FF6B35' : '#00B4D8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '3px solid #fff'
              }}>
                {member.avatar}
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.8)', borderRadius: '6px', padding: '2px 6px',
                marginTop: '4px', whiteSpace: 'nowrap', textAlign: 'center'
              }}>
                <span style={{ color: '#fff', fontSize: '9px', fontWeight: '500', fontFamily: 'system-ui' }}>{member.location}</span>
              </div>
            </div>
          ))}

          {/* Ideal Center Point */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5
          }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%',
              background: 'rgba(76,175,80,0.2)',
              border: '3px dashed #4CAF50',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulse 2s infinite'
            }}>
              <Target size={24} color="#4CAF50" />
            </div>
            <div style={{
              background: '#4CAF50', borderRadius: '6px', padding: '4px 8px',
              marginTop: '4px', whiteSpace: 'nowrap', textAlign: 'center'
            }}>
              <span style={{ color: '#fff', fontSize: '10px', fontWeight: '600', fontFamily: 'system-ui' }}>Ponto Ideal</span>
            </div>
          </div>
          
          {/* Restaurant Markers */}
          {mockRestaurants.slice(0, 3).map((r, i) => (
            <div key={r.id} style={{
              position: 'absolute',
              top: `${40 + i * 15}%`,
              right: `${15 + i * 12}%`,
              transform: 'translate(50%, -50%)',
              zIndex: 8
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: votes[r.id] ? '#FF6B35' : 'rgba(255,255,255,0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: votes[r.id] ? '3px solid #fff' : 'none'
              }}>
                {r.image}
              </div>
              <div style={{
                background: '#16162A', borderRadius: '6px', padding: '3px 6px',
                marginTop: '4px', whiteSpace: 'nowrap', textAlign: 'center'
              }}>
                <span style={{ color: '#fff', fontSize: '9px', fontWeight: '500', fontFamily: 'system-ui' }}>{r.name.split(' ')[0]}</span>
              </div>
            </div>
          ))}

          {/* Connection lines (visual) */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {confirmedMembers.map((_, i) => (
              <line
                key={i}
                x1={`${10 + i * 18}%`}
                y1={`${15 + i * 22}%`}
                x2="50%"
                y2="50%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            ))}
          </svg>
        </div>

        {/* Participants summary */}
        <div style={{ padding: '12px 24px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {confirmedMembers.map((member) => (
              <div key={member.id} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ fontSize: '16px' }}>{member.avatar}</span>
                <div>
                  <p style={{ color: '#fff', fontSize: '12px', fontWeight: '500', margin: 0, fontFamily: 'system-ui' }}>{member.name}</p>
                  <p style={{ color: '#00B4D8', fontSize: '10px', margin: 0, fontFamily: 'system-ui' }}>{member.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Card */}
        <div style={{ padding: '0 24px 28px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🍔</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>Madero Container</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>1.2km do ponto ideal • Mais votado</p>
            </div>
            <button style={{ background: '#FF6B35', border: 'none', borderRadius: '10px', padding: '10px 16px', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui' }}>
              Ir
            </button>
          </div>
        </div>
        
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  };

  // ============ CHAT SCREEN ============
  const ChatScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setCurrentScreen('group')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>{selectedGroup?.emoji} {selectedGroup?.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{selectedGroup?.members} membros</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '16px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: msg.isMe ? 'row-reverse' : 'row', gap: '10px', alignItems: 'flex-end' }}>
            {!msg.isMe && <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{msg.avatar}</div>}
            <div style={{ maxWidth: '70%' }}>
              {!msg.isMe && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: '0 0 4px', fontFamily: 'system-ui' }}>{msg.user}</p>}
              <div style={{
                background: msg.isMe ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' : 'rgba(255,255,255,0.08)',
                borderRadius: msg.isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '12px 16px'
              }}>
                <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontFamily: 'system-ui', lineHeight: '1.4' }}>{msg.message}</p>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', margin: '4px 0 0', textAlign: msg.isMe ? 'right' : 'left', fontFamily: 'system-ui' }}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 24px 28px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Image size={20} color="rgba(255,255,255,0.5)" />
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '22px', padding: '4px 4px 4px 16px' }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Mensagem..."
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'system-ui' }}
            />
            <button onClick={sendMessage} style={{ background: newMessage ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={16} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ============ NOTIFICATIONS SCREEN ============
  const NotificationsScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Notificações 🔔</h1>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            onClick={() => markNotificationRead(notif.id)}
            style={{
              background: notif.read ? 'transparent' : 'rgba(255,107,53,0.08)',
              borderRadius: '14px', padding: '14px', marginBottom: '10px',
              border: `1px solid ${notif.read ? 'rgba(255,255,255,0.05)' : 'rgba(255,107,53,0.15)'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: notif.type === 'event' ? 'rgba(255,107,53,0.15)' : notif.type === 'vote' ? 'rgba(123,44,191,0.15)' : 'rgba(0,180,216,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {notif.type === 'event' && <Calendar size={18} color="#FF6B35" />}
                {notif.type === 'vote' && <Vote size={18} color="#7B2CBF" />}
                {notif.type === 'confirm' && <Check size={18} color="#00B4D8" />}
                {notif.type === 'reminder' && <Bell size={18} color="#F59E0B" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{notif.title}</h4>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontFamily: 'system-ui' }}>{notif.time}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '4px 0 0', lineHeight: '1.4', fontFamily: 'system-ui' }}>{notif.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ============ EVENTS SCREEN ============
  const EventsScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: 0, fontFamily: 'system-ui' }}>Eventos 📅</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '4px 0 0', fontFamily: 'system-ui' }}>Seus próximos encontros</p>
      </div>

      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'system-ui' }}>Esta semana</h3>
        
        {[
          { name: 'Happy Hour Sexta', group: 'Sexta dos Amigos', date: 'Sex, 03 Jan', time: '19:00', emoji: '🍻', color: '#FF6B35' },
          { name: 'Reunião de Projeto', group: 'Galera do Trampo', date: 'Sáb, 04 Jan', time: '10:00', emoji: '💼', color: '#00B4D8' },
        ].map((event, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '16px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${event.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>{event.emoji}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{event.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '4px 0', fontFamily: 'system-ui' }}>{event.group}</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontFamily: 'system-ui' }}>📅 {event.date}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontFamily: 'system-ui' }}>🕐 {event.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: '20px 0 12px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'system-ui' }}>Próximas semanas</h3>
        
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '14px', padding: '20px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0, fontFamily: 'system-ui' }}>Nenhum evento agendado</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );

  // ============ EXPLORE SCREEN ============
  const ExploreScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: '0 0 16px', fontFamily: 'system-ui' }}>Explorar 🔍</h1>
        
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '0 16px', gap: '10px' }}>
          <Search size={20} color="rgba(255,255,255,0.4)" />
          <input type="text" placeholder="Buscar restaurantes..." style={{ flex: 1, background: 'transparent', border: 'none', padding: '14px 0', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'system-ui' }} />
          <Filter size={20} color="rgba(255,255,255,0.4)" />
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 24px 12px', display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {cuisineTypes.map((c) => (
          <div key={c.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <c.icon size={24} color={c.color} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'system-ui' }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* Popular */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: '8px 0 12px', fontFamily: 'system-ui' }}>Populares perto de você</h3>
        
        {mockRestaurants.slice(0, 4).map((r) => (
          <div key={r.id} onClick={() => { setSelectedRestaurant(r); setCurrentScreen('restaurantDetail'); }} style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '14px',
            marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer',
            display: 'flex', gap: '14px'
          }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>{r.image}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{r.name}</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '4px 0', fontFamily: 'system-ui' }}>{r.cuisine} • {r.avgPrice}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={12} color="#FFC700" fill="#FFC700" />
                  <span style={{ color: '#FFC700', fontSize: '12px', fontWeight: '600', fontFamily: 'system-ui' }}>{r.rating}</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'system-ui' }}>• {r.distance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );

  // ============ PROFILE SCREEN ============
  const ProfileScreen = () => {
    const [activeProfileTab, setActiveProfileTab] = useState('photos');
    
    const myPhotos = [
      { id: 1, emoji: '🍔', likes: 45, comments: 8 },
      { id: 2, emoji: '🎊', likes: 89, comments: 21 },
      { id: 3, emoji: '🏝️', likes: 156, comments: 34 },
      { id: 4, emoji: '🍷', likes: 67, comments: 12 },
      { id: 5, emoji: '🎤', likes: 34, comments: 6 },
      { id: 6, emoji: '🚗', likes: 78, comments: 15 },
    ];
    
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '54px 24px 16px' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '86px', height: '86px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px' }}>👩‍🦰</div>
              <button style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '28px', height: '28px', borderRadius: '50%', background: '#16162A', border: '2px solid #FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Camera size={12} color="#FF6B35" />
              </button>
            </div>
            
            {/* Stats */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around' }}>
              {[
                { value: '6', label: 'Posts' },
                { value: '18', label: 'Amigos' },
                { value: '4', label: 'Grupos' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>{s.value}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0, fontFamily: 'system-ui' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Name & Bio */}
          <div style={{ marginTop: '16px' }}>
            <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Tauâna Garcia</h2>
            <p style={{ color: '#FF6B35', fontSize: '14px', margin: '2px 0 0', fontFamily: 'system-ui' }}>@tauanagarcia</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '8px 0 0', lineHeight: '1.4', fontFamily: 'system-ui' }}>
              Organizando os melhores encontros 🍕🍻✨
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button style={{
              flex: 1, background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px',
              color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
              <Edit3 size={16} /> Editar perfil
            </button>
            <button 
              onClick={() => setCurrentScreen('friends')}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px',
                color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              <Users size={16} /> Amigos
            </button>
            <button 
              onClick={() => setCurrentScreen('settings')}
              style={{
                width: '44px', background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}
            >
              <Settings size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={() => setActiveProfileTab('photos')}
            style={{ flex: 1, background: 'none', border: 'none', padding: '12px', cursor: 'pointer', borderBottom: activeProfileTab === 'photos' ? '2px solid #FF6B35' : '2px solid transparent' }}
          >
            <Image size={22} color={activeProfileTab === 'photos' ? '#FF6B35' : 'rgba(255,255,255,0.4)'} />
          </button>
          <button 
            onClick={() => setActiveProfileTab('menu')}
            style={{ flex: 1, background: 'none', border: 'none', padding: '12px', cursor: 'pointer', borderBottom: activeProfileTab === 'menu' ? '2px solid #FF6B35' : '2px solid transparent' }}
          >
            <Settings size={22} color={activeProfileTab === 'menu' ? '#FF6B35' : 'rgba(255,255,255,0.4)'} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeProfileTab === 'photos' ? (
            <>
              {/* Photo Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                {myPhotos.map((photo) => (
                  <div 
                    key={photo.id}
                    style={{
                      aspectRatio: '1',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '40px',
                      cursor: 'pointer'
                    }}
                  >
                    {photo.emoji}
                  </div>
                ))}
              </div>
              
              {/* Add photo button */}
              <div style={{ padding: '20px 24px', textAlign: 'center' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '14px 32px',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'system-ui',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  margin: '0 auto',
                  boxShadow: '0 8px 24px rgba(255,107,53,0.3)'
                }}>
                  <Plus size={20} /> Nova foto
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: '16px 24px' }}>
              {/* Menu Items */}
              {[
                { icon: User, label: 'Editar Perfil', color: '#FF6B35', screen: null },
                { icon: Heart, label: 'Favoritos', color: '#EC4899', screen: null },
                { icon: Bell, label: 'Notificações', color: '#F59E0B', screen: 'notifications' },
                { icon: Shield, label: 'Privacidade', color: '#10B981', screen: null },
                { icon: HelpCircle, label: 'Ajuda', color: '#8B5CF6', screen: null },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => item.screen && setCurrentScreen(item.screen)}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
                    padding: '14px 16px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <item.icon size={20} color={item.color} />
                  </div>
                  <span style={{ flex: 1, color: '#fff', fontSize: '15px', fontWeight: '500', textAlign: 'left', fontFamily: 'system-ui' }}>{item.label}</span>
                  <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
                </button>
              ))}

              <button style={{ width: '100%', background: 'rgba(239,68,68,0.1)', borderRadius: '14px', padding: '14px 16px', marginTop: '8px', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LogOut size={20} color="#EF4444" />
                </div>
                <span style={{ flex: 1, color: '#EF4444', fontSize: '15px', fontWeight: '500', textAlign: 'left', fontFamily: 'system-ui' }}>Sair</span>
              </button>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    );
  };

  // ============ SETTINGS SCREEN ============
  const SettingsScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => { setCurrentScreen('profile'); setActiveTab('profile'); }} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Configurações ⚙️</h1>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'system-ui' }}>Preferências</h3>
        
        {[
          { icon: Bell, label: 'Notificações push', enabled: true },
          { icon: Moon, label: 'Modo escuro', enabled: true },
          { icon: MapPin, label: 'Localização', enabled: true },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '14px 16px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <item.icon size={20} color="rgba(255,255,255,0.6)" />
            <span style={{ flex: 1, color: '#fff', fontSize: '15px', fontFamily: 'system-ui' }}>{item.label}</span>
            <div style={{ width: '48px', height: '28px', borderRadius: '14px', background: item.enabled ? '#FF6B35' : 'rgba(255,255,255,0.2)', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: item.enabled ? '2px' : '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transition: 'right 0.2s' }} />
            </div>
          </div>
        ))}

        <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: '24px 0 12px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'system-ui' }}>Sobre</h3>
        
        {[
          { label: 'Versão do app', value: '1.0.0' },
          { label: 'Termos de uso', value: '' },
          { label: 'Política de privacidade', value: '' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '14px 16px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#fff', fontSize: '15px', fontFamily: 'system-ui' }}>{item.label}</span>
            {item.value ? (
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'system-ui' }}>{item.value}</span>
            ) : (
              <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ============ FRIENDS LIST SCREEN ============
  const FriendsScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => { setCurrentScreen('profile'); setActiveTab('profile'); }} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
              <ArrowLeft size={20} color="#fff" />
            </button>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Amigos 👥</h1>
          </div>
          <button 
            onClick={() => setCurrentScreen('searchFriends')}
            style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}
          >
            <Plus size={20} color="#fff" />
          </button>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '0 16px', gap: '10px' }}>
          <Search size={18} color="rgba(255,255,255,0.4)" />
          <input type="text" placeholder="Buscar amigos..." style={{ flex: 1, background: 'transparent', border: 'none', padding: '14px 0', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'system-ui' }} />
        </div>
      </div>

      {/* Friend Requests Banner */}
      {friendRequests.length > 0 && (
        <div style={{ padding: '0 24px', marginBottom: '12px' }}>
          <button 
            onClick={() => setCurrentScreen('friendRequests')}
            style={{
              width: '100%', background: 'linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0.05) 100%)',
              borderRadius: '14px', padding: '14px 16px', border: '1px solid rgba(255,107,53,0.2)',
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#fff" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>Solicitações de amizade</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{friendRequests.length} pendente{friendRequests.length > 1 ? 's' : ''}</p>
            </div>
            <div style={{ background: '#FF6B35', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '12px', fontWeight: '700', fontFamily: 'system-ui' }}>{friendRequests.length}</span>
            </div>
            <ChevronRight size={18} color="rgba(255,255,255,0.4)" />
          </button>
        </div>
      )}

      {/* Friends List */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '0 0 12px', fontFamily: 'system-ui' }}>{mockMembers.length - 1} amigos</p>
        
        {mockMembers.slice(1).map((friend) => (
          <div 
            key={friend.id}
            onClick={() => { setSelectedUser(friend); setCurrentScreen('userProfile'); }}
            style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '14px',
              marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'
            }}
          >
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              {friend.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{friend.fullName}</h4>
              <p style={{ color: '#FF6B35', fontSize: '13px', margin: '2px 0 0', fontFamily: 'system-ui' }}>@{friend.username}</p>
            </div>
            <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
          </div>
        ))}
      </div>
    </div>
  );

  // ============ SEARCH FRIENDS SCREEN ============
  const SearchFriendsScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <button onClick={() => setCurrentScreen('friends')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Adicionar Amigos 🔍</h1>
        </div>

        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '0 16px', gap: '10px' }}>
          <Search size={18} color="rgba(255,255,255,0.4)" />
          <input 
            type="text" 
            placeholder="Buscar por @username ou nome..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', padding: '14px 0', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'system-ui' }} 
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <X size={18} color="rgba(255,255,255,0.4)" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'system-ui' }}>
          {searchQuery ? 'Resultados' : 'Sugestões para você'}
        </p>
        
        {searchUsers
          .filter(u => !searchQuery || u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((user) => (
          <div key={user.id} style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '14px',
            marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', gap: '12px'
          }}>
            <div 
              onClick={() => { setSelectedUser(user); setCurrentScreen('userProfile'); }}
              style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', cursor: 'pointer' }}
            >
              {user.avatar}
            </div>
            <div style={{ flex: 1 }} onClick={() => { setSelectedUser(user); setCurrentScreen('userProfile'); }}>
              <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'system-ui', cursor: 'pointer' }}>{user.fullName}</h4>
              <p style={{ color: '#FF6B35', fontSize: '13px', margin: '2px 0 0', fontFamily: 'system-ui' }}>@{user.username}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{user.mutualFriends} amigos em comum</p>
            </div>
            <button 
              onClick={() => sendFriendRequest(user.id)}
              disabled={user.requestSent}
              style={{
                background: user.requestSent ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                border: 'none', borderRadius: '10px', padding: '10px 16px',
                color: '#fff', fontWeight: '600', fontSize: '12px', cursor: user.requestSent ? 'default' : 'pointer',
                fontFamily: 'system-ui', opacity: user.requestSent ? 0.7 : 1
              }}
            >
              {user.requestSent ? 'Enviado' : 'Adicionar'}
            </button>
          </div>
        ))}

        {searchQuery && searchUsers.filter(u => u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0, fontFamily: 'system-ui' }}>Nenhum usuário encontrado para "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );

  // ============ FRIEND REQUESTS SCREEN ============
  const FriendRequestsScreen = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '54px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setCurrentScreen('friends')} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={20} color="#fff" />
          </button>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>Solicitações 📬</h1>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {friendRequests.length > 0 ? (
          <>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '0 0 12px', fontFamily: 'system-ui' }}>{friendRequests.length} solicitação{friendRequests.length > 1 ? 'ões' : ''} pendente{friendRequests.length > 1 ? 's' : ''}</p>
            
            {friendRequests.map((request) => (
              <div key={request.id} style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '16px',
                marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                    {request.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', margin: 0, fontFamily: 'system-ui' }}>{request.fullName}</h4>
                    <p style={{ color: '#FF6B35', fontSize: '13px', margin: '2px 0 0', fontFamily: 'system-ui' }}>@{request.username}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '2px 0 0', fontFamily: 'system-ui' }}>{request.mutualFriends} amigos em comum</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => acceptFriendRequest(request.id)}
                    style={{
                      flex: 1, background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                      border: 'none', borderRadius: '12px', padding: '12px',
                      color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'system-ui'
                    }}
                  >
                    Aceitar
                  </button>
                  <button 
                    onClick={() => declineFriendRequest(request.id)}
                    style={{
                      flex: 1, background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px',
                      color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'system-ui'
                    }}
                  >
                    Recusar
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Users size={36} color="rgba(255,255,255,0.3)" />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', margin: 0, fontFamily: 'system-ui' }}>Nenhuma solicitação pendente</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px', margin: '8px 0 0', fontFamily: 'system-ui' }}>Quando alguém te adicionar, aparecerá aqui</p>
          </div>
        )}
      </div>
    </div>
  );

  // ============ USER PROFILE SCREEN ============
  const UserProfileScreen = () => {
    const isFriend = selectedUser?.isFriend || mockMembers.some(m => m.id === selectedUser?.id);
    const isOwnProfile = selectedUser?.id === 1;
    
    // Mock photos for the grid
    const mockPhotos = [
      { id: 1, emoji: '🍕', likes: 24, comments: 5 },
      { id: 2, emoji: '🎉', likes: 56, comments: 12 },
      { id: 3, emoji: '🏖️', likes: 89, comments: 23 },
      { id: 4, emoji: '🍻', likes: 45, comments: 8 },
      { id: 5, emoji: '🎸', likes: 32, comments: 4 },
      { id: 6, emoji: '⚽', likes: 67, comments: 15 },
      { id: 7, emoji: '🍣', likes: 41, comments: 9 },
      { id: 8, emoji: '🎂', likes: 123, comments: 34 },
      { id: 9, emoji: '🌅', likes: 78, comments: 11 },
    ];
    
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '54px 24px 20px' }}>
          <button 
            onClick={() => setCurrentScreen(isFriend ? 'friends' : 'searchFriends')} 
            style={{ position: 'absolute', left: '24px', top: '54px', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex' }}
          >
            <ArrowLeft size={20} color="#fff" />
          </button>

          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '16px' }}>
            <div style={{ width: '86px', height: '86px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', border: '3px solid rgba(255,107,53,0.3)' }}>
              {selectedUser?.avatar}
            </div>
            
            {/* Stats Row */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around' }}>
              {[
                { value: '9', label: 'Posts' },
                { value: '24', label: 'Amigos' },
                { value: '3', label: 'Grupos' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>{s.value}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0, fontFamily: 'system-ui' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Name & Username */}
          <div style={{ marginTop: '16px' }}>
            <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0, fontFamily: 'system-ui' }}>{selectedUser?.fullName}</h2>
            <p style={{ color: '#FF6B35', fontSize: '14px', margin: '2px 0 0', fontFamily: 'system-ui' }}>@{selectedUser?.username}</p>
            {selectedUser?.mutualFriends && (
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '6px 0 0', fontFamily: 'system-ui' }}>👥 {selectedUser.mutualFriends} amigos em comum</p>
            )}
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '8px 0 0', lineHeight: '1.4', fontFamily: 'system-ui' }}>
              Amante de boa comida e bons encontros 🍕✨
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            {isFriend ? (
              <>
                <button style={{
                  flex: 1, background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  border: 'none', borderRadius: '10px', padding: '10px',
                  color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                }}>
                  <MessageCircle size={16} /> Mensagem
                </button>
                <button style={{
                  flex: 1, background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px',
                  color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                }}>
                  <Users size={16} /> Amigos
                </button>
              </>
            ) : (
              <button 
                onClick={() => sendFriendRequest(selectedUser?.id)}
                style={{
                  flex: 1, background: selectedUser?.requestSent ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  border: 'none', borderRadius: '10px', padding: '12px',
                  color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', fontFamily: 'system-ui',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                {selectedUser?.requestSent ? <><Check size={18} /> Solicitação Enviada</> : <><Plus size={18} /> Adicionar Amigo</>}
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button style={{ flex: 1, background: 'none', border: 'none', padding: '12px', cursor: 'pointer', borderBottom: '2px solid #FF6B35' }}>
            <Image size={22} color="#FF6B35" />
          </button>
          <button style={{ flex: 1, background: 'none', border: 'none', padding: '12px', cursor: 'pointer' }}>
            <Users size={22} color="rgba(255,255,255,0.4)" />
          </button>
        </div>

        {/* Photo Grid */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {mockPhotos.map((photo) => (
              <div 
                key={photo.id}
                style={{
                  aspectRatio: '1',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {photo.emoji}
                {/* Hover overlay with likes/comments */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  opacity: 0,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={16} color="#fff" fill="#fff" />
                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', fontFamily: 'system-ui' }}>{photo.likes}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageCircle size={16} color="#fff" fill="#fff" />
                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', fontFamily: 'system-ui' }}>{photo.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add photo button for own profile */}
          {isOwnProfile && (
            <div style={{ padding: '20px 24px', textAlign: 'center' }}>
              <button style={{
                background: 'rgba(255,255,255,0.05)',
                border: '2px dashed rgba(255,255,255,0.15)',
                borderRadius: '14px',
                padding: '20px 40px',
                color: 'rgba(255,255,255,0.5)',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'system-ui',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto'
              }}>
                <Camera size={20} /> Adicionar foto
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============ SCREEN ROUTER ============
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen />;
      case 'onboarding': return <OnboardingScreen />;
      case 'login': return <LoginScreen />;
      case 'register': return <RegisterScreen />;
      case 'home': return <HomeScreen />;
      case 'createGroup': return <CreateGroupScreen />;
      case 'group': return <GroupScreen />;
      case 'createEvent': return <CreateEventScreen />;
      case 'voting': return <VotingScreen />;
      case 'restaurantDetail': return <RestaurantDetailScreen />;
      case 'confirm': return <ConfirmScreen />;
      case 'map': return <MapScreen />;
      case 'chat': return <ChatScreen />;
      case 'notifications': return <NotificationsScreen />;
      case 'events': return <EventsScreen />;
      case 'explore': return <ExploreScreen />;
      case 'profile': return <ProfileScreen />;
      case 'settings': return <SettingsScreen />;
      case 'friends': return <FriendsScreen />;
      case 'searchFriends': return <SearchFriendsScreen />;
      case 'friendRequests': return <FriendRequestsScreen />;
      case 'userProfile': return <UserProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  // Detect mobile for main layout
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileLayout(window.innerWidth <= 480);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: fullscreen app
  if (isMobileLayout) {
    return (
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <PhoneFrame>
          {renderScreen()}
        </PhoneFrame>
      </div>
    );
  }

  // Desktop: with phone mockup
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ color: '#FF6B35', fontSize: '36px', fontWeight: '900', margin: 0, letterSpacing: '-2px', textShadow: '0 4px 30px rgba(255,107,53,0.3)' }}>FERINO</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '6px 0 0', letterSpacing: '3px', textTransform: 'uppercase' }}>Junta, escolhe e vai!</p>
        </div>

        <PhoneFrame>
          {renderScreen()}
        </PhoneFrame>

        {/* Screen indicator */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', margin: 0 }}>
            Protótipo Interativo • {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
