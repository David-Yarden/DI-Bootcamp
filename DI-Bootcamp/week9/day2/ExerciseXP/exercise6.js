(function(numChildren, partnerName, location, jobTitle){
    const div = document.createElement("div");
    div.textContent = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;
    document.body.appendChild(div);
})(3, "Alice", "Paris", "Developer");
