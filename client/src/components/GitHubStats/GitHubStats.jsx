// GitHubStats.jsx
import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaUsers,
  FaBook,
  FaMapMarkerAlt,
  FaLink,
  FaTwitter,
  FaRegClock,
} from "react-icons/fa";
import { HiCode, HiOutlineOfficeBuilding } from "react-icons/hi";
import { fetchGitHubData } from "./utils.js";
import styles from "./GitHubStats.module.css";
import ContributionGraph from "./ContributionGraph.jsx";

function GitHubStats() {
  const [data, setData] = useState({
    user: {},
    repos: [],
    totalStars: 0,
    totalForks: 0,
    totalCommits: 0,
    topLanguages: [],
    contributionCalendar: {
      weeks: [],
      maxCount: 0,
      totalContributions: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const username = "md-danishraza";
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const githubData = await fetchGitHubData(username, token);
        // console.log(githubData);
        setData(githubData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading GitHub data:", err);
        setError(err.message || "Failed to load GitHub data");
        setLoading(false);
      }
    };

    if (token) {
      loadData();
    } else {
      setError("GitHub token not found in environment variables");
      setLoading(false);
    }
  }, [username, token]);

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString() || "0";
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Fetching GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <FaGithub className={styles.errorIcon} />
          <h3 className={styles.errorTitle}>Unable to load GitHub data</h3>
          <p className={styles.errorMessage}>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section} id="github">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <FaGithub className={styles.titleIcon} />
            GitHub <span className={styles.titleHighlight}>Stats</span>
          </h2>
          <p className={styles.subtitle}>
            My open source contributions and activity
          </p>
        </div>

        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileLeft}>
            <img
              src={data.user.avatar}
              alt={data.user.name}
              className={styles.avatar}
            />
            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>{data.user.name}</h3>
              <p className={styles.profileBio}>{data.user.bio}</p>

              <div className={styles.profileDetails}>
                {data.user.company && (
                  <span className={styles.detailItem}>
                    <HiOutlineOfficeBuilding />
                    {data.user.company}
                  </span>
                )}
                {data.user.location && (
                  <span className={styles.detailItem}>
                    <FaMapMarkerAlt />
                    {data.user.location}
                  </span>
                )}
                {data.user.blog && (
                  <a
                    href={
                      data.user.blog.startsWith("http")
                        ? data.user.blog
                        : `https://${data.user.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.detailLink}
                  >
                    <FaLink />
                    Website
                  </a>
                )}
                {data.user.twitter && (
                  <a
                    href={`https://twitter.com/${data.user.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.detailLink}
                  >
                    <FaTwitter />@{data.user.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{ "--stat-color": "#6e40c9" }}
              >
                <FaBook />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>{data.repos.length}</span>
                <span className={styles.statLabel}>Repositories</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{ "--stat-color": "#f1e05a" }}
              >
                <FaStar />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>
                  {formatNumber(data.totalStars)}
                </span>
                <span className={styles.statLabel}>Stars</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{ "--stat-color": "#2b7489" }}
              >
                <FaCodeBranch />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>
                  {formatNumber(data.totalForks)}
                </span>
                <span className={styles.statLabel}>Forks</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{ "--stat-color": "#8957e5" }}
              >
                <HiCode />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>
                  {formatNumber(data.totalCommits)}
                </span>
                <span className={styles.statLabel}>Commits</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{ "--stat-color": "#34d058" }}
              >
                <FaUsers />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>
                  {formatNumber(data.user.followers)}
                </span>
                <span className={styles.statLabel}>Followers</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{ "--stat-color": "#9f7be1" }}
              >
                <FaRegClock />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>0</span>
                <span className={styles.statLabel}>Gists</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "overview" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "contributions" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("contributions")}
          >
            Contributions
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "languages" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("languages")}
          >
            Languages
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "overview" && (
            <div className={styles.overviewTab}>
              {/* Contribution Graph */}
              {data.contributionCalendar && (
                <ContributionGraph
                  weeks={data.contributionCalendar.weeks}
                  maxCount={data.contributionCalendar.maxCount}
                  firstDate={data.contributionCalendar.firstDate}
                  lastDate={data.contributionCalendar.lastDate}
                />
              )}

              {/* Recent Repositories */}
              {data.repos && data.repos.length > 0 && (
                <div className={styles.reposCard}>
                  <h4 className={styles.reposTitle}>Recent Repositories</h4>
                  <div className={styles.reposList}>
                    {data.repos.slice(0, 5).map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.repoItem}
                      >
                        <div className={styles.repoInfo}>
                          <h5 className={styles.repoName}>{repo.name}</h5>
                          {repo.description && (
                            <p className={styles.repoDescription}>
                              {repo.description}
                            </p>
                          )}
                          <div className={styles.repoMeta}>
                            {repo.primaryLanguage && (
                              <span className={styles.repoLanguage}>
                                <span
                                  className={styles.languageDot}
                                  style={{
                                    backgroundColor: repo.primaryLanguage.color,
                                  }}
                                ></span>
                                {repo.primaryLanguage.name}
                              </span>
                            )}
                            <span className={styles.repoStars}>
                              <FaStar /> {repo.stargazerCount || 0}
                            </span>
                            <span className={styles.repoForks}>
                              <FaCodeBranch /> {repo.forkCount || 0}
                            </span>
                          </div>
                        </div>
                        <span className={styles.repoArrow}>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "contributions" && (
            <div className={styles.contributionsTab}>
              <div className={styles.contributionsSummary}>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryValue}>
                    {formatNumber(data.totalCommits)}
                  </span>
                  <span className={styles.summaryLabel}>Total Commits</span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryValue}>
                    {data.repos.length}
                  </span>
                  <span className={styles.summaryLabel}>Repositories</span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryValue}>
                    {formatNumber(data.totalStars)}
                  </span>
                  <span className={styles.summaryLabel}>Stars Earned</span>
                </div>
              </div>

              {/* Full Contribution Calendar */}
              {data.contributionCalendar && (
                <div className={styles.calendarCard}>
                  <h4 className={styles.calendarTitle}>
                    Contribution Calendar
                  </h4>
                  <ContributionGraph
                    weeks={data.contributionCalendar.weeks}
                    maxCount={data.contributionCalendar.maxCount}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "languages" && (
            <div className={styles.languagesTab}>
              {data.topLanguages && data.topLanguages.length > 0 && (
                <>
                  <div className={styles.languagesCard}>
                    <h4 className={styles.languagesTitle}>Top Languages</h4>
                    <div className={styles.languagesList}>
                      {data.topLanguages.map((lang, index) => (
                        <div key={lang.name} className={styles.languageItem}>
                          <div className={styles.languageHeader}>
                            <span className={styles.languageName}>
                              <span
                                className={styles.languageDot}
                                style={{
                                  backgroundColor: lang.color || "#858585",
                                }}
                              ></span>
                              {lang.name}
                            </span>
                            <span className={styles.languageCount}>
                              {lang.count} repos
                            </span>
                          </div>
                          <div className={styles.languageBar}>
                            <div
                              className={styles.languageProgress}
                              style={{
                                width: `${
                                  (lang.count / data.topLanguages[0].count) *
                                  100
                                }%`,
                                backgroundColor: lang.color || "#858585",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Language Distribution */}
                  <div className={styles.distributionCard}>
                    <h4 className={styles.distributionTitle}>Distribution</h4>
                    <div className={styles.distributionChart}>
                      {data.topLanguages.map((lang, index) => (
                        <div
                          key={lang.name}
                          className={styles.distributionSegment}
                          style={{
                            width: `${(lang.count / data.repos.length) * 100}%`,
                            backgroundColor: lang.color || "#858585",
                          }}
                          title={`${lang.name}: ${lang.count} repos`}
                        />
                      ))}
                    </div>
                    <div className={styles.distributionLegend}>
                      {data.topLanguages.map((lang) => (
                        <div key={lang.name} className={styles.legendItem}>
                          <span
                            className={styles.legendColor}
                            style={{ backgroundColor: lang.color || "#858585" }}
                          ></span>
                          <span className={styles.legendName}>{lang.name}</span>
                          <span className={styles.legendPercent}>
                            {Math.round((lang.count / data.repos.length) * 100)}
                            %
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* View All Repos Button */}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewAllButton}
        >
          View All Repositories
          <svg
            className={styles.buttonArrow}
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default GitHubStats;
