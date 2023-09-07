$(document).ready(function() {
    // Hard-coded list of sample users
    const users = [
      { username: "user1", password: "pass1" },
      { username: "user2", password: "pass2" }
    ];
  
    // Regular expression to detect SQL Injection patterns
    const sqlInjectionPattern = /('|"|--|;|DROP|SELECT|INSERT|UPDATE|DELETE)/i;
  
    // Update SQL query and display it
    function updateSQLQuery(username, password) {
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      $("#sql-query").text(query);
    }
  
    // Update SQL query and show warning label as text is entered
    function updateInput(username, password) {
      updateSQLQuery(username, password);
  
      // Check for SQL Injection patterns
      const usernameInjection = sqlInjectionPattern.test(username);
      const passwordInjection = sqlInjectionPattern.test(password);
  
      if (usernameInjection || passwordInjection) {
        $("#warning-label").addClass("text-danger").text("Warning: Potential SQL Injection detected.");
      } else {
        $("#warning-label").removeClass("text-danger").text("");
      }
    }
  
    // Update SQL query and show warning label as text is entered
    $("#username, #password").on("input", function() {
      const username = $("#username").val();
      const password = $("#password").val();
      updateInput(username, password);
    });
  
    // Login form submit handler
    $("#login-form").submit(function(event) {
      event.preventDefault();
      const username = $("#username").val();
      const password = $("#password").val();
  
      // Check if the entered username and password match any of the sample users
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        $("#login-message").html(`<p class="text-success">Login successful!</p>`);
        $("#login-section").hide();
        $("#dashboard").show();
        $("#user").text(user.username);
  
        // Logout button handler
        $("#logout-btn").click(function() {
          $("#dashboard").hide();
          $("#login-section").show();
          $("#login-message").empty();
          $("#username, #password").val("");
        });
      } else {
        $("#login-message").html(`<p class="text-danger">Invalid username or password.</p>`);
      }
    });
  
    // // Simulate an SQL Injection (for educational purposes only)
    const username = "";
    const password = "";
    updateInput(username, password);
  });
  