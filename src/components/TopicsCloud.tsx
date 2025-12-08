'use client';

import { getTagCounts } from '@/utils/storage';
import styles from './TopicsCloud.module.css';

interface TopicsCloudProps {
    refreshKey: number;
}

export default function TopicsCloud({ refreshKey }: TopicsCloudProps) {
    const tagCounts = getTagCounts();
    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20); // Top 20 tags

    if (sortedTags.length === 0) {
        return null;
    }

    // Calculate font sizes based on frequency
    const maxCount = Math.max(...sortedTags.map(([, count]) => count));
    const minCount = Math.min(...sortedTags.map(([, count]) => count));

    const getFontSize = (count: number) => {
        if (maxCount === minCount) return 1.5;
        const normalized = (count - minCount) / (maxCount - minCount);
        return 1 + normalized * 2; // Range from 1rem to 3rem
    };

    const getColor = (index: number) => {
        const colors = [
            'var(--accent-purple)',
            'var(--accent-blue)',
            'var(--accent-pink)',
            'var(--accent-green)',
            'var(--accent-orange)',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className={styles.cloud}>
            <h2 className={styles.cloudTitle}>Topics Explored</h2>
            <div className={styles.cloudContainer}>
                {sortedTags.map(([tag, count], index) => (
                    <span
                        key={tag}
                        className={styles.cloudTag}
                        style={{
                            fontSize: `${getFontSize(count)}rem`,
                            color: getColor(index),
                            animationDelay: `${index * 0.05}s`,
                        }}
                        title={`${count} ${count === 1 ? 'entry' : 'entries'}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{sortedTags.length}</span>
                    <span className={styles.statLabel}>Unique Topics</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{Object.values(tagCounts).reduce((a, b) => a + b, 0)}</span>
                    <span className={styles.statLabel}>Total Tags</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>{sortedTags[0]?.[0] || 'N/A'}</span>
                    <span className={styles.statLabel}>Most Studied</span>
                </div>
            </div>
        </div>
    );
}
