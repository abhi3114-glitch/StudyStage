export interface Entry {
    id: string;
    date: string; // ISO format YYYY-MM-DD
    text: string;
    tags: string[];
    timestamp: number; // Unix timestamp for sorting
}

const STORAGE_KEY = 'studystage_entries';

export const saveEntry = (entry: Omit<Entry, 'id' | 'timestamp'>): void => {
    const entries = getEntries();
    const newEntry: Entry = {
        ...entry,
        id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
    };
    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntries = (): Entry[] => {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        return JSON.parse(stored) as Entry[];
    } catch (error) {
        console.error('Error reading entries from localStorage:', error);
        return [];
    }
};

export const deleteEntry = (id: string): void => {
    const entries = getEntries().filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const exportCSV = (): void => {
    const entries = getEntries();
    if (entries.length === 0) {
        alert('No entries to export');
        return;
    }

    // Create CSV header
    const csvRows: string[] = ['Date,Learning,Tags'];

    // Add data rows
    entries.forEach(entry => {
        const date = entry.date;
        const text = `"${entry.text.replace(/"/g, '""')}"`;
        const tags = `"${entry.tags.join(', ')}"`;
        csvRows.push(`${date},${text},${tags}`);
    });

    // Create blob and download
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `studystage_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const getTagCounts = (): Record<string, number> => {
    const entries = getEntries();
    const tagCounts: Record<string, number> = {};

    entries.forEach(entry => {
        entry.tags.forEach(tag => {
            const normalizedTag = tag.toLowerCase();
            tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1;
        });
    });

    return tagCounts;
};
