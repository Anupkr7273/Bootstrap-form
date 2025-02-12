document.getElementById("category").addEventListener("change", function () {
    let applicantName = document.getElementById("applicant-name");
    let parentDetails = document.getElementById("parent-details")
    let addressDetails = document.getElementById("address-details");
    let addressDetailsHeading = document.getElementById("address-details-heading");
    let nonIndividualDetails = document.getElementById("non-individual-details");
    let nonIndividualName = document.getElementById("non-individual-name")
    let partnerName = document.getElementById("partner-name");
    let partnerTitle = document.getElementById("partner-title")
    let individualTitle = document.getElementById("individual-title")
    let nonIndividualTitle = document.getElementById("non-individual-title")
    if (this.value === "Individual") {

    } else {

    }

    function show(data) {
        data.classList.remove("d-none");
    }
    function hide(data) {
        data.classList.add("d-none");
    }

    function individual() {
        show(individualTitle);
        hide(nonIndividualTitle);
        show(applicantName);
        show(parentDetails);
        show(addressDetails);
        hide(nonIndividualDetails);
    }

    function nonIndividual() {
        show(nonIndividualTitle);
        hide(individualTitle);
        hide(applicantName);
        hide(parentDetails);
        show(nonIndividualDetails);
        show(addressDetails);
    }


    if (this.value === "Individual") {
        individual();
        addressDetailsHeading.innerHTML = "Applicant's Residence Address Details"

    }
    else if (this.value === "Firm") {
        nonIndividual();
        nonIndividualName.innerHTML = "Firm Name"
        partnerName.innerHTML = "Managing partner's name"
        partnerTitle.innerHTML = "Managing Partner's Title"
        document.getElementById("input-name").placeholder = "Enter Your Firm Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Managing Partner's Name";
    }
    else if (this.value === "Body of Individuals") {
        nonIndividual();
        nonIndividualName.innerHTML = "Body of Individuals Name"
        partnerName.innerHTML = "Authorized Person's Name"
        partnerTitle.innerHTML = "Authorized Partner's Title"
        document.getElementById("input-name").placeholder = "Enter Your Body of Individuals Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Authorized Person's Name";
    }
    else if (this.value === "Hindu Undivided Family") {
        nonIndividual();
        nonIndividualName.innerHTML = "Hindu Undivided Family Name"
        partnerName.innerHTML = "Karta name"
        partnerTitle.innerHTML = "Karta Title"
        document.getElementById("input-name").placeholder = "Enter Your Hindu Undivided Family Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Karta Name";

    }
    else if (this.value === "Association of Persons") {
        nonIndividual();
        nonIndividualName.innerHTML = "Association of Persons Name"
        partnerName.innerHTML = "Managing partner's name"
        partnerTitle.innerHTML = "Managing Partner's Title"
        document.getElementById("input-name").placeholder = "Enter Your Association of Persons Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Managing partner's Name";
    }
    else if (this.value === "Local Authority") {
        nonIndividual();
        nonIndividualName.innerHTML = "Local Authority Name"
        partnerName.innerHTML = "Authorized Person's Name"
        partnerTitle.innerHTML = "Authorized Person's Title"
        document.getElementById("input-name").placeholder = "Enter Your Local Authority Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Authorized Person's Name";
    }
    else if (this.value === "Trust") {
        nonIndividual();
        nonIndividualName.innerHTML = "Trust Name"
        partnerName.innerHTML = "Authorized Person's Name"
        partnerTitle.innerHTML = "Authorized Person's Title"
        document.getElementById("input-name").placeholder = "Enter Your Trust Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Authorized Person's Name";
    }
    else if (this.value === "Artificial Juridical Person") {
        nonIndividual();
        nonIndividualName.innerHTML = "Artificial Juridical Person Name"
        partnerName.innerHTML = "Executor's name"
        partnerTitle.innerHTML = "Executor's Title"
        document.getElementById("input-name").placeholder = "Enter Your Artificial Juridical Person Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Executor's Name";
    }
    else if (this.value === "Government") {
        nonIndividual();
        nonIndividualName.innerHTML = "Government Name"
        partnerName.innerHTML = "Authorized Person's name"
        partnerTitle.innerHTML = "Authorized Person's Title"
        document.getElementById("input-name").placeholder = "Enter Your Government Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Authorized Person's Name";
    }
    else if (this.value === "Limited Liability Partnership") {
        nonIndividual();
        nonIndividualName.innerHTML = "Limited Liability Partnership Name"
        partnerName.innerHTML = "Managing partner's name"
        partnerTitle.innerHTML = "Managing Partner's Title"
        document.getElementById("input-name").placeholder = "Enter Your Limited Liability Partnership Name";
        document.getElementById("input-partner-name").placeholder = "Enter Your Managing partner's Name";
    }
});



document.getElementById("parentSelect").addEventListener("change", function () {
    let fatherDetails = document.getElementById("fatherDetails");
    let motherDetails = document.getElementById("motherDetails");

    if (this.value === "father") {
        fatherDetails.classList.remove("d-none"); 
        motherDetails.classList.add("d-none");   
    } else if (this.value === "mother") {
        motherDetails.classList.remove("d-none"); 
        fatherDetails.classList.add("d-none");   
    }
});



document.getElementById("aadhar").addEventListener("change", function () {
    let aadharDetails = document.getElementById("aadhar-details")

    if (this.value === "yes") {
        aadharDetails.classList.remove("d-none");
    }
    else if (this.value === "no") {
        aadharDetails.classList.add("d-none")
    }
});



document.getElementById("pincode").addEventListener("blur", function () {
    const pincode = this.value.trim();
    const postOfficeSelect = document.getElementById("postOffice");
    const districtInput = document.getElementById("district");
    const stateSelect = document.getElementById("state");

    if (pincode.length === 6) {
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data); 

                if (data[0].Status === "Success") {
                    const postOffices = data[0].PostOffice;

                    if (postOffices && postOffices.length > 0) {
                        const district = postOffices[0].District;
                        const state = postOffices[0].State; 

                        postOfficeSelect.innerHTML = `<option selected disabled>Select Post Office</option>`;
                        postOffices.forEach(po => {
                            const option = document.createElement("option");
                            option.value = po.Name;
                            option.textContent = po.Name;
                            postOfficeSelect.appendChild(option);
                        });

                        districtInput.value = district || "Not Found";
                        stateSelect.innerHTML = `<option selected disabled>${state}</option>`; 
                        stateSelect.disabled = true;

                    } else {
                        alert("No Post Office data found!");
                    }
                } else {
                    alert("Invalid Pincode! Please enter a valid one.");
                    districtInput.value = "";
                    stateInput.value = "";
                    postOfficeSelect.innerHTML = `<option selected disabled>Select Post Office</option>`;
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    } else {
        alert("Please enter a valid 6-digit Pincode.");
    }
});




document.addEventListener("DOMContentLoaded", function () {
    let panOption = document.getElementById("physicalPan");

    panOption.addEventListener("mouseenter", function () {
        panOption.style.backgroundColor = "red";
        panOption.style.color = "white";
    });

    panOption.addEventListener("mouseleave", function () {
        panOption.style.backgroundColor = "";
        panOption.style.color = "";
    });
});

