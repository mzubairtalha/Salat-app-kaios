window.addEventListener("load", function () {

});
// console.log("Hello World!");
$(document).bind("mobileinit", function () {
    $.mobile.page.prototype.options.domCache = false;
});

$(document).on('pageinit', '#prayerTime', function (event) {
    console.log("assis");
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
$(document).on('pageinit', '#prayerDirection', function (event) {
    console.log("assis");
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
$(document).on('pageinit', '#MosqueSearch', function (event) {
    console.log("assis");
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
$(document).on('pageinit', '#Settings', function (event) {
    console.log("assis");
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
$(document).on('pageinit', '#TasbeehCount', function (event) {
    console.log("assis");
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
$(document).on('pageinit', '#MosqueMap', function (event) {
    console.log("assis");
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
$(document).on('pageinit', '#Tasbeeh', function (event) {
    console.log("assis");
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
});
    

$(document).on("pageshow", "#prayerTime", function () { // When entering pagetwo

    var msg = "";
    var dflt =
    {
        lat: 23.723101,
        lng: 90.408600
    };

    function getGeoData() {
        $.mobile.loading("show");
        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            loadTime(latitude, longitude)
        }
        function error(err) {
            $.mobile.loading("hide");
            switch (error.code) {

                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
            }
            loadTime(dflt.lat, dflt.lng);
        }

        navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
    }
    function fromateTime(time) {
        var timSplit = time.split(":");
        var firstTime = 0;
        var median = "A.M.";
        if (parseInt(timSplit[0]) >= 12) {
        if(parseInt(timSplit[0])>12)
            firstTime = (parseInt(timSplit[0]) - 12);
            else
            firstTime=timSplit[0];
            median = "P.M.";
        } else {
            firstTime = timSplit[0];
        }
        return firstTime + ":" + timSplit[1] + " " + median;
    }

    function bindData(data) {
        var li = "";
        console.log(data);
        var obj = JSON.parse(data);
        var count = 0;

        li += '<li id="prayertTimeClick"><a href="#prayerTime" ><img  src="images/prayerTime.png" /><h2 class="list-p" style="margin-left:-40px;">Imsaak</h2><p class="time-display" style="margin-left:-40px;">' + fromateTime(obj.Imsaak) + '</p></a></li>';
        li += '<li id="prayertTimeClick"><a href="#prayerTime" ><img  src="images/prayerTime.png" /><h2 class="list-p" style="margin-left:-40px;">Fajr</h2><p class="time-display"  style="margin-left:-40px;">' + fromateTime(obj.Fajr) + '</p></a></li>';
        li += '<li id="prayertTimeClick"><a href="#prayerTime" ><img  src="images/prayerTime.png" /><h2 class="list-p" style="margin-left:-40px;">Dhuhr</h2><p class="time-display"  style="margin-left:-40px;">' + fromateTime(obj.Dhuhr) + '</p></a></li>';
        li += '<li id="prayertTimeClick"><a href="#prayerTime" ><img  src="images/prayerTime.png" /><h2 class="list-p" style="margin-left:-40px;">Asr</h2><p  class="time-display"  style="margin-left:-40px;">' + fromateTime(obj.Asr) + '</p></a></li>';
        li += '<li id="prayertTimeClick"><a href="#prayerTime" ><img  src="images/prayerTime.png" /><h2 class="list-p" style="margin-left:-40px;">Maghrib</h2><p class="time-display"  style="margin-left:-40px;">' + fromateTime(obj.Maghrib) + '</p></a></li>';
        li += '<li id="prayertTimeClick"><a href="#prayerTime" ><img  src="images/prayerTime.png" /><h2 class="list-p" style="margin-left:-40px;">Isha</h2><p class="time-display"  style="margin-left:-40px;">' + fromateTime(obj.Isha) + '</p></a></li>';

        var footer = "";
        footer += '<table style="width:100%"><tr><td style="width:40%"><div class="footer-header"><img class="first"  src="images/rise.png" /><p class="time-display" >' + fromateTime(obj.Sunrise) + '</p></div></td>';
        footer += '<td style="width:10%"><div  class="divide" ></div></td>';
        footer += '<td style="width:40%"><div class="footer-header"><img  class="first" src="images/set.png" /><p class="time-display" >' + fromateTime(obj.Sunset) + '</p></div></td></tr>';
        $("#prayerTime #prayerTimeFooter").html("");
        $("#prayerTime #prayerTimeFooter").append(footer);
        $("#prayerTime #timeList").html("");
        $("#prayerTime #timeList").append(li).listview('refresh');

    }

    function loadTime(lat, lng) {
        $.mobile.loading("show");
        // var str1 = '{ Imsaak: "05:47", Fajr: "05:56", Sunrise: "07:04", Dhuhr: "12:42", Asr: "15:55", Sunset: "18:20", Maghrib: "18:34", Isha: "19:23" }';

        var check = localStorage.getItem("myTimeList");
        if (!check) {
            var url = "http://praytime.info/getprayertimes.php?lat=" + lat + "&lon=" + lng + "&gmt=420&m=11&y=2014&school=0";
            var xhr = new XMLHttpRequest({ mozSystem: true });
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    //$.mobile.loading("hide");
                    if (xhr.status == 200) {

                        /*
                       { Imsaak: "05:47", Fajr: "05:56", Sunrise: "07:04", Dhuhr: "12:42", Asr: "15:55", Sunset: "18:20", Maghrib: "18:34", Isha: "19:23" }
                    */
                        console.log("online");

                        var data = xhr.responseText.split('"2"');
                        var str = data[0].substring(5, data[0].length - 1).toString();
                        localStorage.setItem("myTimeList", str);
                        bindData(str);
                        // var obj = JSON.stringify(data);

                        $.mobile.loading("hide");
                    } else {
                        $("#prayerTime #prayerPopup").html("error: " + xhr.status + " " + xhr.statusText);
                        $("#prayerTime #prayerPopup").popup("open");
                        $.mobile.loading("hide");
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
        } else {
            console.log("offline");
            var offlineData = localStorage.getItem("myTimeList");
            bindData(offlineData);
            $.mobile.loading("hide");
        }


    }
    $("#loc").on("click", function () {
        localStorage.removeItem("myTimeList");
        getGeoData();
    });
    loadTime(dflt.lat, dflt.lng);
});
$(document).on("pageshow", "#prayerDirection", function () {
    //example obj data containing lat and lng points
    //stop location - the radii end point
    var dflt =
   {
       lat: 23.723101,
       lng: 90.408600
   };
    var endpoint =
        {
            lat: 23.723101,
            lng: 90.408600
        };
    //bus location from the southeast - the circle center 21.422522, 39.82619
    var startpoint =
    {
        lat: 21.422522,
        lng: 39.82619
    };

    //  console.log(v);
    function getAngle(endpoint, startpoint) {
        x1 = endpoint.lat;
        y1 = endpoint.lng;
        x2 = startpoint.lat;
        y2 = startpoint.lng;

        var radians = getAtan2((y1 - y2), (x1 - x2));

        function getAtan2(y, x) {
            return Math.atan2(y, x);
        };

        var compassReading = radians * (180 / Math.PI);
        //console.log(compassReading);
        /*var coordNames = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
        var coordIndex = Math.round(compassReading / 45);
        if (coordIndex < 0) {
            coordIndex = coordIndex + 8
        };
        */
        return compassReading; // returns the coordinate value
    }

    function encodeImage(data) {
        var b64 = btoa(data);
        var dataURL = "data:image/jpeg;base64," + b64;
        $("#prayerDirection #imgKibla").append("<img src='" + dataURL + "'>");
    }

    function loadImage(angle) {
        $.mobile.loading("show");
        var check = localStorage.getItem("dirImage");
        if (!check) {
            var url = "http://muslimsalat.com/qibla_compass/600/" + angle + ".png";
            var xhr = new XMLHttpRequest({ mozSystem: true });

            xhr.open("GET", url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (e) {

                var arr = new Uint8Array(this.response);
                var raw = String.fromCharCode.apply(null, arr);
                localStorage.setItem("dirImage", raw);
                encodeImage(raw);
                $.mobile.loading("hide");
                console.log("online");
            };
            xhr.send();
        } else {
            console.log("offline");
            encodeImage(check);
            $.mobile.loading("hide");
        }


    }

    var msg = "";


    var dflt =
    {
        lat: 23.723101,
        lng: 90.408600
    };

    function getGeoData() {
        $.mobile.loading("show");
        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            //loadTime(latitude, longitude)
            endpoint.lat = latitude;
            endpoint.lng = longitude;
            var v = getAngle(endpoint, startpoint);
            $.mobile.loading("hide");
            loadImage(v);
        }
        function error(err) {
            $.mobile.loading("hide");
            switch (error.code) {

                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
            }
            loadTime(dflt.lat, dflt.lng);
        }

        navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
    }

    function init() {
        var dftlData = getAngle(endpoint, startpoint);
        loadImage(dftlData);
    }

    init();
    $("#dirRefresh").on("click", function () {
        localStorage.removeItem("dirImage");
        getGeoData();
    });
});
$(document).on("pageshow", "#MosqueSearch", function () {
    var dflt =
    {
        lat: 23.723101,
        lng: 90.408600
    };
    var allData;
    function bindData(data) {
        var li = "";
        var obj = JSON.parse(data);
        var count = 0;
        var li = "";
        allData = obj;
        //console.log(obj.product.length);
        for (var i = 0; i < obj.product.length; i++)
            li += '<li id="prayertTimeClick" data-name="demo"><a href="#" ><img style="margin-left:5px;margin-top:5px;" src="images/masjid.png" /><h2 class="list-p" style="margin-left:-37px;white-space:normal;margin-top:-10px">' + obj.product[i].NAME + '</h2><p class="time-display" style="margin-left:-37px;white-space:normal;">' + obj.product[i].ADDRESS + '</p><p class="time-display" style="margin-left:-37px;white-space:normal;">Distance : ' + obj.product[i].DISTANCE + 'm</p></a></li>';

        $("#MosqueSearch #maqueList").html("");
        $("#MosqueSearch #maqueList").append(li).listview('refresh');
        $.mobile.loading("hide");

    }
    function loadMasjid(lat, lng) {
        //console.log(lat);
        //console.log(lng);
        $.mobile.loading("show");
        var check = localStorage.getItem("mosqueList");
        if (!check) {
            var url = "http://rupshisweaters.com/Data_Service/NSU/GetInfoData.php?type=11&Radious=1000&Longitude=" + lng + "&Latitude=" + lat;
            var xhr = new XMLHttpRequest({ mozSystem: true });
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    //$.mobile.loading("hide");
                    if (xhr.status == 200) {
                        localStorage.setItem("mosqueList", xhr.responseText);
                        bindData(xhr.responseText);
                        // var obj = JSON.stringify(data);
                        // console.log("online");
                        $.mobile.loading("hide");
                    } else {
                        $("#prayerTime #prayerPopup").html("error: " + xhr.status + " " + xhr.statusText);
                        $("#prayerTime #prayerPopup").popup("open");
                        $.mobile.loading("hide");
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.send();
        } else {
            // console.log("offline");
            bindData(check);
            $.mobile.loading("hide");
        }

    }
    function getGeoData() {
        $.mobile.loading("show");
        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            //loadTime(latitude, longitude)
            loadMasjid(latitude, longitude);
            $.mobile.loading("hide");
            // loadImage(v);
        }
        function error(err) {
            $.mobile.loading("hide");
            switch (error.code) {

                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    break;
            }
            loadMasjid(dflt.lat, dflt.lng);
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }
    loadMasjid(dflt.lat, dflt.lng);
    $('#maqueList').on('click', ' > li', function () {
        var selected_index = $(this).index();
        // console.log(allData.product[selected_index].LATITUDE);
        // console.log(allData.product[selected_index].LONGITUDE);
        localStorage.LATITUDE = allData.product[selected_index].LATITUDE;
        localStorage.LONGITUDE = allData.product[selected_index].LONGITUDE;
        $.mobile.changePage("#MosqueMap");
    });
    $("#masjidRefresh").on("click", function () {
        localStorage.removeItem("mosqueList");
        getGeoData();
    });

    //refresh button er kaj kora hoy nai 
});
$(document).on("pageshow", "#MosqueMap", function () {

    $(window).on("resize", function () {
        size();
    });
    size();
    function size() {
        $("#content").height($(window).height() + 50);
        $("#content").width($(window).width() + 20);
    }

});
$(document).on('pageshow', '#MosqueMap', function () {

    function getGeoData() {
        $.mobile.loading("show");
        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            //loadTime(latitude, longitude)
            var url = "http://rupshisweaters.com/Data_Service/map/ShowMap.html?lat1=" + localStorage.LATITUDE + "&lng1=" + localStorage.LONGITUDE + "&lat2=" + latitude + "&lng2=" + longitude;
            $('#msoquemap').attr('src', url);

            $.mobile.loading("hide");

        }
        function error(err) {
            $.mobile.loading("hide");
            switch (error.code) {

                case error.PERMISSION_DENIED:
                    $("#prayerTime #prayerPopup").html("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    $("#prayerTime #prayerPopup").html("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    $("#prayerTime #prayerPopup").html("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    $("#prayerTime #prayerPopup").html("An unknown error occurred.");
                    break;
            }
            loadTime(dflt.lat, dflt.lng);
        }

        navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
    }
    getGeoData();
    $("#mapRefresh").on("click", function () {
        getGeoData();
    });
});
$(document).on('pageshow', '#Tasbeeh', function () {

    var db;
    var flag = 1;
    //console.log('App initialised.');
    // In the following line, you should include the prefixes of implementations you want to test.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)


    // Let us open our database
    var DBOpenRequest = window.indexedDB.open("tasbihList", 4);

    // Gecko-only IndexedDB temp storage option:
    // var request = window.indexedDB.open("toDoList", {version: 4, storage: "temporary"});

    // these two event handlers act on the database being opened successfully, or not
    DBOpenRequest.onerror = function (event) {
        //  console.log('Error loading database.');
    };

    DBOpenRequest.onsuccess = function (event) {
        //  console.log('Database initialised.');

        // store the result of opening the database in the db variable. This is used a lot below
        db = DBOpenRequest.result;

        // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
        displayData();
    };
    DBOpenRequest.onupgradeneeded = function (event) {
        var db = event.target.result;

        db.onerror = function (event) {
            console.log('Error loading database.');
        };

        // Create an objectStore for this database

        var objectStore = db.createObjectStore("tasbihList", { keyPath: "id", autoIncrement: true });

        // define what data items the objectStore will contain

        objectStore.createIndex("Name", "Name", { unique: true });
        objectStore.createIndex("Count", "Count", { unique: false });

        //console.log('Object store created.');
    };
    function displayData() {
        // first clear the content of the task list so that you don't get a huge long list of duplicate stuff each time
        //the display is updated.
        // taskList.innerHTML = "";
        var li = "";
        // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
        var objectStore = db.transaction('tasbihList').objectStore('tasbihList');
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            // if there is still another cursor to go, keep runing this code
            if (cursor) {
                // create a list item to put each data item inside when displaying it
                /*console.log(cursor.value.id);
                console.log(cursor.value.Name);
                console.log(cursor.value.Count);*/
                li += '<li data-name="demo" data-id="' + cursor.value.id + '"><a href="#" ><img style="margin-left:5px;margin-top:5px;" src="images/tasbih_icon.png" /><h2 class="list-p" style="margin-left:-25px;white-space:normal;margin-top:-1px">' + cursor.value.Name + '</h2><p class="time-display" style="margin-left:-25px;white-space:normal;">Counted : ' + cursor.value.Count + ' times</p></a></li>';



                cursor.continue();

                // if there are no more cursor items to iterate through, say so, and exit the function 
            } else {
                //console.log('Entries all displayed.');
                $("#Tasbeeh #tbsList").html("");
                $("#Tasbeeh #tbsList").append(li).listview('refresh');
            }
        }
    }
    function addData(name, count) {

        if (flag == 1) {
            try {

                // grab the values entered into the form fields and store them in an object ready for being inserted into the IDB
                var newItem = [
                    { Name: name, Count: count }
                ];

                // open a read/write db transaction, ready for adding the data
                var transaction = db.transaction(["tasbihList"], "readwrite");

                // report on the success of opening the transaction
                transaction.oncomplete = function () {
                    //console.log('Transaction completed: database modification finished.');

                    // update the display of data to show the newly added item, by running displayData() again.
                    displayData();
                };

                transaction.onerror = function () {
                    // console.log('Transaction not opened due to error: ' + transaction.error);
                };

                // call an object store that's already been added to the database
                var objectStore = transaction.objectStore("tasbihList");
                /*console.log(objectStore.indexNames);
                console.log(objectStore.keyPath);
                console.log(objectStore.name);
                console.log(objectStore.transaction);
                console.log(objectStore.autoIncrement);
                */
                // add our newItem object to the object store
                var objectStoreRequest = objectStore.add(newItem[0]);
                objectStoreRequest.onsuccess = function (event) {

                    // report the success of our new item going into the database
                    //console.log('New item added to database.');

                };
                flag = 0;
            } catch (ex) {
                console.log(ex);
            }
        }


    };

    //localStorage.clear();
    $("#tasbihSubmit").on("click", function () {

        flag = 1;
        addData($("#tasbihName").val(), $("#tasbihCount").val());
        $('#popupLogin').popup("close");


        //  return false;

    });
    $("#deleteMe").on("click", function () {
        // console.log("clicked");
    });

    $('#tbsList').on('click', ' > li', function () {
        //db.close();
        var selected_index = $(this).index();
        //console.log($(this).attr('data-id'));
        localStorage.myIndex = $(this).attr('data-id');

        $.mobile.changePage("#TasbeehCount");
    });

    //   bindData();

});

$(document).on('pageshow', '#TasbeehCount', function () {


    var db;
    var Counter = 0;
    //console.log('App initialised.');
    // In the following line, you should include the prefixes of implementations you want to test.
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)


    // Let us open our database
    var DBOpenRequest = window.indexedDB.open("tasbihList", 4);

    // Gecko-only IndexedDB temp storage option:
    // var request = window.indexedDB.open("toDoList", {version: 4, storage: "temporary"});

    // these two event handlers act on the database being opened successfully, or not
    DBOpenRequest.onerror = function (event) {
        console.log('Error loading database.');
    };

    DBOpenRequest.onsuccess = function (event) {
        //console.log('Database initialised.');

        // store the result of opening the database in the db variable. This is used a lot below
        db = DBOpenRequest.result;

        // Run the displayData() function to populate the task list with all the to-do list data already in the IDB
        displayData();
    };
    $("#tasbihClickBack").on("click", function () {
        // db.close();
        $.mobile.changePage("#Tasbeeh");
    });
    function displayData() {

        var transaction = db.transaction("tasbihList");
        var objectStore = transaction.objectStore("tasbihList");
        var request = objectStore.get(parseInt(localStorage.myIndex));
        request.onsuccess = function (evt) {
            // alert("Name for id 1 " + request.result.name);
            var num = "";
            if (parseInt(request.result.Count) < 10)
                num += "0" + request.result.Count;
            else {
                num = request.result.Count;
            }
            $("#countHeader").html(request.result.Name);
            $("#countTotal").html(num);
            Counter = parseInt(request.result.Count);
        };
    }
    $("#countPlus").on("click", function () {
        var num = "";
        Counter += 1;
        if (Counter < 10)
            num += "0" + Counter;
        else {
            num = Counter;
        }
        $("#countTotal").html("");
        $("#countTotal").html(num);
        upData(localStorage.myIndex, Counter);
    });
    $("#countMinus").on("click", function () {
        if ((Counter - 1) >= 0) {
            Counter -= 1;
            var num = "";
            if (Counter < 10)
                num += "0" + Counter;
            else {
                num = Counter;
            }
            $("#countTotal").html("");
            $("#countTotal").html(num);
            upData(localStorage.myIndex, Counter);
        }
    });
    $("#ResetCount").on("click", function () {

        Counter = 0;
        $("#countTotal").html("");
        $("#countTotal").html(Counter+"0");
        upData(localStorage.myIndex, Counter);

    });

    function upData(id, count) {
        var objectStore = db.transaction(['tasbihList'], "readwrite").objectStore('tasbihList');

        // get the to-do list object that has this title as it's title
        var objectStoreTitleRequest = objectStore.get(parseInt(id));

        objectStoreTitleRequest.onsuccess = function () {
            // grab the data object returned as the result
            var data = objectStoreTitleRequest.result;

            // update the notified value in the object to "yes"
            data.Count = count;

            // create another request that inserts the item back into the database
            var updateTitleRequest = objectStore.put(data);

            // when this new request succeeds, run the displayData() function again to update the display
            updateTitleRequest.onsuccess = function () {
                // displayData();
                //console.log("Success");
            }
        }
    }
    $('#deleteCounter').on('click', function () {
        var request = db.transaction(["tasbihList"], "readwrite")
                .objectStore("tasbihList")
                .delete(parseInt(localStorage.myIndex));
        request.onsuccess = function (event) {
            $.mobile.changePage("#Tasbeeh");
        };
    });

});
$('#TasbeehCount').on('pageshow', function (e, data) {
    $('#tasb').css('margin-top', ($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('#tasb').outerHeight()) / 7);
    $('#tasb').css('margin-left', ($(window).width() - $('#btnTotal').width()) / 3);
    $('#tasb').css('text-align', 'center');

});
$($.mobile.pageContainer).on('pageshow', function (event, ui) {
    $(ui.prevPage).remove();
});
$(document).on('pageshow', '#Settings', function () {
    $("#CacheClear").on("click", function () {
        $.mobile.loading("show");
        var Time = $("#checkbox-1a").prop("checked");
        var direct = $("#checkbox-2a").prop("checked");
        var masjid = $("#checkbox-3a").prop("checked");;
        var masjidMap = $("#checkbox-4a").prop("checked");
        if (Time) {
            localStorage.removeItem("myTimeList");
        }
        if (direct) {
            localStorage.removeItem("dirImage");
        }
        if (masjid) {
            localStorage.removeItem("mosqueList");
        }
        if (masjidMap) {

        }

        $.mobile.loading("hide");
        alert("Successflly Cleared");
    });
});

