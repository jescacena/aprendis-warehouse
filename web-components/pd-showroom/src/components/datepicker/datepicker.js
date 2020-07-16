import * as cal from './calendarUtil.js';

class Datepicker extends HTMLElement {
  constructor() {
    super();

    const today = new Date().toISOString().split('T')[0];
    cal.setDate(today);
    const monthData = cal.monthData;

    const daysArray = [
      ...new Array(monthData.prevMonthDaysGap).fill(0),
      ...Array.from(Array(monthData.numberDaysMonth), (_, i) => i + 1),
      ...new Array(monthData.nextMonthDaysGap).fill(0)
    ];

    console.log(daysArray);
    console.log(monthData);

    const template = document.createElement('template');
    template.innerHTML = this.calendarTemplate(daysArray, monthData);
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));
  }

  calendarTemplate(daysArray, monthData) {
    return `
      <style>
        td {text-align:center;}
        .today {font-weight:bold;}
        .weekend {color:green;}
      </style>
      <table>
        <tr>
          ${monthData.weekDay.map(day => `<td>${day}</td>`).join('')}
        </tr>

        ${daysArray.map((day, idx) => {
          const todayClass = (day === monthData.day) ? 'today' : '';
          const weekEndClass = (idx % 7 === 5 || idx % 7 === 6) ? 'weekend' : '';
          const classes = `${todayClass} ${weekEndClass}`;
          return `
            ${(idx % 7 === 0) ? '<tr>' : ''}
            <td class="${classes}">${(day) ? `${day}`: ''}</td>
            ${(idx % 7 === 6) ? '</tr>' : ''}
          `}
        ).join('')}
      </table>
    `;
  }

}

customElements.define('paradigma-datepicker', Datepicker);


