function formatDoc(cmd, value = null) {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

function addLink() {
  const url = prompt("Insert URL");
  formatDoc("createlink", url);
}

const content = document.getElementById("content");

content.addEventListener("mouseenter", () => {
  const a = content.querySelectorAll("a");
  a.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      content.setAttribute("contenteditable", false);
      item.target = "_blank";
    });
    item.addEventListener("mouseleave", () => {
      content.setAttribute("contenteditable", true);
    });
  });
});

const showCode = document.getElementById("show-code");
let active = false;

showCode.addEventListener("click", () => {
  showCode.dataset.active = !active;
  active = !active;
  if (active) {
    content.textContent = content.innerHTML;
    content.setAttribute("contenteditable", false);
  } else {
    content.innerHTML = content.textContent;
    content.setAttribute("contenteditable", true);
  }
});

const filename = document.getElementById("filename");

function fileHandle(value) {
  if (value === "new") {
    content.innerHTML = "";
    filename.value = "Untitled";
  } else if (value === "txt") {
    const blob = new Blob([content.innerText]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename.value + ".txt";
    link.click();
  } else if (value === "pdf") {
    html2pdf(content).save(filename.value);
  }
}
