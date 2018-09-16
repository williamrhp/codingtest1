var currbox; // holds current selected box

//ordering is done via running date & time against position in the below arrays
var dayIndex = ["sun","mon","tue","wed","thu","fri","sat"];
var timeIndex = [  "12am","1230am","1am","130am","2am","230am","3am",
                        "330am","4am","430am","5am","530am","6am","630am",
                        "7am","730am","8am","830am","9am","930am","10am",
                        "1030am","11am","1130am",
                        "12pm","1230pm","1pm","130pm","2pm","230pm","3pm",
                        "330pm","4pm","430pm","5pm","530pm","6pm","630pm",
                        "7pm","730pm","8pm","830pm","9pm","930pm","10pm",
                        "1030pm","11pm","1130pm"
                        ];


//if touch device, enable popup menu
if (!document.documentElement.className.includes("no-touch")) {
    //when square is clicked, launch checkbox and set inputs to required
    $(".checkbox").on("click", function(e){
        currbox = $(this).find("input").attr("id");
        $("#inputform").find("#day").prop('required',true);
        $("#inputform").find("#starttime").prop('required',true);
        $("#inputform").find("#endtime").prop('required',true);
        $("#inputform").css("display", "block");
        
        //set currbox values to start values on form
        var daystart = currbox.substring(0,3);
        var timestart = currbox.substring(3,currbox.length);
        $("#startday").val(daystart);
        $("#starttime").val(timestart);
        $("#endday").val("selecteday");
        $("#endtime").val("selectetime");
        
        //intentionally prevents mobile scheduling outside of form entry path
        $("#"+currbox).prop("checked", false);
        e.stopPropogation();
    });
    
    //code for cancel button
    $("#cancel").on("click", function(){
        $("#inputform").find("#day").prop('required',false);
        $("#inputform").find("#starttime").prop('required',false);
        $("#inputform").find("#endtime").prop('required',false);
        $("#inputform").css("display", "none");
        $("#"+currbox).prop("checked", false);
    });
    
    //code for form submissions
    $("#inputform").submit(function(){
        //prohibits events being handled as default
        //important to prevent page reload upon submission
        event.preventDefault();
        
        //import variables from form
        //run against indexes to get numerical value
        var startday = $("#startday").val();
        var sdi = dayIndex.indexOf(startday);
        var starttime = $("#starttime").val();
        var sti = timeIndex.indexOf(starttime);
        var endday = $("#endday").val();
        var edi = dayIndex.indexOf(endday);
        var endtime = $("#endtime").val();
        var eti = timeIndex.indexOf(endtime);
        
        //require all inputs selected
        if(startday == "selectsday" || starttime == "selectstime" || endday == "selecteday" || endtime == "selecetime") {
            alert("Please complete all inputs to continue.");
            return;
        }
        //make sure end >= start
        if (edi < sdi || (edi == sdi && eti < sti)) {
            alert("End time must be after or equal to start time");
            return;
        }
        
        var dind; // day index
        var tindb; // time index begin
        var tinde; // time index end
        
        for (dind=sdi; dind<=edi; dind++){
            
            // if starting date start at start time else start at beginning of day
            if(dind==sdi) {tindb = sti;}
            else {tindb = 0;}
            
            // if ending date end at end time else end at end of day
            if(dind==edi) {tinde = eti;}
            else {tinde = timeIndex.length - 1;}
            
            for (tindb; tindb<=tinde; tindb++){
                $("#" + dayIndex[dind] + timeIndex[tindb]).prop("checked", true);
                // console.log("" + dayIndex[dind] + timeIndex[tindb]);
            }
        }
        
        //hide form when done
        $("#inputform").css("display", "none");  
    });
}


    

    
