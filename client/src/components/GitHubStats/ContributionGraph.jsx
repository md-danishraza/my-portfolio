import styles from "./GitHubStats.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const ContributionGraph = ({ weeks, maxCount, firstDate, lastDate }) => {
  const getCommitColor = (count) => {
    if (count === 0) return "var(--c2)";
    const intensity = count / (maxCount || 1);
    if (intensity < 0.2) return "#9be9a8";
    if (intensity < 0.4) return "#40c463";
    if (intensity < 0.6) return "#30a14e";
    if (intensity < 0.8) return "#216e39";
    return "#0a4d1a";
  };

  // 1. Fixed day labels to match GitHub's 0=Sunday data structure
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 2. Pre-process weeks to guarantee a 7-day structure so grid rows ALWAYS align
  const processedWeeks = (weeks || []).map((week, index) => {
    const isFirstWeek = index === 0;
    const paddedWeek = Array(7).fill(null); // null represents a placeholder

    if (isFirstWeek && week.length < 7) {
      // If the first week is partial, the missing days are at the START (Sun, Mon...)
      const startIndex = 7 - week.length;
      week.forEach((count, i) => {
        paddedWeek[startIndex + i] = count;
      });
    } else {
      // For all other weeks (including the last partial week), missing days are at the END
      week.forEach((count, i) => {
        paddedWeek[i] = count;
      });
    }
    return paddedWeek;
  });

  // Calculate total contributions
  const totalContributions =
    weeks?.flat().reduce((sum, count) => sum + (count || 0), 0) || 0;

  // 3. Simplified month label generation perfectly aligned to the weeks
  const generateMonthLabels = () => {
    if (!firstDate || !processedWeeks.length) return [];

    const rawLabels = [];
    let currentMonth = -1;

    // 1. Gather all the month changes
    processedWeeks.forEach((_, index) => {
      const weekDate = new Date(firstDate);
      weekDate.setDate(weekDate.getDate() + index * 7);

      const month = weekDate.getMonth();
      if (month !== currentMonth) {
        rawLabels.push({
          name: weekDate.toLocaleString("default", { month: "short" }),
          weekIndex: index,
        });
        currentMonth = month;
      }
    });

    // 2. Filter out overlapping labels
    return rawLabels.filter((label, i, arr) => {
      if (i === 0 && arr.length > 1) {
        // If the first month label is less than 3 weeks away from the second month label,
        // hide it to prevent overlap.
        return arr[1].weekIndex - label.weekIndex >= 3;
      }
      return true;
    });
  };

  const monthLabels = generateMonthLabels();

  if (!weeks || weeks.length === 0) {
    return (
      <div className={styles.graphCard}>
        <div className={styles.noData}>
          <p>No contribution data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.graphCard}>
      <div className={styles.graphHeader}>
        <h4 className={styles.graphTitle}>
          <FaRegCalendarAlt />
          {weeks.length} weeks of contributions
        </h4>
        <div className={styles.graphLegend}>
          <span className={styles.legendLabel}>Less</span>
          <div className={styles.legendColors}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "var(--c2)" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#9be9a8" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#40c463" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#30a14e" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#216e39" }}
            ></div>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#0a4d1a" }}
            ></div>
          </div>
          <span className={styles.legendLabel}>More</span>
        </div>
      </div>

      <div className={styles.graphWrapper}>
        {/* Month labels */}
        <div
          className={styles.monthRow}
          style={{ position: "relative", height: "20px" }}
        >
          <div className={styles.monthSpacer}></div>
          <div className={styles.monthsContainer}>
            {monthLabels.map((month, index) => (
              <div
                key={index}
                className={styles.monthTag}
                style={{
                  position: "absolute",
                  left: `${(month.weekIndex / processedWeeks.length) * 100}%`,
                }}
              >
                {month.name}
              </div>
            ))}
          </div>
        </div>

        {/* Graph row with day labels */}
        <div className={styles.graphRow}>
          {/* Day labels column */}
          <div className={styles.dayColumn}>
            {dayLabels.map((day) => (
              <div key={day} className={styles.dayLabel}>
                {day}
              </div>
            ))}
          </div>

          {/* Contribution grid mapping the newly padded weeks */}
          <div className={styles.gridContainer}>
            {processedWeeks.map((week, weekIndex) => (
              <div key={weekIndex} className={styles.weekColumn}>
                {week.map((count, dayIndex) => {
                  const isPlaceholder = count === null;

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`${styles.commitCell} ${
                        isPlaceholder ? styles.placeholderCell : ""
                      }`}
                      style={{
                        backgroundColor: isPlaceholder
                          ? "transparent"
                          : getCommitColor(count),
                        opacity: isPlaceholder ? 0.3 : 1,
                        border: isPlaceholder
                          ? "1px dashed var(--border-color)"
                          : "none",
                      }}
                      title={
                        isPlaceholder
                          ? "No data"
                          : `${count} contribution${
                              count !== 1 ? "s" : ""
                            } on ${dayLabels[dayIndex]}`
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with stats */}
      <div className={styles.graphFooter}>
        <div className={styles.dateRange}>
          <span>
            📅{" "}
            {new Date(firstDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>→</span>
          <span>
            {new Date(lastDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className={styles.totalStats}>
          <span>📊 Total: {totalContributions} contributions</span>
          <span>•</span>
          <span>🔥 Max: {maxCount} in a day</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
