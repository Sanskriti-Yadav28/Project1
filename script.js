function getAddress() {
  // Input & result box
  const pincode = document.getElementById("pincode").value.trim();
  const resultDiv = document.getElementById("result");

  // Clear previous result
  resultDiv.style.display = "none";
  resultDiv.innerHTML = "";

  // Check pincode is 6 digits
  if (!/^\d{6}$/.test(pincode)) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "⚠️ Please enter a valid 6-digit pincode.";
    return;
  }

  // API Call
  fetch(`https://api.zippopotam.us/in/${pincode}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Not Found");
      }
      return response.json();
    })
    .then(data => {
      const place = data.places[0];

      // Show result
      resultDiv.style.display = "block";
      resultDiv.innerHTML = `
        ✅ <strong>Address Found:</strong><br><br>
        📍 <b>City:</b> ${place["place name"]}<br>
        🏙️ <b>State:</b> ${place["state"]}<br>
        🌍 <b>Country:</b> ${data["country"]}
      `;
    })
    .catch(error => {
      resultDiv.style.display = "block";
      resultDiv.innerHTML = "❌ Address not found for this pincode.";
    });
}
