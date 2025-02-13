document.getElementById("category").addEventListener("change", function () {
    let applicantName = document.getElementById("applicant-name");
    let parentDetails = document.getElementById("parent-details")
    let residenceAddress = document.getElementById("residence-address");
    let OfficeAddress = document.getElementById("office-address");
    let nonIndividualDetails = document.getElementById("non-individual-details");
    let nonIndividualName = document.getElementById("non-individual-name")
    let partnerName = document.getElementById("partner-name");
    let partnerTitle = document.getElementById("partner-title")
    let individualTitle = document.getElementById("individual-title")
    let nonIndividualTitle = document.getElementById("non-individual-title")
    let postAddressSelect = document.getElementById("post-address");

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
        show(residenceAddress);
        hide(OfficeAddress);
        hide(nonIndividualDetails);
        // adding processing fee
        document.getElementById("processing-fee").value = "₹107";
        // mandating parent details 
        document.getElementById("parentSelect").required = true;
        postAddressSelect.disabled = false;
    }

    function nonIndividual() {
        show(nonIndividualTitle);
        hide(individualTitle);
        hide(applicantName);
        hide(parentDetails);
        show(nonIndividualDetails);
        hide(residenceAddress);
        show(OfficeAddress)
        // negating parent details 
        document.getElementById("parentSelect").required = false;
        // adding processing fee
        document.getElementById("processing-fee").value = "₹107";
        postAddressSelect.value = "office";
        postAddressSelect.disabled = true;
    }


    if (this.value === "Individual") {
        individual();

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
    } else { }
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

//fetching details from residence pincode

document.getElementById("r-pincode").addEventListener("blur", function () {
    let pincode = this.value.trim();
    let postOfficeSelect = document.getElementById("r-postOffice");
    let districtInput = document.getElementById("r-district");
    let stateSelect = document.getElementById("r-state");

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
//fetching details from office pincode

document.getElementById("o-pincode").addEventListener("blur", function () {
    let pincode = this.value.trim();
    let postOfficeSelect = document.getElementById("o-postOffice");
    let districtInput = document.getElementById("o-district");
    let stateSelect = document.getElementById("o-state");

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


document.getElementById("post-address").addEventListener("change",function(){
    if(this.value==="office"){
    document.getElementById("office-address").classList.remove("d-none")
    }
    else if(this.value==="residence"){
    document.getElementById("office-address").classList.add("d-none")
    }
})


document.addEventListener("DOMContentLoaded", function () {
    let categorySelect = document.getElementById("category");
    let nameOnCard = document.getElementById("nameOnCard");
    let firstName = document.getElementById("firstName");
    let middleName = document.getElementById("middleName");
    let lastName = document.getElementById("lastName");
    let inputName = document.getElementById("input-name");

    // Function to prevent digit entry
    function preventDigits(event) {
        this.value = this.value.replace(/\d/g, ""); // Remove digits from input
    }

    // Attach event listeners to prevent digit entry
    [nameOnCard, firstName, middleName, lastName, inputName].forEach(field => {
        field.addEventListener("input", preventDigits);
    });

    // Reset fields when category changes
    categorySelect.addEventListener("change", function () {
        nameOnCard.value = ""; 
        firstName.value = ""; 
        middleName.value = ""; 
        lastName.value = ""; 
        inputName.value = ""; 
    });
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

    function updateNameFields() {
        let words = nameOnCard.value.trim().split(/\s+/);

        firstName.value = words[0] || "";
        middleName.value = words.length > 2 ? words[1] : "";
        lastName.value = words.length === 2 ? words[1] : words[2] || "";
    }

    [firstName, middleName, lastName].forEach(field => {
        field.addEventListener("input", function () {
            enforceSingleWord(field);
            updateNameOnCard();
        });
    });

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

    firmName.addEventListener("input", syncFirmToCard);
    nameOnCard.addEventListener("input", syncCardToFirm);
});



//mandating father or mother name
document.addEventListener("DOMContentLoaded", function () {
    let fatherDetails = document.getElementById("fatherDetails");
    let motherDetails = document.getElementById("motherDetails");

    let fatherFirstName = document.getElementById("father-first-name");
    let fatherLastName = document.querySelector("input[name='fatherLastName']");
    let motherFirstName = document.querySelector("input[name='motherFirstName']");
    let motherLastName = document.querySelector("input[name='motherLastName']");

    let nameFields = document.querySelectorAll("#fatherDetails input, #motherDetails input");

    // Function to prevent digits and restrict to one word
    function validateNameInput(event) {
        let input = this.value.replace(/\d/g, ""); // Remove digits
        let words = input.trim().split(/\s+/); // Split by spaces

        if (words.length > 1) {
            this.value = words[0]; // Keep only the first word
        } else {
            this.value = input;
        }
    }

    // Attach event listeners to all name fields
    nameFields.forEach(field => {
        field.addEventListener("input", validateNameInput);
    });

    // Function to check visibility and set required attributes
    function updateRequiredFields() {
        if (!fatherDetails.classList.contains("d-none")) {
            fatherFirstName.setAttribute("required", "true");
            fatherLastName.setAttribute("required", "true");
        } else {
            fatherFirstName.removeAttribute("required");
            fatherLastName.removeAttribute("required");
        }

        if (!motherDetails.classList.contains("d-none")) {
            motherFirstName.setAttribute("required", "true");
            motherLastName.setAttribute("required", "true");
        } else {
            motherFirstName.removeAttribute("required");
            motherLastName.removeAttribute("required");
        }
    }

    // Observe changes in the class list to trigger updates
    const observer = new MutationObserver(updateRequiredFields);

    observer.observe(fatherDetails, { attributes: true, attributeFilter: ["class"] });
    observer.observe(motherDetails, { attributes: true, attributeFilter: ["class"] });

    // Initial check in case elements are already visible
    updateRequiredFields();
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


// checking mobile no. validity

document.getElementById("mobileNo").addEventListener("input", function () {
    let mobileInput = this;
    mobileInput.value = mobileInput.value.replace(/\D/g, "");
    if (mobileInput.value.length > 10) {
        mobileInput.value = mobileInput.value.slice(0, 10);
    }
    let mobilePattern = /^[6789]\d{9}$/;
    if (mobilePattern.test(mobileInput.value)) {
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

function formatDate(input) {
    let value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formatted = "";

    if (value.length > 0) formatted += value.substring(0, 2); // Day
    if (value.length > 2) formatted += "/" + value.substring(2, 4); // Month
    if (value.length > 4) formatted += "/" + value.substring(4, 8); // Year

    input.value = formatted;

    // Validation
    let parts = formatted.split("/");
    let errorMsg = document.getElementById("dobError");
    input.classList.remove("is-invalid");
    errorMsg.textContent = "";

    if (parts.length === 3) {
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);

        if (day > 31) {
            showError(input, errorMsg, "Invalid Day.");
        } else if (month > 12) {
            showError(input, errorMsg, "Invalid month");
        } else if (year < 1901 || year > 2025) {
            showError(input, errorMsg, "Invalid year.");
        }
    }
}

function showError(input, errorMsg, message) {
    errorMsg.textContent = message;
    input.classList.add("is-invalid");
}





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
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, "");

    // Restrict to 12 digits
    if (this.value.length > 12) {
        this.value = this.value.slice(0, 12);
    }
});

// aadhar name validation

document.getElementById("name-on-aadhar").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Removes digits & special characters
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

//fetching assessing officer details

document.addEventListener("DOMContentLoaded", function () {
        const pincodeInput = document.querySelector("input[name='r-pincode']"); 
        const areaCodeInput = document.querySelector("input[name='areaCode']");
        const aoTypeInput = document.querySelector("input[name='aoType']");
        const rangeCodeInput = document.querySelector("input[name='rangeCode']");
        const aoNumberInput = document.querySelector("input[name='aoNumber']");

        pincodeInput.addEventListener("blur", function () {
            let pincode = pincodeInput.value.trim();
            if (pincode.length === 6) {
                fetchAOCode(pincode);
            }
        });

        function fetchAOCode(pincode) {
            const apiUrl = `https://www.sanjanadigitalservice.com/get/ao-code/?pincode=${pincode}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data && data.data && data.data.data.length > 0) {
                        let aoDetails = data.data.data[0];

                        areaCodeInput.value = aoDetails.AreaCode;
                        aoTypeInput.value = aoDetails.AOType;
                        rangeCodeInput.value = aoDetails.RangeCode;
                        aoNumberInput.value = aoDetails.AONumber;
                    } else {
                        alert("No AO Code details found for this pincode.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching AO Code:", error);
                    alert("Failed to retrieve AO Code details. Please try again.");
                });
        }
    });