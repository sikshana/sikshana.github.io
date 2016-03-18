var MathType = {
    SimpleAddAndSubtrations: 1,
    MissingAddOrSubrahend: 2,
    ExpandedForm: 3    
};
var MathSymbol = {
    Addition: '+',
    Subtraction: '-'
};

var HTMLPages = {
    KGSimpleMath: 'Math/KinderGarten/SimpleMath.html'
};
var SikshanaVariables = {
    NoOfQsToDisplay: 1,
    NoOfElementsInQ: 2,
    QuestionNumber: 1,
    QuestionStartTime: new Date(),
    QuestionCompleteTime: new Date()
};

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

        KinderGarten: function () {
            return {               
                DynamicLoadMath: function (htmlPage,arrNumberRange, mathSymbol, mathType) {
                    sessionStorage.ArrNumberMinMaxRange = JSON.stringify(arrNumberRange);                    
                    sessionStorage.TotalCorrectAnswered = 0;

                    $("#dynamicContent").load(htmlPage, function (responseTxt, statusTxt, xhr) {
                        $('#btnSubmit').attr("onclick", "Sikshana.KinderGarten.NextQuestionClickOnMath("+ mathType +",'" + mathSymbol + "')");
                        if (statusTxt == "success") {
                            if (mathType == MathType.SimpleAddAndSubtrations)
                                Sikshana.KinderGarten.SimpleAddAndSubtrations(mathSymbol);
                            else if (mathType == MathType.MissingAddOrSubrahend)
                                Sikshana.KinderGarten.MissingAddOrSubrahend(mathSymbol);
                            else if (mathType == MathType.ExpandedForm)
                                Sikshana.KinderGarten.ExpanedForm(mathSymbol);

                            $('#lblQuestion').text(SikshanaVariables.QuestionNumber);
                        }                            
                        else if (statusTxt == "error")
                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                    });                   
                },

                SimpleAddAndSubtrations: function (mathSymbol) {
                    
                    Sikshana.Helpers.ClearElements();
                    SikshanaVariables.QuestionStartTime = new Date();

                    var minMaxRange = JSON.parse(sessionStorage.ArrNumberMinMaxRange);
                    var displayNumberArray = [], displayNumber = 0;

                    for (var j = 0; j < minMaxRange.length; j++) {
                        displayNumberArray.push(Sikshana.Helpers.GenerateRandomNumber(minMaxRange[j][1], minMaxRange[j][0]));
                    }
                    if (mathSymbol == MathSymbol.Subtraction)
                        displayNumberArray.sort(Sikshana.Helpers.SortNumberArrayDesc);

                    var divRow, paddingDiv = '';
                    if (SikshanaVariables.NoOfElementsInQ == 2)
                        paddingDiv = "<div class='col-md-3 col-xs-12'></div>";

                    for (var i = 0; i < SikshanaVariables.NoOfQsToDisplay; i++) {
                        divRow = "<div class='row dynamicQs' style='margin-top:25px;'>";
                        divRow += paddingDiv;

                        for (var j = 0; j < displayNumberArray.length; j++) {

                            divRow += "<div class='col-md-1 col-xs-12'> <label class='labelCustomFontSize text-success question'>" + displayNumberArray[j] + "</label> </div>";
                            if (j < displayNumberArray.length - 1) {
                                divRow += "<div class='col-md-1 col-xs-12' style='padding:0px;'><label class='labelCustomFontSize'>" + mathSymbol + "</label> </div>";
                            }
                        }

                        divRow += '<div class="col-md-1 col-xs-12" style="padding:0px;"><label class="labelCustomFontSize">=</label></div>';
                        divRow += '<div class="col-md-2 col-xs-12"> <input type="text" id="txt' + i + '_0" class="form-control input-lg answer" /></div>';

                        divRow += paddingDiv;

                        $("#dynamicQ").append(divRow);
                    }
                    if ($('#txt0_0').length == 1)
                        $('#txt0_0').focus();
                },

                MissingAddOrSubrahend: function (mathSymbol) {
                   
                    Sikshana.Helpers.ClearElements();
                    SikshanaVariables.QuestionStartTime = new Date();

                    var minMaxRange = JSON.parse(sessionStorage.ArrNumberMinMaxRange);
                    var displayNumberArray = [];

                    for (var j = 0; j < minMaxRange.length; j++) {
                        displayNumberArray.push(Sikshana.Helpers.GenerateRandomNumber(minMaxRange[j][1], minMaxRange[j][0]));
                    }
                    if (mathSymbol == MathSymbol.Addition)
                        displayNumberArray.sort(Sikshana.Helpers.SortNumberArrayAsc);
                    else if(mathSymbol == MathSymbol.Subtraction)
                        displayNumberArray.sort(Sikshana.Helpers.SortNumberArrayDesc);

                    var divRow, paddingDiv = '', IsEvenNumber = false;
                    if (SikshanaVariables.NoOfElementsInQ == 2)
                        paddingDiv = "<div class='col-md-3 col-xs-12'></div>";

                    for (var i = 0; i < SikshanaVariables.NoOfQsToDisplay; i++) {
                        IsEvenNumber = parseInt(SikshanaVariables.QuestionNumber) % 2 === 0;

                        divRow = "<div class='row dynamicQs' style='margin-top:25px;'>";
                        divRow += paddingDiv;

                        for (var j = 0; j < displayNumberArray.length; j++) {

                            if (j == 0) {
                                if (IsEvenNumber) {                                    
                                    divRow += "<div class='col-md-1 col-xs-12'> <input type='text' id='txt" + i + "_" + j + "' class='form-control input-lg question' /> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12' style='padding:0px;'><label class='labelCustomFontSize'>" + mathSymbol + "</label> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12'> <label class='labelCustomFontSize text-success question'>" + displayNumberArray[j] + "</label> </div>";
                                }
                                else {
                                    divRow += "<div class='col-md-1 col-xs-12'> <label class='labelCustomFontSize text-success question'>" + displayNumberArray[j] + "</label> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12' style='padding:0px;'><label class='labelCustomFontSize'>" + mathSymbol + "</label> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12'> <input type='text' id='txt" + i + "_" + j + "' class='form-control input-lg question' /> </div>";
                                }
                            }
                            if (j == displayNumberArray.length - 1) {
                                divRow += '<div class="col-md-1 col-xs-12" style="padding:0px;"><label class="labelCustomFontSize">=</label></div>';
                                divRow += '<div class="col-md-2 col-xs-12"> <label class="labelCustomFontSize text-success answer">' + displayNumberArray[j] + '</label></div>';
                            }
                        }                        
                        divRow += paddingDiv;

                        $("#dynamicQ").append(divRow);
                    }

                    if ($('#txt0_0').length == 1)
                        $('#txt0_0').focus();
                },

                ExpanedForm: function (mathSymbol) {
                    Sikshana.Helpers.ClearElements();

                    SikshanaVariables.QuestionStartTime = new Date();
                    
                    var minMaxRange = JSON.parse(sessionStorage.ArrNumberMinMaxRange);
                    var displayNumber = Sikshana.Helpers.GenerateRandomNumber(minMaxRange[0][1], minMaxRange[0][0]);
                    var displayNoLength = displayNumber.toString().length;
                    if (displayNoLength == 1)
                        displayNoLength = 2;

                    var divRow, paddingDiv = '';
                    if (displayNoLength == 2)
                        paddingDiv = "<div class='col-md-3 col-xs-12'></div>";
                    else if (displayNoLength == 3)
                        paddingDiv = "<div class='col-md-2 col-xs-12'></div>";
                    else if (displayNoLength == 4)
                        paddingDiv = "<div class='col-md-1 col-xs-12'></div>";
                    
                    for (var i = 0; i < SikshanaVariables.NoOfQsToDisplay; i++) {
                        divRow = "<div class='row dynamicQs' style='margin-top:25px;'>";
                        divRow += paddingDiv;
                        for (var j = 0; j < displayNoLength; j++) {

                            divRow += "<div class='col-md-1 col-xs-12'> <input type='text' id='txt" + i + "_" + j + "' class='form-control input-lg question' /> </div>";
                            if (j < displayNoLength - 1)
                                divRow += "<div class='col-md-1 col-xs-12' style='padding:0px;'><label class='labelCustomFontSize'>"+ mathSymbol +"</label> </div>";
                        }
                        divRow += '<div class="col-md-1 col-xs-12" style="padding:0px;"><label class="labelCustomFontSize">=</label></div>';
                        divRow += '<div class="col-md-2 col-xs-12"> <label class="labelCustomFontSize text-success answer">' + displayNumber + '</label></div>';
                        divRow += paddingDiv;

                        $("#dynamicQ").append(divRow);
                    }                       
                    if ($('#txt0_0').length == 1)
                        $('#txt0_0').focus();                    
                },                                
                
                NextQuestionClickOnMath: function (mathType, mathSymbol) {
                    SikshanaVariables.QuestionCompleteTime = new Date();
                    
                    var retArray = Sikshana.Calculations.ComputeAnswerSimpleMath(mathSymbol);
                    if (retArray.length > 1) {
                        var noOfQs = retArray[0];
                        var noOfCorrectAns = retArray[1];
                        if (noOfQs == noOfCorrectAns) {                           
                            Sikshana.Helpers.SetElementAttributes(true);
                            sessionStorage.TotalCorrectAnswered = parseInt(sessionStorage.TotalCorrectAnswered) + 1;
                            setTimeout(function () {
                                SikshanaVariables.QuestionNumber =  SikshanaVariables.QuestionNumber + 1;
                                if (SikshanaVariables.QuestionNumber > 10) {
                                    $("#dynamicContent").load("Menu.html", function (responseTxt, statusTxt, xhr) {
                                        if (statusTxt == "error")
                                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                                    });
                                }                                    
                                else {                                   
                                    if (mathType == MathType.SimpleAddAndSubtrations)
                                        Sikshana.KinderGarten.SimpleAddAndSubtrations(mathSymbol);
                                    else if (mathType == MathType.MissingAddOrSubrahend)
                                        Sikshana.KinderGarten.MissingAddOrSubrahend(mathSymbol);
                                    else if (mathType == MathType.ExpandedForm)
                                        Sikshana.KinderGarten.ExpanedForm(mathSymbol);

                                    $('#lblQuestion').text(SikshanaVariables.QuestionNumber);
                                }
                            }, 500);
                        }
                        else {
                            Sikshana.Helpers.SetElementAttributes(false);
                        }
                    }
                },

                Submit: function (mathSymbol) {                    
                    var retArray = Sikshana.Calculations.ComputeAnswerSimpleMath(mathSymbol);
                    if (retArray.length > 1) {
                        $('#lblMessage').text('You answered ' + retArray[1] + ' out of ' + retArray[0] + ' questions correctly.');
                        $('#lblScore').text("Score: " + retArray[1]);
                    }                    
                }
            };
        }(),

        Calculations: function() {
            return {                
                ComputeAnswerSimpleMath: function (mathSymbol) {
                    var returnArray = [];
                    var noOfQuestions = $('div.dynamicQs').length;
                    var noOfCorrectAns = 0, val = 0;
                    $('div.dynamicQs').each(function () {
                        var origResult = 0, givenResult = 0;

                        $('.question').each(function (index) {
                            if ($(this)[0].nodeName == 'LABEL')
                                val = $(this).text();
                            else
                                val = $(this).val();

                            if ($.isNumeric(val)) {
                                if (index == 0)
                                    origResult = Math.floor(val);
                                else {
                                    switch (mathSymbol) {
                                        case MathSymbol.Addition:
                                            origResult = origResult + Math.floor(val);
                                            break;
                                        case MathSymbol.Subtraction:
                                            origResult = origResult - Math.floor(val);
                                            break;
                                    }
                                }
                            }
                        });

                        if ($('.answer')[0].nodeName == 'LABEL')
                            givenResult = Math.floor($('.answer').text());
                        else
                            givenResult = Math.floor($('.answer').val());

                        if (givenResult == origResult)
                            noOfCorrectAns++;
                    });
                    returnArray.push(noOfQuestions);
                    returnArray.push(noOfCorrectAns);
                    return returnArray;
                }
            };
        }(),

        Helpers: function() {
            return {
                GenerateRandomNumber: function(maxNumber, minNumber) {                    
                    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);                                          
                },
                SortNumberArrayDesc: function(val_A, val_B) {
                    return (val_B - val_A);
                },
                SortNumberArrayAsc: function (val_A, val_B) {
                    return (val_A - val_B);
                },
                ClearElements: function () {
                    $('#divSuccess').css('display', 'none');
                    $('#dynamicQ').empty();
                    $('#lblMessage').text('');
                    $('#lblTimeElapsed').text('');
                },
                SetElementAttributes: function(isCorrectAnswer) {
                    var timeElapsed = (SikshanaVariables.QuestionCompleteTime - SikshanaVariables.QuestionStartTime) / 1000;
                    if (isCorrectAnswer) {
                        $('#divSuccess').css('display', 'block');
                        $('#divFailure').css('display', 'none');
                        $('#lblTimeElapsed').text(timeElapsed + ' Secs');
                        $('#lblTimeElapsed').attr('class', 'text-success');
                    }
                    else {
                        $('#divSuccess').css('display', 'none');
                        $('#divFailure').css('display', 'block');
                        $('#lblTimeElapsed').text(timeElapsed + ' Secs');
                        $('#lblTimeElapsed').attr('class', 'text-danger');
                        $(":text").val('')
                        if ($('#txt0_0').length == 1) {
                            $('#txt0_0').focus();
                        }
                    }
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
