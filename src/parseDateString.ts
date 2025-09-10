import { format, parse, isValid } from 'date-fns';
import type { DateRange } from '.';

export function parseDateString(dateStr: string): DateRange {
    // Example input: "Jan 2020 - Apr 2020 � 4 mos"
    // Example input: "Jan 2020 - Present 5 yrs 6 mos"
    const parts = dateStr.split('�')[0]?.trim();
    if (!parts) throw new Error('Invalid date string format');

    const [startStr, endStrRaw] = parts.split('-').map(s => s.trim());
    if (!startStr || !endStrRaw) throw new Error('Invalid date range format');

    const endStr = endStrRaw === 'Present' ? format(new Date(), 'yyyy-MM-dd') : endStrRaw;

    const parseMonthYear = (str: string): string => {
        // Try parsing as ISO date first
        const isoDate = parse(str, 'yyyy-MM-dd', new Date());
        if (isValid(isoDate)) return str;

        // Try parsing as month year
        const monthYearDate = parse(str, 'MMM yyyy', new Date());
        if (isValid(monthYearDate)) return format(monthYearDate, 'yyyy-MM-dd');

        // Try parsing as year only
        const yearDate = parse(str, 'yyyy', new Date());
        if (isValid(yearDate)) return format(yearDate, 'yyyy-01-01');

        throw new Error(`Invalid date format: ${str}`);
    };

    return {
        start: parseMonthYear(startStr),
        end: parseMonthYear(endStr)
    };
}export interface DateRange {
    start: string; // ISO format
    end: string; // ISO format
}

