function getAllFolderIcons() {
    return document.querySelectorAll(".folders > li > a");
}

function changeFolderIcon(folder) {
    let folderIcon = folder.previousElementSibling;
    let classes = folderIcon.classList;
    if (classes.contains("fa-folder-closed")) {
        classes.replace("fa-folder-closed", "fa-folder-open");
    } else {
        classes.replace("fa-folder-open", "fa-folder-closed");
    }
}

export const folders = getAllFolderIcons();
export const listeners = () => {
    folders.forEach((folder) => {
        folder.addEventListener("mouseover", () => {
            changeFolderIcon(folder);
        });
    });
    folders.forEach((folder) => {
        folder.addEventListener("mouseout", () => {
            changeFolderIcon(folder);
        });
    });
};
