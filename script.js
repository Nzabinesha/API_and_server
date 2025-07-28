function searchDrug() {
  const drugName = document.getElementById("drugInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Searching...";

  fetch(`https://api.fda.gov/drug/label.json?search=${drugName}&limit=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (!data.results || data.results.length === 0) {
        resultDiv.innerHTML = `<p>No results found for "${drugName}".</p>`;
        return;
      }

      const info = data.results[0];
      localStorage.setItem("lastDrug", drugName);
      localStorage.setItem("lastDrugData", JSON.stringify(data.results[0]));


      // Get and sanitize fields
      let purpose = Array.isArray(info.purpose) ? info.purpose.join(" ") : "Not available";
      let usage = Array.isArray(info.indications_and_usage) ? info.indications_and_usage.join(" ") : "Not available";
      let warnings = Array.isArray(info.warnings) ? info.warnings.join(" ") : "Not available";
      let dosage = Array.isArray(info.dosage_and_administration) ? info.dosage_and_administration.join(" ") : "Not available";

      // 💡 Only apply .replace() if string contains bullets
      if (typeof usage === "string") usage = usage.replace(/•/g, "<br>•");
      if (typeof warnings === "string") warnings = warnings.replace(/•/g, "<br>•");
      if (typeof dosage === "string") dosage = dosage.replace(/•/g, "<br>•");

      resultDiv.innerHTML = `
        <div class="drug-card">
          <h2>${drugName.toUpperCase()}</h2>

          <div class="info-box">
            <h3>Purpose & Usage</h3>
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p><strong>Usage:</strong> ${usage}</p>
          </div>

          <div class="info-box warning">
            <h3>Warnings</h3>
            <p>${warnings}</p>
          </div>

          <div class="info-box dosage">
            <h3>Dosage</h3>
            <p>${dosage}</p>
          </div>
        </div>
      `;
      
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      resultDiv.innerHTML = `<p style="color: red;">Error fetching drug info. Please try a different drug.</p>`;
    });
}
