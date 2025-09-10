import { parseDateString, type DateRange } from './parseDateString';

export type Job = {
    title: string;
    company: string;
    dates: DateRange;
    skills: string[];
};


export function extractJobInfo(data: { components: { entityComponent: any; }; }): Job {
    const getText = (obj: { text: any; }) => obj?.text || null;
    const entity = data?.components?.entityComponent;

    const subComponents = entity?.subComponents?.components || [];
    const skills = subComponents
        .map((comp: { components: { fixedListComponent: { components: { components: { textComponent: { text: { text: any; }; }; }; }[]; }; }; }) => comp.components?.fixedListComponent?.components?.[0]
            ?.components?.textComponent?.text?.text)
        .find((text: string) => text?.startsWith("Skills:"))
        ?.replace("Skills:", "")
        ?.split(" � ")
        ?.map((s: string) => s.trim()) || null;

    const dateText = getText(entity?.caption) || '';
    const dates = parseDateString(dateText);

    return {
        title: getText(entity?.titleV2?.text),
        company: getText(entity?.subtitle),
        dates,
        skills
    };
}

