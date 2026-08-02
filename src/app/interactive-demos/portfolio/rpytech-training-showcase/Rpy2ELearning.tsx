import { TrendingUp, BookOpen, Brain, Clock, RefreshCw, Globe } from 'lucide-react';

const BENEFITS = [
  {
    Icon: TrendingUp,
    title: 'Improve Skills',
    desc: 'Enhance your professional skills with industry-focused modules',
    color: '#ef4444',
  },
  {
    Icon: BookOpen,
    title: 'Self Learning',
    desc: 'Study at your own pace anytime, anywhere with flexible content',
    color: '#8b5cf6',
  },
  {
    Icon: Brain,
    title: 'Get Knowledge',
    desc: 'Access expert-curated knowledge across multiple domains',
    color: '#06b6d4',
  },
  {
    Icon: Clock,
    title: 'Accessibility & Time Saving',
    desc: 'Save time with on-demand access to all course materials',
    color: '#f59e0b',
  },
  {
    Icon: RefreshCw,
    title: 'Easy Refresh of Content',
    desc: 'Content is regularly updated to stay relevant with industry needs',
    color: '#22c55e',
  },
  {
    Icon: Globe,
    title: 'Global Education',
    desc: 'Learn global best practices and internationally recognised skills',
    color: '#3b82f6',
  },
];

export default function Rpy2ELearning() {
  return (
    <section className="rpyv2-elearning" id="e-learning" aria-label="E-Learning benefits">
      <div className="rpyv2-container">
        {/* Header row */}
        <div className="rpyv2-elearning-header">
          <div>
            <p className="rpyv2-section-label">Online Learning</p>
            <h2 className="rpyv2-elearning-title">E-Learning Benefits</h2>
          </div>
          <a
            href="https://rpytech.in/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="rpyv2-elearning-cta"
          >
            Go to E-Learning
          </a>
        </div>

        {/* Benefits grid */}
        <div className="rpyv2-elearning-grid">
          {BENEFITS.map(({ Icon, title, desc, color }) => (
            <div key={title} className="rpyv2-elearning-card">
              <div
                className="rpyv2-elearning-icon"
                style={{ '--el-color': color } as React.CSSProperties}
                aria-hidden
              >
                <Icon size={26} />
              </div>
              <div className="rpyv2-elearning-info">
                <h3 className="rpyv2-elearning-card-title">{title}</h3>
                <p className="rpyv2-elearning-card-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
