var gLevel = 16;
var gRowsCount = Math.sqrt(gLevel);
var gCurrNumToTouch;
var gNums;
var gStartTime;
var gTimerInterval;

function initGame() {
    gCurrNumToTouch = 1;
    gNums = createNums();
    renderBoard(gNums);
}

function renderBoard(nums) {

    var strHTML = `<tr><td colspan="${gRowsCount}" style="border: 0px; font-size: 25px;
    font-weight: bold; height: auto;">Next Number: ${gCurrNumToTouch}</td></tr>
    
    <tr class="menu-levels"><td colspan="${gRowsCount}">
    Easy (16)<input name="touch" onclick="changeLevel(16)" type="radio" ${checkedRadio(16)} />
    Hard (25)<input name="touch" onclick="changeLevel(25)" type="radio" ${checkedRadio(25)} />
    Extreme (36)<input name="touch" onclick="changeLevel(36)" type="radio" ${checkedRadio(36)} /></td></tr>`;

    var numIdx = 0;
    for (var i = 0; i < gRowsCount; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gRowsCount; j++) {
            strHTML += `<td class="cell-num" onclick="cellClicked(this, ${nums[numIdx]})">${nums[numIdx]}</td>`;
            numIdx++;
        }
        strHTML += '</tr>';
    }
    var elTable = document.querySelector('.touch');
    elTable.innerHTML = strHTML;

}

function checkedRadio(level) {
    if (gLevel === level) {
        return 'checked';
    }
}

function changeLevel(level) {
    gLevel = level;
    gRowsCount = Math.sqrt(gLevel);
    initGame();
}

function cellClicked(el, clickedNum) {
    if (gCurrNumToTouch === clickedNum) {
        if (clickedNum === 1) startTimer();

        el.style.backgroundColor = '#7feaf3';
        el.classList.add('rotate-center')
        if (gCurrNumToTouch === gLevel) {
            endGame();
        } else {
            gCurrNumToTouch++;
            var elFirstTd = document.querySelector('.touch td');
            elFirstTd.innerHTML = `<tr><td colspan="${gRowsCount}">
            Next number: ${gCurrNumToTouch}</td></tr>`;
        }
    }
}

function endGame() {
    clearInterval(gTimerInterval);
    var elThirdTr = document.querySelectorAll('.touch tr')[2];
    var strHTML = `<td style="border: 0px; font-size: 50px; color: #e1ffae; font-weight: bold;"
    colspan="${gRowsCount}">YOU WIN!</td>`;
    elThirdTr.innerHTML = strHTML;

    elFourdTr = document.querySelectorAll('.touch tr')[3];
    strHTML = `<td style="border: 0px;" colspan="${gRowsCount}">
    <button onclick="initGame()" class="start-again">Start again</button></td>`;
    elFourdTr.innerHTML = strHTML;
}

function startTimer() {
    renderTimer();
    gStartTime = Date.now();
    gTimerInterval = setInterval(function() {
            var msDiff = Date.now() - gStartTime;
            var secs = '' + parseInt((msDiff / 1000) % 60);
            if (secs.length === 1) secs = '0' + secs;

            var min = '' + parseInt(msDiff / 1000 / 60);
            if (min.length === 1) min = '0' + min;

            var strMsDiff = '' + msDiff;
            var miliSecs = strMsDiff.charAt(strMsDiff.length - 3) + strMsDiff.charAt(strMsDiff.length - 2);
            if (miliSecs.length === 1) miliSecs = '0' + miliSecs;
            console.log(miliSecs);

            var passedTime = `${min}:${secs}.${miliSecs}`;
            var elTimer = document.querySelector('.timer');
            elTimer.innerText = passedTime;
        },
        10);
}

function renderTimer() {
    var colSpanTimer = 2;
    var colSpanTimerText = 2;
    if (gLevel === 25) {
        colSpanTimer = 3;
    } else if (gLevel === 36) {
        colSpanTimer = 3;
        colSpanTimerText = 3;
    }

    var strHTML = `<tr style="font-weight: bold; ">
        <td colspan="${colSpanTimerText}" style="border: 0px; font-size: 20px; height: auto;">Game Time:</td>
        <td colspan="${colSpanTimer}" class="timer" style="border: 0px; font-size: 25px; height: auto;"></td></tr>`;

    var elTr = document.querySelectorAll('.touch tr')[1];
    elTr.innerHTML = strHTML;
}

function createNums() {
    var nums = [];
    for (var i = 0; i < gLevel; i++) {
        nums.push(i + 1);
    }

    var randomNums = [];
    for (i = 0; i < gLevel; i++) {
        var numAndIdx = randomNum(nums);
        randomNums.push(numAndIdx.num);
        nums.splice(numAndIdx.idx, 1);
    }
    return randomNums
}

function randomNum(nums) {
    var idx = Math.floor(Math.random() * nums.length);
    var num = nums[idx];
    return { num, idx };
}