var shareImageButton = document.querySelector("#share-image-button");
var createPostArea = document.querySelector("#create-post");
var closeCreatePostModalButton = document.querySelector(
    "#close-create-post-modal-btn"
);
var sharedMomentsArea = document.querySelector("#shared-moments");
var formElement = document.querySelector("form");
var titleInput = formElement.querySelector("#title");
var locationInput = formElement.querySelector("#location");

function openCreatePostModal() {
    createPostArea.style.display = "block";

    setTimeout(() => {
        createPostArea.style.transform = "translateY(0)";
    }, 1);

    if (deferredPrompt) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);

            if (choiceResult.outcome === "dismissed") {
                console.log("User cancelled installation");
            } else {
                console.log("User added to home screen");
            }
        });

        deferredPrompt = null;
    }

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.getRegistrations()
    //     .then(function(registrations) {
    //       for (var i = 0; i < registrations.length; i++) {
    //         registrations[i].unregister();
    //       }
    //     })
    // }
}

function closeCreatePostModal() {
    createPostArea.style.display = "none";
    createPostArea.style.transform = "translateY(100vh)";
}

shareImageButton.addEventListener("click", openCreatePostModal);

closeCreatePostModalButton.addEventListener("click", closeCreatePostModal);

// Currently not in use, allows to save assets in cache on demand otherwise
function onSaveButtonClicked(event) {
    console.log("clicked");
    if ("caches" in window) {
        caches.open("user-requested").then(function (cache) {
            cache.add("https://httpbin.org/get");
            cache.add("/src/images/sf-boat.jpg");
        });
    }
}

function clearCards() {
    while (sharedMomentsArea.hasChildNodes()) {
        sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
    }
}

function createCard(data) {
    var cardWrapper = document.createElement("div");
    cardWrapper.className = "shared-moment-card mdl-card mdl-shadow--2dp";
    var cardTitle = document.createElement("div");
    cardTitle.className = "mdl-card__title";
    cardTitle.style.backgroundImage = "url(" + data.image + ")";
    cardTitle.style.backgroundSize = "cover";
    cardWrapper.appendChild(cardTitle);
    var cardTitleTextElement = document.createElement("h2");
    cardTitleTextElement.style.color = "white";
    cardTitleTextElement.className = "mdl-card__title-text";
    cardTitleTextElement.textContent = data.title;
    cardTitle.appendChild(cardTitleTextElement);
    var cardSupportingText = document.createElement("div");
    cardSupportingText.className = "mdl-card__supporting-text";
    cardSupportingText.textContent = data.location;
    cardSupportingText.style.textAlign = "center";
    // var cardSaveButton = document.createElement('button');
    // cardSaveButton.textContent = 'Save';
    // cardSaveButton.addEventListener('click', onSaveButtonClicked);
    // cardSupportingText.appendChild(cardSaveButton);
    cardWrapper.appendChild(cardSupportingText);
    componentHandler.upgradeElement(cardWrapper);
    sharedMomentsArea.appendChild(cardWrapper);
}

function updateUI(data) {
    clearCards();
    for (var i = 0; i < data.length; i++) {
        createCard(data[i]);
    }
}

var url = "http://localhost:3000/posts";
var networkDataReceived = false;

fetch(url)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        networkDataReceived = true;
        console.log("From web", data);
        var dataArray = [];
        for (var key in data) {
            dataArray.push(data[key]);
        }
        updateUI(dataArray);
    });

if ("indexedDB" in window) {
    readAllData("posts").then(function (data) {
        if (!networkDataReceived) {
            console.log("From cache", data);
            updateUI(data);
        }
    });
}

function sendData() {
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            id: new Date().toISOString(),
            title: titleInput.value,
            location: locationInput.value,
            image:
                "https://firebasestorage.googleapis.com/v0/b/pwagram-785da.appspot.com/o/sf-boat.jpg?alt=media&token=e1fbcf86-1ba2-42ca-a484-5aae38f75c6a",
        }),
    }).then(function () {
        console.log("Sent data", res);
        updateUI();
    });
}

formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    if (titleInput.value.trim() === "" || locationInput.value.trim() === "") {
        alert("form invalid!");
        return;
    }

    closeCreatePostModal();

    if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then(function (sw) {
            var post = {
                id: new Date().toISOString(),
                title: titleInput.value,
                location: locationInput.value,
            };

            writeData("sync-posts", post).then(function () {
                return sw.sync.register("sync-new-posts");
            })
            .then(function () {
                var snackBarContainer = document.querySelector(
                    "#confirmation-toast"
                );
                var data = { message: "Your Post was saved for syncing!" };
                snackBarContainer.MaterialSnackbar.showSnackbar(data);
            }).catch(function (err) {
                console.log(err);
            });
        });
    } else {
        sendData();
    }
});
