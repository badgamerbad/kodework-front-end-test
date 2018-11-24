require(`./index.html`);
require(`./index.css`);

import React from "react";
import ReactDOM from "react-dom";

let foodData = require('./downloads/FrontEndTest/source.json')

class foo {
    constructor() {
        this.addCuisines()
        this.addEventListener()
    }
    addCuisines() {
        let cuisinesSelect = document.querySelector('#cuisines')
        let cuisines = foodData.data.map((item) => {
            return item.cuisines;
        })
        console.log(cuisines)
    }
    addFoodOnFilters() {

    }
    addEventListener() {

        let filterButton = document.querySelector('#filterButton')
        filterButton.addEventListener('click', (e) => {
            let nameSelected = document.querySelector('#name').value
            let typeSelected = document.querySelector('#type').value
            let selectedCuisine = document.querySelector('#cuisines').value
            let costCuisine = document.querySelector('#cost').value
            let content = ``
            let displayingData = foodData.data.filter((item) => {
                let hasCuisine = false
                if (selectedCuisine == "All") {
                    hasCuisine = true
                } else {
                    hasCuisine = item.cuisines.some((cuisine) => {
                        if (cuisine == selectedCuisine)
                            return true
                    })
                }
                // item.avgCost == costCuisine
                if (hasCuisine && item.isVeg == typeSelected)
                    return item
            })
            displayingData.map((item) => {
                content +=
                    `
                        <div class="item">
                        <img src="${item.imgUrl}" alt="pizza">
                        <h1>${item.name}</h1>
                        <p>${selectedCuisine}</p>
                        <ul>
                            <li>${item.avgRating}</li>
                            <li>${item.avgCost}/- FOR 2</li>
                        </ul>
                        </div>
                    `
                
            })
            console.log(content);
            // const Index = () => {
            //     return <div>test</div>;
            // };
            // ReactDOM.render( <Index /> , document.querySelector('.content'));
        })
    }
}

new foo();