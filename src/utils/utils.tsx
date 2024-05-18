//  初期画面（イベント作成）日付を "MM/DD(曜日)" の形式で表示する関数
export function formatDateWithDayOfWeek(date: Date): string {
    if (date !== null) {
        const newDate = new Date(date)
        const month = (newDate.getMonth() + 1).toString();
        const day = newDate.getDate().toString();
        const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
        const dayOfWeek = daysOfWeek[newDate.getDay()];
        return `${month}/${day}(${dayOfWeek})`;
    } else {
        return "No date available";
    }
}

// 日付を "MM/DD(曜日)" の形式で表示する関数（改行,0埋めあり）
export function formatDateWithDayOfWeek0sup(date: Date): string {
    if (date !== null) {
        const newDate = new Date(date)
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
        const dayOfWeek = daysOfWeek[newDate.getDay()];
        return `${month}/${day}\n(${dayOfWeek})`;
    } else {
        return "No date available"
    }
}