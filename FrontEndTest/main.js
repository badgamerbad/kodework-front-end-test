require(`./index.html`)
require(`./index.css`)

import React from "react"
import ReactDOM from "react-dom"

let foodData = require('./downloads/FrontEndTest/source.json')

class FoodFilter {
    constructor() {
        this.addCuisines()
        this.addEventListener()
    }
    addCuisines() {
        let cuisinesSelect = document.querySelector('#cuisines')
        let cuisines = foodData.data.map((item) => {
            return item.cuisines
        })
        let final = []
        for(let i = 0; i< cuisines.length; i++) {
            final = [...final, ...cuisines[i]]
        }
        let key = 0;
        let option = <option key={key++} value="All">All</option>
        let options = this.uniqueArrayItem(final).map((item)=>{
            return <option key={key++} value={item}>{item}</option>
        })
        options = [option, options]
        ReactDOM.render(options, cuisinesSelect)
    }
    uniqueArrayItem(array) {
        let unique = array.concat();
        for(let i = 0; i<unique.length; i++) {
            for(let j = i+1; j<unique.length; j++) {
                if(unique[i] === unique[j])
                    unique.splice(j--, 1);
            }   
        }
        return unique;
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
                        <p>${item.cuisines}</p>
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

new FoodFilter()