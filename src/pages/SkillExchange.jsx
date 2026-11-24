import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Send, 
  Check, 
  X, 
  MessageSquare, 
  Clock, 
  Calendar, 
  Sparkles, 
  User, 
  GraduationCap, 
  BookOpen, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import RequestExchangeModal from '../components/RequestExchangeModal';

export default function SkillExchange() {
  const { currentUser } = useAuth();
  const { 
    students, 
    exchangeRequests, 
    respondToExchangeRequest, 
    sendMessageInExchange 
  } = useData();

  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' | 'outgoing' | 'all'
  const [selectedExchangeId, setSelectedExchangeId] = useState(() => {
    return exchangeRequests.length > 0 ? exchangeRequests[0].id : null;
  });
  const [chatInput, setChatInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter requests
  const incoming = exchangeRequests.filter(req => req.receiverId === currentUser?.id);
  const outgoing = exchangeRequests.filter(req => req.senderId === currentUser?.id);

  const displayedRequests = activeTab === 'incoming' 
    ? incoming 
    : activeTab === 'outgoing' 
    ? outgoing 
    : exchangeRequests;

  // Selected exchange for chat and details
  const currentExchange = exchangeRequests.find(r => r.id === selectedExchangeId) || displayedRequests[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentExchange) return;

    sendMessageInExchange(currentExchange.id, chatInput);
    setChatInput('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>Accepted • Active Session</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
            <X className="w-3 h-3" />
            <span>Declined</span>
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  const isIncomingForMe = currentExchange?.receiverId === currentUser?.id;
  const peerStudentName = isIncomingForMe ? currentExchange?.senderName : currentExchange?.receiverName;
  const peerStudentAvatar = isIncomingForMe ? currentExchange?.senderAvatar : currentExchange?.receiverAvatar;
  const peerStudentCollege = isIncomingForMe ? currentExchange?.senderCollege : currentExchange?.receiverCollege;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Exchange Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage peer barter proposals, accept invitations, and coordinate learning sessions in real time.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Exchange Request</span>
        </button>
      </div>

      {/* Main 2-Column Interface: Left Requests List / Right Interactive Chat & Barter Room */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Requests List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 sm:p-5 flex flex-col space-y-4">
          {/* Tabs Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('incoming')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === 'incoming' 
                  ? 'bg-white text-brand-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Incoming ({incoming.length})
            </button>
            <button
              onClick={() => setActiveTab('outgoing')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === 'outgoing' 
                  ? 'bg-white text-brand-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Outgoing ({outgoing.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === 'all' 
                  ? 'bg-white text-brand-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({exchangeRequests.length})
            </button>
          </div>

          {/* List of Requests */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {displayedRequests.length > 0 ? (
              displayedRequests.map((req) => {
                const isSelected = currentExchange?.id === req.id;
                const isReqIncoming = req.receiverId === currentUser?.id;
                const peer = isReqIncoming 
                  ? { name: req.senderName, avatar: req.senderAvatar, college: req.senderCollege }
                  : { name: req.receiverName, avatar: req.receiverAvatar, college: req.receiverCollege };

                return (
                  <div
                    key={req.id}
                    onClick={() => setSelectedExchangeId(req.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-50/60 border-brand-300 shadow-xs'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img 
                          src={peer.avatar} 
                          alt={peer.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200" 
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{peer.name}</h4>
                          <p className="text-[10px] text-slate-400 truncate">{peer.college}</p>
                        </div>
                      </div>

                      {getStatusBadge(req.status)}
                    </div>

                    {/* Skill Barter Match snippet */}
                    <div className="bg-white/90 p-2 rounded-xl border border-slate-100 text-xs flex items-center justify-between gap-2">
                      <div className="min-w-0 truncate">
                        <span className="text-[10px] font-semibold text-brand-700">{req.offeredSkill}</span>
                        <span className="text-slate-400 mx-1">⇄</span>
                        <span className="text-[10px] font-semibold text-violet-700">{req.wantedSkill}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{req.createdAt}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-xs text-slate-500">
                No requests in this tab.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Exchange Room & Chat (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden min-h-[580px]">
          {currentExchange ? (
            <>
              {/* Room Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={peerStudentAvatar}
                    alt={peerStudentName}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white shadow-xs"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{peerStudentName}</span>
                      {getStatusBadge(currentExchange.status)}
                    </h3>
                    <p className="text-xs text-slate-500">{peerStudentCollege}</p>
                  </div>
                </div>

                {/* Accept / Decline actions if incoming and pending */}
                {isIncomingForMe && currentExchange.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => respondToExchangeRequest(currentExchange.id, 'accepted')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept Barter</span>
                    </button>
                    <button
                      onClick={() => respondToExchangeRequest(currentExchange.id, 'rejected')}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>

              {/* Barter Contract Card */}
              <div className="p-4 mx-5 my-4 rounded-2xl bg-gradient-to-r from-brand-50/70 via-indigo-50/50 to-violet-50/70 border border-brand-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-brand-600" />
                    <span className="font-bold text-slate-800">Exchange Proposal:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-brand-100 text-brand-700 font-semibold">{currentExchange.offeredSkill}</span>
                    <span className="text-slate-400 font-bold">FOR</span>
                    <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-700 font-semibold">{currentExchange.wantedSkill}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Cadence: <strong>{currentExchange.schedule || 'Weekends'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Chat Messages Stream */}
              <div className="flex-1 p-5 overflow-y-auto space-y-3.5 max-h-[340px]">
                {/* Introductory proposal message */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed max-w-md mx-auto text-center italic">
                  "{currentExchange.message}"
                </div>

                {/* Conversation messages */}
                {currentExchange.messages?.map((msg) => {
                  const isMine = msg.senderId === currentUser?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                        <span>{isMine ? 'You' : msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          isMine
                            ? 'bg-brand-600 text-white rounded-br-xs shadow-xs'
                            : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Send message to ${peerStudentName}...`}
                  className="flex-1 text-xs sm:text-sm rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                <ArrowRightLeft className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Select an Exchange Proposal</h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Choose an exchange request from the left column to view the proposal details and coordinate sessions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New Request Modal */}
      <RequestExchangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetStudent={students.find(s => s.id !== currentUser?.id) || students[1]}
      />
    </div>
  );
}

