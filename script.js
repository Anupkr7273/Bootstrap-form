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
        // adding processing fee
        document.getElementById("processing-fee").value = "₹107";
        // mandating parent details 
        // document.getElementById("parentSelect").required = true;

        
    }

    function nonIndividual() {
        show(nonIndividualTitle);
        hide(individualTitle);
        hide(applicantName);
        hide(parentDetails);
        show(nonIndividualDetails);
        show(addressDetails);
        // negating parent details 
        // document.getElementById("parentSelect").required = false;
        // adding processing fee
        document.getElementById("processing-fee").value = "₹107";
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
    }else{}
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

//fetching details from pincode

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


//name automation 
document.addEventListener("DOMContentLoaded", function () {
    let firstName = document.getElementById("firstName");
    let middleName = document.getElementById("middleName");
    let lastName = document.getElementById("lastName");
    let nameOnCard = document.getElementById("nameOnCard");

    // Function to enforce single-word restriction
    function enforceSingleWord(inputField) {
        let words = inputField.value.trim().split(/\s+/);
        if (words.length > 1) {
            inputField.value = words[0]; 
        }
    }

    // Function to update "Name on Card" when user types in Name fields
    function updateNameOnCard() {
        let fullName = [firstName.value, middleName.value, lastName.value].filter(Boolean).join(" ");
        nameOnCard.value = fullName;
    }

    // Function to split "Name On Card" into first, middle, last names
    function updateNameFields() {
        let words = nameOnCard.value.trim().split(/\s+/);

        firstName.value = words[0] || "";
        middleName.value = words.length > 2 ? words[1] : "";
        lastName.value = words.length === 2 ? words[1] : words[2] || "";
    }

    // Add event listeners to enforce single-word input and update "Name on Card"
    [firstName, middleName, lastName].forEach(field => {
        field.addEventListener("input", function () {
            enforceSingleWord(field);
            updateNameOnCard();
        });
    });

    // Event listener for "Name On Card" field
    nameOnCard.addEventListener("input", updateNameFields);
});


document.addEventListener("DOMContentLoaded", function () {
    const firmName = document.getElementById("input-name");
    const nameOnCard = document.getElementById("nameOnCard");

    function syncFirmToCard() {
        nameOnCard.value = firmName.value;
    }

    function syncCardToFirm() {
        firmName.value = nameOnCard.value;
    }

    // Event Listeners for real-time sync
    firmName.addEventListener("input", syncFirmToCard);
    nameOnCard.addEventListener("input", syncCardToFirm);
});



// aadhar name validation

document.getElementById("nameOnCard").addEventListener("input", function () {
    let nameInput = this.value;
    let namePattern = /^[a-zA-Z\s]+$/;

    if (namePattern.test(nameInput) && nameInput.trim().length > 0) {
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
    } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
    }
});

//mandating father or mother name

document.getElementById("aadhar").addEventListener("input", function () {
    if (this.value === "father") {
        document.getElementById("father-first-name").required = true;
        document.getElementById("father-last-name").required = true;
        document.getElementById("mother-first-name").required = false;
        document.getElementById("mother-last-name").required = false;
    }
    if (this.value === "mother") {
        document.getElementById("father-first-name").required = false;
        document.getElementById("father-last-name").required = false;
        document.getElementById("mother-first-name").required = true;
        document.getElementById("mother-last-name").required = true;
    }
})

// checking mobile no. validity

document.getElementById("mobileNo").addEventListener("input", function () {
    let mobileInput = this;
    let mobileValue = mobileInput.value;
    let mobilePattern = /^[6789]\d{9}$/; 

    if (mobilePattern.test(mobileValue)) {
        mobileInput.classList.remove("is-invalid");
        mobileInput.classList.add("is-valid");
    } else {
        mobileInput.classList.remove("is-valid");
        mobileInput.classList.add("is-invalid");
    }
});
// checking email validity 

document.getElementById("email").addEventListener("input", function () {
    let emailInput = this;
    let emailValue = emailInput.value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (emailPattern.test(emailValue)) {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    } else {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
    }
});

// checking date of birth validation

document.getElementById("dateOfBirth").addEventListener("input", function () {
    const dobPattern = /^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (dobPattern.test(this.value)) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});


// aadhar no and aadhar name validation 

document.getElementById("aadhar").addEventListener("input", function () {
    if (this.value === "yes") {
        document.getElementById("aadhar-number").required = true;
        document.getElementById("name-on-aaadhar").required = true;
    }
    if (this.value === "no") {
        document.getElementById("aadhar-number").required = false;
        document.getElementById("name-on-aaadhar").required = false;
    }
})

// aadhar no validation
document.getElementById("aadhar-number").addEventListener("input", function () {
    let aadharInput = this.value;
    let aadharPattern = /^\d{12}$/;

    if (aadharPattern.test(aadharInput)) {
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
    } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
    }
});

// aadhar name validation

document.getElementById("name-on-aadhar").addEventListener("input", function () {
    let nameInput = this.value;
    let namePattern = /^[a-zA-Z\s]+$/; 

    if (namePattern.test(nameInput) && nameInput.trim().length > 0) {
        this.classList.add("is-valid");
        this.classList.remove("is-invalid");
    } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
    }
});





// checking area code validation

document.querySelector("input[name='areaCode']").addEventListener("input", function () {
    let areaCodeInput = this.value;
    let areaCodePattern = /^[A-Za-z]{3}$/;
    let validFeedback = "Valid Area Code.";
    let invalidFeedback = "Area Code must be exactly 3 letters (A-Z only).";

    if (areaCodePattern.test(areaCodeInput)) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        this.setCustomValidity("");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
        this.setCustomValidity(invalidFeedback);
    }
});

// checking AO type validation 

document.querySelector("input[name='aoType']").addEventListener("input", function () {
    let aoTypeInput = this.value;
    let aoTypePattern = /^[A-Za-z]{2}$/;
    let validFeedback = "Valid AO Type.";
    let invalidFeedback = "AO Type must be exactly 2 letters (A-Z only).";

    if (aoTypePattern.test(aoTypeInput)) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        this.setCustomValidity("");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
        this.setCustomValidity(invalidFeedback);
    }
});

// checking range code validation 

document.querySelector("input[name='rangeCode']").addEventListener("input", function () {
    let rangeCodeInput = this.value;
    let rangeCodePattern = /^[0-9]{1,3}$/;
    let validFeedback = "Valid Range Code.";
    let invalidFeedback = "Range Code must be 1 to 3 digits (0-9 only).";

    if (rangeCodePattern.test(rangeCodeInput)) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        this.setCustomValidity("");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
        this.setCustomValidity(invalidFeedback);
    }
});

// checking AO number validation

document.querySelector("input[name='aoNumber']").addEventListener("input", function () {
    let aoNumberInput = this.value;
    let aoNumberPattern = /^[0-9]{1,2}$/;

    if (aoNumberPattern.test(aoNumberInput)) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
});



