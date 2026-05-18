function updateTime() {
    const now = new Date();
document.getElementById("thisyear").innerHTML = now.getFullYear() + " ";
}

updateTime();
setInterval(updateTime, 1000);
