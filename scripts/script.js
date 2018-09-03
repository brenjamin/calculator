
// calculator object constructor

function Calculator() {
    var operators = ["+", "-", "x", "÷", "*", "/"];
    this.display = 0;
    
    this.currentNum = "0";
    
    this.expression ="0";
    
    this.CEactive = true;
    
    this.equalsLast = false;
    
    this.error = false;
    
    this.appendNumber = function(input) {
      
      
      
      if ((input === ".") && (this.expression === "0")) {
        
        this.expression += input;
      }
      
      else {
        if (this.expression === "0") {
          this.expression = "";
        }
        this.expression += input;
      }
      
      
    }
    
    this.appendOperator = function(input) {
      
      
      if (operators.indexOf(this.expression.toString().slice(-1)) > -1) {
        this.expression = this.expression.replace(/.$/, input);
      }
      
      else {
        this.expression += input;
      }
      
      
      this.currentNum = "0";
      
     
    }
    
    this.clear = function() {
      this.currentNum = "0";
      this.expression = "0";
      this.updateDisplay(this.currentNum);
      this.CEactive = true;
      this.equalsLast = false;
      this.error = false;
    }
    
    this.updateNumber = function(input) {
      
      if (input === ".") {
        this.currentNum += input;
        this.updateDisplay(this.currentNum);
      }
      
      else {
        this.clearZero();
        this.currentNum += input;
        this.updateDisplay(this.currentNum);
      }
    }
    
    this.clearZero = function() {
      if (this.currentNum === "0") {
        this.currentNum = "";
      }
    }
    
    this.updateDisplay = function(input) {
      $("#currentNumber").html(input);
    }
    
    this.resetDisplayValue = function() {
      this.currentNum = "0";
    }
    
    this.replaceOperators = function() {
      this.expression = this.expression.replace(/x/, "*");
      this.expression = this.expression.replace(/÷/, "/");
    }
    
    this.updatePartialExpression = function(newValue) {
      this.expression = newValue + this.expression.slice(-1);
    }
    
    this.updateExpression = function(newValue) {
      this.expression = newValue;
    }
    
    this.resolvePartial = function() {
      this.replaceOperators();
      var newValue = eval(this.expression.slice(0, -1));
      
      if ((newValue.toString().indexOf(".") > -1) && (newValue.toString().length > 10)) {
        newValue = parseFloat(newValue).toFixed(8);
        
        
      }
      
      if (newValue.toString().length <= 10) {
        this.updateDisplay(newValue);
        this.updatePartialExpression(newValue);
      }
      
      else {
        this.updateDisplay("ERROR");
        this.error = true;
      }
    }
    
    this.resolveStatement = function() {
      this.replaceOperators();
      var newValue = eval(this.expression);
      
      if ((newValue.toString().indexOf(".") > -1) && (newValue.toString().length > 10)) {
        
        var beforeDecimal = newValue.toString().match(/\d+\./).toString();
        
        alert(beforeDecimal instanceof String);
        
        var len = beforeDecimal.toString().length;
        alert(beforeDecimal + " is length " + len);
        
        newValue = parseFloat(newValue).toFixed(10 - len);
      }
      
      if (newValue.toString().length <= 10) {
        this.updateDisplay(newValue);
        this.updateExpression(newValue);
      }
      
      else {
        this.updateDisplay("ERROR");
        this.error = true;
      }
    }
    
    this.validInput = function(input) {
      
      // 10 digit limit
      if (this.currentNum.length === 10) {
        return false; 
      }
      
      else if (input === ".") {
        console.log
        if (this.currentNum.indexOf(".") > -1) {
          return false;
        }
        return true;
      }
      else {
        return true;
      }
    }  
    
    this.removeLast = function() {
      this.CEactive = false;
      
      if (operators.indexOf(this.expression.slice(-1)) > -1) {
        
        this.expression = this.expression.slice(0, -1);
        
      }
      
      else {
        this.currentNum = "0";
        this.updateDisplay(this.currentNum);
        // var re = new RegExp("$");
        
        this.expression = this.expression.replace(/\d+\.?\d*$/, "");
        
        if (this.expression.length == 0) {
          this.expression = "0";
        }
        
        
      }
      
      
    }
  }
  
  // click handlers
  
  $("#buttonAC").on("click", function() {
    blink();
    calc.clear();
    calc.equalsLast = false;
  });
  
  $("#buttonCE").on("click", function() {
    
    if (!calc.error) {
      if (calc.CEactive) {
        blink();
        calc.removeLast();
      }
    }
  });
  
  // resolve expression on equals
  $("#equals").on("click", function() {
    if (!calc.error) {
        blink();
        calc.resolveStatement();
        calc.CEactive = false;
        calc.equalsLast = true;
    }
  });
  
  // add number/decimal point if valid to expression and display
  $(".number").on("click", function() {
    
    if (!calc.error) {
      if (calc.equalsLast) {
        calc.clear();
      }
  
      if (calc.validInput($(this).html())) {
        var val = $(this).html();
        calc.appendNumber(val);
        calc.updateNumber(val);
        calc.CEactive = true;
        calc.equalsLast = false;
      
      }
    }
  });
  
  
  // append or replace operator to expression
  $(".operator").on("click", function() {
    if (!calc.error) {
      blink();
      var val = $(this).html();
      calc.appendOperator(val);
      calc.resolvePartial();
      calc.CEactive = true;
      calc.equalsLast = false;
    }
  });
  
  
  function blink() {
    $("#currentNumber").css("display", "none");
    setTimeout(function(){ $("#currentNumber").css("display", "inline") }, 100);
    
  }
  
  // create Calculator object
  var calc = new Calculator();
  
  // set start display to 0
  calc.updateDisplay("0");