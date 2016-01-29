// JavaScript source code
Sikshana = function () {
    var questionStartTime, questionCompleteTime;

    return {
        Main: function () {

            return {
                StartUp: function () {
                    $("#dynamicContent").load("Menu.html", function (responseTxt, statusTxt, xhr) {                       
                        if (statusTxt == "error")
                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                    });
                },
                Reload: function () {
                    window.location.reload();
                }
            };
        }(),

        BaseBallWordsWrite: function () {
            return {
                StartUp: function () {
                    var arrWord = ["When", "The", "She", "A", "I", "Them"];
                    jQuery.each(arrWord, function (i, val) {
                        $("#listWords").append("<dt class='DescTitle'>"+val+"</dt>");
                        $("#listWords").append("<dd class='col-xs-1' style='margin-left:10px;'><input type='text' id='txt" + val + "' class='form-control' /></dd>");
                    });
                }
            };
        }(),

        Additions: function () {
            return {               
                DynamicLoadContent: function (htmlPage,arrNumberRange, noOfQuestions, symbol) {
                    sessionStorage.ArrNumberMinMaxRange = JSON.stringify(arrNumberRange);
                    sessionStorage.Symbol = symbol;
                    sessionStorage.NoOfQsToDisplay = noOfQuestions;
                    sessionStorage.TotalNoOfQs = 1;
                    sessionStorage.TotalCorrectAnswered = 0;

                    $("#dynamicContent").load(htmlPage, function (responseTxt, statusTxt, xhr) {
                        if (statusTxt == "success")
                            Sikshana.Additions.StandardAdditionsStartUp();
                        if (statusTxt == "error")
                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                    });                    
                },
                StandardAdditionsStartUp: function () {
                    var noOfQuestions = parseInt(sessionStorage.NoOfQsToDisplay);
                    $('#list2DigitNos').empty();
                    $('#lblMessage').text('');
                    $('#lblTimeElapsed').text('');

                    var dtCssClass, ddCssClass = 'col-xs-1';
                    if (noOfQuestions == 1) {
                        dtCssClass = 'SingleDescTitle';
                        ddCssClass = ddCssClass + ' SingleDescDef';
                        questionStartTime = new Date();
                    }                        
                    else 
                        dtCssClass = 'DescTitle';

                    var descTermHTML = "<dt class='" + dtCssClass + "'>";

                    var minMaxRange = JSON.parse(sessionStorage.ArrNumberMinMaxRange);
                    var displayNumber = 0;

                    for (var i = 0; i < noOfQuestions; i++) {
                    
                        for (var j = 0; j < minMaxRange.length; j++) {
                            displayNumber = Math.floor(Math.random() * (minMaxRange[j][1] - minMaxRange[j][0] + 1) + minMaxRange[j][0]);                            
                            descTermHTML += "<span>" + displayNumber + "</span>"
                            if (j == minMaxRange.length - 1)
                                descTermHTML += " <span> = </span> </dt>";
                            else
                                descTermHTML += " <span>" + sessionStorage.Symbol + "</span> ";
                        }
                        $("#list2DigitNos").append(descTermHTML);
                        $("#list2DigitNos").append("<dd class='" +  ddCssClass + "' style='margin-left:10px;'><input type='text' id='txt" + i + "' class='form-control' /></dd>");
                    }
                    if ($('#txt0').length == 1)
                        $('#txt0').focus();

                    $('#lblQuestion').text(sessionStorage.TotalNoOfQs);
                },
                NextQuestionClick: function () {
                    questionCompleteTime = new Date();
                    var timeElapsed = (questionCompleteTime - questionStartTime) / 1000;

                    var retArray = Sikshana.Helpers.ComputeAnswer();
                    if (retArray.length > 1) {
                        var noOfQs = retArray[0];
                        var noOfCorrectAns = retArray[1];
                        if (noOfQs == noOfCorrectAns) {
                            $('#divSuccess').css('display', 'block');
                            $('#divFailure').css('display', 'none');
                            $('#lblTimeElapsed').text(timeElapsed + ' Secs');                            
                            $('#lblTimeElapsed').attr('class', 'text-success');

                            sessionStorage.TotalCorrectAnswered = parseInt(sessionStorage.TotalCorrectAnswered) + 1;
                            setTimeout(function () {
                                sessionStorage.TotalNoOfQs =  parseInt(sessionStorage.TotalNoOfQs) + 1;
                                if (sessionStorage.TotalNoOfQs > 10) {
                                    $("#dynamicContent").load("Menu.html", function (responseTxt, statusTxt, xhr) {
                                        if (statusTxt == "error")
                                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                                    });
                                }                                    
                                else {
                                    Sikshana.Additions.StandardAdditionsStartUp();
                                }
                            }, 500);
                        }
                        else {
                            $('#divSuccess').css('display', 'none');
                            $('#divFailure').css('display', 'block');
                            $('#lblTimeElapsed').text(timeElapsed + ' Secs');
                            $('#lblTimeElapsed').attr('class', 'text-danger');
                            if ($('#txt0').length == 1) {
                                $('#txt0').val();
                                $('#txt0').focus();
                            }                                
                        }
                    }
                },
                Submit: function () {                    
                    var retArray = Sikshana.Helpers.ComputeAnswer();
                    if (retArray.length > 1) {
                        $('#lblMessage').text('You answered ' + retArray[1] + ' out of ' + retArray[0] + ' questions correctly.');
                        $('#lblScore').text("Score: " + retArray[1]);
                    }                    
                }
            };
        }(),

        Helpers: function() {
            return {
                ComputeAnswer: function () {
                    var returnArray = [];
                    var noOfQuestions = $('dl dt').length;
                    var noOfCorrectAns = 0;
                    $('dl dt').each(function () {
                        var origResult = 0, givenResult = 0;
                        var symbol = '+';

                        $(this).find('span').each(function () {
                            if ($.isNumeric($(this).text())) {
                                switch (symbol) {
                                    case '+':
                                        origResult = origResult + Math.floor($(this).text());
                                        break;
                                    case '-':
                                        origResult = origResult - Math.floor($(this).text());
                                        break;
                                }
                            }
                            else
                                symbol = $(this).text();
                        });
                        dds = $(this).nextUntil('dt');
                        givenResult = Math.floor(dds.find('input[type=text]').val());

                        if (givenResult == origResult)
                            noOfCorrectAns++;
                    });
                    returnArray.push(noOfQuestions);
                    returnArray.push(noOfCorrectAns);
                    return returnArray;
                }
            };
        }(),

        Utils: function () {
            return {               
                RenderTime: function () {
                    var currentTime = new Date();
                    var diem = "AM";
                    var h = currentTime.getHours();
                    var m = currentTime.getMinutes();
                    var s = currentTime.getSeconds();
                    if (h == 0) {
                        h = 12;
                    }
                    else if (h > 12) {
                        h = h - 12;
                        diem = "PM";
                    }
                    if (h < 10) {
                        h = "0" + h;
                    }
                    if (m < 10) {
                        m = "0" + m;
                    }
                    if (s < 10) {
                        s = "0" + s;
                    }

                    $('#displayClock').text(h + ":" + m + ":" + s + " " + diem);
                    setTimeout('Sikshana.Utils.RenderTime()', 1000);
                }
            };
        }()
    };

}();
