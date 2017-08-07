let data = [5, 8, 2, 1, 15, 2, 3, 5, 9, 11, 10, 4, 3, 14, 1, 7, 10, 3, 2, 13],
    maxValueY = Math.max(...data),
    maxValueX = data.length,
    lengthXLine = Number(document.querySelector("#xGrid").firstElementChild.getAttribute("x2"))
        - Number(document.querySelector("#xGrid").firstElementChild.getAttribute("x1")),
    lengthYLine = Number(document.querySelector("#yGrid").firstElementChild.getAttribute("y2"))
        - Number(document.querySelector("#yGrid").firstElementChild.getAttribute("y1")),
    stepY = countStepY(maxValueY);

console.log(data);

function countStepY(maxValueY) {
    return (maxValueY % 3 === 0) ? (maxValueY / 3) : (countStepY(maxValueY + 1));
}

function drawYLabels(stepY) {
    let nodes = document.querySelectorAll(".y-labels text"),
        start = 0;
    for (let i = 3; i >= 0; i--) {
        nodes[i].appendChild(document.createTextNode(start.toString()));
        start += stepY;
    }
}

function drawXLabels(lengthXLine, maxValueX) {
    let parent = document.querySelector(".x-labels"),
        xCoordinates = 100,
        labelStepLength = lengthXLine / maxValueX;

    for (let i = 0; i < maxValueX; i++) {
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        xCoordinates += labelStepLength;
        text.appendChild(document.createTextNode(i.toString()));
        text.setAttribute("x", xCoordinates.toString());
        text.setAttribute("y", "670");
        parent.appendChild(text);
    }
}

function drawValues(data, lengthXLine, lengthYLine, maxValueX, maxValueY, stepY) {
    let parent = document.querySelector(".data"),
        xCoordinates = 100,
        width = lengthXLine / maxValueX,
        height = lengthYLine / maxValueY;

    drawYLabels(stepY);
    drawXLabels(lengthXLine, maxValueX);

    for (let i = 0; i < maxValueX; i++) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        i <= 5 ? rect.setAttribute("class", "data-green") : i <= 10 ? rect.setAttribute("class", "data-yellow") : rect.setAttribute("class", "data-red");
        let elementHeight = data[i] * height;
        rect.setAttribute("width", (width - 1).toString());
        rect.setAttribute("height", elementHeight.toString());
        rect.setAttribute("x", xCoordinates.toString());
        xCoordinates += width;
        rect.setAttribute("y", (lengthYLine + 50 - elementHeight).toString());
        parent.appendChild(rect);
    }

}

drawValues(data, lengthXLine, lengthYLine, maxValueX, maxValueY, stepY);