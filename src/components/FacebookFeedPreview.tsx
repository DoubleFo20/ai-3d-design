import React from 'react'
import type { Language, Translations } from '../i18n/translations'
import type { FacebookPostItem } from '../types/bakery'

interface FacebookFeedPreviewProps {
  posts: FacebookPostItem[]
  lang: Language
  t: Translations
}

export const FacebookFeedPreview: React.FC<FacebookFeedPreviewProps> = ({
  posts,
  lang,
  t,
}) => {
  return (
    <section className="facebook-feed-section" id="facebook">
      <div className="section-container">
        {/* Section Editorial Header */}
        <div className="section-editorial-header">
          <p className="section-eyebrow">{t.facebookFeed.sectionEyebrow}</p>
          <h2 className="section-title">{t.facebookFeed.sectionTitle}</h2>
          <p className="section-subtitle">{t.facebookFeed.sectionSubtitle}</p>
        </div>

        {/* Curated Feed Architecture Notice Banner */}
        <div className="curated-architecture-banner">
          <div className="banner-badge-group">
            <span className="dot-pulse" aria-hidden="true" />
            <span className="badge-tag">{t.facebookFeed.curatedBadge}</span>
          </div>
          <p className="banner-info">{t.facebookFeed.curatedDesc}</p>
        </div>

        {/* Facebook Post Cards Grid */}
        <div className="facebook-posts-grid">
          {posts.map((post) => {
            const dateStr = new Date(post.publishedTime).toLocaleDateString(
              lang === 'th' ? 'th-TH' : 'en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }
            )

            return (
              <article key={post.postId} className="facebook-post-card">
                {/* Post Card Header */}
                <div className="post-card-header">
                  <div className="post-author-group">
                    <div className="author-avatar" aria-hidden="true">
                      <span>เนย</span>
                    </div>
                    <div className="author-meta">
                      <span className="author-name">{post.authorName}</span>
                      <span className="post-date">
                        {t.facebookFeed.postedOn} {dateStr}
                      </span>
                    </div>
                  </div>

                  <span className="post-class-badge">
                    {post.productClassification}
                  </span>
                </div>

                {/* Post Media Framing / Intake Visual */}
                <div className="post-media-frame">
                  <div className="post-media-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="4" />
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="post-media-label">
                      {lang === 'th' ? 'ภาพโพสต์จากเพจ Facebook' : 'Facebook Page Photo'}
                    </span>
                  </div>
                </div>

                {/* Post Message Excerpt */}
                <div className="post-card-body">
                  <p className="post-message-text">{post.message[lang]}</p>
                </div>

                {/* Card Action Link to Facebook */}
                <div className="post-card-footer">
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-permalink-btn"
                  >
                    <span>{t.facebookFeed.openPostBtn}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* Visit Full Page Direct Button */}
        <div className="facebook-section-cta">
          <a
            href="https://www.facebook.com/CroissantNanchao"
            target="_blank"
            rel="noopener noreferrer"
            className="visit-full-page-btn"
          >
            <span>{t.facebookFeed.visitPageBtn}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
