const turnDateStringToToday = (dateString, end = false) => {
    const today = new Date();

    let month = today.getMonth() + 1;

    if (month < 10) {
        month = `0${month}`;
    }

    let date = today.getDate();

    if (dateString.split("T")[1] === "00:00:00-03:00" && end) {
        date += 1;
    }

    if (date < 10) {
        date = `0${date}`;
    }

    const todayString = `${today.getFullYear()}-${month}-${date}`

    return dateString.replace(/^.{10}/, todayString);
};

export {
    turnDateStringToToday
};
