import { observable, makeObservable } from "mobx";

class info {
    constructor() {
        makeObservable(this, {weatherInfo:observable, favorites:observable});
    }
    weatherInfo = [];
    favorites = [
        {name: "Kiev"},
        {name: "London"},
        {name: "Tokyo"},
        {name: "Moscow"},
    ];

}

export const Info = new info();