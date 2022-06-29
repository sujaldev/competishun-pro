let body = document.getElementsByTagName("body")[0];
let video;
let main_observer = new MutationObserver(check_new_video_element);
let lecture_data_path = "/html/body/div[2]/div/div/section/section/main/div/div[2]/div/div[2]/div/div[2]/div/div/div[1]/div/div/div";

let sync_data = {}

const update_interval = 10000;
const subjects = {
    physics: "P",
    chemistry: "C",
    mathematics: "M"
}

const $x = xp => {
    const snapshot = document.evaluate(
        xp, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    return [...Array(snapshot.snapshotLength)]
        .map((_, i) => snapshot.snapshotItem(i))
        ;
};


function continue_from_last_checkpoint() {
    video = $x("//video")[0];
    if (video === undefined) {
        return
    }
    video.addEventListener("playing", update_current_time, false)

}

function update_current_time() {
    let context = find_context();
    chrome.storage.sync.get([context[1]], function (result) {
        if (result[context[1]] === undefined) {
            return
        }
        video.currentTime = result[context[1]][context[0]];
    })
    video.removeEventListener("playing", update_current_time, false);
}

function remove_watermark() {
    $x("//video")[0].nextSibling.remove()
}

function check_new_video_element(mutations) {
    for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
            if (node.nodeName.toLowerCase() === "video") {
                remove_watermark();
                continue_from_last_checkpoint();
            }
        }
    }
}

function sync_video() {
    video = $x("//video")[0];
    if (video === undefined) {
        return
    }
    let currentTime = Math.round(video.currentTime)
    let context = find_context()
    update_sync_data(currentTime, context[0], context[1])
    chrome.storage.sync.set(sync_data);
}

function find_context() {
    let parent = $x(lecture_data_path);
    if (parent === undefined) {
        return ["", ""];
    }
    let subject = subjects[$x(lecture_data_path + "/div[1]/span")[0].innerText.toLowerCase()]
    let date = $x(lecture_data_path + "/div[3]/span")[0].innerText
    return [subject, date];
}

function update_sync_data(time, subject, date) {
    if (sync_data[date] === undefined) {
        sync_data[date] = {};
    }
    sync_data[date][subject] = time;
}

main_observer.observe(body, {
    childList: true,
    subtree: true
});

setInterval(sync_video, update_interval);
