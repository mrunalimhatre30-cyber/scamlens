import React, { useState, useEffect } from 'react';
import { Gamepad2, Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Shield, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fetchQuizQuestions, submitQuizAnswers } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function ScamChallenge() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedCurrent, setSubmittedCurrent] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await fetchQuizQuestions();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Failed to load quiz questions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (optionId) => {
    if (submittedCurrent) return; // Locked once answered
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleNextOrFinish = async () => {
    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
      setSubmittedCurrent(false);
    } else {
      // Complete quiz and evaluate
      setSubmitting(true);
      try {
        const payload = Object.entries(selectedAnswers).map(([qId, optId]) => ({
          questionId: parseInt(qId, 10),
          selectedOptionId: optId
        }));
        const res = await submitQuizAnswers(payload);
        if (res.evaluation) {
          setEvaluation(res.evaluation);
          if (res.evaluation.percentage >= 60) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }
      } catch (err) {
        alert(err.message || 'Error submitting challenge results.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setSubmittedCurrent(false);
    setEvaluation(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} className="anim-spin" color="var(--lime)" />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '4rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Challenge Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-pill">
              <Gamepad2 size={14} color="#C4F56A" />
              <span>Interactive Cybersecurity Challenge</span>
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
            Spot the <span style={{ color: 'var(--lime)' }}>Red Flags</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto' }}>
            Sharpen your instincts against realistic, fictional cyber threat scenarios. Can you identify which communications are deceptive?
          </p>
        </div>

        {!evaluation ? (
          /* Active Question Card */
          currentQ && (
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              {/* Progress Bar & Counter */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--lime)', fontWeight: 700 }}>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  Category: {currentQ.category}
                </span>
              </div>

              <div style={{
                height: '6px',
                width: '100%',
                backgroundColor: 'rgba(49, 83, 68, 0.4)',
                borderRadius: '3px',
                marginBottom: '2rem',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  backgroundColor: 'var(--lime)',
                  transition: 'width 0.3s ease',
                }} />
              </div>

              {/* Question Title & Sender */}
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                {currentQ.title}
              </h2>

              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                display: 'inline-block',
                padding: '0.2rem 0.6rem',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
              }}>
                Source: {currentQ.sender}
              </div>

              {/* Scenario Box */}
              <div style={{
                padding: '1.25rem',
                backgroundColor: 'rgba(18, 33, 28, 0.8)',
                border: '1.5px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
                lineHeight: 1.6,
                fontSize: '0.98rem',
                color: 'var(--text-primary)',
              }}>
                "{currentQ.scenario}"
              </div>

              {/* Multiple Choice Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(25, 41, 35, 0.6)',
                        border: `1.5px solid ${isSelected ? 'var(--lime)' : 'var(--border-color)'}`,
                        color: 'var(--text-primary)',
                        textAlign: 'left',
                        fontSize: '0.92rem',
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? 'var(--lime)' : 'var(--text-muted)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--lime)' }} />}
                      </div>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  disabled={!selectedAnswers[currentQ.id] || submitting}
                  onClick={handleNextOrFinish}
                  className="btn btn-lime"
                  style={{ padding: '0.75rem 1.75rem' }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="anim-spin" />
                      <span>Grading...</span>
                    </>
                  ) : isLastQuestion ? (
                    <>
                      <span>Complete Challenge</span>
                      <Award size={16} />
                    </>
                  ) : (
                    <>
                      <span>Next Scenario</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        ) : (
          /* Final Results Card */
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '20px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid var(--lime)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
              }}>
                <Award size={36} color="#C4F56A" />
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Challenge Completed!
              </h2>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--lime)', marginBottom: '0.75rem' }}>
                Your Score: {evaluation.score} / {evaluation.totalQuestions} ({evaluation.percentage}%)
              </div>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem' }}>
                {evaluation.feedback}
              </p>
            </div>

            {/* Detailed Question Review & Educational Breakdowns */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                Scenario Breakdown & Explanations:
              </h3>

              {evaluation.results.map((r, i) => (
                <div key={i} style={{
                  padding: '1.25rem',
                  backgroundColor: 'rgba(18, 33, 28, 0.7)',
                  border: `1px solid ${r.isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      Scenario {i + 1}: {r.title}
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: r.isCorrect ? '#10B981' : '#EF4444',
                    }}>
                      {r.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      <span>{r.isCorrect ? 'Correct' : 'Incorrect'}</span>
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.65rem' }}>
                    {r.explanation}
                  </p>

                  <div style={{
                    padding: '0.6rem 0.85rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    color: 'var(--lime)',
                  }}>
                    <strong>Safety Rule:</strong> {r.safetyTip}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={handleRestart} className="btn btn-lime">
                <RotateCcw size={16} />
                <span>Retry Challenge</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
