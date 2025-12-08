'use client';

import { useState, useEffect } from 'react';
import EntryForm from '@/components/EntryForm';
import Timeline from '@/components/Timeline';
import TopicsCloud from '@/components/TopicsCloud';
import { getEntries, deleteEntry, exportCSV } from '@/utils/storage';
import styles from './page.module.css';

export default function Home() {
  const [entries, setEntries] = useState<ReturnType<typeof getEntries>>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Load entries only on client-side after mount
    setEntries(getEntries());
  }, []);

  const handleEntrySaved = () => {
    setEntries(getEntries());
    setRefreshKey(prev => prev + 1);
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setEntries(getEntries());
    setRefreshKey(prev => prev + 1);
  };

  const handleExport = () => {
    exportCSV();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.logo}>
              <span className={styles.logoIcon}>📚</span>
              StudyStage
            </h1>
            <p className={styles.tagline}>Your Daily Learning Journal</p>
          </div>
          <button className={styles.exportBtn} onClick={handleExport}>
            <span className={styles.exportIcon}>📥</span>
            Export CSV
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <EntryForm onEntrySaved={handleEntrySaved} />

          {entries.length > 0 && (
            <TopicsCloud refreshKey={refreshKey} />
          )}

          <Timeline entries={entries} onDelete={handleDelete} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built with ❤️ to track learning progress • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
