// In utils.js - Fixed date handling

export const fetchGitHubData = async (username, token) => {
  try {
    // Get today's date and 365 days ago
    const today = new Date();
    const lastYear = new Date();
    lastYear.setDate(today.getDate() - 365);

    const to = today.toISOString();
    const from = lastYear.toISOString();

    const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            name
            avatarUrl
            bio
            company
            location
            websiteUrl
            twitterUsername
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username, from, to },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const user = result.data.user;
    const calendar = user.contributionsCollection.contributionCalendar;
    const repos = user.repositories.nodes;

    // Process weeks - ensure we have proper data
    const weeks = calendar.weeks.map((week) =>
      week.contributionDays.map((day) => day.contributionCount)
    );

    // Calculate max count for colors
    const allCounts = weeks.flat();
    const maxCount = Math.max(...allCounts);

    // Get first and last dates safely
    const firstWeek = calendar.weeks[0];
    const lastWeek = calendar.weeks[calendar.weeks.length - 1];

    const firstDate = firstWeek?.contributionDays[0]?.date;
    const lastDate =
      lastWeek?.contributionDays[lastWeek.contributionDays.length - 1]?.date;

    // console.log("Date debug:", {
    //   firstDate,
    //   lastDate,
    //   weeksCount: calendar.weeks.length,
    //   lastWeekDays: lastWeek?.contributionDays.length,
    // });

    // Process languages
    const languages = {};
    repos.forEach((repo) => {
      if (repo.primaryLanguage) {
        const langName = repo.primaryLanguage.name;
        languages[langName] = (languages[langName] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        color:
          repos.find((r) => r.primaryLanguage?.name === name)?.primaryLanguage
            ?.color || "#858585",
      }));

    return {
      user: {
        name: user.name || username,
        avatar: user.avatarUrl,
        bio: user.bio || "Full Stack Developer",
        company: user.company,
        location: user.location,
        blog: user.websiteUrl,
        twitter: user.twitterUsername,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
      },
      repos,
      totalStars: repos.reduce((acc, repo) => acc + repo.stargazerCount, 0),
      totalForks: repos.reduce((acc, repo) => acc + repo.forkCount, 0),
      totalCommits: calendar.totalContributions,
      topLanguages,
      repoCount: repos.length,
      contributionCalendar: {
        weeks,
        maxCount,
        totalContributions: calendar.totalContributions,
        firstDate,
        lastDate,
      },
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw error;
  }
};
