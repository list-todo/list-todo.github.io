var TaskList = [];


function checkTime(i){
    if (i < 10){
        i = "0" + i;
    }
    return i;
};
function timeAndDay(){
    var time = new Date();
    var year = time.getFullYear();
    var date = time.getUTCDate()
    var dayName = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var getDay = time.getDay();
    var day = dayName[getDay];
    var today = day+' '+date+','+' '+year;

    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    var ampm = (h >= 12)? "PM" : "AM";
    h = (h >= 12)? h - 12 : h;
    h = (h === 0)? h = 12 : h;
    m = checkTime(m);
    s = checkTime(s);
    var currentTime = h +" : "+ m +" : "+ s +" "+ ampm;

    setTimeout(function(){
        timeAndDay();
    }, 1000);
    $('#day').html(today);
    $('#time').html(currentTime);
};


function renderList(){
    var item = '';
    $.each(TaskList, function (i, v) {
        if(v.status === 0){
            item += '<li onclick="complete(event,'+i+')"><button class="float-right"><i class="fa fa-circle-thin"></i></button>&nbsp;&nbsp;'+v.name+'<button class="removeIt" onclick="removeIt('+i+')"><i class="fa fa-trash"></i></button></li>';
        } else {
            item += '<li class="done" onclick="complete(event,'+i+')"><button class="float-right done"><i class="fa fa-check-circle-o"></i></button>&nbsp;&nbsp;'+v.name+'<button class="removeIt" onclick="removeIt('+i+')"><i class="fa fa-trash"></i></button></li>';
        }
    });
    $('#eachList').html(item);
}
function addItem() {
    var inputItem = $('#input').val();
    if(inputItem.length > 0){
        TaskList.push({name: inputItem, status: 0});
        localStorage.setItem('TaskList', JSON.stringify(TaskList));
        $('#input').val('');
        renderList();
    }
}

function complete(e,index){
    if(!$(e.target).hasClass('removeIt')){
        if(TaskList[index].status === 0) {
            TaskList[index].status = 1;
            localStorage.setItem('TaskList', JSON.stringify(TaskList));
            renderList();
        }else {
            TaskList[index].status = 0;
            localStorage.setItem('TaskList', JSON.stringify(TaskList));
            renderList();
        }

    }
}
function removeIt(index){
    TaskList.splice(index, 1);
    localStorage.setItem('TaskList', JSON.stringify(TaskList));
    renderList();
}

function resetAll(){
    TaskList = [];
    localStorage.setItem('TaskList', JSON.stringify(TaskList));
    renderList();
}

$(document).on('keypress', function(e) {
   if (e.which === 13){
       addItem()
   }
});

$(function () {
    timeAndDay();

    if(localStorage.TaskList !== undefined){
        TaskList = JSON.parse(localStorage.getItem('TaskList'));
        renderList();
    }

});
