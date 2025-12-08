'use client';

import { Entry } from '@/utils/storage';
import styles from './Timeline.module.css';

interface TimelineProps {
    entries: Entry[];
    onDelete: (id: string) => void;
}

export default function Timeline({ entries, onDelete }: TimelineProps) {
    // Sort entries by timestamp (newest first)
    const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

    // Group entries by date
    const groupedByDate = sortedEntries.reduce((acc, entry) => {
        if (!acc[entry.date]) {
            acc[entry.date] = [];
        }
        acc[entry.date].push(entry);
        return acc;
    }, {} as Record<string, Entry[]>);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (dateString === today.toISOString().split('T')[0]) {
            return 'Today';
        } else if (dateString === yesterday.toISOString().split('T')[0]) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        }
    };

    if (sortedEntries.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>📚</div>
                <h3 className={styles.emptyTitle}>No entries yet</h3>
                <p className={styles.emptyText}>Start logging what you learn every day!</p>
            </div>
        );
    }

    return (
        <div className={styles.timeline}>
            <h2 className={styles.timelineTitle}>Learning Timeline</h2>
            <div className={styles.timelineContainer}>
                {Object.entries(groupedByDate).map(([date, dateEntries]) => (
                    <div key={date} className={styles.dateGroup}>
                        <div className={styles.dateHeader}>
                            <span className={styles.dateLabel}>{formatDate(date)}</span>
                            <span className={styles.dateBadge}>{dateEntries.length} {dateEntries.length === 1 ? 'entry' : 'entries'}</span>
                        </div>
                        <div className={styles.entries}>
                            {dateEntries.map((entry, index) => (
                                <div key={entry.id} className={styles.entry} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={styles.entryContent}>
                                        <p className={styles.entryText}>{entry.text}</p>
                                        <div className={styles.entryTags}>
                                            {entry.tags.map((tag) => (
                                                <span key={tag} className={styles.tag}>
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => {
                                            if (confirm('Delete this entry?')) {
                                                onDelete(entry.id);
                                            }
                                        }}
                                        aria-label="Delete entry"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
