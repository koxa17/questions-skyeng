function playAudio() {
    const audioElement = document.getElementById("sound")
    audioElement.play()
}

function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function getDataFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function removeKeyLocalStorage(key) {
    if (key) {
        localStorage.removeItem(key)
        return true
    } else {
        localStorage.clear();
    }

}

function clearStorage() {
    localStorage.clear();
}

export {
    playAudio,
    saveDataToLocalStorage,
    getDataFromLocalStorage,
    removeKeyLocalStorage,
    clearStorage
}