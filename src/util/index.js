export function moveTo(start, end, dom, prop) {
    let dis = 0;
    let speed = 6;
    if (end < 0) {
        speed = -speed;
    }
    const t = setInterval(() => {
        dis += speed;
        dom[prop] = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
            dom[prop] = start + end;
            clearInterval(t);
        }
    }, 2);
}

export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function generateId() {
    return (
        Date.now() +
        Math.random()
            .toString(16)
            .substr(5, 10)
    );
}
