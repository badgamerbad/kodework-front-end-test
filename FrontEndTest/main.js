require(`./index.html`)
require(`./index.css`)

import React from "react"
import ReactDOM from "react-dom"

let foodData = require('./downloads/FrontEndTest/source.json')

class foo {
    constructor() {
        this.addCuisines()
        this.addEventListener()
    }
    addCuisines() {
        let cuisinesSelect = document.querySelector('#cuisines')
        let cuisines = foodData.data.map((item) => {
            return item.cuisines
        })
        console.log(cuisines)
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
                let hasName = false
                if(nameSelected.trim() == "") {
                    hasName = true
                }
                else if(item.name.toLowerCase().indexOf(nameSelected.trim().toLowerCase()) > -1){
                    hasName = true
                }
                let hasType = item.isVeg == typeSelected
                let hasCuisine = false
                if (selectedCuisine == "All") {
                    hasCuisine = true
                } else {
                    hasCuisine = item.cuisines.some((cuisine) => {
                        if (cuisine == selectedCuisine)
                            return true
                    })
                }
                let hasCost = false
                hasCost = costCuisine.trim() == "" ? true : item.avgCost <= costCuisine

                if (hasName && hasType && hasCuisine && hasCost)
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
            console.log(content)
            ReactDOM.render( '', document.querySelector('.content'))
            ReactDOM.render( <div dangerouslySetInnerHTML={this.createMarkup(content)}></div>, document.querySelector('.content'))
        })
    }
    createMarkup(content) {
        return {__html: content};
    }
}

new foo()