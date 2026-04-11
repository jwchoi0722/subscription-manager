import "./MonthView.css";

function MonthView({ subs, today }:
  { subs: any[], today: Date }) {

  const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const calendarDateTimeFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });

  const currYear = today.getFullYear();
  const currMonth = today.getMonth();
  const currDate = today.getDate();
  const currMonthDayCount = new Date(currYear, currMonth + 1, 0).getDate();

  const calendarMonth = [];
  
  let firstDateOfMonthView = new Date(currYear, currMonth, 1);
  firstDateOfMonthView.setDate(firstDateOfMonthView.getDate() - firstDateOfMonthView.getDay());
  let lastDateOfMonthView = new Date(currYear, currMonth, currMonthDayCount);
  lastDateOfMonthView.setDate(lastDateOfMonthView.getDate() + 6 - lastDateOfMonthView.getDay());

  let dateOfMonth = new Date(firstDateOfMonthView);
  while (dateOfMonth <= lastDateOfMonthView) {
    calendarMonth.push({
      date: dateOfMonth,
      subs: new Array<string>()
    });
    dateOfMonth = new Date(dateOfMonth);
    dateOfMonth.setDate(dateOfMonth.getDate() + 1);
  }

  for (let sub of subs) {
    if (sub.start > lastDateOfMonthView || sub.end < firstDateOfMonthView) {
      continue;
    }

    for (let calendarDay of calendarMonth) {
      let curr = calendarDay.date;
      if (curr >= sub.start && curr <= sub.end) {
        calendarDay.subs.push(sub.name);
      }
      if (curr > sub.end) {
        break;
      }
    }
  }

  return (
    <>
      <h1>Monthly Calendar</h1>
      <p>Current Month: {calendarHeaderDateTimeFormat.format(today)} -  {currMonthDayCount} Days</p>

      <div className="calendar-container">
        <div className="calendar-grid-header">
          <div className="calendar-grid-header-entry">SUN</div>
          <div className="calendar-grid-header-entry">MON</div>
          <div className="calendar-grid-header-entry">TUE</div>
          <div className="calendar-grid-header-entry">WED</div>
          <div className="calendar-grid-header-entry">THU</div>
          <div className="calendar-grid-header-entry">FRI</div>
          <div className="calendar-grid-header-entry">SAT</div>
        </div>
        <div className="calendar-grid">
          {calendarMonth.map((entry) => (
            <div className={"calendar-entry"}>
              <div className="calendar-entry-header">
                <h3>{entry.date.getDate()}</h3>
              </div>
              {entry.subs.map((sub) => (
                <div className={"calendar-entry-sub-entry" + (entry.date.getMonth() !== currMonth ? " off-month" : "")}>
                  {sub}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MonthView