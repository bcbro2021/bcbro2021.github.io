function redirectHome() {
    location.href = "index.html";
}
function redirectDownloads() {
    location.href = "downloads.html";
}
function redirectGithub() {
    location.href = "https://github.com/bcbro2021/bcpy-package-manager";
};
function downloadzip() {
    var zip = document.createElement("a");
    zip.href = "bcpy-package-manager.zip";
    zip.setAttribute("download","bcpy-package-manager.zip");
    document.body.appendChild(zip);
    zip.click();
};
