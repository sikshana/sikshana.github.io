var HTMLPages = {
    Welcome: 'Welcome.html',
    Construction: 'Construction.html',
    KGAdditionsMenu: 'Menu/KinderGarten/KGAdditionsMenu.html',
    KGSubtractionsMenu: 'Menu/KinderGarten/KGSubtractionsMenu.html',
    KGLessAndOrGreater: 'Menu/KinderGarten/KGLessAndGreaterMenu.html',
    KGSimpleMath: 'Math/KinderGarten/KGSimpleMath.html'
};
var MathNumberRange = {
    OneDigit: [0, 9],
    TwoDigit: [10, 99],
    ThreeDigit: [100, 999],
    FourDigit: [1000, 9999],
    FiveDigit: [10000, 99999]
};
var MathType = {
    SimpleAddAndSubtrations: 1,
    MissingAddOrSubrahend: 2,
    ExpandedForm: 3,
    LessAndOrGreater: 4
};
var MathSymbol = {
    NotApplicable: '',
    Addition: '+',
    Subtraction: '-'
};
var SightWords = {
    BaseBall: 1,
    BasketBall: 2,
    VolleyBall: 3,
    FootBall: 4,
    Hockey: 5,
    BasBallWordList: ["the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he", "was", "for", "on", "are", "as", "with", "his", "they", "I"],
    BasketBallWordList: ["at", "be", "this", "have", "from", "or", "one", "had", "by", "words", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said"],
    VolleyBallWordList: ["there", "use", "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", "many", "then", "them", "these", "so"],
    FootBallWordList: ["some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more", "write", "go", "see", "number", "no", "way", "could", "people"],
    HockeyWordList: ["my", "than", "first", "water", "been", "called", "who", "am", "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part"]
};
var SikshanaVariables = {
    NoOfQsToDisplay: 1,
    NoOfElementsInQ: 2,
    QuestionNumber: 1,
    QuestionStartTime: new Date(),
    QuestionCompleteTime: new Date(),
    WeekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

// JavaScript source code
Sikshana = function () {
    
    return {
        Main: function () {
            return {
                LoadWelcome: function () {
                    $('a.active').removeClass("active");                    
                    $("#dynamicContent").load(HTMLPages.Welcome, function (responseTxt, statusTxt, xhr) {
                        if (statusTxt == "error")
                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                    });
                },

                LoadConstruction: function (event) {
                    $('a.active').removeClass("active");
                    $(event.target).addClass("active");
                    $("#dynamicContent").load(HTMLPages.Construction, function (responseTxt, statusTxt, xhr) {
                        if (statusTxt == "error")
                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                    });
                },

                LoadKGMathMenu: function (event,htmlPath) {
                    SikshanaVariables.QuestionNumber = 1;
                    $('a.active').removeClass("active");
                    $(event.target).addClass("active");
                    $("#dynamicContent").load(htmlPath, function (responseTxt, statusTxt, xhr) {
                        if (statusTxt == "error")
                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                    });
                },
                LoadMenu: function() {
                    if ($('a.active').length > 0) {
                        $('a.active')[0].click();
                    }
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

                    $("#dynamicContent").load(htmlPage, function (responseTxt, statusTxt, xhr) {
                        $('#btnSubmit').attr("onclick", "Sikshana.KinderGarten.NextQuestionClickOnMath("+ JSON.stringify(arrNumberRange) + "," +  mathType +",'" + mathSymbol + "')");
                        if (statusTxt == "success") {
                            if (mathType == MathType.SimpleAddAndSubtrations)
                                Sikshana.KinderGarten.SimpleAddAndSubtrations(arrNumberRange, mathSymbol);
                            else if (mathType == MathType.MissingAddOrSubrahend)
                                Sikshana.KinderGarten.MissingAddOrSubrahend(arrNumberRange, mathSymbol);
                            else if (mathType == MathType.ExpandedForm)
                                Sikshana.KinderGarten.ExpanedForm(arrNumberRange, mathSymbol);
                            else if (mathType == MathType.LessAndOrGreater)
                                Sikshana.KinderGarten.LessAndOrGreaterForm(arrNumberRange);                            

                            $('#lblQuestion').text(SikshanaVariables.QuestionNumber);
                        }                            
                        else if (statusTxt == "error")
                            alert("Error: " + xhr.status + ": " + xhr.statusText);
                    });                   
                },

                SimpleAddAndSubtrations: function (minMaxRange, mathSymbol) {
                    
                    Sikshana.Helpers.ClearElements();
                    SikshanaVariables.QuestionStartTime = new Date();
                    
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

                            divRow += "<div class='col-md-1 col-xs-12 text-center'> <label class='labelCustomFontSize text-success question'>" + displayNumberArray[j] + "</label> </div>";
                            if (j < displayNumberArray.length - 1) {
                                divRow += "<div class='col-md-1 col-xs-12 text-center'><label class='labelCustomFontSize'>" + mathSymbol + "</label> </div>";
                            }
                        }

                        divRow += '<div class="col-md-1 col-xs-12 text-center"><label class="labelCustomFontSize">=</label></div>';
                        divRow += '<div class="col-md-2 col-xs-12 text-center"> <input type="text" id="txt' + i + '_0" class="form-control input-lg answer" onkeydown="Sikshana.Utils.AllowNumericOnlyCharacters(event);" /></div>';

                        divRow += paddingDiv;

                        $("#dynamicQ").append(divRow);
                    }
                    if ($('#txt0_0').length == 1)
                        $('#txt0_0').focus();
                },

                MissingAddOrSubrahend: function (minMaxRange, mathSymbol) {
                   
                    Sikshana.Helpers.ClearElements();
                    SikshanaVariables.QuestionStartTime = new Date();

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
                                    divRow += "<div class='col-md-1 col-xs-12'> <input type='text' id='txt" + i + "_" + j + "' class='form-control input-lg question' onkeydown='Sikshana.Utils.AllowNumericOnlyCharacters(event);' /> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12 text-center' style='padding:0px;'><label class='labelCustomFontSize'>" + mathSymbol + "</label> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12 text-center'> <label class='labelCustomFontSize text-success question'>" + displayNumberArray[j] + "</label> </div>";
                                }
                                else {
                                    divRow += "<div class='col-md-1 col-xs-12 text-center'> <label class='labelCustomFontSize text-success question'>" + displayNumberArray[j] + "</label> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12 text-center'><label class='labelCustomFontSize'>" + mathSymbol + "</label> </div>";
                                    divRow += "<div class='col-md-1 col-xs-12'> <input type='text' id='txt" + i + "_" + j + "' class='form-control input-lg question' onkeydown='Sikshana.Utils.AllowNumericOnlyCharacters(event);' /> </div>";
                                }
                            }
                            if (j == displayNumberArray.length - 1) {
                                divRow += '<div class="col-md-1 col-xs-12 text-center"><label class="labelCustomFontSize">=</label></div>';
                                divRow += '<div class="col-md-2 col-xs-12 text-left"> <label class="labelCustomFontSize text-success answer">' + displayNumberArray[j] + '</label></div>';
                            }
                        }                        
                        divRow += paddingDiv;

                        $("#dynamicQ").append(divRow);
                    }

                    if ($('#txt0_0').length == 1)
                        $('#txt0_0').focus();
                },

                ExpanedForm: function (minMaxRange, mathSymbol) {
                    Sikshana.Helpers.ClearElements();

                    SikshanaVariables.QuestionStartTime = new Date();
                                        
                    var displayNumber = Sikshana.Helpers.GenerateRandomNumber(minMaxRange[0][1], minMaxRange[0][0]);
                    var displayNoLength = displayNumber.toString().length;
                    if (displayNoLength == 1)
                        displayNoLength = 2;

                    if (mathSymbol == MathSymbol.Subtraction) 
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

                            divRow += "<div class='col-md-1 col-xs-12'> <input type='text' id='txt" + i + "_" + j + "' class='form-control input-lg question' onkeydown='Sikshana.Utils.AllowNumericOnlyCharacters(event);' /> </div>";
                            if (j < displayNoLength - 1)
                                divRow += "<div class='col-md-1 col-xs-12 text-center'><label class='labelCustomFontSize'>" + mathSymbol + "</label> </div>";
                        }
                        divRow += '<div class="col-md-1 col-xs-12 text-center"><label class="labelCustomFontSize">=</label></div>';
                        divRow += '<div class="col-md-2 col-xs-12 text-left"> <label class="labelCustomFontSize text-success answer">' + displayNumber + '</label></div>';
                        divRow += paddingDiv;

                        $("#dynamicQ").append(divRow);
                    }                       
                    if ($('#txt0_0').length == 1)
                        $('#txt0_0').focus();                    
                },                                
                
                LessAndOrGreaterForm: function (minMaxRange) {
                    Sikshana.Helpers.ClearElements();

                    SikshanaVariables.QuestionStartTime = new Date();

                    var displayNumberArray = [], displayNumber = 0;

                    for (var j = 0; j < minMaxRange.length; j++) {
                        displayNumberArray.push(Sikshana.Helpers.GenerateRandomNumber(minMaxRange[j][1], minMaxRange[j][0]));
                    }

                    var divRow, paddingDiv = '', IsEvenNumber = false;

                    paddingDiv = "<div class='col-md-3 col-xs-12'></div>";

                    for (var i = 0; i < SikshanaVariables.NoOfQsToDisplay; i++) {
                        divRow = "<div class='row dynamicQs' style='margin-top:25px;'>";
                        divRow += paddingDiv;

                        IsEvenNumber = parseInt(SikshanaVariables.QuestionNumber) % 2 === 0;

                        if (IsEvenNumber)
                            displayNumberArray.sort(Sikshana.Helpers.SortNumberArrayDesc);
                        else
                            displayNumberArray.sort(Sikshana.Helpers.SortNumberArrayAsc);

                        for (var j = 0; j < displayNumberArray.length; j++) {

                            divRow += "<div class='col-md-2 col-xs-12 text-center'> <label class='labelCustomFontSize text-success question'>" + displayNumberArray[j] + "</label> </div>";
                            if (j < displayNumberArray.length - 1) {
                                divRow += "<div class='col-md-2 col-xs-12 text-center'><input type='text' id='txt" + i + "_0' class='form-control input-lg answer'/> </div>";
                            }
                        }                        
                        divRow += paddingDiv;

                        $("#dynamicQ").append(divRow);
                    }
                    if ($('#txt0_0').length == 1)
                        $('#txt0_0').focus();
                },

                NextQuestionClickOnMath: function (minmaxRange, mathType, mathSymbol) {
                    SikshanaVariables.QuestionCompleteTime = new Date();
                    var retArray;

                    if (mathType == MathType.LessAndOrGreater)
                        retArray = Sikshana.Calculations.ComputeLessOrGreater();
                    else
                        retArray = Sikshana.Calculations.ComputeAnswerSimpleMath(mathSymbol, mathType);

                    if (retArray.length > 1) {
                        var noOfQs = retArray[0];
                        var noOfCorrectAns = retArray[1];
                        if (noOfQs == noOfCorrectAns) {                           
                            Sikshana.Helpers.SetElementAttributes(true);

                            setTimeout(function () {
                                SikshanaVariables.QuestionNumber =  SikshanaVariables.QuestionNumber + 1;
                                if (SikshanaVariables.QuestionNumber > 10) {
                                    Sikshana.Main.LoadMenu();
                                }                                    
                                else {                                   
                                    if (mathType == MathType.SimpleAddAndSubtrations)
                                        Sikshana.KinderGarten.SimpleAddAndSubtrations(minmaxRange, mathSymbol);
                                    else if (mathType == MathType.MissingAddOrSubrahend)
                                        Sikshana.KinderGarten.MissingAddOrSubrahend(minmaxRange, mathSymbol);
                                    else if (mathType == MathType.ExpandedForm)
                                        Sikshana.KinderGarten.ExpanedForm(minmaxRange, mathSymbol);
                                    else if (mathType == MathType.LessAndOrGreater)
                                        Sikshana.KinderGarten.LessAndOrGreaterForm(minmaxRange);

                                    $('#lblQuestion').text(SikshanaVariables.QuestionNumber);
                                }
                            }, 500);
                        }
                        else {
                            Sikshana.Helpers.SetElementAttributes(false);
                        }
                    }
                },

                //Submit: function (mathSymbol) {                    
                //    var retArray = Sikshana.Calculations.ComputeAnswerSimpleMath(mathSymbol);
                //    if (retArray.length > 1) {
                //        $('#lblMessage').text('You answered ' + retArray[1] + ' out of ' + retArray[0] + ' questions correctly.');
                //        $('#lblScore').text("Score: " + retArray[1]);
                //    }                    
                //}
            };
        }(),

        Calculations: function() {
            return {                
                ComputeAnswerSimpleMath: function (mathSymbol, mathType) {
                    var returnArray = [], questionValArray = [];                    
                    var noOfQuestions = $('div.dynamicQs').length;
                    var noOfCorrectAns = 0, val = 0, isCorrectAns = true;
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

                                if (mathType == MathType.ExpandedForm)
                                    questionValArray.push(Math.floor(val));
                            }
                        });

                        if ($('.answer')[0].nodeName == 'LABEL')
                            givenResult = Math.floor($('.answer').text());
                        else
                            givenResult = Math.floor($('.answer').val());

                        if (mathType == MathType.ExpandedForm) {
                            $.each(questionValArray, function (index, value) {
                                if (value != 0 && value % 10 == 0) {
                                    isCorrectAns = true;
                                    return false;
                                }
                                else
                                    isCorrectAns = false;
                            });
                        }

                        if (isCorrectAns && givenResult == origResult)
                            noOfCorrectAns++;
                    });
                    returnArray.push(noOfQuestions);
                    returnArray.push(noOfCorrectAns);
                    return returnArray;
                },

                ComputeLessOrGreater: function () {
                    var returnArray = [];
                    var noOfQuestions = $('div.dynamicQs').length;
                    var noOfCorrectAns = 0, val = 0;
                    $('div.dynamicQs').each(function () {
                        var origResult = '', givenResult = '', prevVal = 0;

                        $('.question').each(function (index) {
                            if ($(this)[0].nodeName == 'LABEL')
                                val = $(this).text();
                            else
                                val = $(this).val();

                            if ($.isNumeric(val)) {
                                if (index == 0) {
                                    prevVal = Math.floor(val);
                                }
                                else {
                                    if (prevVal < val)
                                        origResult = '<' ;
                                    else if(prevVal > val)
                                        origResult = '>';
                                    else
                                        origResult = '=';
                                }                                    
                            }
                        });

                        if ($('.answer')[0].nodeName == 'LABEL')
                            givenResult = $.trim($('.answer').text());
                        else
                            givenResult = $.trim($('.answer').val());
                        
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
                GenerateShuffledString: function(origString) {
                    var retVal = ''
                    for (var i = 0; i < origString.length; i++)
                        retVal += origString.charAt(Math.floor(Math.random() * origString.length));

                    if (retVal == origString)
                        Sikshana.Helpers.GenerateShuffledString(origString);

                    return retVal;
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
                    var currentDateTime = new Date();
                    var diem = "AM";
                    var h = currentDateTime.getHours();
                    var m = currentDateTime.getMinutes();
                    var s = currentDateTime.getSeconds();
                                        
                    var weekday = SikshanaVariables.WeekDays[currentDateTime.getDay()];

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

                    $('#displayClock').text(currentDateTime.toLocaleDateString() + ", " + weekday + "  " + h + ":" + m + ":" + s + " " + diem);
                    setTimeout('Sikshana.Utils.RenderTime()', 1000);
                },

                AllowNumericOnlyCharacters: function (event) {
                    // Allow: backspace, delete, tab, escape, enter and .
                    if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                        // Allow: Ctrl+A, Command+A
                        (event.keyCode == 65 && (event.ctrlKey === true || event.metaKey === true)) ||
                        // Allow: home, end, left, right, down, up
                        (event.keyCode >= 35 && event.keyCode <= 40)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            };
        }()
    };

}();

$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if ($('#btnSubmit').length > 0 && keycode == '13') {
        $('#btnSubmit').click();
    }
});