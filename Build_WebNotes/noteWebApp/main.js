$(document).ready(function () {
    var url_ds = 'http://localhost:8070/todo/ghichu/list'
    var url_save = 'http://localhost:8070/todo/ghichu/save'
    var url_delete = 'http://localhost:8070/todo/ghichu/delete'
    var url_Get1element = 'http://localhost:8070/todo/ghichu'
    // $(".notes__add").click(function() {
    //     alert("test OK!")
    // })

    // show curent datetimevar today = new Date();
    
    // ready document
    $(document).ready(function () {
        $.ajax({
            url: url_ds,
            type: "GET",
            success: function (data) {
                // code here 
                console.log(data)
                var html = exportHtml(data);
                $("#danhsach").html(html);
                // console.log(exportHtml(data));
            }
        })
    }); 
    
    // section load items
    function loadPage() {
        // $(".badge-success").click(function () {
            // load ajax
            $.ajax({
                url: url_ds,
                type: "GET",
                success: function (data) {
                    // code here 
                    console.log(data)
                    var html = exportHtml(data);
                    $("#danhsach").html(html);
                    // console.log(exportHtml(data));
                }
            })
        // })
    }

    $(".badge-success").click(function () {
        // load ajax
        $.ajax({
            url: url_ds,
            type: "GET",
            success: function (data) {
                // code here 
                console.log(data)
                var html = exportHtml(data);
                $("#danhsach").html(html);
                // console.log(exportHtml(data));
            }
        })
    })

    // section notes__add
    $('.notes__add').click(function () {
        var title = $(".notes__title").val();
        var body = $(".notes__body").val();
        // show curent date
        var options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        var prnDt = new Date().toLocaleTimeString('en-us', options);
        console.log(prnDt);

        console.log(body);
        if (title.length > 0 && body.length > 0) {
            var SendDT = {
                id: null,
                title: title,
                ghiChu: body,
                meta: prnDt,
                status: 0,
            }
            // load ajax
            $.ajax({
                contentType: "application/json", // contentType used when sending data to the server
                url: url_save,
                type: 'POST',
                data: JSON.stringify(SendDT), // Convert a JavaScript object into a string with JSON.stringify().
                success: function (data) {
                    console.log(data)
                    // alert("Load lại trang");
                    loadPage();
                }
            })
            
        }
        else {
            alert("title and body are empty")
        }
    })

    // section delete__note
    $('#danhsach').delegate(".btn-secondary", "click", function () {
        var id = $(this).attr("data");
        // alert(id);
        var array = []
        array.push(id);
        console.log(id);
        $.ajax({
            contentType: "application/json",
            url: url_delete,
            type: "POST",
            data: JSON.stringify(array),
            success: function (data) {
                console.log(data)
                console.log("Xoá thành công!!, Load lại danh sách");
                loadPage();
            }
        })
    })

    // section show full title and body 
    $('#danhsach').delegate(".notes__list-item", "click", function () {
        var id = $(this).attr("Show_data");
        // alert(id);
        var array = []
        // array.push(id);
        console.log(id);
        $.ajax({
            url: url_Get1element + "/" + id,
            type: "GET",
            success: function (data) {
                // code here
                array.push(data);
                console.log(array);
                console.log("check data");
                console.log(data)
                var html = Show_1Element(array);
                $("#note__preview").html(html);
                // console.log(Show_1Element(data));
                loadPage();
            }
        })
    })

    // section button update notes__list-item
    $('#note__preview').delegate(".notes__update", "click", function () {
        var Id = $(this).attr("data_update");
        // alert(Id);
        var title = $(".notes__title").val();
        var body = $(".notes__body").val();
        // show curent date
        var options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        var prnDt = new Date().toLocaleTimeString('en-us', options);

        if (title.length > 0 && body.length > 0) {
            var SendDT = {
                id: Id,
                title: title,
                ghiChu: body,
                meta: prnDt,
                status: 0,
            }
            // load ajax
            $.ajax({
                contentType: "application/json", // contentType used when sending data to the server
                url: url_save,
                type: 'POST',
                data: JSON.stringify(SendDT), // Convert a JavaScript object into a string with JSON.stringify().
                success: function (data) {
                    console.log(data)
                    var html = deleteContent(data);
                    $("#note__preview").html(html);
                    loadPage();
                    // alert("Load lại trang");
                }
            })
            
        }
        else {
            alert("title and body are empty")
        }
    })
})



// show data inside backend 
function Show_1Element(GetData) {
    var Html = "";
    if (GetData.length > 0) {
        for (let index = 0; index < GetData.length; index++) {
            Html += 
                '<button type="button" class="btn btn-info notes__update" data_update="' + GetData[index].id + '">' + 'Update' + '</button>' +
                '<input id="darkTitle" class="notes__title" type="text" placeholder="Enter a title..." value = "' + GetData[index].title + '">' +
                '<textarea id="darkBody" class="notes__body" placeholder="I am the notes body...">' + GetData[index].ghiChu + '</textarea>'
        }
    }
    return Html;
}

function exportHtml(dulieu) {
    var xHtml = "";
    if (dulieu.length > 0) {
        for (let index = 0; index < dulieu.length; index++) {
            xHtml += '<div Show_data="' + dulieu[index].id + '"id="darkItemList'+index+'" class="notes__list-item notes__list-item--selected">' +
                '<button data="' + dulieu[index].id + '"id="darkRemove" type="button" class="btn btn-secondary">' + 'x' + '</button>' +
                '<div class="notes__small-title">' + dulieu[index].title + '</div>' +
                '<div class="notes__small-body">' + dulieu[index].ghiChu + '</div>' +
                '<div class="notes__small-updated">' + dulieu[index].meta + '</div>' +
                '</div>'
        }
    }
    return xHtml;
}

function deleteContent(delData) {
    var Html = "";
    var update = 0;
            Html += '<label  id="dark-change">' +'</label>' +
                '<button type="button" class="btn btn-info notes__update" data_update="' + update + '">' + 'Update' + '</button>' +
                '<input id="darkTitle" class="notes__title" type="text" placeholder="Enter a title..." value = "' + Html + '">' +
                '<textarea id="darkBody" class="notes__body" placeholder="I am the notes body...">' + Html + '</textarea>'
    return Html;
}

// click dark mode test js 
// var content = document.getElementsByTagName('body')[0];
var flag = 1;
var darkMode = document.getElementById("dark-change");
var lightMode = document.getElementById("dark-change");
darkMode.addEventListener('click', function () {
    if (flag === 1) {
        document.body.classList.add("darkMode")
        darkMode.classList.toggle('active');
        flag = 0;
        console.log('checking...' + flag);
    }
    else if (flag === 0) {
        // light_Mode();
        document.body.classList.remove("darkMode")
        lightMode.classList.toggle('active');
        flag = 1;
        console.log('checking...' + flag);
    }
})

// status ghim