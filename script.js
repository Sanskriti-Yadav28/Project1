
function getAddress() {
  const pincode = document.getElementById("pincode").value.trim();
  const resultDiv = document.getElementById("result");

  // Clear previous result
  resultDiv.innerHTML = "";

  // Check if pincode is valid
  if (pincode.length !== 6 || isNaN(pincode)) {
    resultDiv.innerHTML = "❗ Please enter a valid 6-digit pincode.";
    return;
  }

  const API = `https://api.postalpincode.in/pincode/${pincode}`;

  fetch(API)
    .then((resp) => resp.json())
    .then((data) => {
      const info = data[0];
      console.log(info);

      if (info.Status === "Success") {
        const postOffices = info.PostOffice;
        let output = `<h3>Results for PIN ${pincode}</h3>`;

        postOffices.forEach((office) => {
          output += `
            <p><strong>Post Office:</strong> ${office.Name}</p>
            <p><strong>District:</strong> ${office.District}</p>
            <p><strong>State:</strong> ${office.State}</p>
            <hr/>
          `;
        });

        resultDiv.innerHTML = output;
      } else {
        resultDiv.innerHTML = info.Message;
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = "Error fetching the data for this PIN code. Try again later.";
      console.log(error);
    });
}
