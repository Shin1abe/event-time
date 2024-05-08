//  初期画面（幹事）日付を "MM/DD(曜日)" の形式で表示する関数
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