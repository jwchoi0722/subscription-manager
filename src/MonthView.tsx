function MonthView({ subs, today }:
  { subs: any[], today: Date }) {

  const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const calendarDateTimeFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });

  const currYear = today.getFullYear();
  const currMonth = today.getMonth();
  const currDate = today.getDate();
  const currMonthDayCount = new Date(currYear, currMonth + 1, 0).getDate();

  const calendarMonth = [];
  for (let i = 1; i <= currMonthDayCount; i++) {
    calendarMonth.push({
      date: i,
      dayOfWeek: calendarDateTimeFormat.format(new Date(currYear, currMonth, i)),
      subs: new Array<string>()
    });
  }
  for (let sub of subs) {
    const date = new Date(currYear, currMonth, 1);
    for (let i = 1; i <= currMonthDayCount; i++) {
      date.setDate(i);
      const currIndex = i - 1;
      if (date >= sub.start && date <= sub.end) {
        calendarMonth[currIndex].subs.push(sub.name);
      }
    }
  }

  return (
    <>
      <h1>Monthly Calendar</h1>
      <div className="calendar-container">
        <span>Current Month: {calendarHeaderDateTimeFormat.format(today)} -  {currMonthDayCount} Days</span>

        {calendarMonth.map((entry) => (
          <div className="calendar-entry">
            <div className="calendar-entry-header">
              <h3>{entry.date} ({entry.dayOfWeek}) {entry.date === currDate ? "TODAY" : ""}</h3>
            </div>
            {entry.subs.map((sub) => (
              <p>{sub}</p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default MonthView