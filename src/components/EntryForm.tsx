'use client';

import { useState } from 'react';
import { saveEntry } from '@/utils/storage';
import styles from './EntryForm.module.css';

interface EntryFormProps {
    onEntrySaved: () => void;
}

export default function EntryForm({ onEntrySaved }: EntryFormProps) {
    const [text, setText] = useState('');
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim()) {
            alert('Please enter what you learned today');
            return;
        }

        // Extract tags from text (hashtags) and tag input
        const hashtagsFromText = text.match(/#[\w]+/g)?.map(tag => tag.slice(1)) || [];
        const tagsFromInput = tagInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const allTags = [...new Set([...hashtagsFromText, ...tagsFromInput])];

        if (allTags.length === 0) {
            alert('Please add at least one tag');
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        saveEntry({
            date: today,
            text: text.trim(),
            tags: allTags,
        });

        setText('');
        setTagInput('');
        onEntrySaved();
    };

    const remainingChars = 200 - text.length;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h2 className={styles.title}>What did you learn today?</h2>
                <span className={`${styles.charCount} ${remainingChars < 20 ? styles.warning : ''}`}>
                    {remainingChars} chars left
                </span>
            </div>

            <textarea
                className={styles.textarea}
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 200))}
                placeholder="I learned that... (use #tags or add them below)"
                rows={4}
                maxLength={200}
            />

            <div className={styles.tagRow}>
                <input
                    type="text"
                    className={styles.tagInput}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Tags (comma-separated: React, NextJS, TypeScript)"
                />
                <button type="submit" className={styles.submitBtn}>
                    <span className={styles.btnIcon}>✨</span>
                    Log Learning
                </button>
            </div>
        </form>
    );
}
