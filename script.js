let isDarkMode= JSON.parse(localStorage.getItem('isDarkMode')) || false;
renderDarkmode();
let indexOfList = 0;

//Name Of Lists
const NameOfList = JSON.parse(localStorage.getItem('NameOfList')) || [];

const listArray = document.querySelector('.list-array');
function renderNameOfList () {
    listArray.innerHTML = NameOfList.map((val, index)=>{
        return`<button type="button" id="L${index}" data-id="${val}">
            <i class="fa-solid fa-list-ul"></i>
            ${val}
            <i class="fa-regular fa-circle-xmark" data-name="${val}"></i>
        </button>`
    }).join('');
    wellDone();
    LinkToNameList();
}

const ListInput = document.querySelector('.ListOfList form input')
const ListForm = document.querySelector('.ListOfList form')
function addNewList () {
    ListForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        ListInput.value=ListInput.value.trim();
        let check = true;
        if(ListInput.value.length>0) {
            for(let i=0;i<NameOfList.length;i++) {
                if(NameOfList[i]==ListInput.value) {
                    check=false;
                    break;
                }
            }
            if (check) {
                //Push into name list
                NameOfList.push(ListInput.value);
                localStorage.setItem('NameOfList', JSON.stringify(NameOfList));
                //Push child List into Father List
                let toDoList = [];
                ListOfList.push(toDoList);
                localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
            } else {
                ListInput.value='';
                alert('This Name List is existed')
            }
        }
        // ListInputValue='';
        ListInput.value='';
        renderNameOfList();
        FixChangeMainName();
        LinkToNameList();
        //set border color when list is choosed
        let res = document.querySelector(`#L${indexOfList}`);
        res.style.borderColor='red';
    })
}

// Father Of List
const ListOfList = JSON.parse(localStorage.getItem('ListOfList')) || [];

//Connect To Name List
function LinkToNameList () {
    let res = document.querySelectorAll('.ListOfList .list-array button');
    let mainName = document.querySelector('.main-name');
    NameOfList.map((val, index)=>{
        res[index].addEventListener('click', ()=>{

            //change index of Father List to get any element
            indexOfList=index;

            //change main name
            mainName.innerHTML= val;
            addNewTaskbtn.style.display='block';
            render();
        })
    })
}

//fix change Main Name
function FixChangeMainName () {
    let res = document.querySelectorAll('.ListOfList .list-array button');
    let mainName = document.querySelector('.main-name');
    if(ListOfList.length>0) {
        mainName.innerHTML= NameOfList[0];
        indexOfList=0;
        render();
        addNewTaskbtn.style.display='block';
    } else {
        mainName.innerHTML= '';
    }
}

//Delete List

function deleteList () {
    listArray.addEventListener('click', (e)=>{
        const iconDeleteList = document.querySelectorAll('.list-array button .fa-circle-xmark');
        for(let i=0;i<NameOfList.length;i++) {
            if(e.target.getAttribute('data-name')===iconDeleteList[i].getAttribute('data-name')){
                NameOfList.splice(i,1);
                ListOfList.splice(i,1);
                localStorage.setItem('NameOfList', JSON.stringify(NameOfList));
                localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
                indexOfList=0;
                renderNameOfList();
                FixChangeMainName();
                render()
                break;
            }
        }
    })
}

//render a To Do List
function render () {    
    document.querySelector('.list-todo .container ul').innerHTML = ListOfList[indexOfList].map((val, index)=>{
        let {content, timeRemaing, id, isDone, moreDetail} = val;
        return isDone ? 
        (`
        <li>
    <div class="task">
        <span class="tickIcon">
            <i class="fa-regular fa-circle-check tickDone" title="tick Done/Not Done" data-id="${id}"></i>
        </span>
        <input type="text" class="content tickDone" value="${content}" readonly required id="a${index}">
        <i class="fa-solid fa-ellipsis-vertical" data-id="${id}">
            <div class="icon">
                <span class="calendar">
                    <form action="calendar" class="calendarForm">
                        <input type="datetime-local" class="classCalendar" title="Calendar" required data-id="${id}">
                        <button title="Press submit when date is choosed\nOr Press enter twice to confirm">submit</button>
                    </form>
                </span>
                <span class="editIcon">
                <label for="a${index}"><i class="fa-solid fa-pen-to-square" title="Edit" data-id="${id}"></i></label>
                </span>
                <span class="deleteIcon">
                    <i class="fa-solid fa-trash-can" title="Delete" data-id="${id}"></i>
                </span>
            </div>
        </i>
    </div>
    <form class="detail">
                    <i class="fa-solid fa-align-left" title="Add Detail"></i>
                    <input type="text" class="inputDetail"  value="${moreDetail}" data-id="${id}">
                </form>
    <span class="time"><i class="fa-solid fa-bell"></i> <i>${timeRemaing}</i></span>
    </li>
    `)
    :
    (`
    <li>
    <div class="task">
        <span class="tickIcon">
            <i class="fa-regular fa-circle-check" title="tick Done/Not Done" data-id="${id}"></i>
        </span>
        <input type="text" class="content" value="${content}" readonly required id="a${index}">
        <i class="fa-solid fa-ellipsis-vertical" data-id="${id}">
            <div class="icon">
                <span class="calendar">
                    <form action="calendar" class="calendarForm">
                        <input type="datetime-local" class="classCalendar" title="Calendar" required data-id="${id}">
                        <button title="Press submit when date is choosed\nOr Press enter twice to confirm">submit</button>
                    </form>
                </span>
                <span class="editIcon">
                <label for="a${index}"><i class="fa-solid fa-pen-to-square" title="Edit" data-id="${id}"></i></label>
                </span>
                <span class="deleteIcon">
                    <i class="fa-solid fa-trash-can" title="Delete" data-id="${id}"></i>
                </span>
            </div>
        </i>
    </div>
    <form class="detail">
                    <i class="fa-solid fa-align-left" title="Add Detail"></i>
                    <input type="text" class="inputDetail" value="${moreDetail}" data-id="${id}">
                </form>
    <span class="time"><i class="fa-solid fa-bell"></i> <i>${timeRemaing}</i></span>
</li>
    `)
    }).join('');
    wellDone();
}

//Get Value and Add to New Task
const input = document.querySelector('.list-todo .container .form-group input')
let value = '';
input.addEventListener('keyup', (e)=>{
    value = e.target.value;
})
const form = document.querySelector('#form'); 
function addNewTask () {
    //Create new Object and Push in array when submit
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        if(NameOfList.length>0) {
            value=value.trim();
            if(value.length>0) {
                let newObj = {
                    content: value,
                    timeChoosed: '',
                    timeRemaing: '',
                    id: new Date().getTime(),
                    isDone: false,
                    isEdit: false,
                    moreDetail: '',
                }
                ListOfList[indexOfList].unshift(newObj);
                localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
                render();
            }
        } else {
            alert('Please add new list first');
        }
        value='';
        input.value='';
    })
}

const List = document.querySelector('.ListOfList .list-array');
const listTodo = document.querySelector('.list-todo .container ul');
function addEvent () {
    List.addEventListener('click', (e)=>{
        
    })

    listTodo.addEventListener('click', (e)=>{

        //Delete Task
        const matchesBtnDelete = e.target.matches('.deleteIcon i');
        if(matchesBtnDelete) {
            const id=e.target.getAttribute('data-id');
            const tempt=ListOfList[indexOfList].filter((val)=>{
                return val.id!==Number(id);
            })
            ListOfList[indexOfList]=tempt;
            localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
            render();
        }

        //Edit task
        const editContent = document.querySelectorAll('.list-todo .container ul li .task .content');
        const borderLi = document.querySelectorAll('.list-todo .container ul li');
        const matchesBtnEdit = e.target.matches('.editIcon label i');
        if(matchesBtnEdit) {
            const id=e.target.getAttribute('data-id');
            ListOfList[indexOfList].map((val, index)=>{
                if(val.id===Number(id)) {
                    borderLi[index].classList.toggle('onEdit');
                    e.target.classList.toggle('onEdit');
                    ListOfList[indexOfList][index].content=editContent[index].value;
                    editContent[index].readOnly=!editContent[index].readOnly;
                    localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
                }
            })
        }

        //Add Detail
        const inputDetail = document.querySelectorAll('.list-todo .detail input');
        const formDetail = document.querySelectorAll('.list-todo .detail');
        for(let i=0;i<ListOfList[indexOfList].length;i++) {
            const id = e.target.getAttribute('data-id');
            if(ListOfList[indexOfList][i].id===Number(id)) {
                formDetail[i].addEventListener('submit',(el)=>{
                    el.preventDefault();
                    inputDetail[i].value=inputDetail[i].value.trim();
                    if(inputDetail[i].value.length>0) {
                        ListOfList[indexOfList][i].moreDetail=inputDetail[i].value;
                        localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
                        render();
                    } else {
                        inputDetail[i].value='';
                    }
                })
            }
        }

        //TickDone
        const tickIcon = document.querySelectorAll('.list-todo .tickIcon i');
        const matchesBtnTickDone = e.target.matches('.list-todo .tickIcon i');
        if(matchesBtnTickDone) {
            const id = e.target.getAttribute('data-id');
            ListOfList[indexOfList].map((val,index)=>{
                if(val.id===Number(id)) {
                    if(ListOfList[indexOfList][index].isDone) {
                        ListOfList[indexOfList][index].isDone=!ListOfList[indexOfList][index].isDone;
                    } else {
                        ListOfList[indexOfList][index].isDone=!ListOfList[indexOfList][index].isDone;
                    }
                    localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
                    render();
                }
            })
        }

        //TimeRemaining
        const timer = document.querySelectorAll('.calendarForm');
        const inputCalendar = document.querySelectorAll('.classCalendar');
        const matchesBtnCalendar = e.target.matches('.classCalendar');
        if(matchesBtnCalendar) {
            ListOfList[indexOfList].map((val, index)=>{
                const id = e.target.getAttribute('data-id');
                if(val.id===Number(id)) {
                    timer[index].addEventListener('submit', (e)=>{
                        let toDay = new Date();
                        e.preventDefault();
                        ListOfList[indexOfList][index].timeChoosed = new Date (inputCalendar[index].value).getTime();
                        let res = (ListOfList[indexOfList][index].timeChoosed - toDay)/1000; //convert to second
                        let tempt;
                        let year;
                        let month;
                        let day;
                        let hour;
                        let minute;
                        let second;
                        if (res<0) alert('Please choose a larger date');
                        else if(res>60) {
                            res/=60; //conver to minute;
                            if(res>60) {
                                res/=60; //convert to hour
                                if(res>24) {
                                    res/=24; //convert to day
                                    if(res>30) {
                                        res/=30; //convert to month
                                        
                                        if(res>12) {
                                            res/=12; //convert to year
                
                                            //year
                                            year = Math.trunc(res);
                
                                            //month
                                            tempt = (res - year)*12;
                                            month = Math.trunc(tempt);
                
                                            //day
                                            tempt = (tempt - month)*30;
                                            day = Math.trunc(tempt);
            
                                            ListOfList[indexOfList][index].timeRemaing = `${year} years - ${month} months - ${day} days`;
                                        } else {
                                            month = Math.trunc(res); //month
                
                                            //day
                                            tempt = (res-month)*30;
                                            day = Math.trunc(tempt);

                                            //hour
                                            tempt = (tempt-day)*24;
                                            hour = Math.trunc(tempt);
                                            ListOfList[indexOfList][index].timeRemaing = `${month} months - ${day} days - ${hour} hours`;
                                        }
                                    } else {
                                        day = Math.trunc(res);
                
                                        //hour
                                        tempt = (res - day)*24;
                                        hour = Math.trunc(tempt);

                                        //minute
                                        tempt = (tempt-hour)*60;
                                        minute = Math.trunc(tempt);
            
                                        ListOfList[indexOfList][index].timeRemaing = `${day} days - ${hour} hours - ${minute} minutes`;
                                    }
                                } else {
                                    hour = Math.trunc(res);
                
                                    //minute
                                    tempt = (res-hour)*60;
                                    minute = Math.trunc(tempt);

                                    //second
                                    tempt = (tempt-minute)*60;
                                    second = Math.trunc(tempt);
                                    ListOfList[indexOfList][index].timeRemaing = `${hour} hours - ${minute} minutes - ${second} seconds`;
                                }
                            } else {
                                minute = Math.trunc(res);

                                //seconde
                                tempt = (res-minute)*60;
                                second = Math.trunc(tempt);
                                ListOfList[indexOfList][index].timeRemaing = `${minute} minutes - ${second} seconds`;
                            }
                        } else {
                            second = Math.trunc(res);
                            ListOfList[indexOfList][index].timeRemaing = `${second} seconds`;
                        }
                        localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
                        render();
                    })
                }
            })
        }

        //More Function
        const listIcon = document.querySelectorAll('.fa-ellipsis-vertical');
        const icon = document.querySelectorAll('.icon')
        const matchesListIconBtn = e.target.matches('.fa-ellipsis-vertical');
        if(matchesListIconBtn) {
            const id = e.target.getAttribute('data-id');
            ListOfList[indexOfList].map((val, index)=>{
                if(val.id===Number(id)) {
                    icon[index].classList.toggle('active');
                }
            })
        }
    })
}

//update TimeRemaining
function updateTime () {
    if(ListOfList.length>0) {
        ListOfList[indexOfList].map((val, index)=>{
            if(ListOfList[indexOfList][index].timeChoosed && ListOfList[indexOfList][index].timeChoosed!='Expired') {
                let toDay = new Date().getTime();
                let res = (ListOfList[indexOfList][index].timeChoosed - toDay)/1000; //convert to second
                let tempt;
                let year;
                let month;
                let day;
                let hour;
                let minute;
                let second;
                if (res<0) ListOfList[indexOfList][index].timeRemaing = 'Expired';
                else if(res>60) {
                    res/=60; //conver to minute;
                    if(res>60) {
                        res/=60; //convert to hour
                        if(res>24) {
                            res/=24; //convert to day
                            if(res>30) {
                                res/=30; //convert to month
                                        
                                if(res>12) {
                                    res/=12; //convert to year
                
                                    //year
                                    year = Math.trunc(res);
                
                                    //month
                                    tempt = (res - year)*12;
                                    month = Math.trunc(tempt);
                
                                    //day
                                    tempt = (tempt - month)*30;
                                    day = Math.trunc(tempt);
            
                                    ListOfList[indexOfList][index].timeRemaing = `${year} years - ${month} months - ${day} days`;
                                } else {
                                    month = Math.trunc(res); //month
                
                                    //day
                                    tempt = (res-month)*30;
                                    day = Math.trunc(tempt);

                                    //hour
                                    tempt = (tempt-day)*24;
                                    hour = Math.trunc(tempt);
                                    ListOfList[indexOfList][index].timeRemaing = `${month} months - ${day} days - ${hour} hours`;
                                }
                            } else {
                                day = Math.trunc(res);
                
                                //hour
                                tempt = (res - day)*24;
                                hour = Math.trunc(tempt);

                                //minute
                                tempt = (tempt-hour)*60;
                                minute = Math.trunc(tempt);
            
                                ListOfList[indexOfList][index].timeRemaing = `${day} days - ${hour} hours - ${minute} minutes`;
                            }
                        } else {
                            hour = Math.trunc(res);
                
                            //minute
                            tempt = (res-hour)*60;
                            minute = Math.trunc(tempt);

                            //second
                            tempt = (tempt-minute)*60;
                            second = Math.trunc(tempt);
                            ListOfList[indexOfList][index].timeRemaing = `${hour} hours - ${minute} minutes - ${second} seconds`;
                        }
                    } else {
                        minute = Math.trunc(res);

                        //seconde
                        tempt = (res-minute)*60;
                        second = Math.trunc(tempt);
                        ListOfList[indexOfList][index].timeRemaing = `${minute} minutes - ${second} seconds`;
                    }
                } else {
                    second = Math.trunc(res);
                    if(second<0) {
                        ListOfList[indexOfList][index].timeRemaing = `Expired`;
                    } else {
                        ListOfList[indexOfList][index].timeRemaing = `${second} seconds`;
                    }
                }
            }
            localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
            render();
        })
    }
}

const addNewTaskbtn = document.querySelector('#add-new-task');
//Well Done when no more thing to do
function wellDone () {
    let r = document.querySelector(':root');
    let rs = getComputedStyle(r);
    let finish = document.querySelector('.list-todo .container ul');
    let formGroup = document.querySelector('.form-group');
    if (ListOfList.length==0) {
        formGroup.style.display='none';
        clearAllBtn.style.display='none';
        addNewTaskbtn.style.display='none';
        finish.innerHTML = `<p style="font-size: 30px; text-align: center; background-color: transparent; color: ${rs.getPropertyValue('--text-color')};">Please add New List at <i class="fa-solid fa-bars" style="font-size: 20px;"></i> above</p>`
    }
    else if(ListOfList[indexOfList].length==0) {
        formGroup.style.display='flex';
        clearAllBtn.style.display='none';
        finish.innerHTML = `<p style="font-size: 30px; text-align: center; background-color: transparent; color: ${rs.getPropertyValue('--text-color')};">Add new task at + above</p>`
    }
    else if (ListOfList[indexOfList].length>1) {
        clearAllBtn.style.display='inline-block';
        addNewTaskbtn.style.display='block';
    }
}

//Clear All
let clearAllBtn = document.querySelector('.clearAll .container button');
function clearAll () {
    clearAllBtn.addEventListener('click', ()=>{
        while(ListOfList[indexOfList].length>0) {
            ListOfList[indexOfList].pop();
        }
        localStorage.setItem('ListOfList', JSON.stringify(ListOfList));
        render();
    })
}

//Dark mode
function darkMode () {
    let r = document.querySelector(':root');
    let getDM = document.querySelector('#dark-mode');
    getDM.addEventListener('click', ()=>{
        if(JSON.parse(isDarkMode)) {
            //dark mode
            isDarkMode=false;
            r.style.setProperty('--text-color', '#FFFFFF');
            r.style.setProperty('--button-color', '#607d8b');
            r.style.setProperty('--input-color', '#1F2937');
            r.style.setProperty('--body-color', 'rgb(24,24,50)');
            r.style.setProperty('--select-color', '#f39c12');
            r.style.setProperty('--secondary-color', 'black');
            r.style.setProperty('--toggle-color', '#607d8b');
            r.style.setProperty('--darkest-color', 'rgb(16,16,37)');
        } else {
            //light mode
            isDarkMode=true;
            r.style.setProperty('--text-color', 'black');
            r.style.setProperty('--button-color', '#673ab7');
            r.style.setProperty('--input-color', '#ffd740');
            r.style.setProperty('--body-color', '#FFF3E0');
            r.style.setProperty('--select-color', '#f599c3');
            r.style.setProperty('--secondary-color', 'black');
            r.style.setProperty('--toggle-color', '#ffc107');
            r.style.setProperty('--darkest-color', '#ffa000');
        }
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        wellDone();
    })
    getDM.addEventListener('click', ()=> getDM.classList.toggle('active'));
}

function renderDarkmode() {
    let r = document.querySelector(':root');
    let getDM = document.querySelector('#dark-mode');
    if(isDarkMode) {
        //light mode
        r.style.setProperty('--text-color', 'black');
        r.style.setProperty('--button-color', '#673ab7');
        r.style.setProperty('--input-color', '#ffd740');
        r.style.setProperty('--body-color', '#FFF3E0');
        r.style.setProperty('--select-color', '#f599c3');
        r.style.setProperty('--secondary-color', 'black');
        r.style.setProperty('--toggle-color', '#ffc107');
        r.style.setProperty('--darkest-color', '#ffa000');
        getDM.classList.add('active')
    } else {
        //dark mode
        r.style.setProperty('--text-color', '#FFFFFF');
        r.style.setProperty('--button-color', '#607d8b');
        r.style.setProperty('--input-color', '#1F2937');
        r.style.setProperty('--body-color', 'rgb(24,24,50)');
        r.style.setProperty('--select-color', '#f39c12');
        r.style.setProperty('--secondary-color', 'black');
        r.style.setProperty('--toggle-color', '#607d8b');
        r.style.setProperty('--darkest-color', 'rgb(16,16,37)');
        getDM.classList.remove('active')
    }
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}   // When the user clicks on the button, scroll to the top of the document
function topFunction() {   document.body.scrollTop = 0;   document.documentElement.scrollTop = 0; }

let timeRun
function startInterval() {
    timeRun = setInterval(updateTime, 1000);//Update time every 30s
}

function stopInterval () {
    clearInterval(timeRun);
}

listTodo.addEventListener('mouseenter', (e)=>{
    stopInterval();
})

listTodo.addEventListener('mouseleave', (e)=>{
    startInterval();
})

const toggleList = document.querySelector('.fa-bars');
const ListHead = document.querySelector('.ListOfList');
toggleList.addEventListener('click', ()=>{
    ListHead.classList.toggle('active');
})

function start () {
    wellDone();
    
    if(NameOfList.length>0) renderNameOfList();
    if(ListOfList.length>0) render();
    
    FixChangeMainName();
    //--------------------------------
    addNewList();
    LinkToNameList();
    
    //------------ Event -------------
    addNewTask();

    //wellDone
    wellDone();

    //ClearAll
    clearAll();

    //dark mode
    darkMode();

    //back to top
    scrollFunction();
    topFunction();
    
    addEvent();

    deleteList();

    startInterval();
}

start();


