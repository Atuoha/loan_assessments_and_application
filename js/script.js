$(document).ready(function () {
  let loan_score = 0;

  $("#process-btn").click(function () {
    $(".main-section").css("display", "none");
    $(".preloader").css("display", "block");

    setTimeout(() => {
      window.location.replace("assessment.html");
    }, 3000);
  });

  $(".cancel").click(function () {
    window.location.replace("index.html");
  });

  $("#manage-btn").click(function () {
    window.location.replace("loan.html");
  });

  // question navigation
  $(".next").click(function () {
    let assess = $(this).attr("id");

    if (assess == "assess-1") {
      $(".assess-1").css("display", "none");
      $(".assess-2").css("display", "block");
      $(".assess-3").css("display", "none");
      $(".assess-4").css("display", "none");
      $(".assess-5").css("display", "none");
    } else if (assess == "assess-2") {
      $(".assess-1").css("display", "none");
      $(".assess-2").css("display", "none");
      $(".assess-3").css("display", "block");
      $(".assess-4").css("display", "none");
      $(".assess-5").css("display", "none");
    } else if (assess == "assess-3") {
      $(".assess-1").css("display", "none");
      $(".assess-2").css("display", "none");
      $(".assess-3").css("display", "none");
      $(".assess-4").css("display", "block");
      $(".assess-5").css("display", "none");
    } else if (assess == "assess-4") {
      $(".assess-1").css("display", "none");
      $(".assess-2").css("display", "none");
      $(".assess-3").css("display", "none");
      $(".assess-4").css("display", "none");
      $(".assess-5").css("display", "block");
    }
  });

  $(".previous").click(function () {
    let assess = $(this).attr("id");

    if (assess == "assess-2") {
      $(".assess-1").css("display", "block");
      $(".assess-2").css("display", "none");
      $(".assess-3").css("display", "none");
      $(".assess-4").css("display", "none");
      $(".assess-5").css("display", "none");
    } else if (assess == "assess-3") {
      $(".assess-1").css("display", "none");
      $(".assess-2").css("display", "block");
      $(".assess-3").css("display", "none");
      $(".assess-4").css("display", "none");
      $(".assess-5").css("display", "none");
    } else if (assess == "assess-4") {
      $(".assess-1").css("display", "none");
      $(".assess-2").css("display", "none");
      $(".assess-3").css("display", "block");
      $(".assess-4").css("display", "none");
      $(".assess-5").css("display", "none");
    } else if (assess == "assess-5") {
      $(".assess-1").css("display", "none");
      $(".assess-2").css("display", "none");
      $(".assess-3").css("display", "none");
      $(".assess-4").css("display", "block");
      $(".assess-5").css("display", "none");
    }
  });

  $(".checkbox").click(function (e) {
    // $('.checkboxes').each(function(){
    //     this.checked = true
    //  })
    if (this.checked) {
      let score = parseInt($(this).attr("id"));
      loan_score += score;
    }
  });

  // submission
  $("#submit").click(function () {
    $(".main-section").css("display", "none");
    $(".question-board").css("display", "none");
    $(".preloader").css("display", "block");
    console.log(loan_score);

    setTimeout(() => {
      if (loan_score < 50) {
        swal({
          title: "Loan Denied",
          text: `Opps! You scored ${loan_score}, loan application is denied`, // Swal modal API
          icon: "error",
          timer: 5000,
          closeOnClickOutside: false,
        });

        setTimeout(() => {
          window.location.replace("index.html");
        }, 5100);

        $(".preloader").css("display", "none");
        $(".failure").css("display", "block");
      } else {
        swal({
          title: "Loan Approved",
          text: `Kudos! You scored ${loan_score}, loan application is approved`, // Swal modal API
          icon: "success",
          timer: 5000,
          closeOnClickOutside: false,
        });

        setTimeout(() => {
          $(".answers").fadeOut("slow");
          $(".loan_application").fadeIn("slow");
        }, 5100);

        $(".preloader").css("display", "none");
        $(".success").css("display", "block");
      }
    }, 3000);
  });

  // random number for id
  let min = 0;
  let max = 100000000;
  let random = `${Math.floor(Math.random() * (min + max) + min)}loan`;
  $("#random_number").val(random);

  // apply for loan
  $("#apply-form").submit(function (e) {
    e.preventDefault();
    let data = $(this).serializeArray();
    console.log(data);
    let loanList;
    if (localStorage.getItem("loans") === null) {
      loanList = [];
    } else {
      loanList = JSON.parse(localStorage.getItem("loans"));
    }

    $('#credentials_inpFile').val();
    $('#inpFile').val();

    

    loanList.push(data);
    localStorage.setItem("loans", JSON.stringify(loanList));

    swal({
      title: "Application Submitted",
      text: `Your loan application has been submitted. Wait for our response.`, // Swal modal API
      icon: "success",
      timer: 5000,
      closeOnClickOutside: false,
    });

    setTimeout(() => {
      window.location.replace("index.html");
    }, 10000);
  });


  // login
  $("#login-form").submit(function (e) {
    e.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();

    if (email === "admin@gmail.com" && password === "00000") {
      swal({
        title: "Access Granted",
        text: `Your access to the loan applications has been granted. Wait for a redirect.`, // Swal modal API
        icon: "success",
        timer: 5000,
        closeOnClickOutside: false,
      });

      setTimeout(() => {
        $("#login").fadeOut("slow");
        $(".loan_data").fadeIn("slow");
      }, 5200);
    } else {
      swal({
        title: "Access Denied",
        text: `Your access to the loan applications has been denied. Unrecognised credentials.`, // Swal modal API
        icon: "error",
        timer: 5000,
        closeOnClickOutside: false,
      });
      $("#email").val("");
      $("#password").val("");
    }
  });

  // Fetching loan applicants
  const fetch_loan = () => {
    let loans;
    let body = $("#loan_record");
    if (localStorage.getItem("loans") == null) {
      loans = [];
      const paragraph = document.createElement("p");
      paragraph.innerHTML = "No Record Found";
      paragraph.className = "lead alert alert-danger p-5 text-center";
      body.append(paragraph);
      console.log("No Record Found");
    } else {
      loans = JSON.parse(localStorage.getItem("loans"));
      loans.forEach((loan) => {
        const tdID = document.createElement("td");
        const tdName = document.createElement("td");
        const tdPhone = document.createElement("td");
        const tdEmail = document.createElement("td");
        const tdOccupation = document.createElement("td");
        const tdAmount = document.createElement("td");
        const tdDuration = document.createElement("td");
        const tdStatus = document.createElement("td");
        const tdEdit = document.createElement("td");
        const tdRemove = document.createElement("td");
        const tr = document.createElement("tr");

        let edit = document.createElement("a");
        let remove = document.createElement("a");
        if (loan[6].value == "Unapproved") {
          edit.textContent = "Approve";
        } else {
          edit.textContent = "Unapprove";
        }
        remove.textContent = "Delete";
        // remove.setAttribute('href', '#')
        // edit.setAttribute('href', '#')
        tdID.innerHTML = loan[0].value;
        tdName.innerHTML = loan[1].value;
        tdPhone.innerHTML = loan[2].value;
        tdEmail.innerHTML = loan[3].value;
        tdOccupation.innerHTML = loan[4].value;
        tdAmount.innerHTML = `N${loan[5].value}`;
        tdDuration.innerHTML = loan[6].value;
        tdStatus.innerHTML = loan[7].value;

        if (loan[6].value == "Unapproved") {
          tdEdit.innerHTML = `<a href="javascript:void(0)" rel="Approve" style="color: green;  text-decoration: none;" id=${loan[0].value} class="app_status">Approve</a>`;
        } else {
          tdEdit.innerHTML = `<a href="javascript:void(0)" rel="Unapprove" style="color: brown; text-decoration: none;" id=${loan[0].value} class="app_status">Unapprove</a>`;
        }

        tdRemove.innerHTML = `<a href="javascript:void(0)"  style="color: red;  text-decoration: none;" id=${loan[0].value} class="del_record">Delete</a>`;
        tr.appendChild(tdID);
        tr.appendChild(tdName);
        tr.appendChild(tdPhone);
        tr.appendChild(tdEmail);
        tr.appendChild(tdOccupation);
        tr.appendChild(tdAmount);
        tr.appendChild(tdDuration);
        tr.appendChild(tdStatus);
        tr.appendChild(tdEdit);
        tr.appendChild(tdRemove);
        body.append(tr);
      });
      console.log("Record Found");
    }
  };
  fetch_loan();



  
  // deleting record
  $(".del_record").click(function (e) {
    e.preventDefault();
    let id = $(this).attr("id");
    console.log(id);

    let loans = JSON.parse(localStorage.getItem("loans"));
    loans.forEach(function (loan, index) {
      if (loan[0].value === id) {
        loans.splice(index, 1);
        console.log(loan);
      }
    });
    swal({
      title: "Deleted Loan",
      text: `Application has been successfully deleted`, // Swal modal API
      icon: "success",
      timer: 1500,
      closeOnClickOutside: false,
    });

    $("#loan_record").load(location.href + " #loan_record");
    setTimeout(() => {
      localStorage.setItem("loans", JSON.stringify(loans));
      fetch_loan();
    }, 1600);
  });



  // approving/unapproving record
  $(".app_status").click(function (e) {
    e.preventDefault();
    let id = $(this).attr("id");
    console.log(id);
    let text = $(this).attr("rel");
    let loans = JSON.parse(localStorage.getItem("loans"));
    console.log(text);

    if (text == "Approve") {
      loans.forEach(function (loan, index) {
        if (loan[0].value === id) {
          loan[6].value = "Approved";
          loans.splice(index, 1);
          loans.push(loan);
          localStorage.setItem("loans", JSON.stringify(loans));
          console.log(loan);
        }
      });
    } else {
      loans.forEach(function (loan, index) {
        if (loan[0].value === id) {
          loan[6].value = "Unapproved";
          loans.splice(index, 1);
          loans.push(loan);
          localStorage.setItem("loans", JSON.stringify(loans));
          console.log(loan);
        }
      });
    }

    swal({
      title: "Operation Performed",
      text: `Application has been successfully updated`, // Swal modal API
      icon: "success",
      timer: 1500,
      closeOnClickOutside: false,
    });

    
    $("#loan_record").load(location.href + " #loan_record");
    setTimeout(() => {
        // window.location.reload(true);
        fetch_loan();
        $("#login").fadeOut("slow");
        $(".loan_data").fadeIn("slow");
    }, 1500);

  });


  $('.file_upload').click(function(){
    $('#inpFile').click()

    setInterval(()=>{
      if( $('#inpFile').val() === ''){
        $('#col_icon').css('display', 'none')
      }else{
        $('#col_icon').css('display', 'block')
        $('.file_upload').css('display', 'none')
        $('#collatorial_input').val($('#inpFile').val())
      }
    },500)
  })

  $('.yes_collatoral').click(function(){
      if(this.checked){
          $('.file_upload').css('display', 'block')
      }else{
        $('.file_upload').css('display', 'none')
      }
  })



 $('.credentials_upload').click(function(){
  if(this.checked){
    $('.credentials_file_btn').css('display', 'block')
    }else{
      $('.credentials_file_btn').css('display', 'none')
    }
 })


  $('.credentials_file_btn').click(function(){
    $('#credentials_inpFile').click();

    setInterval(()=>{
      if( $('#credentials_inpFile').val() === ''){
        $('#cred_icon').css('display', 'none')
      }else{
        $('#cred_icon').css('display', 'block')
        $('.credentials_file_btn').css('display', 'none')
        $('#credentials_input').val($('#credentials_inpFile').val())
      }
    },500)

  });



  $('.checkbox1').click(function(){
    if(this.checked){
      $('.checkbox1').not(this).each(function(){
        $(this.checked = false);
      })
    }
  })

  $('.checkbox2').click(function(){
    if(this.checked){
      $('.checkbox2').not(this).each(function(){
        $(this.checked = false);
      })
    }
  })


  $('.checkbox3').click(function(){
    if(this.checked){
      $('.checkbox3').not(this).each(function(){
        $(this.checked = false);
      })
    }
  })


  $('.checkbox4').click(function(){
    if(this.checked){
      $('.checkbox4').not(this).each(function(){
        $(this.checked = false);
        // $('.file_upload').css('display', 'none')
      })
    }
  })


  $('.checkboxnone').click(function(){
    if(this.checked){
      $('.credentials_upload').not(this).each(function(){
        $(this.checked = false);
        $('.credentials_file_btn').css('display', 'none')
      })
    }
  })


  $('.credentials_upload').click(function(){
    if(this.checked){
      $('.checkboxnone').not(this).each(function(){
        $(this.checked = false);
      })
    }
  })



  $('.checkboxNo').click(function(){
    if(this.checked){
      $('.file_upload').css('display', 'none')
    }
  })



  
});
