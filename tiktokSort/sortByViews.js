async function main() {
    console.clear();
    let feed = getElIncludingClass("DivVideoFeedV2");
    let videoCount = 0;
    let scrollingElement = document.scrollingElement || document.body;

    console.log("Scrolling to bottom");


    // Load all videos by scrolling to bottom
    while (true) {
        videoCount = document.querySelectorAll(`.${feed.classList[0]} > *`).length;

        scrollingElement.scrollTop = scrollingElement.scrollHeight;
        await sleep(200);

        if (!getElIncludingClass("DivThreeColumnContainer").querySelector("div ~ svg > circle") &&
            videoCount ==
            document.querySelectorAll(`.${feed.classList[0]} > *`).length
        ) {
            break;
        }
    }

    console.log("Finished scrolling");


    // Change parent element style from float to flex
    feed.style.display = "flex";
    feed.style.flexWrap = "wrap";


    console.log("Loading all video elements")
        // Load all video elements
    let data = [];
    for (let item of feed.querySelectorAll(`.${feed.classList[0]} > *`)) {
        item.style.width = "30%";
        item.style.minWidth = "150px";
        item.style.maxWidth = "200px";
        data.push({ el: item, views: item.querySelector("strong").innerText });
    }

    console.log("Filtering data");
    // Change Values like Mil, or K to numbers
    data = data.map((e) => {
        if (e.views.includes("K")) {
            e.views = Math.round(Number(e.views.replace("K", "")) * 1000);
        } else if (e.views.includes("M")) {
            e.views = Math.round(Number(e.views.replace("M", "")) * 1000000);
        } else {
            e.views = Number(e.views);
        }
        return e;
    });

    // Sort data by views
    data = data.sort((a, b) => {
        return b.views - a.views;
    });

    // Give each html element order
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        item.el.style.order = i;
    }

    // Scroll back to top
    scrollingElement.scrollTop = 0;
    console.clear();
    console.log("Sorted");
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getElIncludingClass(str) {
    for (let el of document.querySelectorAll("*")) {
        for (let cls of el.classList) {
            if (cls.includes(str)) {
                return el;
            }
        }
    }
}


document.body.onload = main();